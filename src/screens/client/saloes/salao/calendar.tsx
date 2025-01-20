// components/PartyRoomCalendar.tsx
import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; // needed for dayClick
import allLocales from "@fullcalendar/core/locales-all"; // Import all locales
import timeGridPlugin from "@fullcalendar/timegrid"; // Week/day view with time slots

interface Event {
  title: string;
  date?: string;
  start?: string;
  end?: string;
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
    <div className="p-4 bg-white rounded shadow-lg xs:min-w-[400px] xs:mr-[40px] w-full overflow-auto max-h-screen sm:max-h-[500px] lg:max-h-[700px]">
      <FullCalendar
        ref={calendarRef} // Reference to the calendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Include TimeGridPlugin
        initialView="timeGridWeek" // Default to week view with hours
        events={events}
        locales={allLocales} // Import all locales
        locale={initialLocale} // Set the initial locale
        height="auto"
        headerToolbar={{
          start: "prev,next",
          center: "title",
          end: "",
          // end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
        }}
        slotMinTime="00:00:00" // Earliest time slot
        slotMaxTime="23:59:00" // Latest time slot
        slotDuration="00:30:00"
        dateClick={handleDate}
        slotLabelClassNames={
          "text-[12px] md:text-[18px] font-bold text-primary"
        }
        eventClassNames={"text-[12px] md:text-[18px] bg-primary/60"}
        viewClassNames={"min-w-[600px"}
        views={{
          timeGridWeek: {
            duration: { days: 7 }, // Padrão para telas maiores
          },
          timeGridDay: {
            duration: { days: 1 }, // Padrão para telas menores
          },
        }}
        windowResize={(arg) => {
          if (window.innerWidth < 768) {
            arg.view.calendar.changeView("timeGridDay"); // Tela pequena: apenas 1 dia
          } else {
            arg.view.calendar.changeView("timeGridWeek"); // Tela maior: 1 semana
          }
        }}
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
