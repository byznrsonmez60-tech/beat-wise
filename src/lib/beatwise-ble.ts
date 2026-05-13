// Web Bluetooth client for the BeatWise ESP32-S3 peripheral.
// Companion firmware: firmware/beatwise_s3_ble/beatwise_s3_ble.ino

export const BEATWISE_SERVICE_UUID = "6b1f0001-2c4a-4f3d-9e8b-1a2b3c4d5e6f";
export const BEATWISE_MEASUREMENT_CHAR_UUID = "6b1f0002-2c4a-4f3d-9e8b-1a2b3c4d5e6f";
export const BEATWISE_DEVICE_NAME = "BeatWise-S3";

const FINGER_DETECT_THRESHOLD = 50_000;

export interface BeatWiseReading {
  bpm: number;
  ax: number; // milli-g
  ay: number;
  az: number;
  irValue: number;
  fingerDetected: boolean;
  timestamp: number;
}

export type ReadingListener = (reading: BeatWiseReading) => void;
export type DisconnectListener = () => void;

export function isWebBluetoothSupported(): boolean {
  return typeof navigator !== "undefined" && !!navigator.bluetooth;
}

export function parseMeasurement(view: DataView): BeatWiseReading {
  const bpm = view.getUint16(0, true);
  const ax = view.getInt16(2, true);
  const ay = view.getInt16(4, true);
  const az = view.getInt16(6, true);
  const irValue = view.getUint32(8, true);
  return {
    bpm,
    ax,
    ay,
    az,
    irValue,
    fingerDetected: irValue >= FINGER_DETECT_THRESHOLD,
    timestamp: Date.now(),
  };
}

export class BeatWiseClient {
  private device: BluetoothDevice | null = null;
  private characteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private readonly readingListeners = new Set<ReadingListener>();
  private readonly disconnectListeners = new Set<DisconnectListener>();

  onReading(listener: ReadingListener): () => void {
    this.readingListeners.add(listener);
    return () => this.readingListeners.delete(listener);
  }

  onDisconnect(listener: DisconnectListener): () => void {
    this.disconnectListeners.add(listener);
    return () => this.disconnectListeners.delete(listener);
  }

  get connected(): boolean {
    return !!this.device?.gatt?.connected;
  }

  async connect(): Promise<void> {
    if (!isWebBluetoothSupported()) {
      throw new Error("Web Bluetooth is not supported in this browser");
    }
    const bluetooth = navigator.bluetooth!;

    const device = await bluetooth.requestDevice({
      filters: [{ name: BEATWISE_DEVICE_NAME }],
      optionalServices: [BEATWISE_SERVICE_UUID],
    });

    if (!device.gatt) {
      throw new Error("Selected device does not support GATT");
    }

    device.addEventListener("gattserverdisconnected", this.handleDisconnect);

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(BEATWISE_SERVICE_UUID);
    const characteristic = await service.getCharacteristic(BEATWISE_MEASUREMENT_CHAR_UUID);

    characteristic.addEventListener("characteristicvaluechanged", this.handleValueChanged);
    await characteristic.startNotifications();

    this.device = device;
    this.characteristic = characteristic;
  }

  async disconnect(): Promise<void> {
    if (this.characteristic) {
      this.characteristic.removeEventListener("characteristicvaluechanged", this.handleValueChanged);
      try {
        await this.characteristic.stopNotifications();
      } catch {
        // Device may already be gone; ignore.
      }
      this.characteristic = null;
    }
    if (this.device) {
      this.device.removeEventListener("gattserverdisconnected", this.handleDisconnect);
      if (this.device.gatt?.connected) {
        this.device.gatt.disconnect();
      }
      this.device = null;
    }
  }

  private handleValueChanged = (event: Event): void => {
    const target = event.target as BluetoothRemoteGATTCharacteristic | null;
    if (!target?.value) return;
    const reading = parseMeasurement(target.value);
    this.readingListeners.forEach((listener) => listener(reading));
  };

  private handleDisconnect = (): void => {
    this.characteristic = null;
    this.disconnectListeners.forEach((listener) => listener());
  };
}
