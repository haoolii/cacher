"use client";

import { useEffect, useState } from "react";
import { getConfigs } from "../core/review-config";
import { ReviewConfig } from "@/core/data/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";

dayjs.extend(duration);

export const ReviewConfigBoard = () => {
  const [configs, setConfigs] = useState<ReviewConfig[]>([]);
  useEffect(() => {
    setConfigs(getConfigs());
  }, []);
  return (
    <div className="bg-background flex border overflow-hidden flex-1">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 border-r flex flex-col">
          <div className="px-6 py-4 bg-muted/40 border-b font-semibold text-primary">
            Review Config
          </div>
          <div className="flex flex-col overflow-y-auto">
            {configs.map((config) => {
              return (
                <div className="px-6 py-4 border-b bg-muted/40" key={config.id}>
                  <div className="flex">
                    <div className="flex-1">
                      <span className="text-xs text-zinc-500">
                        {/* {dayjs(work.date).format("YYYY-MM-DD")} */}
                      </span>
                      <p className="line-clamp-2 text-base">
                        {dayjs.duration(config.duration).days()} days
                      </p>
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
                          <DropdownMenuItem onClick={() => {}}>
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
      </div>
    </div>
  );
};
