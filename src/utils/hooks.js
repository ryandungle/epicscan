import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  const handleDateChange = (date) => {
    setValues({
      ...values,
      DOB: date,
    });
  };

  const handlePhysicianChange = (event, value) => {
    setValues({
      ...values,
      physician: value.pysId,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    handleDateChange,
    handlePhysicianChange,
    values,
  };
};
