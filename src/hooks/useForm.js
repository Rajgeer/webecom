import { useState } from "react";

const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldName, value) => {
    const rule = validationRules[fieldName];
    let error = "";

    if (rule?.required && !value) {
      error = `${fieldName} is required.`;
    } else if (rule?.validate) {
      error = rule.validate(value) || "";
    }

    return error;
  };

  const handleChange = (e) => {
    e.persist();
    const { name, value, type, files } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type==='file'?files[0]:value,
    }));

    // Validate field
    const error = validate(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(values).forEach((field) => {
      newErrors[field] = validate(field, values[field]);
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      onSubmit(values);
      setValues(initialValues);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
