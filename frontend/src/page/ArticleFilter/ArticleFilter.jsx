import React, { useEffect, useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Sidebar from "./Sidebar/Sidebar";
import Article from "./components/Article";
import "../../components/paginate/paginate.css";
import ReactPaginate from "react-paginate";
import NavigateNextTwoToneIcon from "@mui/icons-material/NavigateNextTwoTone";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";

// Api Calls And Redux

// Article Store
import {
  getAllArticles,
  selectAllArticles,
  selectIsLoading,
} from "../../store/features/article/articleSlice";

// Article category
import {
  ArticleAllCategory,
  selectAllArticleCategories,
} from "../../store/features/article/category/articleCategorySlice";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

import { Box } from "@mui/material";

// Api Calls And Redux

function App() {
  // redux
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const AllArticles = useSelector(selectAllArticles);
  const AllCategories = useSelector(selectAllArticleCategories);

  useEffect(() => {
    dispatch(getAllArticles());
    dispatch(ArticleAllCategory());
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

  const filteredItems = AllArticles.filter(
    (article) => article.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
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
          (course) => course.averageRating >= ratingThreshold
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
            ({ category, language, averageRating }) => {
              return (
                category === selected?.options?.selectedCategory ||
                language === selected?.options?.selectedLanguage ||
                averageRating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
        } else if (
          !selected?.options?.selectedCategory &&
          selected?.options?.selectedLanguage &&
          !selected?.options?.selectedRating
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, language, averageRating }) => {
              return (
                category === selected?.options?.selectedCategory ||
                language === selected?.options?.selectedLanguage ||
                averageRating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
        } else if (
          !selected?.options?.selectedCategory &&
          !selected?.options?.selectedLanguage &&
          selected?.options?.selectedRating
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, language, averageRating }) => {
              return (
                category === selected?.options?.selectedCategory ||
                language === selected?.options?.selectedLanguage ||
                averageRating === parseFloat(selected?.options?.selectedRating)
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
            ({ category, language }) => {
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
            ({ language, averageRating }) => {
              return (
                language === selected?.options?.selectedLanguage &&
                averageRating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
        } else if (
          selected?.options?.selectedCategory &&
          selected?.options?.selectedRating &&
          !selected?.options?.selectedLanguage
        ) {
          filteredProducts = filteredProducts.filter(
            ({ category, averageRating }) => {
              return (
                category === selected?.options?.selectedCategory &&
                averageRating === parseFloat(selected?.options?.selectedRating)
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
            ({ category, language, averageRating }) => {
              return (
                category === selected?.options?.selectedCategory &&
                language === selected?.options?.selectedLanguage &&
                averageRating === parseFloat(selected?.options?.selectedRating)
              );
            }
          );
        }
      }
    }

    return filteredProducts.map((article) => (
      <Article key={Math.random()} article={article} />
    ));
  }

  const result = filteredData(
    AllArticles,
    { options: { selectedCategory, selectedRating, selectedLanguage } },
    query
  );
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 6;
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
        AllCategories={AllCategories?.allCategoreis}
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
          marginBottom: "2rem",
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
