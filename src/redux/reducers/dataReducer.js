import * as actions from "../types";
import { firestore } from "../../firebase";

const initialState = {
  transactions: [],
  bodyparts: [],
  patients: [],
  physicians: [],
  clinics: [],
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
      return {
        ...state,
        physicians: [action.payload, ...state.physicians],
        loading: false,
      };
    case actions.GET_PHYSICIANS:
      return {
        ...state,
        physicians: action.payload,
        loading: false,
      };
    case actions.ADD_CLINIC:
      return {
        ...state,
        clinics: [action.payload, ...state.clinics],
        loading: false,
      };
    case actions.GET_CLINICS:
      return {
        ...state,
        clinics: action.payload,
        loading: false,
      };
    case actions.GET_BODYPARTS:
      return {
        ...state,
        bodyparts: action.payload,
        loading: false,
      };
    case actions.ADD_BODYPART:
      return {
        ...state,
        bodyparts: [action.payload, ...state.bodyparts],
        loading: false,
      };
    default:
      return state;
  }
}
