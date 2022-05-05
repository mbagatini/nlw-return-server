import express from "express";
import { prisma } from "./prisma";
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-adapter";
import { PrismaFeedbackRepository } from "./repositories/prisma/prisma-feedback-repository";
import { SubmitFeedbackService } from "./services/submit-feedback-service";

export const routes = express.Router();

routes.get("/feedbacks", async (req, res) => {
  const data = await prisma.feedback.findMany();
  return res.json({ data: data });
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  // Comunicação com o banco de dados
  const prismaFeedbackRepository = new PrismaFeedbackRepository();

  // Serivço de envio de e-mail
  const nodemailerAdapter = new NodemailerAdapter();

  // Controle da regra de negócio
  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbackRepository,
    nodemailerAdapter
  );

  await submitFeedbackService.execute({ type, comment, screenshot });

  return res.status(201).send();
});
