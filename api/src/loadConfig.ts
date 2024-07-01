import { readFileSync } from "fs";
import path from "path";
import { z } from "zod";

const fileStr = readFileSync(path.resolve(__dirname, "../../config.json"), {
  encoding: "utf-8",
});

const schema = z
  .object({
    outPin: z.number(),
  })
  .readonly();

export const config = schema.parse(JSON.parse(fileStr));
