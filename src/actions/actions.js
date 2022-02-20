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

export const authStartRegisterAction = (name, email, password) => { 
  return async(dispatch) => {//dispatch function as first argument from thunk
    const result = await executePostReq("", "/auth/signup", {name, email, password});
    console.log(result);
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
        text: `Signup User failed. ${result.msg}`
      });
    }
  }
};

export const authCheckingLoginState = () => {
  return async(dispatch) => {//dispatch function as first argument from thunk
    const refreshToken = localStorage.getItem("refreshToken") || "";
    const result = await executePostReq("", "/auth/refreshToken", {refreshToken});
    console.log(result);
    if (result.status) {
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      localStorage.setItem('loggedDatetime', new Date().getTime());
      dispatch(authLoginAction({
        uid: result.user._id,
        name: result.user.name
      }));
    }
    else {//Redirect to login form
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Signup User failed. ${result.msg}`
      });
      dispatch(authLoginStateChecked());
    }
  }
}

export const authLoginStateChecked = () => ({type: actionTypes.authLoginStateChecked});

export const authStartLogoutAction = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(authLogoutAction());
  }
};

const authLogoutAction = () => ({type: actionTypes.authLogout});
