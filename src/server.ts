import express from "express";
import { prisma } from "./prisma";

const app = express();

app.use(express.json());

app.get("/feedbacks", async (req, res) => {
  const data = await prisma.feedback.findMany();
  return res.json({ data: data });
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log("---> Server started on port 3333");
});
