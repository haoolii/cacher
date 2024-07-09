import {
  dateRangeCalculate,
  getLocalDateToISORange,
  getWorksByDateRange,
  getWorksByLocalDateIncludeReviewConfig,
} from "./workspace";

jest.mock("./base", () => ({
  getWorks: () => [
    { id: "0", date: "2024-07-01T07:59:59Z" }, // Taipei: 2024-07-01 15:59:59
    { id: "1", date: "2024-07-01T08:00:00Z" }, // Taipei: 2024-07-01 16:00:00
    { id: "2", date: "2024-07-01T08:01:00Z" }, // Taipei: 2024-07-01 16:01:00
    { id: "3", date: "2024-07-02T07:59:59Z" }, // Taipei: 2024-07-02 15:59:59
    { id: "4", date: "2024-07-02T08:00:00Z" }, // Taipei: 2024-07-02 16:00:00
    { id: "5", date: "2024-07-02T08:01:00Z" }, // Taipei: 2024-07-02 16:01:00
    { id: "6", date: "2024-07-03T07:59:59Z" }, // Taipei: 2024-07-03 15:59:59
    { id: "7", date: "2024-07-03T08:00:00Z" }, // Taipei: 2024-07-03 16:00:00
    { id: "8", date: "2024-07-03T08:01:00Z" }, // Taipei: 2024-07-03 16:01:00
    { id: "9", date: "2024-07-04T07:59:59Z" }, // Taipei: 2024-07-04 15:59:59
    { id: "10", date: "2024-07-04T08:00:00Z" }, // Taipei: 2024-07-04 16:00:00
    { id: "11", date: "2024-07-04T08:01:00Z" }, // Taipei: 2024-07-04 16:01:00

    { id: "12", date: "2024-07-05T07:59:59Z" }, // Taipei: 2024-07-05 15:59:59
    { id: "13", date: "2024-07-05T08:00:00Z" }, // Taipei: 2024-07-05 16:00:00
    { id: "14", date: "2024-07-05T08:01:00Z" }, // Taipei: 2024-07-05 16:01:00

    { id: "15", date: "2024-07-06T07:59:59Z" }, // Taipei: 2024-07-06 15:59:59
    { id: "16", date: "2024-07-06T08:00:00Z" }, // Taipei: 2024-07-06 16:00:00
    { id: "17", date: "2024-07-06T08:01:00Z" }, // Taipei: 2024-07-06 16:01:00
    { id: "18", date: "2024-07-07T07:59:59Z" }, // Taipei: 2024-07-07 15:59:59
    { id: "19", date: "2024-07-07T08:00:00Z" }, // Taipei: 2024-07-07 16:00:00
    { id: "20", date: "2024-07-07T08:01:00Z" }, // Taipei: 2024-07-07 16:01:00

    { id: "21", date: "2024-07-08T07:59:59Z" }, // Taipei: 2024-07-08 15:59:59
    { id: "22", date: "2024-07-08T08:00:00Z" }, // Taipei: 2024-07-08 16:00:00
    { id: "23", date: "2024-07-08T08:01:00Z" }, // Taipei: 2024-07-08 16:01:00

    { id: "24", date: "2024-07-09T07:59:59Z" }, // Taipei: 2024-07-09 15:59:59
    { id: "25", date: "2024-07-09T08:00:00Z" }, // Taipei: 2024-07-09 16:00:00
    { id: "26", date: "2024-07-09T08:01:00Z" }, // Taipei: 2024-07-09 16:01:00
    { id: "27", date: "2024-07-10T07:59:59Z" }, // Taipei: 2024-07-10 15:59:59
    { id: "28", date: "2024-07-10T08:00:00Z" }, // Taipei: 2024-07-10 16:00:00
    { id: "29", date: "2024-07-10T08:01:00Z" }, // Taipei: 2024-07-10 16:01:00
    // "44", "43", "42", "41", "40", "39", "35", "34", "33", "26", "25", "24", "14", "13", "12"
    { id: "30", date: "2024-07-11T07:59:59Z" }, // Taipei: 2024-07-11 15:59:59
    { id: "31", date: "2024-07-11T08:00:00Z" }, // Taipei: 2024-07-11 16:00:00
    { id: "32", date: "2024-07-11T08:01:00Z" }, // Taipei: 2024-07-11 16:01:00 //

    { id: "33", date: "2024-07-12T07:59:59Z" }, // Taipei: 2024-07-12 15:59:59
    { id: "34", date: "2024-07-12T08:00:00Z" }, // Taipei: 2024-07-12 16:00:00
    { id: "35", date: "2024-07-12T08:01:00Z" }, // Taipei: 2024-07-12 16:01:00

    { id: "36", date: "2024-07-13T07:59:59Z" }, // Taipei: 2024-07-13 15:59:59
    { id: "37", date: "2024-07-13T08:00:00Z" }, // Taipei: 2024-07-13 16:00:00
    { id: "38", date: "2024-07-13T08:01:00Z" }, // Taipei: 2024-07-13 16:01:00
    { id: "39", date: "2024-07-14T07:59:59Z" }, // Taipei: 2024-07-14 15:59:59
    { id: "40", date: "2024-07-14T08:00:00Z" }, // Taipei: 2024-07-14 16:00:00
    { id: "41", date: "2024-07-14T08:01:00Z" }, // Taipei: 2024-07-14 16:01:00
    { id: "42", date: "2024-07-15T07:59:59Z" }, // Taipei: 2024-07-15 15:59:59
    { id: "43", date: "2024-07-15T08:00:00Z" }, // Taipei: 2024-07-15 16:00:00
    { id: "44", date: "2024-07-15T08:01:00Z" }, // Taipei: 2024-07-15 16:01:00
    { id: "45", date: "2024-07-16T07:59:59Z" }, // Taipei: 2024-07-16 15:59:59
    { id: "46", date: "2024-07-16T08:00:00Z" }, // Taipei: 2024-07-16 16:00:00
    { id: "47", date: "2024-07-16T08:01:00Z" }, // Taipei: 2024-07-16 16:01:00
    { id: "48", date: "2024-07-17T07:59:59Z" }, // Taipei: 2024-07-17 15:59:59
    { id: "49", date: "2024-07-17T08:00:00Z" }, // Taipei: 2024-07-17 16:00:00
    { id: "50", date: "2024-07-17T08:01:00Z" }, // Taipei: 2024-07-17 16:01:00
    { id: "51", date: "2024-07-18T07:59:59Z" }, // Taipei: 2024-07-18 15:59:59
    { id: "52", date: "2024-07-18T08:00:00Z" }, // Taipei: 2024-07-18 16:00:00
    { id: "53", date: "2024-07-18T08:01:00Z" }, // Taipei: 2024-07-18 16:01:00
    { id: "54", date: "2024-07-19T07:59:59Z" }, // Taipei: 2024-07-19 15:59:59
    { id: "55", date: "2024-07-19T08:00:00Z" }, // Taipei: 2024-07-19 16:00:00
    { id: "56", date: "2024-07-19T08:01:00Z" }, // Taipei: 2024-07-19 16:01:00
    { id: "57", date: "2024-07-20T07:59:59Z" }, // Taipei: 2024-07-20 15:59:59
    { id: "58", date: "2024-07-20T08:00:00Z" }, // Taipei: 2024-07-20 16:00:00
    { id: "59", date: "2024-07-20T08:01:00Z" }, // Taipei: 2024-07-20 16:01:00
    { id: "60", date: "2024-07-21T07:59:59Z" }, // Taipei: 2024-07-21 15:59:59
    { id: "61", date: "2024-07-21T08:00:00Z" }, // Taipei: 2024-07-21 16:00:00
    { id: "62", date: "2024-07-21T08:01:00Z" }, // Taipei: 2024-07-21 16:01:00
    { id: "63", date: "2024-07-22T07:59:59Z" }, // Taipei: 2024-07-22 15:59:59
    { id: "64", date: "2024-07-22T08:00:00Z" }, // Taipei: 2024-07-22 16:00:00
    { id: "65", date: "2024-07-22T08:01:00Z" }, // Taipei: 2024-07-22 16:01:00
    { id: "66", date: "2024-07-23T07:59:59Z" }, // Taipei: 2024-07-23 15:59:59
    { id: "67", date: "2024-07-23T08:00:00Z" }, // Taipei: 2024-07-23 16:00:00
    { id: "68", date: "2024-07-23T08:01:00Z" }, // Taipei: 2024-07-23 16:01:00
    { id: "69", date: "2024-07-24T07:59:59Z" }, // Taipei: 2024-07-24 15:59:59
    { id: "70", date: "2024-07-24T08:00:00Z" }, // Taipei: 2024-07-24 16:00:00
    { id: "71", date: "2024-07-24T08:01:00Z" }, // Taipei: 2024-07-24 16:01:00
    { id: "72", date: "2024-07-25T07:59:59Z" }, // Taipei: 2024-07-25 15:59:59
    { id: "73", date: "2024-07-25T08:00:00Z" }, // Taipei: 2024-07-25 16:00:00
    { id: "74", date: "2024-07-25T08:01:00Z" }, // Taipei: 2024-07-25 16:01:00
    { id: "75", date: "2024-07-26T07:59:59Z" }, // Taipei: 2024-07-26 15:59:59
    { id: "76", date: "2024-07-26T08:00:00Z" }, // Taipei: 2024-07-26 16:00:00
    { id: "77", date: "2024-07-26T08:01:00Z" }, // Taipei: 2024-07-26 16:01:00
    { id: "78", date: "2024-07-27T07:59:59Z" }, // Taipei: 2024-07-27 15:59:59
    { id: "79", date: "2024-07-27T08:00:00Z" }, // Taipei: 2024-07-27 16:00:00
    { id: "80", date: "2024-07-27T08:01:00Z" }, // Taipei: 2024-07-27 16:01:00
    { id: "81", date: "2024-07-28T07:59:59Z" }, // Taipei: 2024-07-28 15:59:59
    { id: "82", date: "2024-07-28T08:00:00Z" }, // Taipei: 2024-07-28 16:00:00
    { id: "83", date: "2024-07-28T08:01:00Z" }, // Taipei: 2024-07-28 16:01:00
    { id: "84", date: "2024-07-29T07:59:59Z" }, // Taipei: 2024-07-29 15:59:59
    { id: "85", date: "2024-07-29T08:00:00Z" }, // Taipei: 2024-07-29 16:00:00
    { id: "86", date: "2024-07-29T08:01:00Z" }, // Taipei: 2024-07-29 16:01:00
    { id: "87", date: "2024-07-30T07:59:59Z" }, // Taipei: 2024-07-30 15:59:59
    { id: "88", date: "2024-07-30T08:00:00Z" }, // Taipei: 2024-07-30 16:00:00
    { id: "89", date: "2024-07-30T08:01:00Z" }, // Taipei: 2024-07-30 16:01:00
    { id: "90", date: "2024-07-31T07:59:59Z" }, // Taipei: 2024-07-31 15:59:59
    { id: "91", date: "2024-07-31T08:00:00Z" }, // Taipei: 2024-07-31 16:00:00
    { id: "92", date: "2024-07-31T08:01:00Z" }, // Taipei: 2024-07-31 16:01:00
  ],
  getReviewConfigs: () => [
    { id: "1", duration: 86400000 }, // 1天
    { id: "2", duration: 172800000 }, // 2天
    { id: "3", duration: 345600000 }, // 4天
    { id: "4", duration: 604800000 }, // 7天
    { id: "4", duration: 1296000000 }, // 15天
  ],
}));

