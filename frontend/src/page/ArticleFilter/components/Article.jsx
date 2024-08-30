import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import { Box, Typography, Rating, Stack, useMediaQuery } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

import moment from "moment";
import baseUrl from "../../../utils/baseUrl";

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
      }}
    >
      <Link
        style={{
          flex: 1,
          width: "100%",
        }}
        to={`/article-details/${article?.id}`}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          key={article?.id + article?.title}
        >
          <div
            className="flex max-w-lg overflow-hidden bg-white rounded-lg dark:bg-gray-800 "
            style={{
              backgroundColor: "rgba(218,228,237,.32)",
              maxHeight: matches_450 ? "130px" : "100%",
              alignItems: "start",
            }}
          >
            <div
              className="item-img"
              style={{
                position: "relative",
                backgroundColor: "white",
                padding: "0rem.5rem",
                height: "fit-content",
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: "0.1rem",
                  right: "12px",
                  fontSize: ".9rem",
                  backgroundColor: "#754ffe",
                  color: "white",
                  px: ".8rem",
                  borderRadius: "3px",
                }}
              >
                {findLangLocale(article?.language)}
              </Typography>

              <img
                style={{
                  width: "250px",
                  minHeight: "190px",
                  maxHeight: "190px",
                  borderRight: "3px dotted white",
                }}
                src={baseUrl(article?.thumbnail, 8)}
                alt=""
              />
            </div>
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
                  flexDirection: "column",
                }}
              >
                <Link to={`/user/${article?.writer?._id}`}>
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
                    <Stack
                      sx={{
                        ml: ".6rem",
                        alignItems: "start",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          mt: "1rem",
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
                        {moment(article?.updatedAt).format("MMMM Do YYYY")}
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
                          moment(article?.updatedAt).format("MMMM Do YYYY"),
                          "MMMM Do YYYY"
                        ).fromNow()}
                      </span>
                    </Stack>
                  </Box>
                </Link>
                <Typography
                  component={"p"}
                  sx={{
                    mt: 1,
                    fontSize: "12px",
                    textAlign: "start",
                    textTransform: "capitalize",
                    color: "#754ffe",
                  }}
                >
                  <CategoryIcon sx={{ color: "#754ffe" }} />
                  {article?.category}
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>
      </Link>
    </Box>
  );
};

export default Article;
