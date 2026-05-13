import { Bluetooth, BluetoothOff, Heart, Activity, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBeatWiseDevice } from "@/hooks/useBeatWiseDevice";

const STATUS_LABEL: Record<string, string> = {
  idle: "Disconnected",
  connecting: "Connecting…",
  connected: "Connected",
  disconnected: "Disconnected",
  error: "Error",
};

export function DeviceConnect() {
  const device = useBeatWiseDevice();
  const isConnected = device.status === "connected";

  if (!device.supported) {
    return (
      <Card className="shadow-md border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BluetoothOff className="w-5 h-5 text-muted-foreground" />
            BeatWise Device
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Web Bluetooth isn’t available in this browser. Open this page in
            Chrome or Edge on Android to connect your BeatWise-S3 device.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Bluetooth className="w-5 h-5 text-primary" />
            BeatWise Device
          </span>
          <Badge variant={isConnected ? "default" : "secondary"}>
            {STATUS_LABEL[device.status]}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {device.error && (
          <p className="text-sm text-destructive">{device.error}</p>
        )}

        {isConnected && (
          <div className="grid grid-cols-3 gap-3 text-center">
            <Metric
              icon={<Heart className="w-4 h-4 text-primary" />}
              label="BPM"
              value={device.fingerDetected ? String(device.bpm) : "--"}
            />
            <Metric
              icon={<Activity className="w-4 h-4 text-primary" />}
              label="Accel (mg)"
              value={`${device.accel.x}/${device.accel.y}/${device.accel.z}`}
            />
            <Metric
              icon={<Heart className="w-4 h-4 text-primary" />}
              label="Finger"
              value={device.fingerDetected ? "Yes" : "No"}
            />
          </div>
        )}

        <div className="flex gap-2">
          {!isConnected ? (
            <Button
              onClick={() => void device.connect()}
              disabled={device.status === "connecting"}
              className="flex-1"
            >
              {device.status === "connecting" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Scanning…
                </>
              ) : (
                <>
                  <Bluetooth className="w-4 h-4 mr-2" />
                  Connect device
                </>
              )}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => void device.disconnect()}
              className="flex-1"
            >
              <BluetoothOff className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md bg-secondary/50 p-2">
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="text-base font-semibold mt-1 truncate">{value}</div>
    </div>
  );
}
