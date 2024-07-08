import { getQueryDateRange, getQueryWorksByDate, getQueryReviewDatesByDate } from "./workspace";

jest.mock("./base", () => ({
  getWorks: () => [
    { id: "1", date: "2024-07-07T23:59:59Z" }, // Taipei: 2024-07-08 07:59:59
    { id: "2", date: "2024-07-08T00:00:00Z" }, // Taipei: 2024-07-08 08:00:00
    { id: "3", date: "2024-07-08T08:10:00Z" }, // Taipei: 2024-07-08 16:10:00
    { id: "4", date: "2024-07-09T00:00:00Z" }, // Taipei: 2024-07-09 08:00:00
  ],
  getReviewConfigs: () => [
    { id: "1", duration: 86400000 }, // 1天
    { id: "2", duration: 172800000 }, // 2天
    { id: "3", duration: 345600000 }, // 4天
    { id: "4", duration: 604800000 }, // 7天
    { id: "4", duration: 1296000000 }, // 15天
  ],
}));
// id: string; // uuid
//   duration: number;
//   createdAt: string;
//   updatedAt: string;

describe("getQueryDateRange function", () => {
  it("T1", () => {
    const a = getQueryDateRange("2024-07-08T08:20:38Z");
    const b = getQueryDateRange("2024-07-08");
    expect(a[0]).toEqual(b[0]);
  });

  it("T2", () => {
    const a = getQueryDateRange("2024-07-07T17:00:00Z");
    const b = getQueryDateRange("2024-07-08T12:00:00Z");
    expect(a[0]).toEqual(b[0]);
  });
});

describe("getQueryWorksByDate function", () => {
  it("should filter works correctly by date (Taipei 07:59)", () => {
    const filteredWorks = getQueryWorksByDate("2024-07-08");
    expect(filteredWorks.map((work) => work.id)).toEqual(["1", "2", "3"]);
  });

  it("should filter works correctly by date (Taipei 08:10)", () => {
    const filteredWorks = getQueryWorksByDate("2024-07-08");
    expect(filteredWorks.map((work) => work.id)).toEqual(["1", "2", "3"]);
  });

  it("should handle edge cases (no works)", () => {
    const filteredWorks = getQueryWorksByDate("2024-07-10");

    expect(filteredWorks).toEqual([]);
  });
});

describe("getQueryReviewDatesByDate", () => {
  it("should get review dates correctly by date 2024-07-08", () => {
    const dates = getQueryReviewDatesByDate("2024-07-08");
    console.log('dates', dates)
    expect(dates).toEqual(["1", "2", "3"]);
  });
});
