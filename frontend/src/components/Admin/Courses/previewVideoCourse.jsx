import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";
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
import TextError from "../../TextError";

// yup
const Schema = yup.object().shape({
  title: yup.string().required(),
});

// store

import {
  PreviewVideoFromSection,
  selectVideoFromSection,
  selectIsLoading,
} from "../../../store/features/video/section/videoSectionSlice";
import { useDispatch, useSelector } from "react-redux";
import useLocale from "../../../hook/useLocales";

export default function Preview_VideoFromSection() {
  const { translate } = useLocale();
  // redux
  const dispatch = useDispatch();
  const { courseId, videoId, idx } = useParams();

  const SelectedVideo = useSelector(selectVideoFromSection);

  useEffect(() => {
    const ids = { courseId, videoId, idx };
    dispatch(PreviewVideoFromSection(ids));
  }, []);

  const [videoUrl, setVideoUrl] = useState("");
  const [video, setVideo] = useState("");

  const matches_340 = useMediaQuery("(max-width:340px)");
  const matches_450 = useMediaQuery("(max-width:450px)");

  const initialValues = {
    title: "",
  };

  const {
    values,
    errors: formError,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: () => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("video", video);
      formData.append("duration", "3hours");
      const data = { id: sectionId, formData };
      dispatch(Video_AddToSection(data));
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setVideoUrl(videoUrl);
    setVideo(file);
  };

  const handleDeleteVideo = () => {
    setVideoUrl("");
    setVideo("");
  };

  return (
    <>
      <Box>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-10 lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              {translate("Add Video")}
            </h2>
            <form onSubmit={handleSubmit}>
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
                      {translate("Video Title")}
                    </label>
                    <input
                      type="text"
                      name="title"
                      onCreateTodo
                      id="name"
                      class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Video Title"
                      required=""
                      value={values?.title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {formError.title ? (
                      <TextError error={formError.title} />
                    ) : null}
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
                    {translate("Chapter's Video")}
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
                        {translate("Chapter Video")}
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

                              <h4 class="text-center text-gray-900 text-sm font-medium leading-snug">
                                {translate("Drag and Drop your file")}
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
                {translate("Upload")}
              </button>
            </form>
          </div>
        </section>
      </Box>
    </>
  );
}
