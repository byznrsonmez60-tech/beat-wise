# BeatWise ESP32-S3 firmware

NimBLE peripheral that streams BPM + accelerometer + IR to the web app over
Web Bluetooth. See `beatwise_s3_ble/beatwise_s3_ble.ino`.

## BLE contract (must match `src/lib/beatwise-ble.ts`)

- Device name: `BeatWise-S3`
- Service UUID: `6b1f0001-2c4a-4f3d-9e8b-1a2b3c4d5e6f`
- Measurement characteristic UUID: `6b1f0002-2c4a-4f3d-9e8b-1a2b3c4d5e6f`
  (properties: READ, NOTIFY)
- Packet: 12 bytes, little-endian

  | offset | type   | field    | units      |
  |--------|--------|----------|------------|
  | 0      | uint16 | bpm      | beats/min  |
  | 2      | int16  | ax       | milli-g    |
  | 4      | int16  | ay       | milli-g    |
  | 6      | int16  | az       | milli-g    |
  | 8      | uint32 | irValue  | raw IR     |

- Notify rate: 20 Hz when a client is subscribed.
- `irValue >= 50000` indicates finger detected.

## Required Arduino libraries

Install via Library Manager:

- `NimBLE-Arduino` (h2zero)
- `SparkFun MAX3010x Pulse and Proximity Sensor Library`
- `Adafruit ADXL345`
- `Adafruit Unified Sensor`

Board: **ESP32S3 Dev Module**.

## Validating without hardware

Three layers, cheapest first.

### 1. Parser unit test (no device, no browser)

```bash
npm run test
```

Covers the 12-byte decode in `src/lib/beatwise-ble.ts`.

### 2. Mock BLE in the browser (no device)

```bash
npm run dev
# open http://localhost:8080/?mockBle=1
```

`navigator.bluetooth` is replaced with a fake peripheral that emits
synthetic readings at 20 Hz. Click **Connect device** on the Dashboard and
watch the BPM, accel and finger-detected indicator update. This exercises
the full hook + component stack without an ESP32.

### 3. Hardware-free BLE round-trip with nRF Connect

Lets you talk to the real Web Bluetooth stack from a real Android browser
without an ESP32.

You need two Android phones (or one phone + emulator):

- **Phone A**: install [nRF Connect for Mobile](https://www.nordicsemi.com/Products/Development-tools/nrf-connect-for-mobile)
  by Nordic Semiconductor.
- **Phone B**: Chrome on Android, pointed at the beat-wise app over HTTPS.

On Phone A:

1. Open nRF Connect → **Advertiser** tab.
2. Create a new advertiser:
   - Device name: `BeatWise-S3`
   - Add service UUID: `6b1f0001-2c4a-4f3d-9e8b-1a2b3c4d5e6f`
   - Include name in advertising packet.
3. **GATT server** tab → add a service with the same UUID.
4. Inside the service add a characteristic:
   - UUID: `6b1f0002-2c4a-4f3d-9e8b-1a2b3c4d5e6f`
   - Properties: Read, Notify
   - Initial value (hex): `48 00 1E 00 EC FF D4 03 C0 D4 01 00`
     - bpm=72, ax=30, ay=-20, az=980, irValue=120000
5. Start the advertiser, start the GATT server.

On Phone B:

1. Open the beat-wise app, tap **Connect device**.
2. Pick `BeatWise-S3` from the chooser.

Editing the characteristic value on Phone A immediately changes the
Dashboard on Phone B — useful for testing edge cases (`irValue=0` to drop
finger detection, large negative accel values, BPM=200 anomaly path).

### 4. Optional: compile-only firmware check

```bash
arduino-cli compile --fqbn esp32:esp32:esp32s3 firmware/beatwise_s3_ble
```

Verifies the sketch builds without flashing the board.
