import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GroupIcon from "@mui/icons-material/Group";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ShowMoreText from "react-show-more-text";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import baseUrl from "../utils/baseUrl";
import useLocale from "../hook/useLocales";

import compactFormat from "cldr-compact-number";

const InstructCourseDetails = ({
  AvatarImg,
  instructor,
  Articles,
  totalViews,
}) => {
  const { translate } = useLocale();
  return (
    <Box
      sx={{
        marginTop: "5rem",
        marginBottom: "7rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mt: { xs: 0, sm: "4rem" },
          fontSize: { xs: "1.4rem", sm: "2rem" },
        }}
      >
        {translate("Instructor")}
      </Typography>
      <Box>
        <Typography
          component={NavLink}
          to={`/user/${instructor?._id}`}
          sx={{
            fontWeight: 700,
            color: "#7543fe",
            textDecoration: "underline",
            "&:hover": {
              color: "#3300bf",
            },
            textTransform: "capitalize",
          }}
        >
          {instructor?.name}
        </Typography>
      </Box>
      {/* profile image and icons section */}
      <Box
        sx={{
          mt: "1rem",
          display: "flex",
          gap: { xs: "1rem", sm: "2rem" },
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={baseUrl(AvatarImg, 8)}
          sx={{ width: 100, height: 100 }}
        />
        <Stack gap=".3rem" mt={3}>
          <Box
            sx={{
              display: "flex",
              gap: ".7rem",
              alignItems: "center",
            }}
          >
            <StarIcon
              style={{
                fontSize: "1rem",
              }}
            />
            <Typography
              sx={{
                fontSize: ".8rem",
                opacity: 0.8,
                fontFamily: "sans-serif !important",
              }}
            >
              {Articles} {translate("Articles")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: ".7rem",
              alignItems: "center",
            }}
          >
            <PlayCircleIcon
              style={{
                fontSize: "1rem",
              }}
            />
            <Typography
              sx={{
                fontSize: ".8rem",
                opacity: 0.8,
                fontFamily: "sans-serif !important",
              }}
            >
              {instructor?.courses?.length >= 1
                ? `${instructor?.courses?.length} ${translate("Courses")}`
                : `${instructor?.courses?.length} ${translate("Course")}`}
            </Typography>
          </Box>
        </Stack>
      </Box>
      {/* profile image and icons section  end*/}

      {/* Description start */}
      <Box
        sx={{
          mt: "1.5rem",
        }}
      >
        <ShowMoreText
          lines={3}
          more={translate("Show more")}
          less={translate("Show less")}
          className="content-css"
          anchorClass="show-more-less-clickable"
          expanded={true}
          truncatedEndingComponent={"... "}
        >
          <div dangerouslySetInnerHTML={{ __html: instructor?.about }} />
        </ShowMoreText>
      </Box>
      {/* Description end */}
    </Box>
  );
};

export default InstructCourseDetails;
