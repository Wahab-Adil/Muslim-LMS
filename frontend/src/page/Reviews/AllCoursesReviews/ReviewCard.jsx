import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { AddBoxSharp } from "@mui/icons-material";

import {
  Video_DeleteReview,
  Video_AllReviews,
} from "../../../store/features/video/reviews/videoReviewsSlice";
import { SelectGlobalReview } from "../../../store/features/globalReviews/globalReviewSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import baseUrl from "../../../utils/baseUrl";
import useLocales from "../../../hook/useLocales";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewCard = ({ review, AllGlobalReviews }) => {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  const deleteReview = async (id) => {
    await dispatch(Video_DeleteReview(id));
    await dispatch(Video_AllReviews());
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
      <div className="flex flex-col overflow-hidden shadow-xl border-indigo-500 border-2 rounded-md">
        <div
          className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7"
          style={{
            minWidth: "293px",
            minHeight: "295px",
          }}
        >
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <Rating readOnly value={review?.rating} precision={0.5} />
              <AddBoxSharp
                title="select Article"
                onClick={() => {
                  handleSelectReview(review?._id);
                }}
              />
              <button
                title="delete"
                onClick={() => {
                  setId(review?._id);
                  handleClickOpen();
                }}
                type="button"
                data-modal-target="delete-modal"
                data-modal-toggle="delete-modal"
                class="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2 -ml-0.5"
                  viewbox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  style={{
                    width: "26px",
                    height: "22px",
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <blockquote className="flex-1 mt-8">
              <p className="text-lg leading-relaxed text-gray-900 font-pj">
                {review?.comment}
              </p>
            </blockquote>
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
              <p className="mt-0.5 text-sm font-pj text-gray-600">
                {review?.user?.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReviewCard;
