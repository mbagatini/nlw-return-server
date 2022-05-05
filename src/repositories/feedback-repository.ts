/**
 * Esse arquivo é responsável por definir o contrato da entidade Feedback
 */
export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackListData {
  data: {
    id: string;
    type: string;
    comment: string;
    screenshot: string | null;
  }[];
}

export interface FeedbackRepository {
  create(data: FeedbackCreateData): Promise<void>;
  list(): Promise<FeedbackListData>;
}
