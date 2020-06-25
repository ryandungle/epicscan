import * as actions from "../types";
import { firestore } from "../../firebase";

const initialState = {
  transactions: [],
  patients: [],
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
      let patient = {};
      firestore
        .collection("patients")
        .add(action.payload)
        .then((ref) => {
          console.log("Added document with ID: ", ref.id);
          patient = {
            pId: ref.id,
            name: action.payload.FirstName + " " + action.payload.LastName,
          };
        })
        .catch((err) => {
          console.log(err);
        });
      return {
        ...state,
        patients: [patient, ...state.patients],
        loading: false,
      };
    case actions.GET_PATIENTS:
      let patients = [];
      firestore
        .collection("patients")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const name = doc.data().FirstName + " " + doc.data().LastName;
            const patientItem = {
              pId: doc.id,
              name,
            };
            patients.push(patientItem);
          });
        });
      return {
        ...state,
        patients,
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
