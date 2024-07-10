import { getWorks } from "@/core/data/base";
import dayjs from "dayjs";

const getSpecificDateWorks = (date: string) => {
  let localDate = dayjs(date);
  const startOfDay = localDate.startOf("day").toISOString();
  const endOfDay = localDate.endOf("day").toISOString();
  return getWorks().filter(
    (work) =>
      (dayjs(work.date).isAfter(startOfDay) &&
        dayjs(work.date).isBefore(endOfDay)) ||
      dayjs(work.date).isSame(startOfDay) ||
      dayjs(work.date).isSame(endOfDay)
  );
};

export const getPreviousDaysCount = (prev: number) => {
  const dates = [];
  for (let i = 0; i < prev; i++) {
    dates.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
  }

  const result = [];
  while (dates.length) {
    const date = dates.pop();
    if (!date) break;
    const works = getSpecificDateWorks(date);
    result.push({
      date,
      work: works.length,
    });
  }
  return result;
};
