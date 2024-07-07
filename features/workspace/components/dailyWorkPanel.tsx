"use client";

import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datePicker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { createWork, queryWork } from "@/core/data";
import { Work } from "@/core/data/types";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Progress } from "@/components/ui/progress";

const FormSchema = z
  .object({
    work: z.string().min(1, "請填入內容"),
  })
  .required();

export const DailyWorkPanel = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().toISOString());
  const [workList, setWorkList] = useState<Work[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      work: "",
    },
  });

  const refresh = () => {
    setWorkList(queryWork());
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    createWork({
      work: data.work,
      date: selectedDate,
    });
    refresh();
    form.setValue("work", "");
  };

  useEffect(() => {
    refresh();
  }, [selectedDate]);

  const selectedDateWorks = useMemo(() => {
    return workList.filter((work) => {
      const workDate = dayjs(work.date).format("YYYY-MM-DD");
      const selected = dayjs(selectedDate).format("YYYY-MM-DD");
      return dayjs(workDate).isSame(selected);
    });
  }, [workList, selectedDate]);

  const selectedDateReviewWorks = useMemo(() => {
    return workList.filter((work) => {
      const workDate = dayjs(work.date).format("YYYY-MM-DD");
      const selected = dayjs(selectedDate).format("YYYY-MM-DD");
      return dayjs(workDate).isSame(selected);
    });
    return [];
  }, [workList]);
  return (
    <div className="py-8 flex flex-col h-screen">
      <div>
        <DatePicker
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
        />
      </div>
      <div className="flex-1 flex gap-4 py-4 overflow-y-auto">
        <div className="flex-1">
          <Collapsible>
            <CollapsibleTrigger className="border shadow-sm w-full">
              <div className="flex flex-row px-4 py-2 justify-between items-center">
                  <div className="flex-1 text-left">
                    今日工作
                  </div>
                  <div className="flex-1">
                    <Progress value={33} />
                  </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="h-[640px] overflow-y-scroll">
                {
                  selectedDateWorks.map(work => {
                    return <div className="border shadow-sm w-full px-4 py-2">{work.work}</div>
                  })
                }
              </div>
            </CollapsibleContent>
          </Collapsible>
          {/* <h4>今日工作</h4>
          {selectedDateWorks.map((work) => {
            return <div className="px-4 py-2 border">{work.work}</div>;
          })} */}
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
            <FormField
              control={form.control}
              name="work"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>工作內容</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <Input {...field} placeholder="工作內容" />
                    </div>
                  </FormControl>
                  <FormDescription>....</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
