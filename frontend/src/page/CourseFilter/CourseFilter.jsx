import React, { useEffect, useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Sidebar from "./Sidebar/Sidebar";
import Course from "./components/Course";
import "../../components/paginate/paginate.css";
import ReactPaginate from "react-paginate";
import NavigateNextTwoToneIcon from "@mui/icons-material/NavigateNextTwoTone";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";

// Api Calls And Redux
import {
  Video_AllCourse,
  selectIsLoading,
  selectAllCourses,
} from "../../store/features/video/courses/videoCoursesSlice";

import {
  Video_AllCategories,
  // selectIsLoading,
  selectVideoAllCategories,
} from "../../store/features/video/category/videoCategorySlice";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

import { Box } from "@mui/material";

// Api Calls And Redux

function App() {
  // redux
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const AllCourses = useSelector(selectAllCourses);
  const AllCategories = useSelector(selectVideoAllCategories);

  useEffect(() => {
    dispatch(Video_AllCourse());
    dispatch(Video_AllCategories());
  }, []);

  // states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = AllCourses.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleRatingsChange = (event) => {
    setSelectedRating(event.target.value);
  };
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value.toLowerCase());
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    } else {
      if (selected?.options?.selectedRating) {
        const ratingThreshold = parseFloat(selected?.options?.selectedRating);

        // Filter courses based on the rating threshold
        filteredProducts = products.filter(
          (course) => course.rating >= ratingThreshold
        );
      }

      // Applying selected filter
      if (selected?.options) {
        if (
          selected?.options?.selectedCategory === "" &&
          selected?.options?.selectedLanguage === "" &&
          selected?.options?.selectedRating === ""
        ) {
          filteredProducts = products;
        } else if (
          selected?.options?.selectedCategory === null &&
          selected?.options?.selectedLanguage === null &&
          selected?.options?.selectedRating === null
        ) {
          filteredProducts = products;
        } else if (
          selected?.options?.selectedCategory === "" &&
          selected?.options?.selectedLanguage === null &&
          selected?.options?.selectedRating === null
        ) {
          setSelectedLanguage("");
          setSelectedRating("");
          filteredProducts = products;
        } else if (
          selected?.options?.selectedCategory &&
          !selected?.options?.selectedLanguage &&
          !selected?.options?.selectedRating
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, language, rating }) => {
              return (
                category === selected?.options?.selectedCategory ||
                language === selected?.options?.selectedLanguage ||
                rating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
        } else if (
          !selected?.options?.selectedCategory &&
          selected?.options?.selectedLanguage &&
          !selected?.options?.selectedRating
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, language, rating }) => {
              return (
                category === selected?.options?.selectedCategory ||
                language === selected?.options?.selectedLanguage ||
                rating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
        } else if (
          !selected?.options?.selectedCategory &&
          !selected?.options?.selectedLanguage &&
          selected?.options?.selectedRating
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, language, rating }) => {
              return (
                category === selected?.options?.selectedCategory ||
                language === selected?.options?.selectedLanguage ||
                rating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
          // if Two Option Exist
        } else if (
          selected?.options?.selectedCategory &&
          selected?.options?.selectedLanguage &&
          !selected?.options?.selectedRating
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, language, rating }) => {
              return (
                category === selected?.options?.selectedCategory &&
                language === selected?.options?.selectedLanguage
              );
            }
          );
        } else if (
          !selected?.options?.selectedCategory &&
          selected?.options?.selectedLanguage &&
          selected?.options?.selectedRating
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, language, rating }) => {
              return (
                language === selected?.options?.selectedLanguage &&
                rating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
        } else if (
          selected?.options?.selectedCategory &&
          selected?.options?.selectedRating &&
          !selected?.options?.selectedLanguage
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, language, rating }) => {
              return (
                category === selected?.options?.selectedCategory &&
                rating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
        }
        // if All Option Exist
        else if (
          selected?.options?.selectedCategory &&
          selected?.options?.selectedLanguage &&
          selected?.options?.selectedRating
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, language, rating }) => {
              return (
                category === selected?.options?.selectedCategory &&
                language === selected?.options?.selectedLanguage &&
                rating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
        }
      }
    }

    return filteredProducts.map((course) => (
      <Course key={Math.random()} course={course} />
    ));
  }

  const result = filteredData(
    AllCourses,
    { options: { selectedCategory, selectedRating, selectedLanguage } },
    query
  );
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  const indexOfLastItem = (pageNumber + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

  // drawer
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Sidebar
        open={open}
        toggleDrawer={toggleDrawer}
        AllCategories={AllCategories}
        handleCategoryChange={handleCategoryChange}
        handleRatingsChange={handleRatingsChange}
        handleLanguageChange={handleLanguageChange}
        selectedCategory={selectedCategory}
        selectedLanguage={selectedLanguage}
      />
      <Navigation
        open={open}
        toggleDrawer={toggleDrawer}
        query={query}
        handleInputChange={handleInputChange}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Products result={currentItems} />
      </Box>
      <ReactPaginate
        previousLabel={<ArrowBackIosNewTwoToneIcon />}
        nextLabel={<NavigateNextTwoToneIcon />}
        breakLabel="..."
        pageCount={Math.ceil(result.length / itemsPerPage)} // Calculate number of pages
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}

export default App;
