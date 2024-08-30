import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { PhotoIcon } from "@heroicons/react/24/solid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import Loader from "../../components/loader/Loader";
import baseUrl from "../../utils/baseUrl";
import {
  updateUserProfile,
  selectIsAdmin,
  selectUserProfile,
} from "../../store/auth/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getAdminProfile,
  selectAdminProfile,
  selectIsLoading,
} from "../../store/auth/admin/adminSlice";

// Define toolbar options for ReactQuill
const toolbarOptions = [
  ["bold", "italic", "underline"], // toggled buttons
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

// Define validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  about: Yup.string().required("About/Bio is required"),
  avatar: Yup.mixed().nullable().required("Avatar Photo is required"),
  landingPageHeading: Yup.string().required("Landing Page Heading is required"),
  landingPageSubtitle: Yup.string().required(
    "Landing Page Subtitle is required"
  ),
  landingPagePhoto: Yup.mixed()
    .nullable()
    .required("Landing Page Photo is required"),
});

const Settings = () => {
  const dispatch = useDispatch();
  const AdminProfile = useSelector(selectAdminProfile);
  const isLoading = useSelector(selectIsLoading);

  const [previewUrl, setPreviewUrl] = useState("");
  const [landingPagePhotoPreview, setLandingPagePhotoPreview] = useState("");

  // Fetch admin profile data and update formik's initial values
  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  useEffect(() => {
    if (AdminProfile?.user) {
      formik.setValues({
        name: AdminProfile.user.name || "",
        address: AdminProfile.user.address || "",
        email: AdminProfile.user.email || "",
        avatar: AdminProfile.user.avatar || "",
        about: AdminProfile.user.about || "",
        landingPageHeading: AdminProfile.user.landingPageHeading || "",
        landingPageSubtitle: AdminProfile.user.landingPageSubtitle || "",
        landingPagePhoto: AdminProfile.user.landingPagePhoto || "",
      });
      setPreviewUrl(baseUrl(AdminProfile.user.avatar, 8) || "");
      setLandingPagePhotoPreview(
        baseUrl(AdminProfile.user.landingPagePhoto, 8) || ""
      );
    }
  }, [AdminProfile]);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      avatar: "",
      about: "",
      landingPageHeading: "",
      landingPageSubtitle: "",
      landingPagePhoto: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }
      dispatch(updateUserProfile(formData));
    },
    validateOnChange: false,
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("landingPagePhoto", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  localStorage.setItem("landingPageHeading", formik.values.landingPageHeading);
  localStorage.setItem(
    "landingPageSubtitle",
    formik.values.landingPageSubtitle
  );
  localStorage.setItem("landingPagePhoto", landingPagePhotoPreview);
  console.log("local", localStorage.getItem("landingPageHeading"));
  console.log("local", localStorage.getItem("landingPageSubtitle"));
  console.log("local", localStorage.getItem("landingPagePhoto"));

  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      className="px-6 py-8 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {isLoading && <Loader />}
      <div className="space-y-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <h2 className="text-lg font-semibold leading-7 text-gray-900">
            Edit Admin Profile
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </motion.div>

        <motion.div
          initial={{
            initial: { opacity: 0, x: -100 }, // Initial position: off-screen to the left
            animate: { opacity: 1, x: 0 }, // Final position: on-screen
            transition: { duration: 1 },
          }}
          className="border-b border-gray-900/10 pb-12"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-base font-semibold leading-7 text-gray-900 mt-12">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Edit Your Personal Information
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <motion.div
              className="sm:col-span-3"
              initial={{
                initial: { opacity: 0, x: -100 }, // Initial position: off-screen to the left
                animate: { opacity: 1, x: 0 }, // Final position: on-screen
                transition: { duration: 1 },
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  defaultValue={formik.values.name}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="block px-4 w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#754ffe] text-sm"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              className="sm:col-span-3"
              initial={{
                initial: { opacity: 0, x: -100 }, // Initial position: off-screen to the left
                animate: { opacity: 1, x: 0 }, // Final position: on-screen
                transition: { duration: 1 },
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, delay: 0.1 }}
            >
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="address"
                  className="block px-4 w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#754ffe] text-sm"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.address}
                  </div>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              className="sm:col-span-3"
              initial={{
                initial: { opacity: 0, x: -100 }, // Initial position: off-screen to the left
                animate: { opacity: 1, x: 0 }, // Final position: on-screen
                transition: { duration: 1 },
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, delay: 0.2 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block px-4 w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#754ffe] text-sm"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="border-b border-gray-900/10 pb-12"
            initial={{
              initial: { opacity: 0, x: -200 }, // Initial position: off-screen to the left
              animate: { opacity: 1, x: 0 }, // Final position: on-screen
              transition: { duration: 1 },
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.4 }}
          >
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              About/Bio
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Write a few sentences about yourself.
            </p>
            <ReactQuill
              modules={{ toolbar: toolbarOptions }}
              theme="snow"
              value={formik.values.about}
              onChange={(value) => formik.setFieldValue("about", value)}
              className="mb-4"
              style={{ height: "12rem" }}
            />
            {formik.touched.about && formik.errors.about ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.about}
              </div>
            ) : null}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          initial={{
            initial: { opacity: 0, x: -200 }, // Initial position: off-screen to the left
            animate: { opacity: 1, x: 0 }, // Final position: on-screen
            transition: { duration: 1 },
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <motion.div
            className="col-span-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
          >
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Photo
            </label>
            <div className="flex items-center space-x-6">
              <div className="relative w-32 h-32 bg-gray-100 border border-gray-300 rounded-lg">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <PhotoIcon
                    className="absolute inset-0 mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2 cursor-pointer"
              >
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  className="sr-only"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={(event) => {
                    handleFileChange(event);
                    const file = event.currentTarget.files[0];
                    formik.setFieldValue("avatar", file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }}
                />
                <span className="text-indigo-600 hover:text-indigo-500">
                  Change photo
                </span>
              </label>
            </div>
            {formik.touched.avatar && formik.errors.avatar ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.avatar}
              </div>
            ) : null}
          </motion.div>

          <motion.div
            className="col-span-full"
            initial={{
              initial: { opacity: 0, x: -200 }, // Initial position: off-screen to the left
              animate: { opacity: 1, x: 0 }, // Final position: on-screen
              transition: { duration: 3 },
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.1 }}
          >
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Landing Page Photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {landingPagePhotoPreview ? (
                  <img
                    src={landingPagePhotoPreview}
                    style={{ minWidth: "100%", height: "300px" }}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
                <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-[#754ffe] focus:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "landingPagePhoto",
                          event.currentTarget.files[0]
                        );
                        setLandingPagePhotoPreview(
                          URL.createObjectURL(event.currentTarget.files[0])
                        );
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-b border-gray-900/10 pb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.6 }}
        >
          <label
            htmlFor="landingPageHeading"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            Landing Page Heading
          </label>
          <p className="text-sm text-gray-600 mb-4">
            Write a well-described heading that people will know about you.
          </p>
          <ReactQuill
            modules={{
              toolbar: [
                ["bold", "italic", "underline"], // toggled buttons
                ["blockquote", "code-block"],

                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                [{ script: "sub" }, { script: "super" }], // superscript/subscript
                [{ direction: "rtl" }], // text direction

                [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],

                ["clean"], // remove formatting button
              ],
            }}
            theme="snow"
            value={formik.values.landingPageHeading}
            onChange={(value) =>
              formik.setFieldValue("landingPageHeading", value)
            }
            className="mb-4"
            style={{ height: "12rem" }}
          />
          {formik.touched.landingPageHeading &&
          formik.errors.landingPageHeading ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.landingPageHeading}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          className="border-b border-gray-900/10 pb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.7 }}
        >
          <label
            htmlFor="landingPageSubtitle"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            Landing Page Subtitle
          </label>
          <p className="text-sm text-gray-600 mb-4">
            Write a well-described subtitle that people will know about you.
          </p>
          <ReactQuill
            modules={{
              toolbar: [
                ["bold", "italic", "underline"], // toggled buttons
                ["blockquote", "code-block"],

                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                [{ script: "sub" }, { script: "super" }], // superscript/subscript
                [{ direction: "rtl" }], // text direction

                [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],

                ["clean"], // remove formatting button
              ],
            }}
            theme="snow"
            value={formik.values.landingPageSubtitle}
            onChange={(value) =>
              formik.setFieldValue("landingPageSubtitle", value)
            }
            className="mb-4"
            style={{ height: "12rem" }}
          />
          {formik.touched.landingPageSubtitle &&
          formik.errors.landingPageSubtitle ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.landingPageSubtitle}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          className="flex items-center justify-start gap-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <button
            type="button"
            className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300"
          >
            Cancel
          </button>
          <motion.div
            className="flex items-center justify-end gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            onClick={() => setAdminHomeDetails()}
          >
            <Link
              to={"/admin/landing/preview"}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-[#754ffe] focus:ring-offset-2 transition-colors duration-300"
            >
              Preview
            </Link>
          </motion.div>

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-[#754ffe] focus:ring-offset-2 transition-colors duration-300"
          >
            Save
          </button>
        </motion.div>
      </div>
    </motion.form>
  );
};

export default Settings;
