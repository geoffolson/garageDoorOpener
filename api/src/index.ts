import express, { Request, Response } from "express";
import { pin } from "./pin";

const app = express();
const port = 3000;

app.post("/", async (req: Request, res: Response) => {
  await pin.press();
  res.send({});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
