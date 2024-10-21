import { Alert, Avatar, Hidden, Stack, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { motion } from "framer-motion";
import moment from "moment";

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

import styled from "styled-components";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "../App.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import { Box, Typography, Rating } from "@mui/material";
import { DeleteForever, RemoveRedEyeRounded } from "@mui/icons-material";

import {
  RemoveArticleFromPlayllist,
  RemoveFromPlaylist,
} from "../store/auth/user/userSlice";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const starsStyle = {
  fontSize: ".8rem",
  color: "#b4690e",
};
const ratings = {
  stars: [
    <FaStar style={starsStyle} />,
    <FaStar style={starsStyle} />,
    <FaStar style={starsStyle} />,
    <FaStar style={starsStyle} />,
    <FaStarHalfAlt style={starsStyle} />,
  ],
  title: "4.5",
};

import {
  getUserProfile,
  selectIsLoading,
  selectUserProfile,
} from "../store/auth/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import baseUrl from "../utils/baseUrl";
import useLocale from "../hook/useLocales";
import useRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";

const InstructorProfile = () => {
  useRedirectLoggedOutUser("/login");
  const { translate } = useLocale();
  const navigate = useNavigate();
  // redux
  const courseId = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const userProfile = useSelector(selectUserProfile);

  console.log("urser", userProfile);
  useEffect(() => {
    dispatch(getUserProfile(courseId?.id));
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const matches_450 = useMediaQuery("(max-width:450px)");
  const matches_480 = useMediaQuery("(max-width:480px)");
  const [deleteArticleId, setDeleteArticleId] = useState();
  const [deleteCourseId, setDeleteCourseId] = useState();
  const [DialogMsg, setDialogMsg] = useState();
  const [DeleteAction, setDeleteAction] = useState();

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

  if (userProfile.user.role === "admin") {
    navigate("/admin");
  }

  return (
    <>
      {isLoading && <Loader />}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ px: "10rem" }}>
          {" "}
          {translate("Section Alert")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {DialogMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{translate("Disagree")}</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (DeleteAction === "course") {
                dispatch(RemoveFromPlaylist(deleteCourseId));
              } else if (DeleteAction === "article") {
                dispatch(RemoveArticleFromPlayllist(deleteArticleId));
              }

              handleClose();
            }}
          >
            {translate("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
      {/* {isLoading && <Loader />} */}
      {userProfile?.user?.role !== "admin" ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: 4,
              backgroundColor: "#f5f4f88c !important",
            }}
          >
            {/* container for two rows */}
            <Box
              sx={{
                mt: { xs: 0, sm: "4rem" },

                maxWidth: "1024px",
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
                gap: "3rem",
              }}
            >
              {/* row 1, name and other details */}
              <Box
                sx={{
                  marginBottom: "7rem",
                  px: { xs: "20px", sm: "32px" },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,

                    fontSize: "1.4rem",
                    color: "gray",
                  }}
                >
                  {translate("Your Name")}
                </Typography>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "2rem", sm: "3rem" },
                    }}
                  >
                    {userProfile?.user?.name}
                  </Typography>
                </Box>

                {/* About me */}
                <Box
                  sx={{
                    mt: "1.5rem",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mt: "2rem",
                      mb: "1rem",
                      color: "#754ffe",
                      fontSize: "1.4rem",
                    }}
                  >
                    {translate("About Me")}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      maxWidth: { xs: "auto", sm: "43vw" },
                    }}
                  >
                    {userProfile?.user?.bio}
                  </Typography>
                </Box>
                {/* about me end */}
              </Box>

              {/* row 2, image and links */}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  px: { xs: "20px", sm: "32px" },
                  marginTop: { xs: "3rem", sm: "0" },
                }}
              >
                <Avatar
                  alt={userProfile?.user?.name}
                  src={
                    userProfile?.user?.avatar &&
                    baseUrl(userProfile?.user?.avatar, 8)
                  }
                  sx={{
                    width: 200,
                    height: 200,
                    border: "3px solid  #754ffe",
                    margin: "auto",
                  }}
                />
                <Hidden smDown>
                  <Stack
                    sx={{
                      justifyContent: "center",
                      mt: "3rem",
                      gap: ".5rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        px: "3rem",
                        border: "1px solid #754ffe",
                        height: "3.2rem",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: ".4rem",
                        "&:hover": {
                          backgroundColor: "#edededbd",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "500",
                        }}
                      >
                        {`Email:${userProfile?.user?.email}`}
                      </Typography>
                    </Box>
                  </Stack>
                </Hidden>
              </Box>
            </Box>
          </Box>
          <Box sx={{ padding: "20px" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mt: "3rem",
                mb: "2rem",
                fontSize: "1.4rem",
              }}
            >
              {translate("Course PlayList")}(
              {userProfile?.user?.playlist?.length})
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "start" },
                gap: "1rem",
              }}
            >
              {userProfile?.user?.playlist?.map((item, idx) => {
                if (idx >= 5) {
                  return;
                }
                return (
                  <CourseCard>
                    <motion.div
                      className="item-img"
                      style={{
                        position: "relative",
                        backgroundColor: "white",
                        padding: "0rem.5rem",
                        height: "fit-content",
                        borderRadius: "8px", // Rounded corners for the card
                        boxShadow: "0 4px 8px rgba(23, 0, 0, 0.1)", // Base shadow for the card
                        transition: "box-shadow 0.3s ease, transform 0.3s ease",
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
                        boxShadow: "0 8px 16px rgba(0,0,0,0.3)", // Ensure box-shadow is consistent with the hover effect
                      }}
                      whileTap={{ scale: 1.03 }}
                    >
                      <div>
                        <Typography
                          sx={{
                            position: "absolute",
                            top: "7.5rem",
                            right: "8px",
                            fontSize: ".9rem",
                            backgroundColor: "#754ffe",
                            color: "white",
                            px: ".8rem",
                            borderRadius: "3px",
                          }}
                        >
                          {findLangLocale(item?.language)}
                        </Typography>
                        <img
                          style={{ height: "200px" }}
                          src={baseUrl(item?.thumbnail, 8)}
                          alt={item?.title}
                        />
                      </div>
                      <div className="item-body">
                        <Typography
                          style={{
                            textAlign: "start",
                            fontSize: ".9rem",
                            fontWeight: 600,
                          }}
                        >
                          {item?.title?.slice(0, 50)}
                        </Typography>
                        <Typography
                          component={"p"}
                          sx={{
                            fontSize: "12px",
                            textAlign: "start",
                            mt: "8px",
                            textTransform: "capitalize",
                          }}
                        >
                          {item?.instructor?.name}
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
                                {ratings?.stars?.map((star, idx) => {
                                  return star;
                                })}
                              </Box>
                            </Box>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: ".9rem",
                              fontWeight: "600",
                            }}
                          >
                            <span
                              style={{
                                marginLeft: ".5rem",
                              }}
                            >
                              ({item?.totalReviews})
                            </span>
                          </Typography>
                        </Box>
                      </div>
                      <div className="item-btns flex justify-evenly">
                        <Link
                          to={`/course-details/${item?.id}`}
                          className="item-btn see-details-btn"
                        >
                          {translate("See details")}
                        </Link>
                        <button
                          onClick={() => {
                            setDeleteAction("course");
                            setDeleteCourseId(item?.id);
                            setDialogMsg(
                              " Are You Sure To Remove Course From Wish list"
                            );

                            handleClickOpen();
                          }}
                          className="item-btn add-to-cart-btn"
                        >
                          {translate("Remove")}
                        </button>
                      </div>
                    </motion.div>
                  </CourseCard>
                );
              })}
            </Box>
          </Box>
          <Box sx={{ padding: "20px" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mt: "3rem",
                mb: "2rem",
                fontSize: "1.4rem",
              }}
            >
              {translate("Article PlayList")}(
              {userProfile?.user?.articlesPlaylist?.length})
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "start" },
                gap: "1rem",
              }}
            >
              {userProfile?.user?.articlesPlaylist?.map((article, idx) => {
                if (idx >= 5) {
                  return;
                }
                let countAverageRating = 0;
                article?.reviews?.forEach((review) => {
                  countAverageRating += review?.rating;
                });
                countAverageRating = (
                  countAverageRating / article?.reviews?.length
                ).toFixed(1);
                return (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "400px", // Ensure full width for the Box container
                      mb: 2, // Margin bottom for spacing between cards
                      height: "100px",
                      marginBottom: "4rem",
                    }}
                    key={idx}
                  >
                    <Link
                      style={{
                        flex: 1,
                        width: matches_450 ? "60%" : "50%",
                        textDecoration: "none",
                      }}
                      to={`/article-details/${article?.id}`}
                    >
                      <motion.div
                        className="flex max-w-lg overflow-hidden bg-white rounded-lg dark:bg-gray-800"
                        style={{
                          position: "relative",
                          backgroundColor: "white",
                          padding: "0.5rem", // Ensure padding is consistent
                          height: "fit-content",
                          maxHeight: matches_450 ? "230px" : "260px",
                          alignItems: "start",
                          border: "1px solid rgba(100,20,0,0.3)",
                          transition: "box-shadow 0.3s, transform 0.3s",
                          boxShadow: "0px 0px 8px  rgba(100,20,0,0.3)",
                        }}
                        initial={{
                          opacity: 0,
                          x:
                            document.documentElement.dir === "rtl" ? 150 : -150,
                          y:
                            document.documentElement.dir === "rtl" ? 150 : -150,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: 0,
                        }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 8px 16px rgba(0,0,0,0.3)", // Ensure box-shadow is consistent with the hover effect
                        }}
                        whileTap={{ scale: 1.03 }}
                      >
                        <span
                          style={{
                            backgroundColor: "#754ffe",
                          }}
                          className="z-30 absolute top-0 left-2 w-20 translate-y-4 -translate-x-6 -rotate-45 text-center text-sm text-white"
                        >
                          {findLangLocale(article?.language)}
                        </span>
                        <Box>
                          <img
                            style={{
                              minHeight: "190px",
                              maxHeight: "190px",
                              borderRight: "3px dotted white",
                              maxWidth: "190px", // Ensure image fits within its container
                              objectFit: "cover",
                            }}
                            src={baseUrl(article?.thumbnail, 8)}
                            alt={article?.thumbnail}
                          />
                        </Box>
                        <Box
                          sx={{
                            width: "10rem",
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
                              flexDirection: "column",
                              gap: ".5rem", // Added spacing between elements
                            }}
                          >
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
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                  mt: 1, // Margin top for spacing between buttons
                                }}
                              >
                                <Link to={`/article-details/${article?.id}`}>
                                  <Box>
                                    <RemoveRedEyeRounded />
                                  </Box>
                                </Link>

                                <Box>
                                  <DeleteForever
                                    onClick={() => {
                                      setDeleteAction("article");
                                      setDialogMsg(
                                        "Are You Sure To Remove Article From Wish List"
                                      );
                                      setDeleteArticleId(article?.id);
                                      handleClickOpen();
                                    }}
                                    sx={{
                                      color: "red",
                                      "&:hover": {
                                        cursor: "pointer",
                                      },
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Typography
            component={"p"}
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              textAlign: "center",
              mt: "180px",
            }}
          >
            {translate("You Are Admin")}

            <br />
            <a
              style={{
                margin: "auto",
                textDecoration: "underline",
                color: "blue",
              }}
              href="/admin"
            >
              {translate("go to Admin Dashboard")}
            </a>
          </Typography>
        </>
      )}
      <Footer />
    </>
  );
};

