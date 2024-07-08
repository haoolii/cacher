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
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FormSchema = z
  .object({
    work: z.string().min(1, "請填入內容"),
  })
  .required();

export const DailyWorkPanel = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().toISOString());
  const [filter, setFilter] = useState("all");
  return (
    <div className="flex justify-between">
      <div className="flex flex-col flex-1 gap-4 p-4 lg:p-6">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">WorkSpace</h1>
          {/* {selectedDate} */}
        </div>
        <div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>工作項目</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>工作內容</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Type
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          建立時間
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          最新複習時間
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">24. reverse linked list</div>
                          {/* <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div> */}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          2134
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">24. reverse linked list</div>
                          {/* <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div> */}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          2134
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </div>
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>複習項目</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="w-72 bg-secondary h-[calc(100vh-60px)] p-4">
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