describe("getLocalDateToISORange", () => {
  it("test range", () => {
    const [start, end] = getLocalDateToISORange("2024-07-07");
    expect(start).toBe("2024-07-06T16:00:00.000Z");
    expect(end).toBe("2024-07-07T15:59:59.999Z");
  });

  it("test range calculate", () => {
    const [start, end] = dateRangeCalculate(
      ["2024-07-06T16:00:00.000Z", "2024-07-07T15:59:59.999Z"],
      -86400000
    );
    expect(start).toBe("2024-07-05T16:00:00.000Z");
    expect(end).toBe("2024-07-06T15:59:59.999Z");
  });

  it("test filter works by date range", () => {
    const works = getWorksByDateRange([
      "2024-07-07T16:00:00.000Z",
      "2024-07-08T15:59:59.999Z",
    ]);
    expect(works).toHaveLength(3);
  });

  it("test filter works by date range", () => {
    const works = getWorksByDateRange([
      "2024-07-07T16:00:00.000Z",
      "2024-07-08T15:59:59.999Z",
    ]);
    expect(works).toHaveLength(3);
  });

  it("test filter works by date range", () => {
    const works = getWorksByLocalDateIncludeReviewConfig("2024-07-21");
    console.log("works", works);
    // 9 , 12 , 14, 15
    // expect(works) 還未完成
  });
});

