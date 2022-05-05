/**
 * Esse arquivo é responsável por implementar o caso de uso de envio do feedback
 */
import { FeedbackRepository } from "../repositories/feedback-repository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  // Dependency Inversion Principle
  // Repositório responsável por manipular o feedback
  constructor(
    private feedbackRepository: FeedbackRepository,
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

  }
}
