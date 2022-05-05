import express from "express";
import { transport } from "./mailtrap";
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

  await transport.sendMail({
    from: "Equipe Feedget <noreply@feedget.com>",
    to: "Morgs <morganabagatini@gmail.com>",
    subject: "Envio de feedback",
    html: [
      `<div style='font-family: Poppins, sans-serif'>`,
      `<h3>Agradecemos pelo seu contato!</h3>`,
      `<p>Tipo de feedback: ${feedback.type}</p>`,
      `<p>Comentário: ${feedback.comment}</p>`,
      `</div>`,
    ].join("\n"),
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log("---> Server started on port 3333");
});
