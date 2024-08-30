import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { comCss } from "../../components/ComponentsCss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import courseimg from "../../image/course-react.jpg";
import { NavLink } from "react-router-dom";
import { Iframe } from "../../components/CommonComponents";
import ReactPlayer from "react-player";

const CourseSidebar = () => {
  const classes = comCss();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const matches_340 = useMediaQuery("(max-width:340px)");

  return (
    <Box className={classes.course_sidebar}>
      <Box className={classes.course_sidebar_box}>
        <Box className={classes.course_sidebar_box_1_image}>
          <ReactPlayer
            url={
              "https://www.youtube.com/watch?v=11OWuPcElJw&list=RD11OWuPcElJw&start_radio=1"
            }
            controls
            light={courseimg}
            width={"100%"}
            height={matches_340 ? "12rem" : "15rem"}
          />
        </Box>
        <Box sx={{ padding: "10px !important" }}>This</Box>
      </Box>
    </Box>
  );
};

export default CourseSidebar;
