import React from 'react'
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../app/apiSlice';
import useForm from '../hooks/useForm';
function RegisterPage() {
  const [register, { data, isLoading }] = useRegisterMutation();

  const naviagte = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationRules = {
    name: { required: true },
    email: {
      required: true,
      validate: (value) =>
        /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email address",
    },
    password: { required: true },
  };
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validationRules
  );
  
  const onSubmit=(data) => {
    register(data);
  }
  if(!isLoading&&data){
    naviagte('/login')
  }

  return (
    <div className="grid h-lvh justify-center items-center bg-slate-100 space-x-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField 
          id="name"
          type="text"
          name="name"
          label={"Name*"}
          placeholder='Enter name'
          onChange={handleChange}
          value={values.name}
          error={errors.name}
        />
        <InputField 
          id="email"
          type="email"
          name="email"
          label={"Email*"}
          placeholder='Enter email'
          onChange={handleChange}
          value={values.email}
          error={errors.email}
        />
        <InputField 
          id="secret"
          type="password"
          name="password"
          label={"Password*"}
          placeholder='create password'
          onChange={handleChange}
          value={values.password}
          error={errors.password}
        />
        <Button type='submit' variant='primary' size="medium">Register Now</Button>
      </form>
    </div>
  )
}

export default RegisterPage