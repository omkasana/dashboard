"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ActionMenu from "../ActionMenu";

interface Props {
  data: any[];
  moduleId: string;
  dateField: string;
  layout?: {
    title: string;
    subtitle?: string;
    badge?: string;
  };
}

export default function CalendarView({
  data,
  moduleId,
  dateField,
  layout,
}: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const days = useMemo(() => {
    const totalCells = 42; // 6 rows x 7 cols
    const cells = [];

    for (let i = 0; i < totalCells; i++) {
      const dateNumber = i - startDay + 1;
      if (dateNumber > 0 && dateNumber <= daysInMonth) {
        cells.push(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            dateNumber
          )
        );
      } else {
        cells.push(null);
      }
    }

    return cells;
  }, [currentDate]);

  const getItemsForDate = (date: Date | null) => {
    if (!date) return [];

    return data.filter((item) => {
      const itemDate = new Date(item[dateField]);
      return (
        itemDate.getFullYear() === date.getFullYear() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getDate() === date.getDate()
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                )
              )
            }
            className="p-2 rounded-lg border border-border hover:bg-muted transition"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                )
              )
            }
            className="p-2 rounded-lg border border-border hover:bg-muted transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* WEEK HEADER */}
      <div className="grid grid-cols-7 text-xs font-medium text-muted-foreground border-b border-border pb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-4">
        {days.map((date, index) => {
          const itemsForDay = getItemsForDate(date);

          return (
            <div
              key={index}
              className={cn(
                "min-h-[120px] rounded-xl border border-border p-3 bg-background",
                date &&
                date.toDateString() === new Date().toDateString() &&
                "border-primary"
              )}
            >
              {date && (
                <div className="text-xs font-medium text-foreground mb-2">
                  {date.getDate()}
                </div>
              )}

              <div className="space-y-2">
                {itemsForDay.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="text-xs rounded-md px-2 py-1 bg-muted hover:bg-primary/10 transition flex justify-between items-center"
                  >
                    <div className="truncate">
                      <div className="font-medium">
                        {layout?.title && item[layout.title]}
                      </div>
                      {layout?.subtitle && (
                        <div className="text-muted-foreground">
                          {item[layout.subtitle]}
                        </div>
                      )}
                    </div>

                    <ActionMenu
                      id={item.id}
                      moduleId={moduleId}
                    />
                  </div>
                ))}

                {itemsForDay.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{itemsForDay.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}