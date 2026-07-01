import express from "express";
import cors from "cors";
import routes from "./routes/index.routes";
import { errorHandler } from "./middleware/error.middleware";
import helmet from 'helmet';

const app = express();

app.use(helmet())

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/v1", routes);
app.use(errorHandler);

export default app;
