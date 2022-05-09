import express from "express";
import cors from "cors";
import { routes } from "./routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://nlw-return-web-eosin.vercel.app",
    ], // all
  })
);

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log(`----> Server started on port ${process.env.PORT || 3333}`);
});
