import {
  getWorks,
  getWork,
  createWork,
  updateWork,
  deleteWork,
  getFulFillRecords,
  getFulFillRecord,
  createFulFillRecord,
  updateFulFill,
  deleteFulFill,
  getReviewConfigs,
  getReviewSetting,
  createReviewSetting,
  updateReviewSetting,
  deleteReviewSetting,
} from "./base"; // 調整這個路徑

// Mock UUID function
jest.mock("uuid", () => ({
  __esModule: true,
  v4: jest.fn(() => "unique-id"),
}));

// Mock LocalStorage
beforeEach(() => {
  localStorage.clear();
});

describe("Work Functions", () => {
  it("should create a work", () => {
    const workPayload = { work: "Test Work", date: "2023-07-08" }; // 使用正確的屬性
    createWork(workPayload);
    const works = getWorks();
    expect(works).toHaveLength(1);
    expect(works[0].id).toBe("unique-id");
  });

  it("should get a work by id", () => {
    const workPayload = { work: "Test Work", date: "2023-07-08" };
    createWork(workPayload);
    const work = getWork("unique-id");
    expect(work).toBeDefined();
    expect(work?.id).toBe("unique-id");
  });

  it("should update a work", () => {
    const workPayload = { work: "Test Work", date: "2023-07-08" };
    createWork(workPayload);
    const updatePayload = {
      id: "unique-id",
      work: "Updated Work",
      date: "2023-07-09",
    };
    updateWork(updatePayload);
    const work = getWork("unique-id");
    expect(work?.work).toBe("Updated Work");
  });

  it("should delete a work by id", () => {
    const workPayload = { work: "Test Work", date: "2023-07-08" };
    createWork(workPayload);
    deleteWork("unique-id");
    const work = getWork("unique-id");
    expect(work).toBeUndefined();
  });
});

describe("FulfillRecord Functions", () => {
  it("should create a fulfill record", () => {
    const fulfillPayload = { workId: "1", date: "2023-07-08" }; // 使用正確的屬性
    createFulFillRecord(fulfillPayload);
    const records = getFulFillRecords();
    expect(records).toHaveLength(1);
    expect(records[0].id).toBe("unique-id");
  });

  it("should get a fulfill record by id", () => {
    const fulfillPayload = { workId: "1", date: "2023-07-08" };
    createFulFillRecord(fulfillPayload);
    const record = getFulFillRecord("unique-id");
    expect(record).toBeDefined();
    expect(record?.id).toBe("unique-id");
  });

  it("should update a fulfill record", () => {
    const fulfillPayload = { workId: "1", date: "2023-07-08" };
    createFulFillRecord(fulfillPayload);
    const updatePayload = { id: "unique-id", workId: "2", date: "2023-07-09" };
    updateFulFill(updatePayload);
    const record = getFulFillRecord("unique-id");
    expect(record?.workId).toBe("2");
  });

  it("should delete a fulfill record by id", () => {
    const fulfillPayload = { workId: "1", date: "2023-07-08" };
    createFulFillRecord(fulfillPayload);
    deleteFulFill("unique-id");
    const record = getFulFillRecord("unique-id");
    expect(record).toBeUndefined();
  });
});

describe("ReviewConfig Functions", () => {
  it("should create a review setting", () => {
    const reviewConfigPayload = { duration: 30 }; // 使用正確的屬性
    createReviewSetting(reviewConfigPayload);
    const configs = getReviewConfigs();
    expect(configs).toHaveLength(1);
    expect(configs[0].id).toBe("unique-id");
  });

  it("should get a review setting by id", () => {
    const reviewConfigPayload = { duration: 30 };
    createReviewSetting(reviewConfigPayload);
    const config = getReviewSetting("unique-id");
    expect(config).toBeDefined();
    expect(config?.id).toBe("unique-id");
  });

  it("should update a review setting", () => {
    const reviewConfigPayload = { duration: 30 };
    createReviewSetting(reviewConfigPayload);
    const updatePayload = { id: "unique-id", duration: 60 };
    updateReviewSetting(updatePayload);
    const config = getReviewSetting("unique-id");
    expect(config?.duration).toBe(60);
  });

  it("should delete a review setting by id", () => {
    const reviewConfigPayload = { duration: 30 };
    createReviewSetting(reviewConfigPayload);
    deleteReviewSetting("unique-id");
    const config = getReviewSetting("unique-id");
    expect(config).toBeUndefined();
  });
});
