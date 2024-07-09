import { createWork, getWorks, deleteWork } from "@/core/data/base";
import dayjs from "dayjs";

export const create = ({ work, date }: { work: string; date: string }) => {
  return createWork({
    work,
    date,
  });
};

export const getList = (date?: string) => {
  if (!date) {
    return getWorks();
  }
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

export const remove = (id: string) => {
    return deleteWork(id);
}