export default InstructorProfile;

const CourseCard = styled.div`
  width: 280px;
  box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 400px) {
    width: 280px;
  }

  .item-body {
    margin: 10px 0;
    padding: 4px 18px;

    .item-name {
      font-size: 14px;
      line-height: 1.4;
      font-weight: 600;
      text-align: start;
    }
    .item-creator {
      font-size: 12.5px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
    .rating-star-val {
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 800;
      color: #b4690e;
      margin-right: 6px;
    }
    .rating-count {
      font-size: 12.5px;
      margin-left: 3px;
      font-weight: 500;
      opacity: 0.8;
    }
    .item-price-new {
      font-weight: 700;
      font-size: 15px;
    }
    .item-price-old {
      opacity: 0.8;
      font-weight: 500;
      text-decoration: line-through;
      font-size: 15px;
      margin-left: 8px;
    }
  }

  .item-btns {
    justify-self: flex-start;
    padding: 4px 8px 20px 18px;
    margin-top: auto;
    .item-btn {
      font-size: 15px;
      display: inline-block;
      padding: 6px 16px;
      font-weight: 700;
      transition: var(--transition);
      white-space: nowrap;

      &.see-details-btn {
        background-color: transparent;
        border: 1px solid #754ffe;
        margin-right: 5px;
        color: #754ffe;
        font-size: 0.8rem;
        font-weight: 600;

        &:hover {
          background-color: #754ffe;
          color: var(--clr-white);
        }
      }

      &.add-to-cart-btn {
        background: #754ffe;
        color: var(--clr-white);
        border: 1px solid #754ffe;
        font-size: 0.8rem;
        font-weight: 600;

        &:hover {
          background-color: transparent;
          color: #754ffe;
        }
      }
    }
  }
`;
