import { useRef, useEffect } from "react";
import { useLoginMutation } from "../app/apiSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { loginSuccess, selectCurrentUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import InputField from "../components/InputField";
import Button from "../components/Button";
function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectCurrentUser);
  const errRef = useRef();
  const [login, { data: response, isError, isLoading, error }] =
    useLoginMutation();
  const initValues = { email: "", password: "" };
  const validateRules = {
    email: {
      required: true,
      validate: (value) =>
        /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email address",
    },
    password: { required: true },
  };
  const { values, errors, handleChange, handleSubmit } = useForm(
    initValues,
    validateRules
  );

  const onSubmit = (data) => {
    login(data).unwrap();
  };
  if (isError) {
    console.log({error})
    errRef.current.focus();
  }
 
  useEffect(() => {
    const setToken = async()=>{
      if (response !== undefined) {
        await dispatch(loginSuccess({
          user: {id:response._id, name:response.name, email:response.email,},
          token: response.token
        }));
        // await window.localStorage.setItem("token", data?.token);
        if (response?.role === "user") {
          return navigate("/");
        }else{
          return navigate("/dashboard");
        }
      }
    }
    setToken();
  }, [response, authUser, isLoading, navigate]);
  
  return (
    <div className=" grid items-center justify-center bg-slate-100">
      <h2 className="text-center text-white text-lg font-semibold">Login Page</h2>
      <p ref={errRef} className={`${error?'text-red-500':''}`}>{error?.status}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
        <InputField
          id="email"
          label="Email Address"
          type="email"
          name={'email'}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Password"
        />
        <Button
          type="submit"
          variant="primary"
          size="medium"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
