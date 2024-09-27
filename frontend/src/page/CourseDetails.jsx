import {
  Box,
  Container,
  Grid,
  Typography,
  Rating,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagebanner from "../components/Pagebanner";
import { pageCss } from "./PageCss";
import CourseSidebar from "../components/CourseSideBar";
import { PlayArrow } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import InstructCourseDetails from "../components/InstructCourseDetails";
import Footer from "../components/Footer";
import Course from "../components/Course";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slider.css";

import { Video_CreateReview } from "../store/features/video/reviews/videoReviewsSlice";

import {
  Video_CourseDetails,
  selectVideoCourse,
  selectHasReviewed,
  selectNewRelatedCourses,
  selectIsLoading,
} from "../store/features/video/courses/videoCoursesSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import baseUrl from "../utils/baseUrl";
import useLocale from "../hook/useLocales";
import useRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import ReactShowMoreText from "react-show-more-text";

const CourseDetails = () => {
  useRedirectLoggedOutUser("/login");

  const matches_1180 = useMediaQuery("(max-width:1180px)");
  const matches_800 = useMediaQuery("(max-width:700px)");
  const matches_500 = useMediaQuery("(max-width:500px)");

  const { translate } = useLocale();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const VideoCourse = useSelector(selectVideoCourse);
  const isReviewed = useSelector(selectHasReviewed);
  const RelatedReview = useSelector(selectNewRelatedCourses);
  const classes = pageCss();
  const [tabValue, setTabvalue] = useState(0);
  const [open, setOpen] = useState(null);
  const [review, setReview] = useState({
    comment: "",
    rating: "",
  });

  const { id } = useParams();

  const handleChangeOpen = (value) => {
    if (value === open) {
      return setOpen(null);
    }
    setOpen(value);
  };

  let countAverageRating = 0;

  VideoCourse?.reviews?.forEach((review) => {
    countAverageRating += review?.rating;
  });

  countAverageRating = (
    countAverageRating / VideoCourse?.reviews?.length
  ).toFixed(1);

  // review handler

  const handleChangeReview = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  console.log("video", Number(VideoCourse?.rating));

  // review submit handler

  const handleSubmitReview = async () => {
    await dispatch(
      Video_CreateReview({
        id: VideoCourse?._id,
        rating: review?.rating,
        comment: review?.comment,
      })
    );
    dispatch(Video_CourseDetails(id));
  };
  useEffect(() => {
    dispatch(Video_CourseDetails(id));
  }, [isReviewed === true]);

  return (
    <>
      {isLoading && <Loader />}
      <Pagebanner
        title={VideoCourse?.title}
        createdAt={VideoCourse?.createdAt}
        subtitle={VideoCourse?.subtitle}
        course_time="12 hours 34 minutes"
        course_enroll={VideoCourse?.totalViews}
        course_rating={Number(VideoCourse?.rating)}
      />
      <Box className={classes.course_banner}></Box>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row",
            },
          }}
        >
          <Grid item xs={12} sm={12} md={8}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mt: { xs: "1rem", sm: "4rem" },
                fontSize: { xs: "1.4rem", sm: "2rem" },
                mb: { xs: "3rem", sm: 0 },
              }}
            >
              {translate("Course Content")}
            </Typography>
            <Box
              className={classes.single_course_tabs_section}
              sx={{ mt: "3rem" }}
            >
              <Box className={classes.single_course_tabs_box}>
                {VideoCourse?.sections?.length <= 0 && "no content"}
                {VideoCourse?.sections?.length > 0 && (
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
                                <Link
                                  to={`/course-playlist/${VideoCourse?._id}`}
                                  key={vdo}
                                  className={classes.single_course_tabs_content}
                                >
                                  <Typography
                                    variant="h3"
                                    sx={{
                                      textDecoration: "underline",
                                      color: "#411cffb5",
                                      cursor: "pointer",
                                      textAlign: { xs: "center", sm: "start" },
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
                                </Link>
                              ))}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          {/* course details sidebar */}
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            mb={{ xs: "0", sm: "10rem" }}
            mt={{ xs: 0, sm: "0", md: "5rem" }}
            sx={{
              direction: document.documentElement.dir === "rtl" ? "ltr" : "ltr",
            }}
          >
            <CourseSidebar Course={VideoCourse} />
          </Grid>
          {/* course details end */}
        </Grid>
        <Box
          sx={{
            px: { xs: 0, sm: "24px" },
            mt: { xs: "3rem", sm: null },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mt: { xs: 0, sm: "0" },
              fontSize: { xs: "1.4rem", sm: "2rem" },
            }}
          >
            {translate("Description")}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: ".8rem", sm: "1rem" },
              mt: "1rem",
              letterSpacing: "1px",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: VideoCourse?.description,
              }}
            />
          </Typography>
          {/* instructor profile */}
          <InstructCourseDetails
            instructor={VideoCourse?.instructor}
            AvatarImg={VideoCourse?.instructor?.avatar}
            Articles={VideoCourse?.instructor?.articles?.length}
            totalViews={VideoCourse?.totalViews}
          />
          {/* instructor profile */}
        </Box>
        {/* add reviews to course */}

        <section
          class="bg-white dark:bg-gray-900 antialiased"
          style={{ width: "100%" }}
        >
          <div class="mx-auto ">
            <div class="flex justify-between items-center mb-6">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mt: { xs: 0, sm: "0" },
                  fontSize: { xs: "1.4rem", sm: "2rem" },
                  textAlign: { xs: "center", sm: "start" },
                  width: "100%",
                }}
              >
                {" "}
                {VideoCourse?.reviews.length === 0 &&
                !VideoCourse?.instructor?.role === "admin"
                  ? `${translate("Be the first to review this course")}`
                  : `${translate("Course Reviews & Ratings")} (${
                      VideoCourse?.reviews?.length
                    })`}
              </Typography>
            </div>
            {/* give rating */}
            {!isReviewed && (
              <HasNotReviewed
                review={review}
                handleChangeReview={handleChangeReview}
                handleSubmitReview={handleSubmitReview}
              />
            )}
          </div>
        </section>

        {/* add reviews to course end */}

        {/* course rating and reivews */}

        {VideoCourse?.length === 0 ? null : (
          <section>
            <div className="mx-auto max-w-7xl ">
              <div className="flex flex-col items-center">
                <div className="text-center md:mt-16 md:order-3">
                  {/* <a
                  href="#"
                  title=""
                  className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
                >
                  Check all 2,157 reviews
                </a> */}
                </div>

                <div className="relative mt-10 md:mt-24 md:order-2">
                  <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                    <div
                      className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                      style={{
                        background:
                          "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                      }}
                    ></div>
                  </div>

                  <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
                    {VideoCourse?.reviews?.map((review) => {
                      console.log(
                        "baseUrl(review?.user?.avatar, 8)",
                        review.user.avatr
                      );
                      return (
                        <div className="flex flex-col overflow-hidden shadow-xl border-gray-300 border-2 rounded-md">
                          <div
                            className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7"
                            style={{
                              minWidth: "293px",
                              minHeight: "295px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 25,
                              }}
                              className="flex-1"
                            >
                              <div className="flex items-center">
                                <Rating
                                  readOnly
                                  value={review?.rating}
                                  precision={0.5}
                                />
                              </div>
                              <Box>
                                <ReactShowMoreText
                                  lines={3}
                                  more={translate("Show more")}
                                  less={translate("Show less")}
                                  className="content-css"
                                  anchorClass="show-more-less-clickable"
                                  expanded={true}
                                  truncatedEndingComponent={"... "}
                                >
                                  {review?.comment}
                                </ReactShowMoreText>
                              </Box>
                            </div>

                            <div className="flex items-center mt-8">
                              <img
                                className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                src={baseUrl(review?.user?.avatar, 8)}
                                alt=""
                              />
                              <div className="ml-4">
                                <p className="text-base font-bold text-gray-900 font-pj">
                                  {review?.user?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* course rating and reivews end */}

        {/* related Courses */}

        {VideoCourse?.newRelatedCourses?.length === 0 ? null : (
          <Box
            sx={{
              px: { xs: 0, sm: "24px" },
              py: { xs: 0, sm: "24px" },
              mt: { xs: "3rem", sm: "6rem" },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mt: { xs: 0, sm: "0" },
                fontSize: { xs: "1.4rem", sm: "2rem" },
              }}
            >
              {translate("Related Courses")}
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Swiper
                slidesPerView={
                  matches_1180 ? (matches_800 ? (matches_500 ? 1 : 2) : 3) : 4
                }
                spaceBetween={150}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination, Navigation]}
                className="mySwiper"
                style={{
                  padding: "5rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {RelatedReview?.map((item, idx) => {
                  if (idx >= 5) return null;
                  return (
                    <SwiperSlide key={idx}>
                      <Course width={"250px"} course={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
          </Box>
        )}

        {/* related Courses end */}

        {/* footer */}
        <Footer />
        {/* footer */}
      </Container>
    </>
  );
};

export default CourseDetails;

const HasNotReviewed = ({ review, handleChangeReview, handleSubmitReview }) => {
  const { translate } = useLocale();
  return (
    <Box>
      <p class=" items-center text-sm text-gray-900 dark:text-white font-semibold">
        {translate("Select Rating")}
      </p>
      <Rating
        name="rating"
        value={review?.rating}
        onChange={handleChangeReview}
        sx={{ mb: "1.2rem", mt: "1rem" }}
      />
      <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label for="comment" class="sr-only">
          {translate("Your comment")}
        </label>
        {/* give comment */}
        <textarea
          id="comment"
          rows="6"
          name="comment"
          onChange={handleChangeReview}
          class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder={translate("Write a comment...")}
          required
        ></textarea>
      </div>
      <button
        onClick={handleSubmitReview}
        style={{
          backgroundColor: "#754ffe",
        }}
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        {translate("Post Review")}
      </button>
    </Box>
  );
};
