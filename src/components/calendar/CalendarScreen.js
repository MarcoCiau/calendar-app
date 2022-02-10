import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Navbar } from "../ui/Navbar";
import { messages } from "../../utils/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import "./CalendarScreen.css";

/* Set moment js idiom */
moment.locale("es");

/*
 Setup the localizer by providing the moment (or globalize) Object
 to the correct localizer.
*/
const localizer = momentLocalizer(moment);

/* Define Event List */
const myEventsList = [
  {
    title: "Develop Promatic API",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    allDay: false,
    resource: false,
    user: {
      id: "oandnbf9ss0jk498685jhn",
      name: "marco",
    },
  },
  {
    title: "Learn English",
    start: moment().add(9, "hours").toDate(),
    end: moment().add(10, "hours").toDate(),
    allDay: false,
    resource: false,
    user: {
      id: "oandnbf56s0jk498685jhn",
      name: "user1",
    },
  },
];

export const CalendarScreen = () => {
  /* Return style for that event */
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event, start, end, isSelected);
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };
  return (
    <div>
      <Navbar />

      <Calendar
        className="calendar-screen"
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
      />
    </div>
  );
};
