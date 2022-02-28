import moment from "moment";
import { actionTypes } from "../actionTypes/actionTypes";

/*
{
      _id: new Date(),
      title: "Develop Promatic API",
      notes: "",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      user: {
        id: "oandnbf9ss0jk498685jhn",
        name: "marco",
      },
    },
    {
      _id: new Date() + 100,
      title: "Learn English",
      notes: "",
      start: moment().add(9, "hours").toDate(),
      end: moment().add(10, "hours").toDate(),
      user: {
        _id: "oandnbf56s0jk498685jhn",
        name: "user1",
      },
    },
*/

const initialState = {
  events: [],
  selected: null,
  slot: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.eventSelected:
      return {
        ...state,
        selected: action.payload,
      };
    case actionTypes.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case actionTypes.eventAddSelectedSlot:
      return {
        ...state,
        slot: action.payload,
      };
    case actionTypes.eventClearActive:
      return {
        ...state,
        selected: null,
      };
    case actionTypes.eventUpdated:
      return {
        ...state,
        events: state.events.map((event) => {
          return event._id === action.payload._id ? action.payload : event;
        }),
      };
    case actionTypes.eventDeleted:
      return {
        ...state,
        events: state.events.filter((event) => {
          return event._id !== state.selected._id;
        }),
        selected: null,
      };
    case actionTypes.eventLoaded:
      return {
        ...state,
        events: action.payload.map((event) => {
          const startDate = new Date(event.start);
          const endDate = new Date(event.end);
          return { ...event, start: startDate, end: endDate };
        }),
      };
    default:
      return state;
  }
};
