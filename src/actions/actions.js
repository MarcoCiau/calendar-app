import Swal from "sweetalert2";
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

export const authStartLoginAction = (email, password) => { 
  return async(dispatch) => {//dispatch function as first argument from thunk
    const result = await executePostReq("", "/auth/signin", {email, password});
    if (result.status) {
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      localStorage.setItem('loggedDatetime', new Date().getTime());
      dispatch(authLoginAction({
        uid: result.user._id,
        name: result.user.name
      }))
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Login User failed. ${result.msg}`
      });
    }
  }
};

const authLoginAction = (user) => ({
  type: actionTypes.authLogin,
  payload: user
});