import * as actions from "../types";
import { firestore } from "../../firebase";

const initialState = {
  transactions: [],
  patients: [],
  patient: {
    pid: "",
    name: "",
  },
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        loading: false,
      };
    case actions.ADD_PATIENT:
      return {
        ...state,
        patients: [action.payload, ...state.patients],
        loading: false,
      };
    case actions.SET_PATIENT:
      return {
        ...state,
        patient: action.payload,
        loading: false,
      };
    case actions.GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
        loading: false,
      };
    case actions.ADD_PHYSICIAN:
      return { ...state };
    case actions.ADD_CLINIC:
      return { ...state };
    default:
      return state;
  }
}
