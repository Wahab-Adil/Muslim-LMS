import { Rating, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { AddBoxSharp } from "@mui/icons-material";

import {
  ArticleDeleteReview,
  ArticleAllReviews,
} from "../../../store/features/article/reviews/articleReviewsSlice";
import { SelectGlobalReview } from "../../../store/features/globalReviews/globalReviewSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import baseUrl from "../../../utils/baseUrl";
import useLocale from "../../../hook/useLocales";
import ReactShowMoreText from "react-show-more-text";
import { useTheme } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewCard = ({ review }) => {
  const { translate } = useLocale();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const deleteReview = async (id) => {
    await dispatch(ArticleDeleteReview(id));
    await dispatch(ArticleAllReviews());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectReview = (id) => {
    dispatch(SelectGlobalReview(id));
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ px: "10rem" }}>
          {translate("Section Alert")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {translate("Are You Sure To Delete Article Review")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{translate("Cancel")}</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteReview(id);
              handleClose();
            }}
          >
            {translate("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex flex-col overflow-auto shadow-xl border-gray-500 border-2 rounded-md">
        <div
          className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7"
          style={{
            maxWidth: smDown ? "250px" : "293px",
            maxHeight: "295px",
            minWidth: smDown ? "100%" : "293px",
            minHeight: smDown ? "200px" : "295px",
          }}
        >
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <Rating readOnly value={review?.rating} precision={0.5} />
              <AddBoxSharp
                titleAccess={translate("Select")}
                title={translate("select Article")}
                onClick={() => {
                  handleSelectReview(review?._id);
                }}
              />

              <button
                title={translate("delete")}
                onClick={() => {
                  setId(review?._id);
                  handleClickOpen();
                }}
                type="button"
                className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 -ml-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  style={{
                    width: "26px",
                    height: "22px",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <ReactShowMoreText
              lines={3}
              more={translate("Show more")}
              less={translate("Show less")}
              className="content-css"
              anchorClass="show-more-less-clickable"
              expanded={true}
              truncatedEndingComponent={"... "}
            >
              {review?.comment}
            </ReactShowMoreText>
          </div>

          <div className="flex items-center mt-8">
            <img
              className="flex-shrink-0 object-cover rounded-full w-11 h-11"
              src={baseUrl(review?.user?.avatar, 8)}
              alt=""
            />
            <div className="ml-4">
              <p className="text-base font-bold text-gray-900 font-pj">
                {review?.user?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
