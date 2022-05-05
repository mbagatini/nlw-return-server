import { FeedbackRepository } from "../repositories/feedback-repository";

export class ListFeedbacksService {
  // Dependency Inversion Principle
  // Repositório responsável por manipular o feedback
  constructor(private feedbackRepository: FeedbackRepository) {}

  async execute() {
    const feedbacks = await this.feedbackRepository.list();
    return feedbacks;
  }
}
