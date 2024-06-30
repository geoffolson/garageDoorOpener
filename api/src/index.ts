import express, { Request, Response } from "express";
import { pin } from "./pin";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, "../../web-ui/dist")));

app.post("/", async (req: Request, res: Response) => {
  await pin.press();
  res.send({});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
