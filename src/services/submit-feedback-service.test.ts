/**
 * Esse arquivo é responsável por implementar os testes do caso de uso de envio do feedback
 */
import { SubmitFeedbackService } from "./submit-feedback-service";

// spies - testa se a função foi chamada
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe("Submit feedback", () => {
  const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "OUTRO",
        comment: "Essa aplicação é fera",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback with invalid type", async () => {
    await expect(
      submitFeedback.execute({
        type: "123",
        comment: "Essa aplicação é fera",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Essa aplicação é fera",
        screenshot: "123",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without thes comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "123",
        comment: "",
      })
    ).rejects.toThrow();
  });
});
