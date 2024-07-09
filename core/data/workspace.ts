import dayjs from "dayjs";
import { getReviewConfigs, getWorks } from "./base";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Step1. Get local date start and end.
// Step2. Transfer local date start and end to UTC+0 it will be a range.
// Step3. Use that range add or minus millisecond. it will be a new range.
// Step4. Query date which is include in range.
export const getWorksByDateRange = (dateRange: string[]) => {
  if (dateRange.length !== 2) throw new Error("wrong range");
  const [start, end] = dateRange;

  return getWorks().filter(
    (work) => dayjs(work.date).isAfter(start) && dayjs(work.date).isBefore(end)
  );
};

export const getLocalDateToISORange = (date: string) => {
  let localDate = dayjs(date);
  const startOfDay = localDate.startOf("day").toISOString();
  const endOfDay = localDate.endOf("day").toISOString();
  return [startOfDay, endOfDay];
};

export const dateRangeCalculate = (
  dateRange: string[],
  millisecond: number
) => {
  if (dateRange.length !== 2) throw new Error("wrong range");
  const [start, end] = dateRange;
  const newStart = dayjs(start).add(millisecond, "milliseconds").toISOString();
  const newEnd = dayjs(end).add(millisecond, "milliseconds").toISOString();
  return [newStart, newEnd];
};

export const getWorksByLocalDateIncludeReviewConfig = (localDate: string) => {
  const configs = getReviewConfigs();
  const [start, end] = getLocalDateToISORange(localDate);
  const result = [];
  for (const config of configs) {
    const [tStart, tEnd] = dateRangeCalculate([start, end], -config.duration);
    const works = getWorksByDateRange([tStart, tEnd]);
    result.push({
      start: tStart,
      end: tEnd,
      local_start: dayjs(tStart).format("YYYY-MM-DD HH:mm:ss"),
      local_end: dayjs(tEnd).format("YYYY-MM-DD HH:mm:ss"),
      works: works,
    });
  }
  return result;
};

