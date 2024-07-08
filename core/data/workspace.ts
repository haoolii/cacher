import dayjs from "dayjs";
import { getReviewConfigs, getWorks } from "./base";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

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

export const getQueryReviewDatesByDate = (date: string) => {
  const reviewConfigs = getReviewConfigs();
  const localDate = dayjs(date);
  const startOfDay = localDate.startOf("day").toISOString();
  const endOfDay = localDate.endOf("day").toISOString();

  const result: string[] = [];
  console.log('local', dayjs(date).toISOString());
  reviewConfigs.forEach((config) => {
    result.push(
      dayjs(date)
        .utc()
        .add(-config.duration, "milliseconds")
        .startOf("day")
        .toString()
        // .toISOString()
    );
  });

  return result;
};
