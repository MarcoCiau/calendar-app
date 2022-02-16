import moment from "moment";
import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
  events: [
    {
      id: new Date(),
      title: "Develop Promatic API",
      notes:"",
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
      id: new Date() + 100,
      title: "Learn English",
      notes:"",
      start: moment().add(9, "hours").toDate(),
      end: moment().add(10, "hours").toDate(),
      allDay: false,
      resource: false,
      user: {
        id: "oandnbf56s0jk498685jhn",
        name: "user1",
      },
    },
  ],
  selected: null,
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
        events: [
          ...state.events,
          action.payload
        ]
      }
    case actionTypes.eventClearActive:
      return {
        ...state, 
        selected: null
      }
    case actionTypes.eventUpdated:
      return {
        ...state,
        events : state.events.map(event => {
           return  event.id === action.payload.id ? action.payload: event;
        })
      }
    default:
      return state;
  }
};
