/**
 * Esse arquivo é responsável por definir o contrato da entidade Feedback
 */
export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackRepository {
  create(data: FeedbackCreateData): Promise<void>;
}
