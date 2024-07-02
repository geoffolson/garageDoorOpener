import { useRef, useState } from "react";
import "./App.css";
import { Button } from "./Button";
import { ErrorAlert } from "./Error";

const baseUrl = import.meta.env.PROD ? "/" : "/api/";
const wsUrl = import.meta.env.PROD ? "/" : "/ws/";

let webSocket: WebSocket | null = null;

const useIsDoorOpen = () => {
  const [isDoorOpen, setIsDoorOpen] = useState(0);
  const [isdoorSwitchEnabled, setIsDoorSwitchEnabled] = useState(true);
  const startWebSocket = () => {
    if (webSocket === null) webSocket = new WebSocket(wsUrl);
    webSocket.onopen = () => {
      console.log("WebSocket connection opened");
    };
    webSocket.onmessage = (event) => {
      event.data.arrayBuffer().then((buffer: ArrayBuffer) => {
        const data = new DataView(buffer);
        setIsDoorOpen(data.getInt8(0));
        setIsDoorSwitchEnabled(!!data.getInt8(1));
      });
    };
    webSocket.onclose = () => {
      webSocket = null;
      setTimeout(startWebSocket, 5000);
    };
  };
  useState(startWebSocket);
  return { isDoorOpen, isdoorSwitchEnabled };
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { isDoorOpen, isdoorSwitchEnabled } = useIsDoorOpen();
  const [error, setError] = useState<{
    statusCode: number;
    message: string;
  } | null>(null);

  return (
    <>
      {!!error && (
        <ErrorAlert onClose={() => setError(null)} code={error.statusCode}>
          {error.message}
        </ErrorAlert>
      )}
      {!!isdoorSwitchEnabled && (
        <div>{!!isDoorOpen ? "Garage Door Open" : "Garage Door Closed"}</div>
      )}
      <div className="card">
        <Button
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            setError(null);
            fetch(baseUrl, { method: "POST" })
              .then((res) => {
                if (res.status !== 200) {
                  setError({
                    message: res.statusText,
                    statusCode: res.status,
                  });
                }
              })
              .catch((e) => setError(e))
              .finally(() => setIsLoading(false));
          }}
        >
          Garage
        </Button>
      </div>
    </>
  );
}

export default App;
