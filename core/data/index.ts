import dayjs from "dayjs";
import { workStorage } from "./storage";
import { v4 as uuid } from "uuid";

export const createWork = ({ work, date }: { work: string; date: string }) => {
  workStorage.addItem({
    id: uuid(),
    work,
    date,
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  });
};
export const queryWork = () => {
    return workStorage.getAllItems();
}
