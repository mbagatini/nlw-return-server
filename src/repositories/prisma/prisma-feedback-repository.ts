/**
 * Esse arquivo é responsável pela comunicação com o banco de dados somente
 */
import { prisma } from "../../prisma";
import {
  FeedbackCreateData,
  FeedbackListData,
  FeedbackRepository,
} from "../feedback-repository";

export class PrismaFeedbackRepository implements FeedbackRepository {
  async create({
    type,
    comment,
    screenshot,
  }: FeedbackCreateData): Promise<void> {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }

  async list(): Promise<FeedbackListData> {
    const data = await prisma.feedback.findMany();
    return { data };
  }
}
