import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import { motion } from "framer-motion";

// Define scale and shadow animations
const hoverAnimation = {
  scale: {
    scale: 1.05, // Scale up by 5%
    transition: { duration: 0.3 },
  },
  shadow: {
    boxShadow: "1px 4px 10px 3px rgba(117, 79, 255, 0.5)",
    transition: { duration: 0.3 },
  },
};

const scrollAnimation = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const Category = ({ link, cate, image, name }) => {
  return (
    <Link to={`${link}/${cate?._id}`}>
      <CategoryItemWrapper
        className="flex flex-column bg-alice-blue shadow"
        whileHover={{ ...hoverAnimation.scale, ...hoverAnimation.shadow }}
        initial="hidden"
        animate="visible"
        variants={scrollAnimation}
      >
        <div className="category-item-img">
          <img src={baseUrl(cate?.image, 8)} alt={name} />
        </div>
        <div className="category-item-name">
          <h6>{name}</h6>
        </div>
      </CategoryItemWrapper>
    </Link>
  );
};

const CategoryItemWrapper = styled(motion.div)`
  padding: 20px;
  background-color: white;
  border: 1px solid transparent;
  transition: var(--transition), box-shadow 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 250px; /* Set a consistent minimum height */
  max-height: 300px; /* Optional: Set a maximum height for the container */

  .category-item-img {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* Ensure full width */
    max-height: 200px; /* Set a max height for the image container */

    img {
      max-width: 100%;
      max-height: 180px;
      object-fit: contain; /* Maintain aspect ratio */
      transition: transform 0.3s ease-in-out;
    }
  }

  .category-item-name {
    margin-top: 24px;
    h6 {
      font-size: 15px;
    }
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

export default Category;