describe("Test getWorksByLocalDateIncludeReviewConfig", () => {
  it("should filter works correctly for UTC date '2024-07-01' (excluding current day)", () => {
    const localDate = "2024-07-01"; // 在UTC+8时区中，这就是本地时间
    const works = getWorksByLocalDateIncludeReviewConfig(localDate);
    const expectedWorkIds: any[] = []; // 因为不包含当天，所以应该是空数组
    const actualWorkIds = works
      .flatMap((work) => work.works.map((w) => w.id))
      .sort(); // 排序以确保顺序一致
    expect(actualWorkIds).toEqual(expectedWorkIds);
  });

  it("should filter works correctly for UTC date '2024-07-10' (excluding current day)", () => {
    const localDate = "2024-07-10"; // 在UTC+8时区中，这就是本地时间
    const works = getWorksByLocalDateIncludeReviewConfig(localDate);
    const expectedWorkIds = [
      "26",
      "25",
      "24",
      "23",
      "22",
      "21",
      "17",
      "16",
      "15",
      "8",
      "7",
      "6",
    ].sort();
    const actualWorkIds = works
      .flatMap((work) => work.works.map((w) => w.id))
      .sort();
    expect(actualWorkIds).toEqual(expectedWorkIds);
  });

  it("should filter works correctly for UTC date '2024-07-05' (excluding current day)", () => {
    const localDate = "2024-07-05"; // 在UTC+8时区中，这就是本地时间
    const works = getWorksByLocalDateIncludeReviewConfig(localDate);
    const expectedWorkIds = [
      "11",
      "10",
      "9",
      "8",
      "7",
      "6",
      "2",
      "1",
      "0",
    ].sort();
    const actualWorkIds = works
      .flatMap((work) => work.works.map((w) => w.id))
      .sort();
    expect(actualWorkIds).toEqual(expectedWorkIds);
  });

  it("should filter works correctly for UTC date '2024-07-05' (excluding current day)", () => {
    const localDate = "2024-07-05"; // 在UTC+8时区中，这就是本地时间
    const works = getWorksByLocalDateIncludeReviewConfig(localDate);
    const expectedWorkIds = [
      "11",
      "10",
      "9",
      "8",
      "7",
      "6",
      "2",
      "1",
      "0",
    ].sort();
    const actualWorkIds = works
      .flatMap((work) => work.works.map((w) => w.id))
      .sort();
    expect(actualWorkIds).toEqual(expectedWorkIds);
  });

  it("should filter works correctly for UTC date '2024-07-20' (excluding current day)", () => {
    const localDate = "2024-07-20"; // 在UTC+8时区中，这就是本地时间
    const works = getWorksByLocalDateIncludeReviewConfig(localDate);
    const expectedWorkIds = [
      "56",
      "55",
      "54",
      "53",
      "52",
      "51",
      "47",
      "46",
      "45",
      "38",
      "37",
      "36",
      "14",
      "13",
      "12",
    ].sort();
    const actualWorkIds = works
      .flatMap((work) => work.works.map((w) => w.id))
      .sort();
    expect(actualWorkIds).toEqual(expectedWorkIds);
  });
});
