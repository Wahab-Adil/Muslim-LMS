import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../App.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Box, Rating, Typography } from "@mui/material";
import baseUrl from "../utils/baseUrl";

// User Store
import {
  addToPlaylist,
  addArticleToPlayllist,
} from "../store/auth/user/userSlice";
import { useDispatch } from "react-redux";

const starsStyle = {
  fontSize: ".8rem",
  color: "#b4690e",
};
import useLocale from "../hook/useLocales";

const Course = ({ course }) => {
  const { translate } = useLocale();
  const dispatch = useDispatch();
  let countAverageRating = 0;

  const {
    id,
    thumbnail,
    title,
    language,
    instructor,
    totalReviews,
    reviews,
    category,
    rating: averageRating,
  } = course;

  reviews?.forEach((review) => {
    countAverageRating += review?.rating;
  });

  countAverageRating = (countAverageRating / reviews?.length).toFixed(1);

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
    <CourseCard className="rounded-lg bg-white shadow">
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
        <span
          style={{
            backgroundColor: "#754ffe",
          }}
          class=" z-30 absolute top-0 left-2 w-20 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white"
        >
          {findLangLocale(language)}
        </span>

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
        <Typography
          component={"p"}
          sx={{
            fontSize: "12px",
            textAlign: "start",
            mt: "8px",
            textTransform: "capitalize",
          }}
        >
          {instructor?.name}
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
              value={parseFloat(averageRating === "NaN" ? 0 : averageRating)}
              precision={0.5}
            />
          </Box>
          <Typography
            sx={{
              fontSize: ".9rem",
              fontWeight: "600",
              color: starsStyle.color,
            }}
          >
            {countAverageRating === "NaN" ? "" : countAverageRating}
            <span
              style={{
                marginLeft: ".5rem",
                color: "black",
              }}
            >
              ({totalReviews})
            </span>
          </Typography>
        </Box>
      </div>
      <div className="item-btns flex">
        <Link
          sx={{ marginLeft: "20px" }}
          to={`/course-details/${id}`}
          className="item-btn see-details-btn rounded-md bg-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {translate("See details")}
        </Link>
        <button
          onClick={() => {
            console.log(id);
            dispatch(addToPlaylist(id));
          }}
          className="item-btn add-to-cart-btn flex items-center rounded-md bg-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {translate("Add to Playlist")}
        </button>
      </div>
    </CourseCard>
  );
};

const CourseCard = styled.div`
  width: 300px;
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

export default Course;
