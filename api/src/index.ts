import express, { Request, Response } from "express";
import { pin } from "./pin";
import path from "path";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";
import { doorSwitch } from "./doorSwitch";
import { config } from "./loadConfig";
import "./blink";

const app = express();
const port = process.env.NODE_ENV === "production" ? 80 : 3000;

app.use(express.static(path.resolve(__dirname, "../../web-ui/dist")));

app.post("/", async (req: Request, res: Response) => {
  await pin.press();
  res.send({});
});

const server = createServer(app);
const wss = new WebSocketServer({ server });

const createDoorAjarMessage = (door: number) => {
  return new Uint8Array([door, config.doorSwitchEnabled ? 1 : 0]);
};

const connections: WebSocket[] = [];
wss.on("connection", (ws) => {
  connections.push(ws);

  ws.send(createDoorAjarMessage(doorSwitch.digitalRead()));

  ws.on("close", () => {
    const index = connections.findIndex((_ws) => ws === _ws);
    connections.splice(index, 1);
  });
  ws.on("error", () => {
    const index = connections.findIndex((_ws) => ws === _ws);
    connections.splice(index, 1);
  });
});

doorSwitch?.on("alert", (door: 0 | 1) => {
  connections.forEach((ws) => ws.send(createDoorAjarMessage(door)));
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
