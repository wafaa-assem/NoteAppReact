import axios from "axios";
import { useFormik } from "formik";
import { FaPhoneAlt, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";
import { useState } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(3).max(10),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,15}$/,
        "Start with a capital letter and be 6-16 characters long"
      ),
    age: yup
      .string()
      .required("Age is required")
      .matches(/^[1-9][0-9]$/, "Invalid age"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  });

  const user = {
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
  };

  function callRegisterApi(values) {
    // console.log("values", values);
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/v1/users/signUp`, values)
      .then((response) => {
        // console.log("tamam", response);
        // setIsLoading(false);
        toast.success(response?.data?.msg);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        // console.log("error", error.response.data.msg);
        // setIsLoading(false);
        toast.error(error.response?.data?.msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: callRegisterApi,
    validationSchema: schema,
  });

  // console.log("error", registerFormik.errors);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <h2 className="text-center font-bold mb-5 text-3xl">
          Create your account
        </h2>
        <form
          onSubmit={registerFormik.handleSubmit}
          className="flex flex-col gap-5 py-8 px-6 sm:px-10 md:px-16 w-full max-w-md bg-white shadow-md rounded-md"
        >
          {/* name */}
          <label className="input input-bordered flex items-center gap-2">
            {/* SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              name="name"
              value={registerFormik.values.name}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="text"
              className="grow"
              placeholder="Username"
            />
          </label>
          {registerFormik.errors.name && registerFormik.touched.name ? (
            <div role="alert" className="alert alert-error">
              <span>{registerFormik.errors.name}</span>
            </div>
          ) : (
            ""
          )}

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
              value={registerFormik.values.email}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="email"
              className="grow"
              placeholder="Email"
            />
          </label>
          {registerFormik.errors.email && registerFormik.touched.email ? (
            <div role="alert" className="alert alert-error">
              <span>{registerFormik.errors.email}</span>
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
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>
          {registerFormik.errors.password && registerFormik.touched.password ? (
            <div role="alert" className="alert alert-error">
              <span>{registerFormik.errors.password}</span>
            </div>
          ) : (
            ""
          )}

          {/* phone */}
          <label className="input input-bordered flex items-center gap-2">
            <FaPhoneAlt className="text-[#626973]" />
            <input
              name="phone"
              value={registerFormik.values.phone}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="tel"
              className="grow"
              placeholder="Phone"
            />
          </label>
          {registerFormik.errors.phone && registerFormik.touched.phone ? (
            <div role="alert" className="alert alert-error">
              <span>{registerFormik.errors.phone}</span>
            </div>
          ) : (
            ""
          )}

          {/* age */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              name="age"
              value={registerFormik.values.age}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="number"
              className="grow"
              placeholder="Age"
            />
          </label>
          {registerFormik.errors.age && registerFormik.touched.age ? (
            <div role="alert" className="alert alert-error">
              <span>{registerFormik.errors.age}</span>
            </div>
          ) : (
            ""
          )}

          {/* Register button */}

          <button
            type="submit"
            disabled={!(registerFormik.isValid && registerFormik.dirty)}
            className="btn btn-neutral w-full mt-4"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-white text-xl" />
            ) : (
              "Register"
            )}
          </button>
          {/* clear */}
          <button
            type="reset"
            onClick={registerFormik.resetForm}
            className="btn w-full mt-1"
          >
            Clear
          </button>

          <p className="text-center mt-3">
            <span className="text-gray-500">Already a member?</span>{" "}
            <Link to="/login" className="hover:underline font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
