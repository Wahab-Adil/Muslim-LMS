import React, { useState } from "react";
import { registerUser } from "../../store/auth/user/userSlice";
import useLocale from "../../hook/useLocales";
// const Register = () => {
//   const { translate } = useLocale();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setformData] = useState(initialState);
//   const { email, password, name } = formData;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };

//   const login = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       return toast.error("All fields are required");
//     }

//     const userData = {
//       name,
//       email,
//       password,
//     };
//     console.log(userData);

//     setIsLoading(true);
//     try {
//       await dispatch(registerUser(userData));
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {isLoading && <Loader />}

//       <div className="font-sans text-gray-900 antialiased">
//         <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
//           <div>
//             <h2 className="font-bold text-3xl">
//               {translate("Muslim")}

//               <span className="text-[#f84525] px-2 rounded-md">
//                 {translate("Afghan")}
//               </span>
//             </h2>
//           </div>

//           <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
//             <form>
//               <div className="py-8">
//                 <center>
//                   <span className="text-2xl font-semibold">
//                     {translate("Register")}
//                   </span>
//                 </center>
//               </div>
//               <div style={{ marginBottom: 15 }}>
//                 <label
//                   className="block font-medium text-sm text-gray-700"
//                   for="Name"
//                   value="name"
//                 />
//                 <input
//                   style={{ border: "2px solid #754ffe" }}
//                   type="name"
//                   name="name"
//                   required=""
//                   value={name}
//                   onChange={handleInputChange}
//                   placeholder={translate("name")}
//                   className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
//                 />
//               </div>

//               <div>
//                 <label
//                   className="block font-medium text-sm text-gray-700"
//                   for="email"
//                   value="Email"
//                 />
//                 <input
//                   style={{ border: "2px solid #754ffe" }}
//                   type="email"
//                   name="email"
//                   required=""
//                   value={email}
//                   onChange={handleInputChange}
//                   placeholder={translate("Email")}
//                   className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
//                 />
//               </div>

//               <div className="mt-4">
//                 <label
//                   className="block font-medium text-sm text-gray-700"
//                   for="password"
//                   value="Password"
//                 />
//                 <div className="relative">
//                   <input
//                     style={{ border: "2px solid #754ffe" }}
//                     id="password"
//                     type="password"
//                     name="password"
//                     placeholder={translate("Password")}
//                     value={password}
//                     onChange={handleInputChange}
//                     required
//                     autocomplete="true"
//                     className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
//                   />

//                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
//                     <button
//                       type="button"
//                       id="togglePassword"
//                       className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
//                     ></button>
//                   </div>
//                 </div>
//               </div>

//               <div className="block mt-4">
//                 <label for="remember_me" className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="remember_me"
//                     name="remember"
//                     className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
//                   />
//                   <span className="ms-2 text-sm text-gray-600">
//                     {translate("Remember Me")}
//                   </span>
//                 </label>
//               </div>

//               <div className="flex items-center justify-end mt-4">
//                 <a
//                   className="hover:underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   href="{{ route('password.request') }}"
//                 >
//                   {translate("Forgot your password?")}
//                 </a>

//                 <button
//                   onClick={(e) => login(e)}
//                   className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
//                 >
//                   {translate("Sign In")}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterPage = () => {
  const { translate } = useLocale();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string()
      .email("Invalid email address")
      .required(" email address Required"),
    password: Yup.string().required("password Required"),
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          {translate(`Sign up to your account`)}
        </h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md relative">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(registerUser(values));
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-6 bg-white p-8 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-[#754ffe]">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {translate("Name")}
                </label>
                <div
                  style={{
                    direction:
                      document.documentElement.dir === "rtl" ? "ltr" : "ltr",
                  }}
                  className="mt-2"
                >
                  <Field
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754ffe] sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {translate("Email address")}
                </label>
                <div
                  style={{
                    direction:
                      document.documentElement.dir === "rtl" ? "ltr" : "ltr",
                  }}
                  className="mt-2"
                >
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {translate("Password")}
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      {translate("Forgot password?")}
                    </a>
                  </div>
                </div>
                <div
                  style={{
                    direction:
                      document.documentElement.dir === "rtl" ? "ltr" : "ltr",
                  }}
                  className="relative mt-2"
                >
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#754ffe] sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 5.5C7.86 5.5 4.5 9 4.5 12s3.36 6.5 7.5 6.5 7.5-3.5 7.5-6.5S16.14 5.5 12 5.5zm0 10c-1.29 0-2.5-.5-3.5-1.5S7 12.5 8.5 11s2.5-1.5 3.5-1.5 2.5.5 3.5 1.5-1.5 2.5-3.5 2.5zm0-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 3C5.36 3 1 7.36 1 12s4.36 9 11 9 11-4.36 11-9S18.64 3 12 3zm0 14.5a5.5 5.5 0 0 1-5.5-5.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 5.5 5.5A5.5 5.5 0 0 1 12 17.5z"
                        />
                      </svg>
                    )}
                  </button>
                  <ErrorMessage
                    name="password"
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
                  {translate("Sign in")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
