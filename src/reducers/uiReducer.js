import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
  modalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
      case actionTypes.uiCloseModal:
        return {
          ...state,
          modalOpen: false,
        };
    default:
      return state;
  }
};
