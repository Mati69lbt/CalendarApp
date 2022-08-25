import moment from "moment";
import { types } from "../types/types";
const initialState = {
  events: [
    {
      title: "Cumpleaños de Matias",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgcolor: "#fafafa",
      notes: "Comprar la Torta",
      user: {
        _id: "123",
        name: "Raul",
      },
    },
  ],
  activeEvents: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvents: action.payload,
      };
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    default:
      return state;
  }
};
