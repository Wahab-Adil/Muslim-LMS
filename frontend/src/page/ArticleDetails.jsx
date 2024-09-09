import React, { useEffect, useState } from "react";
import { pageCss } from "./PageCss";

import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  Grid,
  Rating,
  Divider,
} from "@mui/material";
import { Link, NavLink, useParams } from "react-router-dom";
import { comCss } from "../components/ComponentsCss";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";

// redux
import { useDispatch, useSelector } from "react-redux";

// store
import {
  ArticleDetails,
  selectArticle,
  selectIsLoading,
} from "../store/features/article/articleSlice";

// store
import {
  ArticleCreateReview,
  selectIsLoading as ReviewLoading,
} from "../store/features/article/reviews/articleReviewsSlice";

import Loader from "../components/loader/Loader";
import ReactQuill from "react-quill";
import { addArticleToPlayllist } from "../store/auth/user/userSlice";

import moment from "moment";
import baseUrl from "../utils/baseUrl";

import useRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";

const ArticleDetials = () => {
  useRedirectLoggedOutUser("/login");
  // redux
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const ArticleDetail = useSelector(selectArticle);

  // state
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  const [isReviewed, setIsReviewed] = useState();

  const createArticleReview = async () => {
    const data = {
      id: ArticleDetail?.article?.id,
      rating: review?.rating,
      comment: review?.comment,
    };
    const res = await dispatch(ArticleCreateReview(data));
    setIsReviewed(res?.payload?.success);
  };

  useEffect(() => {
    dispatch(ArticleDetails(id));
  }, [isReviewed === true]);

  const handleChangeReview = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const classes = pageCss();
  const comclasses = comCss();

  const matches_450 = useMediaQuery("(max-width:450px)");

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
      <Container maxWidth="lg">
        <Box
          className={classes.blog_post_img_box}
          sx={{
            backgroundColor: "white",
            padding: "0.5rem", // Adjusted padding value
            height: "fit-content",
            position: "relative", // Ensure positioning context for absolute elements
            overflow: "hidden", // Hide overflow content
          }}
        >
          <img
            src={baseUrl(ArticleDetail?.article?.thumbnail, 8)}
            alt="blog img"
            className={classes.blog_post_img}
            style={{
              width: "100%", // Ensure image fills container width
              height: "auto", // Maintain aspect ratio
              objectFit: "cover", // Cover the area without distorting the image
              display: "block", // Remove any unwanted spacing
            }}
          />
          <Box
            className="absolute left-0 bottom-0 w-full z-10"
            sx={{
              backgroundImage:
                "linear-gradient(180deg, transparent, rgba(0,0,0,.7))",
              height: "80%",
              borderRadius: "8px",
            }}
          ></Box>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="p-4 absolute bottom-0 left-0 z-20"
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#754ffe",
                borderRadius: "4px",
                marginRight: "2rem",
                cursor: "default",
              }}
              className="px-4 py-1 text-gray-200 inline-flex items-center justify-center mb-2"
            >
              <Typography>{ArticleDetail?.article?.category}</Typography>
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#754ffe",
                borderRadius: "4px",
              }}
              className="px-4 py-1 text-gray-200 inline-flex items-center justify-center mb-2"
              onClick={() => {
                dispatch(addArticleToPlayllist(ArticleDetail?.article?.id));
              }}
            >
              <Typography>Add To PlayList</Typography>
            </Button>
          </div>
        </Box>

        <div className="p-4  bottom-0 left-0 z-20">
          <Typography
            variant="h4"
            className="text-4xl font-semibold leading-tight"
            sx={{
              fontSize: matches_450 ? ".9rem" : "2.3rem",
              fontWeight: "500",
            }}
          >
            {ArticleDetail?.article?.title}
          </Typography>
          <Link to={`/user/${ArticleDetail?.article?.writer?._id}`}>
            <div className="flex mt-3">
              <img
                src={baseUrl(ArticleDetail?.article?.writer?.avatar, 8)}
                className="h-10 w-10 rounded-full mr-2 object-cover"
              />
              <div>
                <p className="font-semibold text-sm">
                  {ArticleDetail?.article?.writer?.name}
                </p>

                <p className="font-semibold text-gray-400 text-xs">
                  {moment(ArticleDetail?.article?.updatedAt).format(
                    "MMMM Do YYYY"
                  )}
                </p>
                <p className="font-semibold text-gray-400 text-xs">
                  {moment(
                    moment(ArticleDetail?.article?.updatedAt),
                    "MMMM Do YYYY"
                  ).fromNow()}
                </p>
              </div>
            </div>
          </Link>
        </div>

        <Box>
          <Typography
            sx={{
              mt: "1rem",
              letterSpacing: "1px",
              lineHeight: "2.2rem",
            }}
            variant="h6"
          ></Typography>
          <div
            dangerouslySetInnerHTML={{
              __html: ArticleDetail?.article?.description,
            }}
          />
        </Box>
      </Container>

      {/* Add a review */}

      <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <Divider />
        <div class="flex justify-between items-center mb-6">
          <h2 class=" px-10 text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Reviews ({ArticleDetail?.article?.reviews?.length})
          </h2>
        </div>
        <div class="max-w-2xl mx-auto px-4">
          {!ArticleDetail?.HasReviewed && (
            <HasNotReviewed
              review={review}
              handleChangeReview={handleChangeReview}
              createArticleReview={createArticleReview}
            />
          )}
        </div>
        {ArticleDetail?.article?.reviews?.length === 0 ? null : (
          <section>
            <div className="mx-auto max-w-7xl ">
              <div className="flex flex-col items-center">
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

                  <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
                    {ArticleDetail?.article?.reviews?.map((review) => {
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
        )}
      </section>

      {/* Add a review end */}

      {/* Related Articles */}

      <Box className={classes.blog_section_all} sx={{ mt: "4rem" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mt: { xs: "3rem", sm: "0" },
              mb: { xs: "3rem" },
              fontSize: { xs: "1.4rem", sm: "2rem" },
            }}
          >
            Related Articles
          </Typography>
          <Grid container spacing={3}>
            {ArticleDetail?.newRelatedArticle.map((artcl, idx) => {
              if (idx >= 4) return;
              return (
                <Grid item xs={12} sm={4} key={artcl}>
                  <ArticleCard article={artcl} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      {/* Related Articles end */}

      {/* <!-- Footer --> */}

      <Footer />

      {/* <!-- Footer --> */}
    </>
  );
};

export default ArticleDetials;

const HasNotReviewed = ({
  review,
  handleChangeReview,
  createArticleReview,
}) => {
  return (
    <>
      <p class=" items-center text-sm text-gray-900 dark:text-white font-semibold">
        Select Ratings
      </p>
      <Rating
        name="rating"
        value={review?.rating}
        onChange={handleChangeReview}
        sx={{ mb: "1.2rem", mt: "1rem" }}
      />
      <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label for="comment" class="sr-only">
          Your comment
        </label>
        {/* give comment */}
        <textarea
          onChange={handleChangeReview}
          id="comment"
          rows="6"
          name="comment"
          class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          required
        ></textarea>
      </div>
      <button
        onClick={createArticleReview}
        style={{
          backgroundColor: "#754ffe",
        }}
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>
    </>
  );
};
