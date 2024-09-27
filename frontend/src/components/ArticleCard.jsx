import React from "react";
import { pageCss } from "../page/PageCss";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import BaseUrl from "../utils/baseUrl";
import moment from "moment";

const ArticleCard = ({ article }) => {
  const classes = pageCss();
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
      <Box
        className="rounded-lg bg-white shadow relative max-w-lg mx-auto hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        sx={{
          display: "flex",
          flexDirection: "row", // Stack vertically on small screens, side by side on medium and larger screens
          border: "3px solid white",
          borderRadius: "20px",
          margin: "1rem auto",
          overflow: "hidden", // Ensure content stays within the box
          position: "relative",
          maxHeightheight: "200px",
          "&:hover": {
            boxShadow: "0px 4px 20px #754ffe", // Darker shadow on hover
            transform: "scale(1.01)",
            transition: ".7s ease", // Slightly scale up on hover
          },
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            position: "relative",
            flex: "1", // Takes up half the width of the container
          }}
          className={classes.blog_section_box_thumbnail}
        >
          <Link target="__blank" to={`/article-details/${article?.id}`}>
            <span
              style={{
                backgroundColor: "#754ffe",
                zIndex: 30,
                position: "absolute",
                top: "0.5rem",
                left: "0.5rem",
                width: "20%",
                transform:
                  "translateY(0.5rem) translateX(-0.5rem) rotate(-45deg)",
                textAlign: "center",
                fontSize: "0.75rem",
                color: "white",
                padding: "0.2rem",
              }}
            >
              {findLangLocale(article?.language)}
            </span>
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover", // Ensures image covers the area without distortion
                borderBottom: "3px dotted white",
                transition: "transform 0.3s ease-in-out", // Smooth transition for hover effect
              }}
              src={BaseUrl(article?.thumbnail, 8)}
              alt="img"
            />
          </Link>
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            flex: "1", // Takes up half the width of the container
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline", mb: "0.5rem" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14H20V20H14V14Z"
                fill="#754ffe"
              />
            </svg>

            <Typography
              component="h4"
              className={classes.blog_category}
              style={{
                fontSize: ".9rem",
                marginLeft: "-.5rem",
                marginTop: "-.3rem",
                fontWeight: 700,
              }}
            >
              {article?.category}
            </Typography>
          </Box>

          <Typography
            variant="h2"
            component="h2"
            className={classes.blog_title}
            style={{ fontSize: "1.2rem", fontWeight: 700, margin: ".5rem 0" }}
          >
            <Link target="__blank" to={`/article-details/${article?.id}`}>
              {article?.title}
            </Link>
          </Typography>

          {/* Author Info */}
          <Link to={`/user/${article?.writer?._id}`}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: "1rem",
                borderTop: "1px solid #ddd", // Optional: add a border between content and author
                pt: "1rem", // Add padding-top
              }}
            >
              <img
                style={{
                  height: "2rem",
                  width: "2rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={BaseUrl(article?.writer?.avatar, 8)}
                alt="Avatar"
              />
              <Stack sx={{ ml: ".6rem", alignItems: "start" }}>
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
                    color: "gray",
                  }}
                >
                  {moment(article?.createdAt).format("YYYY-MM-DD")}
                  <span
                    style={{
                      fontSize: ".5rem",
                      fontWeight: "bold",
                      color: "gray",
                    }}
                  >
                    (
                    {moment(
                      moment(article?.createdAt).format("MMMM Do YYYY"),
                      "MMMM Do YYYY"
                    ).fromNow()}
                    )
                  </span>
                </span>
              </Stack>
            </Box>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default ArticleCard;
