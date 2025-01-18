// components/PartyRoomCalendar.tsx
import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; // needed for dayClick
import allLocales from "@fullcalendar/core/locales-all"; // Import all locales

interface Event {
  title: string;
  date: string;
}

interface PartyRoomCalendarProps {
  events: Event[];
  initialLocale?: string;
  setValue?: (value: string) => void;
}

const PartyRoomCalendar: React.FC<PartyRoomCalendarProps> = ({
  events,
  initialLocale,
  setValue,
}) => {
  const handleDate = (date: DateClickArg) => {
    if (!setValue) return;

    setValue(date.dateStr);
  };

  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    // Example: Dynamically set the locale
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.setOption("locale", initialLocale); // Set initial locale
    }
  }, [initialLocale]);
  return (
    <div className="w-full p-4 bg-white rounded shadow-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        dateClick={handleDate}
        locale={initialLocale}
        locales={allLocales}
      />
    </div>
  );
};

export default PartyRoomCalendar;

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function ModalCalendar({
  setValue,
}: {
  setValue?: (value: string) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Selecionar a data</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[300px] flex flex-col">
        <DialogHeader className="border-b pb-3">
          <DialogTitle>Calendário das reservas</DialogTitle>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto h-[calc(100vh-140px)]">
          <PartyRoomCalendar
            events={[]}
            initialLocale="pt-br"
            setValue={setValue}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
