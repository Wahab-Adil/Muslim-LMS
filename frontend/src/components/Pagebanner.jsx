import { Box, Container, Rating, Typography } from "@mui/material";
import React from "react";
import { comCss } from "./ComponentsCss";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { compactFormat } from "cldr-compact-number/dist/cldr-compact-number.umd";

import moment from "moment";

const Pagebanner = (props) => {
  const {
    title,
    subtitle,
    course_time,
    course_enroll,
    course_rating,
    course_expart,
    countAverageRating,
    createdAt,
  } = props;
  const classes = comCss();
  console.log("course_rating", course_rating);
  return (
    <Box className={classes.page_banner}>
      <Container
        maxWidth="lg"
        sx={{
          direction: document.documentElement.dir === "rtl" ? "ltr" : "ltr",
          justifyConent: "flex-start",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: { sm: "start" },
            marginBottom: "2rem",
            fontWeight: "600 !important",
            fontSize: {
              xs: "1.4rem !important",
              sm: "3rem !important",
            },
            color: "white",
          }}
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography
            variant="h3"
            component="h3"
            sx={{
              color: "white",
              fontSize: { xs: "1rem", sm: "1.3rem" },
            }}
          >
            {subtitle}
          </Typography>
        ) : (
          ""
        )}
        <Box display="flex" alignItems="baseline">
          <Box className={classes.page_meta}>
            {course_time ? (
              <span className={classes.page_banner_icon}>
                <AccessTimeOutlinedIcon />
                {course_time}
              </span>
            ) : (
              ""
            )}

            {course_enroll ? (
              <span className={classes.page_banner_icon}>
                <PersonOutlineOutlinedIcon
                  className={`${classes.page_banner_icon}`}
                />
                {
                  compactFormat(course_enroll, "en", {
                    significantDigits: 1,
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 2,
                  })
                  // 19.6K
                }{" "}
                Views
              </span>
            ) : (
              ""
            )}

            {course_rating ? (
              <Box>
                <span className={classes.page_banner_rating_icon}>
                  <span>({course_rating})</span>
                  <p
                    style={{ color: "white" }}
                    className="font-semibold text-gray-400 text-xs"
                  >
                    {moment(createdAt).format("MMMM Do YYYY")}
                  </p>

                  <p
                    style={{ marginLeft: "1rem", color: "white" }}
                    className="font-semibold text-gray-400 text-xs"
                  >
                    {moment(moment(createdAt), "MMMM Do YYYY").fromNow()}
                  </p>
                </span>
              </Box>
            ) : (
              ""
            )}

            {course_expart ? (
              <span className={classes.page_banner_icon}>
                <SignalCellularAltOutlinedIcon
                  className={`${classes.page_banner_icon}`}
                />
                {course_expart}
              </span>
            ) : (
              ""
            )}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Rating
              sx={{
                fontSize: "20px",
                color: "orange",
              }}
              value={course_rating}
              readOnly
            />
            <p style={{ color: "#FFAA46", padding: "0px 5px 0px 5px" }}>
              {course_rating}
            </p>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Pagebanner;
