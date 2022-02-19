import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
  checkingLoginState: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.authLogin:
      return {
        ...state,
        checkingLoginState: false,
        ...action.payload
      }
    default:
      return state;
  }
};
