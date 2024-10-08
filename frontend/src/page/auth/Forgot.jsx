import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../components/loader/Loader";
import {
  forgotPassword,
  selectIsLoading,
  checkOtp,
  resetPassword,
} from "../../store/auth/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Step Components
const StepEmail = ({ onNext }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  return (
    <>
      {isLoading && <Loader />}
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email address is required"),
        })}
        onSubmit={async (values) => {
          const data = await dispatch(forgotPassword({ email: values.email }));

          if (data?.meta?.requestStatus !== "fulfilled") {
            localStorage.setItem("otpEmail", data?.payload?.otpStore?.email);

            onNext();
          }
        }}
      >
        <Form className="space-y-6 bg-white p-8 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-[#754ffe]">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754ffe] sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754ffe]"
            >
              Send OTP
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

const StepOTP = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  return (
    <>
      {isLoading && <Loader />}
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={Yup.object({
          otp: Yup.string().required("OTP is required"),
        })}
        onSubmit={async (values) => {
          const data = await dispatch(
            checkOtp({
              email: localStorage.getItem("otpEmail"),
              otp: values.otp,
            })
          );
          if (data?.meta?.requestStatus === "fulfilled") {
            localStorage.setItem("otpCode", values?.otp);
            onNext();
          }
        }}
      >
        <Form className="space-y-6 bg-white p-8 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-[#754ffe]">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter OTP
            </label>
            <div className="mt-2">
              <Field
                id="otp"
                name="otp"
                type="text"
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754ffe] sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              style={{ marginRight: 3 }}
              type="button"
              onClick={onPrevious}
              className="rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754ffe]"
            >
              Verify OTP
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

const StepNewPassword = ({ onPrevious }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <Loader />}
      <Formik
        initialValues={{ newPassword: "" }}
        validationSchema={Yup.object({
          newPassword: Yup.string()
            .min(8, "must be 8 charator")
            .required("New password is required"),
        })}
        onSubmit={async (values) => {
          const reponse = await dispatch(
            resetPassword({
              email: localStorage.getItem("otpEmail"),
              newPassword: values?.newPassword,
              otp: localStorage.getItem("otpCode"),
            })
          );
          if (reponse?.meta?.requestStatus === "fulfilled") {
            navigate("/login");
          }
        }}
      >
        <Form className="space-y-6 bg-white p-8 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-[#754ffe]">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <Field
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754ffe] sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onPrevious}
              className="rounded-md bg-gray-600 px-3 mx-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754ffe]"
            >
              Reset Password
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

// Main ForgotPasswordPage Component
const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handlePrevious = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot your password?
        </h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        {step === 1 && <StepEmail onNext={handleNext} />}
        {step === 2 && (
          <StepOTP onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {step === 3 && <StepNewPassword onPrevious={handlePrevious} />}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
