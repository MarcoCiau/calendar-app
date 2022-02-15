import moment from "moment";
import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
  events: [
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
    default:
      return state;
  }
};
