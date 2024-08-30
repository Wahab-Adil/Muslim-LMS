import React, { useEffect, useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Sidebar from "./Sidebar/Sidebar";
// import Course from "./components/Course";
import ReviewCard from "./ReviewCard";
import "../../../components/paginate/paginate.css";
import ReactPaginate from "react-paginate";
import NavigateNextTwoToneIcon from "@mui/icons-material/NavigateNextTwoTone";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  ArticleAllReviews,
  selectAllArticlesReviews,
  selectIsLoading,
} from "../../../store/features/article/reviews/articleReviewsSlice";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";

import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

function App() {
  // redux
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const data = useSelector(selectAllArticlesReviews);
  const ArticleReviews = data?.reviews;

  useEffect(() => {
    dispatch(ArticleAllReviews());
  }, []);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = ArticleReviews?.filter(
    (product) =>
      product?.user?.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      product?.comment?.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  function filteredData(ArticleReviews, selected, query) {
    let filteredReviews = ArticleReviews;

    // Filtering Input Items
    if (query) {
      filteredReviews = filteredItems;
    }

    return filteredReviews?.map((review) => (
      <ReviewCard
        key={Math.random()}
        review={review}
        ArticleAllReviews={ArticleAllReviews}
      />
    ));
  }

  const result = filteredData(ArticleReviews, { options: {} }, query);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  const indexOfLastItem = (pageNumber + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result?.slice(indexOfFirstItem, indexOfLastItem);

  // drawer
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {isLoading && <Loader />}

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
        pageCount={Math.ceil(result?.length / itemsPerPage)} // Calculate number of pages
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
