import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { comCss } from "../components/ComponentsCss";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import useLocale from "../hook/useLocales";

const CourseSidebar = ({ Course }) => {
  const { translate } = useLocale();
  const classes = comCss();
  const [open, setOpen] = React.useState(false);

  const matches_340 = useMediaQuery("(max-width:340px)");

  return (
    <Box className={classes.course_sidebar}>
      <Box className={classes.course_sidebar_box}>
        <Box className={classes.course_sidebar_box_1_image}>
          <Link to={`/course-playlist/${Course?._id}`}>
            <img
              src={baseUrl(Course?.thumbnail, 8)}
              width={"100%"}
              height={matches_340 ? "12rem" : "15rem"}
            />
          </Link>
        </Box>
        <Box sx={{ padding: "10px !important" }}>
          <Link
            to={`/course-playlist/${Course?._id}`}
            sx={{ marginBottom: "10px !important", width: "100%" }}
            className={`${classes.button} ${classes.course_sidebar_button_1}`}
          >
            {translate("Watch")}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseSidebar;
