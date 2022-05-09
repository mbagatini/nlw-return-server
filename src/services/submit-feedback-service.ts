/**
 * Esse arquivo é responsável por implementar o caso de uso de envio do feedback
 */
import { MailAdapter } from "../adapters/mail-adapter";
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
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if (!["BUG", "IDEA", "OTHER"].includes(type)) {
      throw new Error("Feedback type must be BUG, IDEA or OTHER");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Screenshot must be a base64 encoded PNG");
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    // Envio de e-mail
    await this.mailAdapter.sendMail({
      subject: "Envio de feedback",
      body: [
        `<div style='font-family: Poppins, sans-serif'>`,
        `<h3>Agradecemos pelo seu contato!</h3>`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
