"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import {
  create,
  getList as getWorkList,
  remove as removeWork,
} from "../core/work";
import { getList as getReviewList } from "../core/review";
import { Work } from "@/core/data/types";
import { ReviewWork } from "../core/review";
import duration from "dayjs/plugin/duration";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

dayjs.extend(duration);

export const WorkSpace = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().toISOString());
  const [input, setInput] = useState("");
  const [works, setWorks] = useState<Work[]>([]);
  const [reviewWorks, setReviewWorks] = useState<ReviewWork[]>([]);

  const syncWorkList = useCallback(() => {
    setWorks(getWorkList(selectedDate));
  }, [selectedDate]);

  const syncReviewWorkList = useCallback(() => {
    setReviewWorks(getReviewList(selectedDate));
    console.log("getReviewList(selectedDate)", getReviewList(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    syncWorkList();
  }, [syncWorkList]);

  useEffect(() => {
    syncReviewWorkList();
  }, [syncReviewWorkList]);

  return (
    <div className="bg-background flex border overflow-hidden flex-1">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 border-r flex flex-col">
            <div className="px-6 py-4 bg-muted/40 border-b font-semibold text-primary">
              Daily Work
            </div>
            <div className="flex flex-col overflow-y-auto">
              {works.map((work) => {
                return (
                  <div className="px-6 py-4 border-b bg-muted/40" key={work.id}>
                    <div className="flex">
                      <div className="flex-1">
                        <span className="text-xs text-zinc-500">
                          {dayjs(work.date).format("YYYY-MM-DD")}
                        </span>
                        <p className="line-clamp-2 text-base">{work.work}</p>
                      </div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon">
                              <Ellipsis className="w-4 h-4 text-primary" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Operate</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                removeWork(work.id);
                                syncWorkList();
                                syncReviewWorkList();
                              }}
                            >
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="px-6 py-4 bg-muted/40 border-b font-semibold text-primary">
              Review Work
            </div>
            <div className="flex flex-col overflow-y-auto">
              {reviewWorks.map((review) => {
                return (
                  <div
                    className="px-6 py-4 border-b bg-muted/40"
                    key={review?.work?.id}
                  >
                    <div>
                      <span className="text-xs text-zinc-500">
                        {dayjs(review?.work?.date).format("YYYY-MM-DD")} (
                        {dayjs.duration(review.config.duration).days()} days
                        ago)
                      </span>
                    </div>
                    <p className="line-clamp-2 text-base">{review.work.work}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="p-4 bg-muted/40 border-t">
          <form
            className=" flex space-x-4"
            onSubmit={(e) => {
              e.preventDefault();
              create({
                work: input,
                date: selectedDate,
              });
              setInput("");
              syncWorkList();
            }}
          >
            <Input
              placeholder="input your work.."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
      <div className="p-6 bg-background border-l">
        <Calendar
          mode="single"
          selected={dayjs(selectedDate).toDate()}
          onSelect={(d) => {
            setSelectedDate(dayjs(d).toISOString());
          }}
          initialFocus
        />
      </div>
    </div>
  );
};
