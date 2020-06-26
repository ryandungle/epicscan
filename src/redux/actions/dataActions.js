import { firestore } from "../../firebase";
import * as actions from "../types";

export const getPatients = () => {
  return function (dispatch) {
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
    dispatch({ type: actions.GET_PATIENTS, payload: patients });
  };
};

export const addPatient = (patient) => {
  return function (dispatch) {
    const patientLite = {};
    firestore
      .collection("patients")
      .add(patient)
      .then((docRef) => {
        patientLite.pid = docRef.id;
        patientLite.name = `${patient.FirstName} ${patient.LastName}`;
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch({ type: actions.ADD_PATIENT, payload: patientLite });
    dispatch({ type: actions.SET_PATIENT, payload: patientLite });
  };
};
