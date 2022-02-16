import { actionTypes } from "../actionTypes/actionTypes";

export const openModalAction = { type: actionTypes.uiOpenModal };

export const closeModalAction = { type: actionTypes.uiCloseModal };

export const selectEventAction = (e) => ({
  type: actionTypes.eventSelected,
  payload: e,
});

export const addNewEventAction = (e) => ({
  type: actionTypes.eventAddNew,
  payload: e,
});

export const clearActiveEvent = { type: actionTypes.eventClearActive };

export const EventUpdatedAction = (e) => ({
  type: actionTypes.eventUpdated,
  payload: e,
});
