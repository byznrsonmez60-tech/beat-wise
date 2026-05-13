import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (import.meta.env.DEV) {
  const { installMockBluetooth, shouldInstallMock } = await import("./lib/beatwise-ble-mock");
  if (shouldInstallMock()) {
    installMockBluetooth();
    console.info("[beatwise] mock BLE enabled");
  }
}

createRoot(document.getElementById("root")!).render(<App />);
