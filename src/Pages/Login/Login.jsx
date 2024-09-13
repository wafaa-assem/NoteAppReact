import axios from "axios";
import { useFormik } from "formik";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { userContext } from "../../Context/AuthContext";

export const Login = () => {
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,15}$/,
        "Start with a capital letter and be 6-16 characters long"
      ),
  });

  const user = {
    email: "",
    password: "",
  };

  function callLoginApi(values) {
    // console.log("values", values); //static => need to call api =>send data leh
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/v1/users/signIn`, values)
      .then((response) => {
        // console.log("tamam", response); // token byege hena => need entire app
        setToken(response.data.token);
        localStorage.setItem("tkn", response.data.token); //handle refresh
        toast.success(response?.data.msg);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        toast.error(error.response?.data.msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const loginFormik = useFormik({
    initialValues: user,
    onSubmit: callLoginApi,
    validationSchema: schema,
  });

  // console.log("error", loginFormik.errors);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <h2 className="text-center font-bold mb-5 text-3xl">
          Login to your account
        </h2>
        <form
          onSubmit={loginFormik.handleSubmit}
          className="flex flex-col gap-5 py-8 px-6 sm:px-10 md:px-16 w-full max-w-md bg-white shadow-md rounded-md"
        >
          {/* email */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              name="email"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              type="email"
              className="grow"
              placeholder="Email"
            />
          </label>
          {loginFormik.errors.email && loginFormik.touched.email ? (
            <div role="alert" className="alert alert-error">
              <span>{loginFormik.errors.email}</span>
            </div>
          ) : (
            ""
          )}

          {/* password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              name="password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>
          {loginFormik.errors.password && loginFormik.touched.password ? (
            <div role="alert" className="alert alert-error">
              <span>{loginFormik.errors.password}</span>
            </div>
          ) : (
            ""
          )}

          {/* login button */}

          <button
            type="submit"
            disabled={!(loginFormik.isValid && loginFormik.dirty)}
            className="btn btn-neutral w-full mt-4"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-white text-xl" />
            ) : (
              "Login Now"
            )}
          </button>
          {/* clear */}
          <button
            type="reset"
            onClick={loginFormik.resetForm}
            className="btn w-full mt-1"
          >
            Clear
          </button>

          <p className="text-center mt-3">
            <span className="text-gray-500">Don&apos;t have an account?</span>{" "}
            <Link to="/register" className="hover:underline font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
