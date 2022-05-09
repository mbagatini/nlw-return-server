import { ListFeedbacksService } from "./list-feedbacks-service";

const createSpy = jest.fn();
const listSpy = jest.fn();

describe("List feedbacks", () => {
  const listFeedbacksService = new ListFeedbacksService({
    create: createSpy,
    list: listSpy,
  });

  it("should be able to list feedbacks", async () => {
    await expect(listFeedbacksService.execute()).resolves.not.toThrow();
    expect(listSpy).toHaveBeenCalled();
  });
});
