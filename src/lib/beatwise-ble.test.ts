import { describe, expect, it } from "vitest";
import { parseMeasurement } from "./beatwise-ble";

function packet({
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

describe("parseMeasurement", () => {
  it("decodes a typical reading with finger present", () => {
    const r = parseMeasurement(
      packet({ bpm: 72, ax: 30, ay: -20, az: 980, irValue: 120_000 })
    );
    expect(r.bpm).toBe(72);
    expect(r.ax).toBe(30);
    expect(r.ay).toBe(-20);
    expect(r.az).toBe(980);
    expect(r.irValue).toBe(120_000);
    expect(r.fingerDetected).toBe(true);
    expect(typeof r.timestamp).toBe("number");
  });

  it("flags finger as absent when IR is below threshold", () => {
    const r = parseMeasurement(
      packet({ bpm: 0, ax: 0, ay: 0, az: 0, irValue: 10_000 })
    );
    expect(r.fingerDetected).toBe(false);
    expect(r.bpm).toBe(0);
  });

  it("treats irValue=50000 as the finger threshold", () => {
    const below = parseMeasurement(
      packet({ bpm: 0, ax: 0, ay: 0, az: 0, irValue: 49_999 })
    );
    const at = parseMeasurement(
      packet({ bpm: 0, ax: 0, ay: 0, az: 0, irValue: 50_000 })
    );
    expect(below.fingerDetected).toBe(false);
    expect(at.fingerDetected).toBe(true);
  });

  it("preserves sign on accelerometer axes", () => {
    const r = parseMeasurement(
      packet({ bpm: 60, ax: -32000, ay: -1, az: 32000, irValue: 0 })
    );
    expect(r.ax).toBe(-32000);
    expect(r.ay).toBe(-1);
    expect(r.az).toBe(32000);
  });

  it("decodes irValue larger than uint16 range", () => {
    const r = parseMeasurement(
      packet({ bpm: 80, ax: 0, ay: 0, az: 0, irValue: 250_000 })
    );
    expect(r.irValue).toBe(250_000);
  });

  it("respects little-endian byte order", () => {
    // Manually-laid bytes for bpm=0x0102 → 258, ax=0x0304 → 772 (LE).
    const bytes = new Uint8Array([
      0x02, 0x01,
      0x04, 0x03,
      0x00, 0x00,
      0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
    ]);
    const r = parseMeasurement(new DataView(bytes.buffer));
    expect(r.bpm).toBe(0x0102);
    expect(r.ax).toBe(0x0304);
  });
});
