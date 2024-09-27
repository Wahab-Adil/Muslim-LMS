import React from "react";
import useLocale from "../hook/useLocales";
import useRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { sendMessage } from "../store/auth/user/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

const Contact = () => {
  const { translate } = useLocale();
  const dispatch = useDispatch();
  useRedirectLoggedOutUser("/login");

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().required("Email is Required"),
    message: Yup.string().required("Message is Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        message: values.message,
        name: values.name,
      };
      dispatch(sendMessage(data));
    },
    validateOnChange: false,
  });
  console.log(formik.values);

  return (
    <>
      <section class="py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
            <div class="flex items-center lg:mb-0">
              <div class="w-full max-w-md mx-auto">
                <h4 class="text-indigo-600 text-base font-medium leading-6 mb-4 lg:text-left text-center">
                  {translate("Contact Us")}
                </h4>
                <h2 class="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center">
                  {translate("Reach Out To Us")}
                </h2>
                <motion.form
                  onSubmit={formik.handleSubmit}
                  className="px-6 py-8 bg-white shadow-lg rounded-lg w-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  style={{ minHeight: "500px" }}
                >
                  <div className="mb-4">
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-md border-2 border-indigo-600 focus:outline-none py-2 px-4"
                      placeholder={translate("Name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-md border border-gray-200 focus:outline-none py-2 px-4"
                      placeholder={translate("Email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-6">
                    <textarea
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full h-48 shadow-sm resize-none text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-2xl border border-gray-200 focus:outline-none px-4 py-4"
                      placeholder={translate("Message")}
                    ></textarea>
                    {formik.touched.message && formik.errors.message ? (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.message}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 text-center text-white text-base font-semibold leading-6 rounded-md bg-indigo-600 shadow transition-all duration-700 hover:bg-indigo-800"
                  >
                    {translate("Send")}
                  </button>
                </motion.form>
              </div>
            </div>

            <div
              style={{
                direction:
                  document.documentElement.dir === "rtl" ? "ltr" : "ltr",
              }}
              class="lg:max-w-xl w-full h-[600px] flex items-center justify-center bg-cover bg-no-repeat bg-[url('https://pagedone.io/asset/uploads/1696245837.png')]"
            >
              <div class="">
                <div class="lg:w-96 w-auto h-auto bg-white shadow-xl lg:p-6 p-4">
                  <a href="javascript:;" class="flex items-center mb-6">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <h5 class="text-black text-base font-normal leading-6 ml-5">
                      +93707070707
                    </h5>
                  </a>
                  <a href="javascript:;" class="flex items-center mb-6">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                    <h5 class="text-black text-base font-normal leading-6 ml-5">
                      muslimafghan@gmail.com
                    </h5>
                  </a>
                  <a href="javascript:;" class="flex items-center mb-6">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 18H12.5C11.3333 18 10.3333 17 10.3333 15.8333C10.3333 14.6667 11.3333 13.6667 12.5 13.6667H16.5C17.6667 13.6667 18.6667 14.6667 18.6667 15.8333C18.6667 17 17.6667 18 16.5 18Z"
                        fill="#000000"
                      ></path>
                      <path
                        d="M19.8333 18C19.8333 14.6667 17.5 12.5 12.5 12.5C7.5 12.5 5.16667 14.6667 5.16667 18C5.16667 21.3333 7.5 23.5 12.5 23.5C17.5 23.5 19.8333 21.3333 19.8333 18Z"
                        fill="#000000"
                      ></path>
                    </svg>
                    <h5 class="text-black text-base font-normal leading-6 ml-5">
                      Sangin, Helmand, Afghanistan
                    </h5>
                  </a>
                  <div class="flex items-center justify-center border-t border-gray-100 pt-6">
                    <a href="javascript:;" class="mr-6">
                      <svg
                        width="31"
                        height="30"
                        viewBox="0 0 31 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 27C22.0531 27 26.8631 22.1901 26.8631 16.6371C26.8631 11.0841 22.0531 6.27411 16.5 6.27411C10.947 6.27411 6.13701 11.0841 6.13701 16.6371C6.13701 22.1901 10.947 27 16.5 27Z"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M16.5 6.27411V16.6371L21.4964 19.6214"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                    <a href="javascript:;" class="mr-6">
                      <svg
                        width="31"
                        height="30"
                        viewBox="0 0 31 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.6464 14.9369C11.3953 14.9369 10.3929 15.9392 10.3929 17.2724C10.3929 18.6056 11.3953 19.6079 12.6464 19.6079C13.8975 19.6079 14.899 18.6056 14.899 17.2724C14.899 15.9392 13.8975 14.9369 12.6464 14.9369Z"
                          fill="#000000"
                        ></path>
                        <path
                          d="M22.6464 14.9369C21.3953 14.9369 20.3929 15.9392 20.3929 17.2724C20.3929 18.6056 21.3953 19.6079 22.6464 19.6079C23.8975 19.6079 24.899 18.6056 24.899 17.2724C24.899 15.9392 23.8975 14.9369 22.6464 14.9369Z"
                          fill="#000000"
                        ></path>
                        <path
                          d="M12.6464 22.2724C12.6464 21.6079 12.982 21.2724 13.6464 21.2724H23.6464C24.3109 21.2724 24.6464 21.6079 24.6464 22.2724C24.6464 22.9369 24.3109 23.2724 23.6464 23.2724H13.6464C12.982 23.2724 12.6464 22.9369 12.6464 22.2724Z"
                          fill="#000000"
                        ></path>
                        <path
                          d="M19.6042 13.4771L19.6552 17.9441L21.0991 15.9562C22.065 14.9912 23.7424 14.9392 24.7577 15.9562L26.4317 17.9141"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                    <a href="javascript:;" class="mr-6">
                      <svg
                        width="31"
                        height="30"
                        viewBox="0 0 31 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4916 24.8428C11.3005 25.0325 10.8553 25.02 10.7436 24.7557L8.75254 21.1044C8.641 20.8613 8.71763 20.5958 8.9502 20.4805L11.7775 19.2829"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M20.1196 20.5662C21.5298 21.9641 22.8337 23.4345 23.4342 23.4345C24.5183 23.4345 25.5054 22.4471 25.5054 21.2828C25.5054 20.1185 24.5183 19.1311 23.4342 19.1311C22.3795 19.1311 21.439 19.918 20.1196 20.5662Z"
                          fill="#000000"
                        ></path>
                        <path
                          d="M14.1812 16.3046C14.9482 17.0596 16.0636 17.6449 17.2455 17.8127C18.4267 17.9815 19.6216 17.9519 20.7507 17.6476L23.9547 16.2206"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M18.8319 23.0586L23.5114 24.5892"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
