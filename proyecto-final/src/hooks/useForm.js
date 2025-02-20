// src/hooks/useForm.js
import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = (validationRules) => {
    let tempErrors = {};
    for (const field in validationRules) {
      if (validationRules[field].required && !values[field]) {
        tempErrors[field] = "Este campo es obligatorio";
      }
      // Puedes agregar más validaciones según tus necesidades
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    resetForm,
  };
};

export default useForm;
