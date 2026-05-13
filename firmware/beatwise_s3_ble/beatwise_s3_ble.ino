// BeatWise ESP32-S3 BLE peripheral
// Streams BPM + 3-axis accelerometer + IR value to a Web Bluetooth client.
//
// Required libraries (Arduino Library Manager):
//   - NimBLE-Arduino     (h2zero)
//   - SparkFun MAX3010x  (provides MAX30105.h + heartRate.h)
//   - Adafruit ADXL345
//   - Adafruit Unified Sensor
//
// Board: ESP32S3 Dev Module

#include <Wire.h>
#include <NimBLEDevice.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>

#define I2C_SDA 8
#define I2C_SCL 9

// Custom UUIDs (must match src/lib/beatwise-ble.ts in the web app).
static const char *SERVICE_UUID = "6b1f0001-2c4a-4f3d-9e8b-1a2b3c4d5e6f";
static const char *MEASUREMENT_CHAR_UUID = "6b1f0002-2c4a-4f3d-9e8b-1a2b3c4d5e6f";

static const uint16_t NOTIFY_INTERVAL_MS = 50; // 20 Hz
static const long FINGER_DETECT_THRESHOLD = 50000;
static const float G_TO_MS2 = 9.80665f;

MAX30105 particleSensor;
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

NimBLECharacteristic *measurementChar = nullptr;
bool clientConnected = false;

long lastBeat = 0;
int beatAvg = 0;
unsigned long lastNotify = 0;

class ServerCallbacks : public NimBLEServerCallbacks {
  void onConnect(NimBLEServer *) override {
    clientConnected = true;
    Serial.println("BLE client connected");
  }
  void onDisconnect(NimBLEServer *server) override {
    clientConnected = false;
    Serial.println("BLE client disconnected; restarting advertising");
    NimBLEDevice::startAdvertising();
  }
};

void setup() {
  Serial.begin(115200);
  Wire.begin(I2C_SDA, I2C_SCL);

  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 not found");
    while (1) delay(1000);
  }
  particleSensor.setup();
  particleSensor.setPulseAmplitudeIR(0x32);

  if (!accel.begin()) {
    Serial.println("ADXL345 not found");
    while (1) delay(1000);
  }
  accel.setRange(ADXL345_RANGE_16_G);

  NimBLEDevice::init("BeatWise-S3");
  NimBLEDevice::setPower(ESP_PWR_LVL_P9);

  NimBLEServer *server = NimBLEDevice::createServer();
  server->setCallbacks(new ServerCallbacks());

  NimBLEService *service = server->createService(SERVICE_UUID);
  measurementChar = service->createCharacteristic(
      MEASUREMENT_CHAR_UUID,
      NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY);
  service->start();

  NimBLEAdvertising *adv = NimBLEDevice::getAdvertising();
  adv->addServiceUUID(SERVICE_UUID);
  adv->setName("BeatWise-S3");
  adv->enableScanResponse(true);
  NimBLEDevice::startAdvertising();
  Serial.println("Advertising as BeatWise-S3");
}

void loop() {
  long irValue = particleSensor.getIR();

  if (checkForBeat(irValue)) {
    long delta = millis() - lastBeat;
    lastBeat = millis();
    float bpm = 60.0f / (delta / 1000.0f);
    if (bpm > 40 && bpm < 150) {
      beatAvg = (int)bpm;
    }
  }

  if (irValue < FINGER_DETECT_THRESHOLD) {
    beatAvg = 0;
  }

  unsigned long now = millis();
  if (clientConnected && now - lastNotify >= NOTIFY_INTERVAL_MS) {
    lastNotify = now;

    sensors_event_t event;
    accel.getEvent(&event);

    int16_t axMilliG = (int16_t)(event.acceleration.x / G_TO_MS2 * 1000.0f);
    int16_t ayMilliG = (int16_t)(event.acceleration.y / G_TO_MS2 * 1000.0f);
    int16_t azMilliG = (int16_t)(event.acceleration.z / G_TO_MS2 * 1000.0f);

    uint8_t packet[12];
    uint16_t bpm16 = (uint16_t)beatAvg;
    uint32_t ir32 = (uint32_t)(irValue < 0 ? 0 : irValue);

    // Little-endian, matches DataView default on web side.
    packet[0]  = bpm16 & 0xFF;
    packet[1]  = (bpm16 >> 8) & 0xFF;
    packet[2]  = axMilliG & 0xFF;
    packet[3]  = (axMilliG >> 8) & 0xFF;
    packet[4]  = ayMilliG & 0xFF;
    packet[5]  = (ayMilliG >> 8) & 0xFF;
    packet[6]  = azMilliG & 0xFF;
    packet[7]  = (azMilliG >> 8) & 0xFF;
    packet[8]  = ir32 & 0xFF;
    packet[9]  = (ir32 >> 8) & 0xFF;
    packet[10] = (ir32 >> 16) & 0xFF;
    packet[11] = (ir32 >> 24) & 0xFF;

    measurementChar->setValue(packet, sizeof(packet));
    measurementChar->notify();
  }
}
