import { firestore, storage } from "../../firebase";
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
  };
};

export const addPhysician = (physician) => (dispatch) => {
  const physicianLite = {};
  firestore
    .collection("physicians")
    .add(physician)
    .then((docRef) => {
      physicianLite.pid = docRef.id;
      physicianLite.name = `${physician.name}`;
    })
    .catch((err) => {
      console.log(err);
    });
  dispatch({ type: actions.ADD_PHYSICIAN, payload: physicianLite });
};
export const getPhysicians = () => {
  return function (dispatch) {
    let physicians = [];
    firestore
      .collection("physicians")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const physician = {
            pysId: doc.id,
            ...doc.data(),
          };
          physicians.push(physician);
        });
      });
    dispatch({ type: actions.GET_PHYSICIANS, payload: physicians });
  };
};

//Clinics actions
export const addClinic = (clinic) => {
  return function (dispatch) {
    const clinicLite = {};
    firestore
      .collection("clinics")
      .add(clinic)
      .then((docRef) => {
        clinicLite.pid = docRef.id;
        clinicLite.name = `${clinic.name}`;
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch({ type: actions.ADD_CLINIC, payload: clinicLite });
  };
};
export const getClinics = () => {
  return function (dispatch) {
    const clinics = [];
    firestore
      .collection("clinics")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const clinic = {
            clinicId: doc.id,
            ...doc.data(),
          };
          clinics.push(clinic);
        });
        console.log(clinics);
      })
      .catch((err) => console.log(err));
    dispatch({ type: actions.GET_CLINICS, payload: clinics });
  };
};

//Body Part actions
export const addBodyPart = (bodypart) => {
  return function (dispatch) {
    const addToFirestore = {
      name: bodypart.name,
      createAt: bodypart.createAt,
      createdUserId: bodypart.createdUserId,
    };
    const part = {};
    let bodyPartReference = "";
    firestore
      .collection("bodyparts")
      .add(addToFirestore)
      .then((docRef) => {
        part.ID = docRef.id;
        part.name = bodypart.name;
        bodyPartReference = storage
          .ref()
          .child("images")
          .child("bodyparts")
          .child(docRef.id);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        bodyPartReference
          .put(bodypart.img)
          .then((uploadTaskSnapshot) => {
            bodyPartReference.getDownloadURL().then((value) => {
              part.imageURL = value;
            });
          })
          .catch((err) => console.log(err));
        dispatch({ type: actions.ADD_BODYPART, payload: part });
      });
  };
};
export const getBodyParts = () => (dispatch) => {
  const bodyparts = [];
  firestore
    .collection("bodyparts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const Bpart = {
          ID: doc.id,
          ...doc.data(),
        };
        bodyparts.push(Bpart);
      });
    })
    .catch((err) => console.log(err));
  dispatch({ type: actions.GET_BODYPARTS, payload: bodyparts });
};
