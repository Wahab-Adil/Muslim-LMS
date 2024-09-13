import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import { Box, Typography, Rating, Stack, useMediaQuery } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

import moment from "moment";
import baseUrl from "../../../utils/baseUrl";
import { motion } from "framer-motion";

const Article = ({ article }) => {
  const matches_450 = useMediaQuery("(max-width:450px)");

  const findLangLocale = (language) => {
    if (!language) {
      return "";
    }
    if (language === "dari") {
      return "دری";
    } else if (language === "pashto") {
      return "پښتو";
    } else {
      return language;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        position: "relative",
      }}
    >
      <Link
        style={{
          padding: ".5rem",
          flex: 1,
          width: matches_450 ? "60%" : "350px",
          textDecoration: "none", // Ensure links don't have underlines
        }}
        to={`/article-details/${article?.id}`}
      >
        <motion.div
          className="flex max-w-lg overflow-hidden bg-white rounded-lg dark:bg-gray-800"
          style={{
            backgroundColor: "white",
            position: "relative",
            padding: "0rem.5rem",
            height: "fit-content",
            maxHeight: matches_450 ? "130px" : "100%",
            alignItems: "start",
            border: "1px solid gray", // Border color
            borderRadius: "8px", // Rounded corners
            boxShadow: "0px 2px 10px gray", // Initial box-shadow
            transition: "box-shadow 0.3s, transform 0.3s", // Smooth transitions
          }}
          initial={{
            opacity: 0,
            x: document.documentElement.dir === "rtl" ? 0 : -100,
            y: document.documentElement.dir === "rtl" ? 0 : 0,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          whileHover={{
            scale: 1.01,
            boxShadow: "#754ffe 0px 4px 15px", // Hover shadow
          }}
          whileTap={{ scale: 1.03 }}
        >
          <span
            style={{
              backgroundColor: "#754ffe",
            }}
            className="z-30 absolute top-0 left-5 w-12 translate-y-4 -translate-x-6 -rotate-50 bg-black text-center text-sm text-white"
          >
            {findLangLocale(article?.language)}
          </span>
          <Box>
            <img
              style={{
                minHeight: "190px",
                maxHeight: "190px",
                width: "100%",
                borderRight: "2px dotted #754ffe",
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
                        fontSize: ".5rem",
                        fontWeight: "bold",
                        margin: 0,
                        color: "gray",
                      }}
                    >
                      {moment(article?.createdAt).format("YYYY-MM-DD")}
                    </span>
                    <span
                      style={{
                        fontSize: ".5rem",
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      -(
                      {moment(
                        moment(article?.createdAt).format("MMMM Do YYYY"),
                        "MMMM Do YYYY"
                      ).fromNow()}
                      )
                    </span>
                  </Box>
                </Box>
              </Link>
            </Box>
          </Box>
        </motion.div>
      </Link>
    </Box>
  );
};

export default Article;
