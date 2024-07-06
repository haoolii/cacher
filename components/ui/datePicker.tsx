"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "./calendar";
import { format } from "date-fns";
import dayjs from "dayjs";

export type DatePickerProps = {
  placeholder?: string;
  value?: string;
  onChange?: (date: string) => void;
};

export function DatePicker({ value, onChange, placeholder = 'Pick a date' }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-popover border-primary shadow-md rounded-md"
        align="start"
      >
        <Calendar
          mode="single"
          selected={dayjs(value).toDate()}
          onSelect={(d) => {
            if (onChange) {
              onChange(dayjs(d).toISOString());
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
