import dayjs from "dayjs";
import { getReviewConfigs, getWorks } from "./base";

export const getQueryDateRange = (date: string) => {
  const localDate = dayjs(date);
  const startOfDay = localDate.startOf("day").toISOString();
  const endOfDay = localDate.endOf("day").toISOString();
  return [startOfDay, endOfDay];
};

export const getQueryWorksByDate = (date: string) => {
  const localDate = dayjs(date);
  const startOfDay = localDate.startOf("day").toISOString();
  const endOfDay = localDate.endOf("day").toISOString();

  return getWorks().filter((work) => {
    const workDate = dayjs(work.date);
    return (
      workDate.isAfter(dayjs(startOfDay).subtract(1, "second")) &&
      workDate.isBefore(dayjs(endOfDay).add(1, "second"))
    );
  });
};
export const getQueryReviewConfigs = () => {
  return getReviewConfigs();
};
