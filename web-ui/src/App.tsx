import { useRef, useState } from "react";
import "./App.css";
import { Button } from "./Button";
import { ErrorAlert } from "./Error";

const baseUrl = import.meta.env.PROD ? "/" : "/api/";
const wsUrl = import.meta.env.PROD ? "/" : "/ws/";

const useIsDoorOpen = () => {
  const [isDoorOpen, setIsDoorOpen] = useState(0);
  const socketRef = useRef<WebSocket>();
  const startWebSocket = () => {
    socketRef.current = new WebSocket(wsUrl);
    socketRef.current.onopen = () => {
      console.log("WebSocket connection opened");
    };
    socketRef.current.onmessage = (event) => {
      setIsDoorOpen(event.data);
    };
    socketRef.current.onclose = () => {
      setTimeout(startWebSocket, 5000);
    };
  };
  useState(startWebSocket);
  return isDoorOpen;
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const isDoorOpen = useIsDoorOpen();
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
