import express from "express";
import { prisma } from "./prisma";
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-adapter";
import { PrismaFeedbackRepository } from "./repositories/prisma/prisma-feedback-repository";
import { SubmitFeedbackService } from "./services/submit-feedback-service";
import { ListFeedbacksService } from "./services/list-feedbacks-service";

export const routes = express.Router();

routes.get("/feedbacks", async (req, res) => {
  // Comunicação com o banco de dados
  const prismaFeedbackRepository = new PrismaFeedbackRepository();

  const listFeedbacksService = new ListFeedbacksService(
    prismaFeedbackRepository
  );

  const data = await listFeedbacksService.execute();

  return res.status(200).json(data);
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
