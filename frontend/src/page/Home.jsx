import React from "react";
import Hero from "../components/Hero";

import { pageCss } from "./PageCss";
import { Box, Container, Grid, Rating, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ArticleIcon from "@mui/icons-material/Article";
import MovieIcon from "@mui/icons-material/Movie";
import { Link } from "react-router-dom";
import home_count from "../data";
import Course from "../components/Course";
import Category from "../components/Category";

import useMediaQuery from "@mui/material/useMediaQuery";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import Instructor from "./Instructor.jsx";
//

import { useEffect } from "react";
// Import Swiper React components

// components
import Loader from "../components/loader/Loader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slider.css";

// import required modules
import { Navigation } from "swiper/modules";
import { FreeMode, Pagination } from "swiper/modules";

//
import useLocale from "../hook/useLocales";
import ArticleSwiper from "./ArticleSwiper";

// redux
import { useDispatch, useSelector } from "react-redux";

// Course Store
import {
  Video_AllCourse,
  selectIsLoading,
  selectAllCourses,
} from "../store/features/video/courses/videoCoursesSlice";
// Course Categories Store
import {
  Video_AllCategories,
  selectVideoAllCategories,
  selectIsLoading as Category_isLoading,
} from "../store/features/video/category/videoCategorySlice";

// Article Store
import {
  getAllArticles,
  selectAllArticles,
} from "../store/features/article/articleSlice";

// Article category
import {
  ArticleAllCategory,
  selectAllArticleCategories,
} from "../store/features/article/category/articleCategorySlice";

// global Reviews
import {
  AllGlobalReviews,
  selectAllGlobalReviews,
} from "../store/features/globalReviews/globalReviewSlice";

// moment
import moment from "moment";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
import baseUrl from "../utils/baseUrl";
import useRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import {
  getAdminProfile,
  selectAdminProfile,
} from "../store/auth/admin/adminSlice";

const Home = () => {
  //
  useRedirectLoggedOutUser("/login");

  // redux
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const AllCourses = useSelector(selectAllCourses);
  const AllArticles = useSelector(selectAllArticles);
  const video_Category = useSelector(selectVideoAllCategories);
  const ArticleCategories = useSelector(selectAllArticleCategories);
  const adminProfile = useSelector(selectAdminProfile);
  const data = useSelector(selectAllGlobalReviews);
  const AllGlobalReview = data.AllReviews;

  let countAverageRating = 0;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(Video_AllCourse());
    dispatch(Video_AllCategories());
    dispatch(getAllArticles());
    dispatch(ArticleAllCategory());
    dispatch(AllGlobalReviews());
    dispatch(getAdminProfile);
  }, []);

  const { translate, currentLang } = useLocale();

  const classes = pageCss();

  const matches_1180 = useMediaQuery("(max-width:1180px)");
  const matches_800 = useMediaQuery("(max-width:800px)");
  const matches_500 = useMediaQuery("(max-width:500px)");
  const matches_450 = useMediaQuery("(max-width:450px)");

  // article review count
  AllArticles?.reviews?.forEach((review) => {
    countAverageRating += review?.rating;
  });

  countAverageRating = (
    countAverageRating / AllArticles?.reviews?.length
  ).toFixed(1);

  const findLangLocale = (language) => {
    if (!language) {
      return "";
    }
    if (language === "dari") {
      return "دری";
    } else if (language === "pashto") {
      return "پښتو";
    } else if (language === "arabic") {
      return "عربی";
    } else {
      return language;
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Hero />

      <Box className={classes.home_course_section}>
        <Container maxWidth="lg">
          <Box
            sx={{
              paddingTop: { xs: "0", sm: "8rem" },
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  textAlign: { xs: "center", sm: "start" },
                  fontWeight: "500 !important",
                  fontSize: {
                    xs: "1.4rem !important",
                    sm: "2rem !important",
                  },
                }}
              >
                {translate("Courses For you")}
              </Typography>
              <Link
                to="/courses"
                style={{
                  fontSize: "1rem",
                  color: "#754ffe",
                }}
              >
                {translate("View All")}
              </Link>
            </Box>

            {/* courses row */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "start" },
                gap: "2rem",
                height: "30rem",
                direction:
                  document.documentElement.dir === "rtl" ? "ltr" : "ltr",
              }}
            >
              <Swiper
                slidesPerView={
                  matches_1180 ? (matches_800 ? (matches_500 ? 1 : 2) : 3) : 4
                }
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination, Navigation]}
                className="mySwiper"
              >
                {AllCourses?.map((item, idx) => {
                  if (idx >= 15) {
                    return;
                  }
                  return (
                    <SwiperSlide key={idx}>
                      <Course course={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
          </Box>

          {/* Read */}

          <Box className={classes.home_course}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: { xs: "5rem", sm: "7rem" },
                marginBottom: "-7rem",
              }}
            >
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  textAlign: { xs: "center", sm: "start" },
                  fontWeight: "400 !important",
                  fontSize: {
                    xs: "1.4rem !important",
                    sm: "2.2rem !important",
                  },
                }}
              >
                {translate("Read")}
              </Typography>

              <Link
                to="/articles"
                style={{
                  fontSize: "1rem",
                  color: "#754ffe",
                }}
              >
                {translate("View All")}
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "start" },
                gap: "2rem",
                height: "30rem",
                direction:
                  document.documentElement.dir === "rtl" ? "ltr" : "ltr",
              }}
            >
              <ArticleSwiper
                AllArticles={AllArticles}
                findLangLocale={findLangLocale}
                matches_1180={matches_1180}
                matches_800={matches_800}
                matches_500={matches_500}
                matches_450={matches_450}
              />
            </Box>
          </Box>
          {/* Top Categories */}

          <Box
            sx={{
              gap: 5,
              mb: "1rem",
              mt: "1rem",
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                textAlign: { xs: "center", sm: "start" },
                mt: { xs: "2rem", sm: "3rem" },
                marginBottom: { xs: "4rem", sm: "5rem" },
                fontWeight: "400 !important",
                fontSize: {
                  xs: "1.4rem !important",
                  sm: "2.2rem !important",
                },
              }}
            >
              {translate("Top Categories")}

              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      title={translate("Courses")}
                      icon={<MovieIcon />}
                      label={translate("Courses")}
                      {...a11yProps(0)}
                    />
                    <Tab
                      title={translate("Article")}
                      icon={<ArticleIcon />}
                      label={translate("Article")}
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", sm: "start" },
                      flexWrap: "wrap",
                      gap: "2rem",
                      direction:
                        document.documentElement.dir === "rtl" ? "ltr" : "ltr",
                    }}
                  >
                    {video_Category
                      ? video_Category?.map((item, idx) => {
                          return (
                            <Category
                              link={"/category/course"}
                              cate={item}
                              name={item.name}
                              image={item.image}
                              key={idx}
                            />
                          );
                        })
                      : translate("No Category")}
                  </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", sm: "start" },
                      flexWrap: "wrap",
                      gap: "2rem",
                      direction:
                        document.documentElement.dir === "rtl" ? "ltr" : "ltr",
                    }}
                  >
                    {ArticleCategories
                      ? ArticleCategories?.allCategoreis?.map((cate, idx) => {
                          return (
                            <Category
                              link={"/category/article"}
                              cate={cate}
                              name={cate.name}
                              image={cate.image}
                              key={idx}
                            />
                          );
                        })
                      : "No Category"}
                  </Box>
                </CustomTabPanel>
              </Box>
            </Typography>
          </Box>

          {/* testimonials section start */}
          <section>
            <div className=" mx-auto max-w-7xl ">
              <div className="flex flex-col items-center">
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    width: "100%",
                    textAlign: { xs: "center", sm: "start" },
                    fontWeight: "400 !important",
                    fontSize: {
                      xs: "1.4rem !important",
                      sm: "2.2rem !important",
                    },
                    mt: { xs: "2rem", sm: "6rem" },
                  }}
                >
                  {translate("Our happy clients say about us")}
                </Typography>

                <div className="text-center md:mt-16 md:order-3"></div>

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

                  <div
                    style={{
                      direction:
                        document.documentElement.dir === "rtl" ? "ltr" : "ltr",
                    }}
                    className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3"
                  >
                    {AllGlobalReview?.map((review, idx) => {
                      if (idx >= 3) {
                        return;
                      }
                      return (
                        <div className="  flex flex-col overflow-hidden shadow-xl border-indigo-500  rounded-md">
                          <div
                            className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7"
                            style={{
                              minWidth: "293px",
                              minHeight: "295px",
                            }}
                          >
                            <div className="flex-1">
                              <div className="flex items-center">
                                <Rating
                                  readOnly
                                  value={review?.rating}
                                  precision={0.5}
                                />
                              </div>

                              <blockquote
                                style={{ whiteSpace: "pre-wrap" }}
                                className="flex-1 mt-8"
                              >
                                <p className="  text-lg leading-relaxed text-gray-900 font-pj">
                                  {review?.comment}
                                </p>
                              </blockquote>
                            </div>

                            <div className="flex items-center mt-8">
                              <Link to={`/user/${review?.user?._id}`}>
                                <img
                                  className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                  src={baseUrl(review?.user?.avatar, 8)}
                                  alt=""
                                />
                              </Link>
                              <Link to={`/user/${review?.user?._id}`}>
                                <div className="ml-4">
                                  <p className="text-base font-bold text-gray-900 font-pj">
                                    {review?.user?.name}
                                  </p>
                                  <p className="mt-0.5 text-sm font-pj text-gray-600">
                                    {review?.user?.bio?.length > 20
                                      ? `${review?.user?.bio?.slice(0, 20)}...`
                                      : review?.user?.bio}
                                  </p>
                                </div>
                              </Link>
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
        </Container>

        {/* testimonials section end */}

        {/* our achievmetns */}
        <Box
          className={classes.home_count_section}
          sx={{
            mb: "4rem",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h3"
              sx={{
                color: "black",
                fontSize: {
                  xs: "1.4rem !important",
                  sm: "2.2rem !important",
                },
                textAlign: { xs: "center", sm: "start" },
                mb: { xs: "4rem", sm: "5rem" },
                mt: { xs: "2rem", sm: "4rem" },
              }}
            >
              {translate("Our Achievements")}
            </Typography>
            <Grid
              sx={{
                direction:
                  document.documentElement.dir === "rtl" ? "ltr" : "ltr",
                justifyContent: "center",
              }}
              container
              spacing={2}
            >
              {home_count(adminProfile).map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    className={classes.count_icon_box}
                    sx={{
                      justifyContent: { xs: "center", sm: "start" },
                    }}
                  >
                    <Box className={classes.count_icon}>{item.icon}</Box>
                    <Box className={classes.count_content}>
                      <Typography
                        variant="h4"
                        component="h4"
                        className={classes.count_title}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        component="p"
                        className={classes.count_des}
                      >
                        {translate(item.des)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Instructor />

        {/* our achievments end */}
      </Box>
      <Footer />
    </>
  );
};

export default Home;
