import { useCallback, useEffect, useRef, useState } from "react";
import {
  BeatWiseClient,
  BeatWiseReading,
  isWebBluetoothSupported,
} from "@/lib/beatwise-ble";

export type DeviceStatus = "idle" | "connecting" | "connected" | "disconnected" | "error";

export interface UseBeatWiseDevice {
  supported: boolean;
  status: DeviceStatus;
  error: string | null;
  reading: BeatWiseReading | null;
  bpm: number;
  accel: { x: number; y: number; z: number };
  irValue: number;
  fingerDetected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export function useBeatWiseDevice(): UseBeatWiseDevice {
  const clientRef = useRef<BeatWiseClient | null>(null);
  const [status, setStatus] = useState<DeviceStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<BeatWiseReading | null>(null);

  if (!clientRef.current) {
    clientRef.current = new BeatWiseClient();
  }

  useEffect(() => {
    const client = clientRef.current!;
    const offReading = client.onReading(setReading);
    const offDisconnect = client.onDisconnect(() => {
      setStatus("disconnected");
    });
    return () => {
      offReading();
      offDisconnect();
      void client.disconnect();
    };
  }, []);

  const connect = useCallback(async () => {
    const client = clientRef.current!;
    setError(null);
    setStatus("connecting");
    try {
      await client.connect();
      setStatus("connected");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // User cancelling the chooser is not really an error.
      if (message.toLowerCase().includes("user cancelled")) {
        setStatus("idle");
      } else {
        setError(message);
        setStatus("error");
      }
    }
  }, []);

  const disconnect = useCallback(async () => {
    const client = clientRef.current!;
    await client.disconnect();
    setStatus("disconnected");
  }, []);

  return {
    supported: isWebBluetoothSupported(),
    status,
    error,
    reading,
    bpm: reading?.bpm ?? 0,
    accel: {
      x: reading?.ax ?? 0,
      y: reading?.ay ?? 0,
      z: reading?.az ?? 0,
    },
    irValue: reading?.irValue ?? 0,
    fingerDetected: reading?.fingerDetected ?? false,
    connect,
    disconnect,
  };
}
