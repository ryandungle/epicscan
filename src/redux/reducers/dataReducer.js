import {
  SET_TRANSACTIONS,
  LOADING_DATA,
  SET_PATIENTS,
  CREATE_TRANS,
} from "../types";

const initialState = {
  transactions: [],
  trans: {},
  patients: [],
  clinics: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        loading: false,
      };
    case SET_PATIENTS:
      return {
        ...state,
        patients: [action.payload, ...state.patients],
        loading: false,
      };
    default:
      return state;
  }
}
