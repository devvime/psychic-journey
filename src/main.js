import "dotenv/config";
import "#root/server/error/json.error.js";
import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorMiddleware } from "#root/server/middleware/error.middleware.js";

const app = express();
const appRouter = Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(appRouter);
app.use(errorMiddleware);

export const Get = (path, func) => appRouter.get(path, func);
export const Post = (path, func) => appRouter.post(path, func);
export const Put = (path, func) => appRouter.put(path, func);
export const Patch = (path, func) => appRouter.patch(path, func);
export const Delete = (path, func) => appRouter.delete(path, func);

import("./container.js");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port:", process.env.PORT || 3000);
});