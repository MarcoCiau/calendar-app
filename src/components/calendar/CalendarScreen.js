import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { Navbar } from "../ui/Navbar";
import { FloatingBtn } from "../ui/FloatingBtn";
import { messages } from "../../utils/calendar-messages-es";
import { addSelectedSlotAction, authStartLogoutAction, clearActiveEvent, EventStartDeleteAction, 
  EventStartGetAllAction, 
  openModalAction, selectEventAction } from "../../actions/actions";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import "./CalendarScreen.css";

/* Set moment js idiom */
moment.locale("en");

/*
 Setup the localizer by providing the moment (or globalize) Object
 to the correct localizer.
*/
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

  const dispatch = useDispatch();//get redux-dispatch function  
  const {events, selected} = useSelector((state) => state.calendar); //get events from redux's store
  const {uid} = useSelector((state) => state.auth);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  
  /* Get All Events */
  useEffect(() => {
    if (uid) dispatch(EventStartGetAllAction(uid))
  }, [dispatch]);

  /* Handling Big-Calendar Events */

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

  const onSelectSlotHandler = (e) => {
    const  {action, start, end} = e;
    /* clear active event */
    if (selected) {
      dispatch(clearActiveEvent);
    }
    /* add new event based on select slot */
    if (action === "doubleClick") {
      dispatch(addSelectedSlotAction({start, end}));
      dispatch(openModalAction);
    }
  }

  /* Handling Floating Actions Buttons Events */

  const onAddNewEventHandler = (e) => {
    dispatch(clearActiveEvent);
    dispatch(openModalAction);
  }
  
  const onDeleteEventHandler = (e) => {
    dispatch(EventStartDeleteAction(selected))
  }

  /* Handling Navbar logout button */
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(authStartLogoutAction());
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
    
      <Navbar onSubmitHandler={logoutHandler}/>

      <Calendar
        className="calendar-screen"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        //messages={messages}
        selectable={true}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        view={lastView}
        onDoubleClickEvent={onDoubleClickEventHandler}
        onSelectEvent={onSelectEventHandler}
        onView={onViewChangeHandler}
        onSelectSlot={onSelectSlotHandler}
      />
      
      <CalendarModal />

      <FloatingBtn styleProp={"btn-primary fab"} icon={"fas fa-plus"} clickHandler={onAddNewEventHandler}/>
      {selected && <FloatingBtn styleProp={"btn-danger fab-danger"} icon={"fas fa-trash"} label={" Eliminar Evento"} clickHandler={onDeleteEventHandler} />}
    </div>
  );
};
