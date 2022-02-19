import { actionTypes } from "../actionTypes/actionTypes";
import { executePostReq } from "../utils/api-fetch";

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

export const addSelectedSlotAction = (e) => ({
  type: actionTypes.eventAddSelectedSlot,
  payload: e,
})

export const clearActiveEvent = { type: actionTypes.eventClearActive };

export const EventUpdatedAction = (e) => ({
  type: actionTypes.eventUpdated,
  payload: e,
});

export const EventDeletedAction =  { type: actionTypes.eventDeleted };

/* Auth Actions */

export const AuthStartLogin = (email, password) => { 
  return async() => {
    const result = await executePostReq("", "/auth/signin", {email, password});
    console.log(result);
  }
};