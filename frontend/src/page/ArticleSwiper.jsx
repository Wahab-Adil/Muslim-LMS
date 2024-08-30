import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Pagination } from "swiper/modules";
import { Box, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import moment from "moment";
import { motion, useScroll, useTransform } from "framer-motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slider.css";


const ArticleSwiper = ({
  AllArticles,
  findLangLocale,
  matches_1180,
  matches_800,
  matches_500,
  matches_450,
}) => {
  // Scroll-related animations
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]); // Adjust the scroll range and movement

  return (
    <Swiper
      slidesPerView={
        matches_1180 ? (matches_800 ? (matches_500 ? 1 : 1) : 2) : 3
      }
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination, Navigation]}
      className="mySwiper"
      >
      <Box
        className="rounded-lg bg-white shadow relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3"
        sx={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "space-between" },
        }}
      >
        {AllArticles?.map((article, idx) => {
          if (idx >= 10) {
            return null;
          }
          let countAverageRating = 0;
          article?.reviews?.forEach((review) => {
            countAverageRating += review?.rating;
          });
          countAverageRating = (
            countAverageRating / article?.reviews?.length
          ).toFixed(1);

          return (
            <SwiperSlide key={idx}>
              <Link
                style={{
                  flex: 1,
                  width: matches_450 ? "60%" : "50%",
                }}
                to={`/article-details/${article?.id}`}
              >
                <motion.div
                  className="flex max-w-lg overflow-hidden bg-white rounded-lg dark:bg-gray-800"
                  style={{
                    position: "relative",
                    backgroundColor: "white",
                    padding: "0rem.5rem",
                    height: "fit-content",
                    maxHeight: matches_450 ? "130px" : "100%",
                    alignItems: "start",
                    y, // Apply scroll-based vertical movement
                    transition: "box-shadow 0.3s, transform 0.3s", // Transition for hover effect
                  }}
                  initial={{
                    opacity: 0,
                    x: document.documentElement.dir === "rtl" ? 150 : -150,
                    y: document.documentElement.dir === "rtl" ? 150 : -150,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "#754ffe 0px 4px 15px",
                  }}
                  whileTap={{ scale: 1.03 }}
                >
                  <span
                    style={{
                      backgroundColor: "#754ffe",
                    }}
                    className="z-30 absolute top-0 left-2 w-20 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white"
                  >
                    {findLangLocale(article?.language)}
                  </span>
                  <Box>
                    <img
                      style={{
                        minHeight: "190px",
                        maxHeight: "190px",
                        borderRight: "3px dotted white",
                      }}
                      src={baseUrl(article?.thumbnail, 8)}
                      alt={article?.thumbnail}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "15rem",
                      px: "1rem",
                      py: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Typography
                      style={{
                        textAlign: "start",
                        fontSize: ".9rem",
                        fontWeight: 700,
                      }}
                    >
                      {article?.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        <Rating
                          sx={{ mt: ".5rem" }}
                          size="small"
                          readOnly
                          value={parseFloat(
                            article?.averageRating === "NaN"
                              ? 0
                              : article?.averageRating
                          )}
                          precision={0.5}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: ".9rem",
                          fontWeight: "600",
                          color: "#b4690e",
                        }}
                      >
                        {countAverageRating === "NaN"
                          ? null
                          : countAverageRating}
                        <span
                          style={{
                            marginLeft: ".3rem",
                            color: "black",
                          }}
                        >
                          ({article.totalReviews})
                        </span>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Link to={`/user/${article?.writer?._id}`}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{
                              height: "2rem",
                              width: "2rem",
                            }}
                            className="object-cover rounded-full"
                            src={baseUrl(article?.writer?.avatar, 8)}
                            alt="Avatar"
                          />
                          <Box
                            sx={{
                              ml: ".6rem",
                              alignItems: "start",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: ".8rem",
                                fontWeight: "bold",
                                margin: 0,
                                color: "#754ffe",
                                "&:hover": {
                                  color: "#a190e2",
                                },
                              }}
                            >
                              {article?.writer?.name}
                            </Typography>
                            <span
                              style={{
                                fontSize: ".7rem",
                                fontWeight: "bold",
                                margin: 0,
                                color: "gray",
                              }}
                            >
                              {moment(article?.createdAt).format(
                                "MMMM Do YYYY"
                              )}
                            </span>
                            <span
                              style={{
                                fontSize: ".7rem",
                                fontWeight: "bold",
                                margin: 0,
                                color: "gray",
                              }}
                            >
                              {moment(
                                moment(article?.createdAt).format(
                                  "MMMM Do YYYY"
                                ),
                                "MMMM Do YYYY"
                              ).fromNow()}
                            </span>
                          </Box>
                        </Box>
                      </Link>
                    </Box>
                  </Box>
                </motion.div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Box>
    </Swiper>
  );
};

export default ArticleSwiper;
