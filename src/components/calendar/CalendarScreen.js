import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { Navbar } from "../ui/Navbar";
import { FloatingBtn } from "../ui/FloatingBtn";
import { messages } from "../../utils/calendar-messages-es";
import { openModalAction, selectEventAction } from "../../actions/actions";
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

export const CalendarScreen = () => {

  const dispatch = useDispatch();//get redux-dispatch function
  const {events} = useSelector((state) => state.calendar); //get events from redux's store

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  /* Handling Events */

  const onDoubleClickEventHandler = (e) => {
    dispatch(openModalAction);
  };

  const onSelectEventHandler = (e) => {
    dispatch(selectEventAction(e));
  };

  const onViewChangeHandler = (e) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  const onAddNewEventHandler = (e) => {
    dispatch(openModalAction);
  }
  
  /* Return style for that event */
  const eventStyleGetter = (event, start, end, isSelected) => {
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
      <FloatingBtn style={"btn-primary fab"} icon={"fas fa-plus"} clickHandler={onAddNewEventHandler}/>
      <FloatingBtn style={"btn-danger fab-danger"} icon={"fas fa-trash"} label={" Eliminar Evento"} clickHandler={onAddNewEventHandler} />
      <Navbar />

      <Calendar
        className="calendar-screen"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        view={lastView}
        onDoubleClickEvent={onDoubleClickEventHandler}
        onSelectEvent={onSelectEventHandler}
        onView={onViewChangeHandler}
      />
      
      <CalendarModal />
    </div>
  );
};
