import { useEffect, useRef, useState } from "react";

import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import ReactPlayer from "react-player";
//animated components for react-select

// icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { RxCross2 } from "react-icons/rx";
import { GoVideo } from "react-icons/go";
import { PiVideoFill } from "react-icons/pi";

// store
import {
  Video_CreateSection,
  selectIsLoading,
} from "../../../store/features/video/section/videoSectionSlice";

// redux & router
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";

// yup & formik
import * as yup from "yup";
import { useFormik } from "formik";
import TextError from "../../../components/TextError";
import useLocales from "../../../hook/useLocales";

// yup
const RegisterSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().required(),
});

export default function AddChapter() {
  // redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const { translate } = useLocales();
  // ---------------------------------------------------

  const ids = useParams();
  const [value, setValue] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [descriptionValue, setDescripitonValue] = useState("");

  const initialValues = {
    title: "",
    category: "",
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

  const matches_340 = useMediaQuery("(max-width:340px)");
  const matches_450 = useMediaQuery("(max-width:450px)");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setVideoUrl(videoUrl);
    console.log(videoUrl);
  };

  const handleDeleteVideo = () => {
    setVideoUrl("");
  };

  const quillRef = useRef(null);

  const toolbarOptions = [
    ["bold", "italic", "underline"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

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

  const handleOnChange = (e) => {
    const quill = quillRef.current.getEditor();
    const html = quill.root.innerHTML;
    setDescripitonValue(html);
  };

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { title } = values;
    const data = {
      courseId: ids?.courseId,
      title,
      description: descriptionValue,
    };
    dispatch(Video_CreateSection(data));
  };

  console.log("Add Video To Created Sections", ids.courseId);

  return (
    <>
      {/* {error && <ErrorMsg message={error?.message} />}
      {isAdded && <SuccessMsg message="Product Added Successfully" />} */}
      <Box>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-10 lg:py-16">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {translate("Add a New Chapter")}
              </h2>
              <Link to={`/admin/section/${ids?.courseId}`}>
                <button
                  class="inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  style={{
                    backgroundColor: "#754ffe",
                  }}
                >
                  {translate("Add Video To Created Sections")}
                </button>
              </Link>
            </div>

            <form action="#">
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
                      {translate("Chapter Title")}
                    </label>
                    <input
                      type="text"
                      name="title"
                      onCreateTodo
                      id="name"
                      class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={translate("Chapter Title")}
                      required=""
                      value={values?.title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {formError.title ? (
                      <TextError error={formError.title} />
                    ) : null}
                  </div>

                  {/* text editor for description */}
                  <div className="w-full">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {translate("Description")}
                    </label>
                    <ReactQuill
                      style={{ color: "black" }}
                      ref={quillRef}
                      modules={{
                        toolbar: toolbarOptions,
                      }}
                      theme="snow"
                      value={descriptionValue}
                      onChange={handleOnChange}
                    />
                  </div>
                </Box>

                {/* Chapters block */}
              </Box>
              <button
                onClick={handleOnSubmit}
                type="submit"
                class="inline-flex  items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                style={{
                  marginTop: matches_450 ? "2rem" : "1rem",
                }}
              >
                {translate("Upload Chapter")}
              </button>
            </form>
          </div>
        </section>
      </Box>
    </>
  );
}
