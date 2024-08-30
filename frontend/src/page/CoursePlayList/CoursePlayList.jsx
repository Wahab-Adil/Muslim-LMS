import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { pageCss } from "../PageCss";
import CourseSidebar from "./CourseSideBar";
import { PlayArrow } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import courseimg from "../../image/course-react.jpg";

import { Video_CreateReview } from "../../store/features/video/reviews/videoReviewsSlice";

import {
  Video_CourseDetails,
  selectVideoCourse,
  selectIsLoading,
} from "../../store/features/video/courses/videoCoursesSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import ReactPlayer from "react-player";
import baseUrl from "../../utils/baseUrl";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const VideoCourse = useSelector(selectVideoCourse);
  const [videoUrl, setVideoUrl] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [CourseLight, setCourseLight] = useState(
    baseUrl(VideoCourse?.thumbnail, 8)
  );
  const classes = pageCss();
  const [open, setOpen] = useState(null);
  const [review, setReview] = useState({
    comment: "",
    rating: "",
  });

  const matches_340 = useMediaQuery("(max-width:340px)");

  const { id } = useParams();

  const handleChangeOpen = (value) => {
    if (value === open) {
      setCourseLight(baseUrl(VideoCourse?.thumbnail, 8));
      return setOpen(null);
    }
    setCourseLight("");
    setOpen(value);
  };

  useEffect(() => {
    dispatch(Video_CourseDetails(id));
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}

      <Box
        style={{
          margin: "auto",
          width: "95%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
          boxShadow: "0 3px 3px rgb(3 0 71 / 14%)",
        }}
        className={classes.course_sidebar}
      >
        <Box
          style={{
            marginTop: ".5rem",
            width: "100%",
            alignItems: "center",
          }}
          className={classes.course_sidebar_box}
        >
          <Box>
            <ReactPlayer
              url={baseUrl(videoUrl)}
              controls
              light={CourseLight}
              width={"100%"}
              height={matches_340 ? "12rem" : "15rem"}
            />
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                mt: "1rem",
                fontSize: {
                  xs: "12px !important",
                  sm: "1.4rem !important",
                },
                fontWeight: 600,
              }}
            >
              {!CourseLight && (
                <PlayArrow className={classes.single_course_tabs_icon} />
              )}
              {!CourseLight && videoTitle}
            </Typography>
          </Box>
          <Box sx={{ padding: "10px !important" }}>
            <Grid item xs={12} sm={12} md={12}>
              <Box
                className={classes.single_course_tabs_section}
                sx={{ mt: "3rem" }}
              >
                <Box className={classes.single_course_tabs_box}>
                  {
                    <Box className={classes.single_course_tabs}>
                      {VideoCourse?.sections?.map((item, idx) => (
                        <div id="accordion-collapse" data-accordion="collapse">
                          <h2
                            id="accordion-collapse-heading-1"
                            className="border-b"
                          >
                            <button
                              type="button"
                              class="flex items-center justify-between w-full p-4 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200  dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 "
                              data-accordion-target="#accordion-collapse-body-1"
                              aria-expanded="true"
                              aria-controls="accordion-collapse-body-1"
                              onClick={() => handleChangeOpen(idx)}
                            >
                              <span
                                style={{
                                  fontSize: "1.1rem",
                                  color: "black",
                                  textAlign: "start",
                                }}
                              >
                                {item?.title}
                              </span>
                              <svg
                                data-accordion-icon
                                class="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 5 5 1 1 5"
                                />
                              </svg>
                            </button>
                          </h2>
                          <div
                            id="accordion-collapse-body-1"
                            class={open === idx ? "" : "hidden"}
                            aria-labelledby="accordion-collapse-heading-1"
                          >
                            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                              <p
                                class="mb-2 text-gray-600 dark:text-gray-400"
                                style={{
                                  fontSize: "1rem",
                                  color: "black",
                                }}
                              >
                                {item?.videos?.map((vdo) => (
                                  <Box
                                    onClick={() => {
                                      setVideoUrl(vdo?.video?.url?.slice(8));
                                      setVideoTitle(vdo?.video?.title);
                                      setCourseLight("");
                                    }}
                                    key={vdo}
                                    className={
                                      classes.single_course_tabs_content
                                    }
                                  >
                                    <Typography
                                      variant="h3"
                                      sx={{
                                        textDecoration: "underline",
                                        color: "#411cffb5",
                                        cursor: "pointer",
                                        textAlign: {
                                          xs: "center",
                                          sm: "start",
                                        },
                                        fontSize: {
                                          xs: "12px !important",
                                          sm: "0.9rem !important",
                                        },
                                        fontWeight: 600,
                                      }}
                                    >
                                      {/* play arrow */}
                                      <PlayArrow
                                        className={
                                          classes.single_course_tabs_icon
                                        }
                                      />
                                      {vdo?.video?.title}
                                    </Typography>
                                    <Typography variant="h4">
                                      {" "}
                                      {vdo?.video?.duration}
                                    </Typography>
                                  </Box>
                                ))}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Box>
                  }
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CourseDetails;
