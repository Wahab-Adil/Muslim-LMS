import { useEffect, useRef, useState } from "react";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import ReactPlayer from "react-player";
//animated components for react-select

// icons
import { AiOutlineDelete } from "react-icons/ai";
import { PiVideoFill } from "react-icons/pi";

// yup & formik
import * as yup from "yup";
import { useFormik } from "formik";
import TextError from "../../../components/TextError";

// yup
const Schema = yup.object().shape({
  title: yup.string().required(),
});

// store

// import {
//   video_,
//   selectIsLoading,
// } from "../../../store/features/video/section/videoCategorySlice";

export default function EditChapter() {
  const [value, setValue] = useState("");
  const [descriptionValue, setDescripitonValue] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const matches_340 = useMediaQuery("(max-width:340px)");
  const matches_450 = useMediaQuery("(max-width:450px)");

  const initialValues = {
    title: "",
  };

  const {
    values,
    errors: formError,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: async () => {
      const data = {
        title: values.title,
        description: descriptionValue,
        url: videoUrl,
      };

      await update;
    },
  });

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

  let error, isAdded;

  //onChange
  const handleOnChange = (e) => {
    const quill = quillRef.current.getEditor();
    const html = quill.root.innerHTML;
    setDescripitonValue(html);
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {isAdded && <SuccessMsg message="Product Added Successfully" />}
      <Box>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-10 lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Edit Chapter
            </h2>
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
                      Chapter Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      onCreateTodo
                      id="name"
                      class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Course name"
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
                      Description
                    </label>
                    <ReactQuill
                      style={{ color: "white" }}
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

                <div className="w-full">
                  <label
                    for="description"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".4rem",
                    }}
                    class="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Chapter's Video
                  </label>

                  <Box
                    className="bg-indigo-100 px-6 pb-4"
                    sx={{
                      borderRadius: "4px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <label
                        for="description"
                        class="block text-xs font-medium text-gray-900 dark:text-white text-end"
                      >
                        Chapter Video
                      </label>
                    </Box>

                    {/* course video show here*/}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".6rem",
                      }}
                    >
                      <div class="w-full mb-5">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          {videoUrl ? (
                            <>
                              {/* <Box sx={{
                                alignSelf:"end"
                              }}>
                                <RxCross2 />
                              </Box> */}
                              <Button
                                sx={{
                                  color: "red",
                                  "&:hover": {
                                    color: "red",
                                  },
                                  alignSelf: "end",
                                }}
                                onClick={handleDeleteVideo}
                              >
                                <AiOutlineDelete
                                  style={{
                                    width: "1.22rem",
                                    height: "1.22rem",
                                  }}
                                />
                              </Button>
                              <ReactPlayer
                                url={videoUrl}
                                controls
                                width={"100%"}
                                height={matches_340 ? "12rem" : "15rem"}
                              />
                            </>
                          ) : (
                            <label
                              for="dropzone-file"
                              class="flex flex-col items-center justify-center py-16 w-full border border-gray-300 border-dashed  cursor-pointer bg-gray-50 "
                            >
                              <div class="mb-3 flex items-center justify-center">
                                <PiVideoFill
                                  style={{
                                    width: "3rem",
                                    height: "3rem",
                                    marginBottom: "1rem",
                                    color: "#754ffe",
                                  }}
                                />
                              </div>
                              <h2 class="text-center text-gray-400   text-xs font-normal leading-4 mb-1">
                                Video smaller than 500MB
                              </h2>
                              <h4 class="text-center text-gray-900 text-sm font-medium leading-snug">
                                Drag and Drop your file here or
                              </h4>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                id="dropzone-file"
                                class="hidden"
                                required
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </Box>
                  </Box>
                </div>
              </Box>
              <button
                type="submit"
                class="inline-flex  items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                style={{
                  marginTop: matches_450 ? "2rem" : "1rem",
                }}
              >
                Edit Chapter
              </button>
            </form>
          </div>
        </section>
      </Box>
    </>
  );
}
