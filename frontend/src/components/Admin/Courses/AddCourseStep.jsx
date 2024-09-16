import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ReactQuill from "react-quill";
import ToolbarOption from "../../ToolbarOption";

// lottie date

import Congrats from "../../../lotties/congrats.json";
// icon

import { AiOutlineDelete } from "react-icons/ai";

import { BsImages } from "react-icons/bs";
import Lottie from "react-lottie";
import { TextField, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import TextError from "../../TextError";

// yup & formik
import * as yup from "yup";
import { useFormik } from "formik";
// framer motion
import { motion } from "framer-motion";

// yup
const RegisterSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  language: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().required(),
});

// store
import {
  Video_CreateCourse,
  selectIsLoading,
} from "../../../store/features/video/courses/videoCoursesSlice";

// store
import {
  Video_AllCategories,
  selectVideoAllCategories,
} from "../../../store/features/video/category/videoCategorySlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocale from "../../../hook/useLocales";

const inputTopAnimation = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: 100 },
};
const inputBottomAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: 100 },
};

const inputLeftAnimation = {
  hidden: { opacity: 0, x: -200 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const inputRightAnimation = {
  hidden: { opacity: 0, x: 200 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const AddCourseStep = () => {
  const { translate } = useLocale();
  // redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const AllCategories = useSelector(selectVideoAllCategories);

  // state
  const [descriptionValue, setDescriptionValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const initialValues = {
    title: "",
    subtitle: "",
    category: "",
    language: "",
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const matches_450 = useMediaQuery("(max-width:450px)");

  const quillRef = useRef(null);

  useEffect(() => {
    dispatch(Video_AllCategories());
  }, []);

  // handlers

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const image = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(image);
  };

  const handleOnChangeQuill = (e) => {
    const quill = quillRef.current.getEditor();
    const html = quill.root.innerHTML;
    setDescriptionValue(html);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Congrats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //

  const handleDeleteImage = () => {
    setImageUrl("");
    setImage("");
  };

  const {
    values,
    errors: formError,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: () => {},
  });
  const handleSubmit = async () => {
    const { title, category, subtitle, language } = values;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("language", language);
    formData.append("category", category);
    formData.append("description", descriptionValue);
    formData.append("thumbnail", image);

    const course = await dispatch(Video_CreateCourse(formData));
    localStorage.setItem("courseId", course?.payload?.course?.id);
  };

  // steps
  const steps = [
    {
      title: translate("Course Title"),
      content: (
        <div
          style={{
            marginTop: "6rem",
            height: "40vh",
          }}
        >
          <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            {translate("Create A New Course")}
          </h2>
          <p
            class="mb-4 text-xs  text-gray-900 dark:text-white"
            style={{
              fontWeight: "600",
            }}
          >
            {translate(
              `What would you like to name your course? Don't worry, you can alway change this later.`
            )}
          </p>
          <Box
            sx={{
              display: "flex",
              gap: "3rem",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              className="w-full"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {translate("Course Title")}
                </label>

                <input
                  type="text"
                  name="title"
                  onCreateTodo
                  id="name"
                  class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={translate("type course name")}
                  required=""
                  value={values?.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {formError.title ? <TextError error={formError.title} /> : null}
              </div>
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {translate("Course subtitle")}
                </label>

                <input
                  type="text"
                  name="subtitle"
                  onCreateTodo
                  id="name"
                  class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={translate("Type course subtitle")}
                  required=""
                  value={values?.subtitle}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {formError.subtitle ? (
                  <TextError error={formError.subtitle} />
                ) : null}
              </div>
            </Box>
          </Box>
        </div>
      ),
    },
    {
      title: translate("Course Description"),
      content: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {translate("Category")}
            </label>

            <select
              id="category"
              onBlur={handleBlur}
              onChange={handleChange}
              name="category"
              class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-primary-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="">{translate("Select category")}</option>

              {AllCategories?.map((cate) => {
                return (
                  <>
                    <option value={cate?.name}>{cate?.name}</option>
                  </>
                );
              })}
            </select>
            {formError?.category ? (
              <TextError error={formError.category} />
            ) : null}
          </div>
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {translate("Languages")}
            </label>

            <select
              id="language"
              onBlur={handleBlur}
              onChange={handleChange}
              name="language"
              class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-primary-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="">{translate("Select Languages")}</option>

              {["pashto", "dari", "english", "arabic"]?.map((lang) => {
                return (
                  <>
                    <option value={lang}>{translate(lang)}</option>
                  </>
                );
              })}
            </select>
            {formError?.language ? (
              <TextError error={formError.language} />
            ) : null}
          </div>
          <div className="w-full">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {translate("Description")}
            </label>
            <ReactQuill
              ref={quillRef}
              modules={{
                toolbar: ToolbarOption,
              }}
              style={{ color: "black" }}
              theme="snow"
              onBlur={handleBlur}
              name="description"
              value={descriptionValue}
              onChange={handleOnChangeQuill}
            />
          </div>
        </Box>
      ),
    },
    {
      title: translate("Course Image"),
      content: (
        <>
          {imageUrl ? (
            <Box
              sx={{
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                width: "90%",
                alignItems: "center",
              }}
              className={`flex flex-col mt-10 items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                imageUrl ? "0" : "py-16"
              } `}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".6rem",
                }}
              >
                <Button
                  sx={{
                    color: "red",
                    "&:hover": {
                      color: "red",
                    },
                    alignSelf: "end",
                    mt: "1rem",
                  }}
                  onClick={handleDeleteImage}
                >
                  <AiOutlineDelete
                    style={{
                      width: "1.22rem",
                      height: "1.22rem",
                    }}
                  />
                </Button>

                <img
                  src={imageUrl}
                  class="w-full rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                  alt="..."
                />

                {/* <img src={imageUrl} width={"100%"} /> */}
              </Box>
            </Box>
          ) : (
            <>
              <label
                for="dropzone-file"
                className={`flex flex-col items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                  imageUrl ? "0" : "py-16"
                } `}
                style={{
                  marginTop: "3rem",
                }}
              >
                <div class="mb-3 flex items-center justify-center">
                  <BsImages
                    style={{
                      width: "3rem",
                      height: "3rem",
                      marginBottom: "1rem",
                      color: "#754ffe",
                    }}
                  />
                </div>

                <h4 class="text-center text-gray-900 text-sm font-medium leading-snug">
                  {translate("Drag and Drop your file")}
                </h4>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="dropzone-file"
                  class="hidden"
                  required
                />
              </label>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit} autocomplete={"off"}>
      <Box
        sx={{
          width: "100%",
          px: { xs: "2rem", sm: "4rem" },
          minHeight: "90vh",
        }}
      >
        <Stepper
          sx={{
            direction: document.documentElement.dir === "rtl" ? "ltr" : "ltr",
          }}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map(({ title, content }, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={title} {...stepProps}>
                <StepLabel {...labelProps}>{title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3rem",
                pt: 2,
                alignItems: "center",
              }}
            >
              <Lottie
                options={defaultOptions}
                height={matches_450 ? 100 : 200}
                width={matches_450 ? 100 : 200}
                speed={0.3}
              />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                textAlign={{ xs: "center", sm: "left" }}
              >
                {translate(`Congratulation's Your Course Created.`)}
              </Typography>

              {/* <Box sx={{ flex: "1 1 auto" }} /> */}
              <Box
                sx={{
                  display: "flex",
                  gap: "4rem",
                  width: "100%",
                  justifyContent: { xs: "center", sm: "space-between" },
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Link
                  to={`/admin/add-chapter/${localStorage.getItem("courseId")}`}
                >
                  <button
                    onClick={handleReset}
                    class="inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    style={{
                      backgroundColor: "#754ffe",
                    }}
                  >
                    {translate("Add Chapters To Course")}
                  </button>
                </Link>
                <Link to="/admin/manage-courses">
                  <button
                    onClick={handleReset}
                    class="inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    style={{
                      backgroundColor: "#754ffe",
                    }}
                  >
                    {translate("Skip For Nows")}
                  </button>
                </Link>
              </Box>
            </Box>
          </React.Fragment>
        ) : (
          // next and back button and content block
          <React.Fragment>
            {/* step page content here */}
            {steps[activeStep].content}
            {/* step page content here end */}
            {/* step page button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                marginTop: "auto",
                justifyContent: "space-between",
                alignItems: "end",
              }}
            >
              {activeStep === 0 ? (
                <button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  class="inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-md opacity-50 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  style={{
                    backgroundColor: "#754ffe",
                    cursor: "pointer",
                  }}
                >
                  {translate("Back")}
                </button>
              ) : (
                <button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  class="inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  style={{
                    backgroundColor: "#754ffe",
                  }}
                >
                  {translate("Back")}
                </button>
              )}

              {activeStep === 0 ? (
                values?.title ? (
                  <button
                    onClick={handleNext}
                    class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    style={{
                      backgroundColor: "#754ffe",
                    }}
                  >
                    {translate("Next")}
                  </button>
                ) : (
                  <button
                    class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-indigo-700 rounded-md opacity-50 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    style={{
                      backgroundColor: "#754ffe",
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? translate("Create Course")
                      : translate("Next")}
                  </button>
                )
              ) : null}

              {activeStep === 1 ? (
                values?.category ? (
                  <button
                    onClick={handleNext}
                    class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    style={{
                      backgroundColor: "#754ffe",
                    }}
                  >
                    {translate("Next")}
                  </button>
                ) : (
                  <button
                    class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-indigo-700 rounded-md opacity-50 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    style={{
                      backgroundColor: "#754ffe",
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? translate("Create Course")
                      : translate("Next")}
                  </button>
                )
              ) : null}
              {activeStep === 2 ? (
                imageUrl ? (
                  <button
                    onClick={() => {
                      handleNext();
                      handleSubmit();
                    }}
                    class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    style={{
                      backgroundColor: "#754ffe",
                    }}
                  >
                    {translate("Create")}
                  </button>
                ) : (
                  <button
                    class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-indigo-700 rounded-md opacity-50 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    style={{
                      backgroundColor: "#754ffe",
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? translate("Upload")
                      : translate("Next")}
                  </button>
                )
              ) : null}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </form>
  );
};

export default AddCourseStep;
