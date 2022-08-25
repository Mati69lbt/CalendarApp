import React, { useState } from "react";
import Navbar from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../helpers/calendar-msg-es";

import "moment/locale/es";
import CalendarEvent from "./CalendarEvent";
import CalendarMOdal from "./CalendarMOdal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventSetActive } from "../../actions/events";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvents } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
    // queda grabado en local storage donde quedamos parados
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundcolor: "#367cf7",
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
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        defaultView={lastView}
        components={{ event: CalendarEvent }}
      />
      <AddNewFab />
      {activeEvents && <DeleteEventFab />}
      <CalendarMOdal />
    </div>
  );
};

export default CalendarScreen;
