import { useState } from "react";
import "./App.css";
import { Button } from "./Button";
import { ErrorAlert } from "./Error";

const baseUrl = import.meta.env.PROD ? "/" : "/api/";

function App() {
  const [isLoading, setIsLoading] = useState(false);
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
