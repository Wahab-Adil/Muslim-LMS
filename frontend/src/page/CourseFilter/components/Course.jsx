import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../../App.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Box, Typography, Rating, Stack } from "@mui/material";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import CategoryIcon from "@mui/icons-material/Category";
import { motion } from "framer-motion";
import useLocales from "../../../hook/useLocales";

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

// Define shake animation
const shakeAnimation = {
  hidden: { x: 0 },
  visible: {
    x: [0, -1, 0, -1, 0, 0],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Course = ({ course, width }) => {
  const dispatch = useDispatch();
  const { translate } = useLocales();

  const [isVisible, setIsVisible] = useState(false);
  const courseRef = useRef(null);

  const {
    id,
    thumbnail,
    title,
    instructor,
    totalReviews,
    reviews,
    updatedAt,
    category,
    rating: averageRating,
    language,
  } = course;

  let countAverageRating = 0;
  reviews?.forEach((review) => {
    countAverageRating += review?.rating;
  });
  countAverageRating = (countAverageRating / reviews?.length).toFixed(1);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (courseRef.current) {
      observer.observe(courseRef.current);
    }

    return () => {
      if (courseRef.current) {
        observer.unobserve(courseRef.current);
      }
    };
  }, [courseRef]);

  return (
    <MotionCourseCard
      style={{ border: "1px solid gray" }}
      ref={courseRef}
      initial={{
        opacity: 0,
        x: document.documentElement.dir === "rtl" ? 10 : -70,
      }} // Start from left or right
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 100,
        y: isVisible ? 0 : 100,
      }} // Animate to the original position
      transition={{ duration: 1.5 }} // Duration of animation
      whileHover={{
        ...shakeAnimation.visible,
        transition: { duration: 0.5 },
        boxShadow: "#754ffe 0px 4px 15px",
      }} // Apply shake animation on hover
      className="rounded-lg bg-white shadow"
    >
      <ItemImgWrapper>
        <div className="item-img-wrapper">
          <span
            style={{
              backgroundColor: "#754ffe",
            }}
            className="z-30 absolute top-0 left-2 w-20 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white"
          >
            {findLangLocale(language)}
          </span>

          <img className="item-img" src={baseUrl(thumbnail, 8)} alt={title} />
        </div>
      </ItemImgWrapper>

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
    </MotionCourseCard>
  );
};

const MotionCourseCard = styled(motion.div)`
  width: 280px;
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

const ItemImgWrapper = styled.div`
  position: relative;
  overflow: hidden; /* Ensure image does not overflow */
  height: 200px; /* Set a fixed height */
  border-radius: 10px; /* Optional: Add border-radius if needed */
  display: flex;
  align-items: center;
  justify-content: center;

  .item-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the container, cropping if necessary */
  }
`;

export default Course;
