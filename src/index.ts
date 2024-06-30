import express, { Request, Response } from "express";
import { pin } from "./pin";

const app = express();
const port = 3000;

app.get("/", async (req: Request, res: Response) => {
  await pin.press();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
