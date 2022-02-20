import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
  checkingLoginState: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.authLogin:
      return {
        ...state,
        ...action.payload,
        checkingLoginState: false
      }
    
    case actionTypes.authLoginStateChecked:
      return {
        ...state,
        checkingLoginState: false
      }
      case actionTypes.authLogout:
        return {
          checkingLoginState: false
        }
    default:
      return state;
  }
};
