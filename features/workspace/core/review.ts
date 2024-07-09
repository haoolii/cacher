import { getReviewConfigs, getWorks } from "@/core/data/base";
import { ReviewConfig, Work } from "@/core/data/types";
import dayjs from "dayjs";

const getWorksByDateRange = (dateRange: string[]) => {
  if (dateRange.length !== 2) throw new Error("wrong range");
  const [start, end] = dateRange;

  return getWorks().filter(
    (work) =>
      (dayjs(work.date).isAfter(start) && dayjs(work.date).isBefore(end)) ||
      dayjs(work.date).isSame(start) ||
      dayjs(work.date).isSame(end)
  );
};

const getLocalDateToISORange = (date: string) => {
  let localDate = dayjs(date);
  const startOfDay = localDate.startOf("day").toISOString();
  const endOfDay = localDate.endOf("day").toISOString();
  return [startOfDay, endOfDay];
};

const dateRangeCalculate = (dateRange: string[], millisecond: number) => {
  if (dateRange.length !== 2) throw new Error("wrong range");
  const [start, end] = dateRange;
  const newStart = dayjs(start).add(millisecond, "milliseconds").toISOString();
  const newEnd = dayjs(end).add(millisecond, "milliseconds").toISOString();
  return [newStart, newEnd];
};

export const getList = (date: string) => {
  const configs = getReviewConfigs();
  const [start, end] = getLocalDateToISORange(date);
  const result: ReviewWork[] = [];
  for (const config of configs) {
    const [tStart, tEnd] = dateRangeCalculate([start, end], -config.duration);
    const works = getWorksByDateRange([tStart, tEnd]);
    for (let work of works) {
      result.push({
        work,
        config,
      });
    }
  }
  return result;
};

export type ReviewWork = {
  work: Work;
  config: ReviewConfig;
};
