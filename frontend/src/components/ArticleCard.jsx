import React from "react";
import { pageCss } from "../page/PageCss";
import { Box, Stack, Typography } from "@mui/material";
import imgblog from "../image/course-react.jpg";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

import BaseUrl from "../utils/baseUrl";

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
      <Box className={classes.blog_section_box}>
        <Box
          sx={{ position: "relative" }}
          className={classes.blog_section_box_thumbnail}
        >
          <Link target="__blank" to={`/article-details/${article?.id}`}>
            <span
              style={{
                backgroundColor: "#754ffe",
              }}
              className=" z-30 absolute top-0 left-2 w-20 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white"
            >
              {findLangLocale(article?.language)}
            </span>
            <img
              style={{ maxHeight: "220px", minHeight: "220px" }}
              src={BaseUrl(article?.thumbnail, 8)}
              alt="img"
              className={classes.blog_thumbnail}
            />
          </Link>
        </Box>
        <Typography component="h4" className={classes.blog_category}>
          {article?.category}
        </Typography>
        <Typography variant="h2" component="h2" className={classes.blog_title}>
          <Link target="__blank" to={`/article-details/${article?.id}`}>
            {article?.title}
          </Link>
        </Typography>
        <Typography variant="h4" component="p" className={classes.blog_des}>
          <div
            dangerouslySetInnerHTML={{
              __html: `${article?.description?.slice(0, 77)}...`,
            }}
          />
        </Typography>
        <Link to={`/user/${article?.writer?._id}`}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: "1.1rem",
              pb: "1rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ height: "2rem", width: "2rem" }}
                class="object-cover rounded-full"
                src={BaseUrl(article?.writer?.avatar, 8)}
                alt="Avatar"
              />
              <Link to={`/user/${article?.writer?._id}`}>
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
                </Stack>
              </Link>
            </Box>
          </Box>
        </Link>
      </Box>
    </>
  );
};

export default ArticleCard;
