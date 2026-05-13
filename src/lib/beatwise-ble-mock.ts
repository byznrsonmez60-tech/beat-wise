// Dev-only mock for the Web Bluetooth API.
// Installs a fake navigator.bluetooth that pretends to be a BeatWise-S3
// peripheral and emits synthetic readings on a timer. No hardware required.
//
// Activated by ?mockBle=1 in the URL or VITE_MOCK_BLE=1 in the env.

import {
  BEATWISE_MEASUREMENT_CHAR_UUID,
  BEATWISE_SERVICE_UUID,
} from "@/lib/beatwise-ble";

const NOTIFY_INTERVAL_MS = 50; // matches firmware 20 Hz

function encodePacket({
  bpm,
  ax,
  ay,
  az,
  irValue,
}: {
  bpm: number;
  ax: number;
  ay: number;
  az: number;
  irValue: number;
}): DataView {
  const buf = new ArrayBuffer(12);
  const view = new DataView(buf);
  view.setUint16(0, bpm, true);
  view.setInt16(2, ax, true);
  view.setInt16(4, ay, true);
  view.setInt16(6, az, true);
  view.setUint32(8, irValue, true);
  return view;
}

function createMockCharacteristic(): BluetoothRemoteGATTCharacteristic {
  const target = new EventTarget();
  let timer: ReturnType<typeof setInterval> | null = null;
  let value: DataView | undefined;
  let t = 0;

  const tick = () => {
    t += NOTIFY_INTERVAL_MS / 1000;
    const bpm = 70 + Math.round(8 * Math.sin(t * 0.4));
    const ax = Math.round(40 * Math.sin(t * 1.5));
    const ay = Math.round(40 * Math.cos(t * 1.5));
    const az = 980 + Math.round(20 * Math.sin(t * 0.8));
    const irValue = 120_000 + Math.round(20_000 * Math.sin(t));
    value = encodePacket({ bpm, ax, ay, az, irValue });
    target.dispatchEvent(new Event("characteristicvaluechanged"));
  };

  const characteristic = {
    uuid: BEATWISE_MEASUREMENT_CHAR_UUID,
    get value() {
      return value;
    },
    async startNotifications() {
      if (!timer) timer = setInterval(tick, NOTIFY_INTERVAL_MS);
      return characteristic;
    },
    async stopNotifications() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      return characteristic;
    },
    async readValue() {
      return value ?? encodePacket({ bpm: 0, ax: 0, ay: 0, az: 0, irValue: 0 });
    },
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
    dispatchEvent: target.dispatchEvent.bind(target),
  } as unknown as BluetoothRemoteGATTCharacteristic & {
    _stopTimer: () => void;
  };

  // Expose for the device-disconnect path.
  Object.defineProperty(characteristic, "_stopTimer", {
    value: () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    },
  });

  return characteristic;
}

function createMockDevice(): BluetoothDevice {
  const target = new EventTarget();
  const characteristic = createMockCharacteristic();
  let connected = false;

  const service: BluetoothRemoteGATTService = {
    async getCharacteristic(uuid) {
      if (uuid !== BEATWISE_MEASUREMENT_CHAR_UUID) {
        throw new Error(`Mock device has no characteristic ${String(uuid)}`);
      }
      return characteristic;
    },
  };

  const server: BluetoothRemoteGATTServer = {
    get connected() {
      return connected;
    },
    async connect() {
      connected = true;
      return server;
    },
    disconnect() {
      connected = false;
      (characteristic as unknown as { _stopTimer: () => void })._stopTimer();
      target.dispatchEvent(new Event("gattserverdisconnected"));
    },
    async getPrimaryService(uuid) {
      if (uuid !== BEATWISE_SERVICE_UUID) {
        throw new Error(`Mock device has no service ${String(uuid)}`);
      }
      return service;
    },
  };

  const device = {
    id: "mock-beatwise-s3",
    name: "BeatWise-S3 (mock)",
    gatt: server,
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
    dispatchEvent: target.dispatchEvent.bind(target),
  } as unknown as BluetoothDevice;

  return device;
}

export function installMockBluetooth(): void {
  if (typeof navigator === "undefined") return;
  if ((navigator as unknown as { bluetooth?: unknown }).bluetooth) {
    console.info("[beatwise-ble-mock] overriding real navigator.bluetooth");
  }
  const mock: Bluetooth = {
    async requestDevice() {
      return createMockDevice();
    },
    async getAvailability() {
      return true;
    },
  };
  Object.defineProperty(navigator, "bluetooth", {
    value: mock,
    configurable: true,
  });
}

export function shouldInstallMock(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get("mockBle") === "1") return true;
  const env = (import.meta as unknown as { env?: Record<string, string> }).env;
  return env?.VITE_MOCK_BLE === "1";
}
