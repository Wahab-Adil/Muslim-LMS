import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../../App.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Box, Typography, Rating, Stack } from "@mui/material";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import CategoryIcon from "@mui/icons-material/Category";

// User Store
import {
  addToPlaylist,
  addArticleToPlayllist,
} from "../../../store/auth/user/userSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import baseUrl from "../../../utils/baseUrl";

const starsStyle = {
  fontSize: ".8rem",
  color: "#b4690e",
};

const Course = ({ course, width }) => {
  const dispatch = useDispatch();

  const {
    id,
    thumbnail,
    title,
    instructor,
    totalReviews,
    reviews,
    updatedAt,
    category,
    rating,
    language,
  } = course;

  // const [langLocal, setLangLocale] = useState();

  const findLangLocale = (language) => {
    console.log("find", language);

    if (language === "dari") {
      return "دری";
    } else if (language === "pashto") {
      return "پښتو";
    } else {
      return language;
    }
  };

  return (
    <CourseCard>
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
            top: "7.5rem",
            right: "8px",
            fontSize: ".9rem",
            backgroundColor: "#754ffe",
            color: "white",
            px: ".8rem",
            borderRadius: "3px",
          }}
        >
          {findLangLocale(language)}
        </Typography>
        <img
          style={{ height: "200px" }}
          src={baseUrl(thumbnail, 8)}
          alt={title}
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
          {title?.slice(0, 50)}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component={"p"}
            sx={{
              fontSize: "12px",
              textAlign: "start",
              mt: "8px",
              textTransform: "capitalize",
              color: "#754ffe",
            }}
          >
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
                src={baseUrl(instructor?.avatar, 8)}
                alt="Avatar"
              />
              <Stack
                sx={{
                  ml: ".6rem",
                  alignItems: "start",
                }}
              >
                <Link to={`/user/${instructor?._id}`}>
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
                    {instructor?.name}
                  </Typography>
                </Link>
                <span
                  style={{
                    fontSize: ".7rem",
                    fontWeight: "bold",
                    margin: 0,
                    color: "gray",
                  }}
                >
                  {moment(updatedAt).format("MMMM Do YYYY")}
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
                    moment(updatedAt).format("MMMM Do YYYY"),
                    "MMMM Do YYYY"
                  ).fromNow()}
                </span>
              </Stack>
            </Box>
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <Rating
                size="small"
                readOnly
                value={parseFloat(rating)}
                precision={0.5}
              />
              <Typography
                component={"p"}
                sx={{
                  fontSize: "12px",
                  textAlign: "start",
                  mt: "8px",
                  textTransform: "capitalize",
                  color: "#754ffe",
                }}
              >
                <CategoryIcon sx={{ color: "#754ffe" }} />
                {category?.length > 20 ? `${category?.slice(20)}...` : category}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        ></Box>
      </div>
      <div className="item-btns flex">
        <Link to={`/course-details/${id}`} className="item-btn see-details-btn">
          See details
        </Link>
        <button
          onClick={() => {
            dispatch(addToPlaylist(id));
          }}
          className="item-btn add-to-cart-btn"
        >
          Add to Playlist
        </button>
      </div>
    </CourseCard>
  );
};

const CourseCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
  display: flex;
  flex-direction: column;

  background-color: #f7f7f7;

  width: 320px;
  height: 23rem;
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

export default Course;
