import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useLocale from "../../../hook/useLocales";
import { useTheme } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import {
  Video_AllCategories,
  selectVideoAllCategories,
  selectIsLoading,
  Video_DeleteCategory,
} from "../../../store/features/video/category/videoCategorySlice";
import Loader from "../../loader/Loader";
import { Box, useMediaQuery } from "@mui/material";
import baseUrl from "../../../utils/baseUrl";
import { motion } from "framer-motion";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const inputTopAnimation = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: 100 },
};
const inputBottomAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: 100 },
};

const inputLeftAnimation = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const inputRightAnimation = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export default function ManageCourseCategories() {
  const { translate } = useLocale();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const categories = useSelector(selectVideoAllCategories);

  const [categoryId, setCategoryId] = useState();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(Video_AllCategories());
  }, []);

  //delete category handler
  const deleteCategoryHandler = (id) => {
    dispatch(Video_DeleteCategory(id));
    dispatch(Video_AllCategories());
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
      {isLoading && <Loader />}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ px: "10rem" }}>
          {" "}
          {translate("Section Alert")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {translate("Are You Sure To Delete Course Category")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{translate("Cancel")}</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleClose();
              deleteCategoryHandler(categoryId);
            }}
          >
            {translate("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{ marginBottom: smDown ? "20px" : "15px" }}
        className="sm:flex sm:items-center"
      >
        <div style={{ marginTop: "2rem" }} className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {translate("All Categories")}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {translate("A list of all Courses Categories")}
          </p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={inputRightAnimation}
          transition={{ duration: 1 }}
          className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"
          style={{ marginBottom: smDown ? "20px" : "15px" }}
        >
          <Link
            to="/admin/add-course-category"
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            {translate("Add New Course Category")}
          </Link>
        </motion.div>
      </div>
      {
        <div
          style={{
            direction: document.documentElement.dir === "rtl" ? "ltr" : "ltr",
          }}
          class="mx-auto max-w-screen-2xl px-4 lg:px-12"
        >
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table
                  style={{ overflow: "auto" }}
                  className="min-w-full divide-y divide-gray-300"
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <motion.th
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={inputTopAnimation}
                        transition={{ duration: 1.5 }}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {translate("image & name")}
                      </motion.th>
                      <motion.th
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={inputTopAnimation}
                        transition={{ duration: 1.5 }}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {translate("No.Courses")}
                      </motion.th>
                      <motion.th
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={inputTopAnimation}
                        transition={{ duration: 1.5 }}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {translate("Added By")}
                      </motion.th>
                      <motion.th
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={inputTopAnimation}
                        transition={{ duration: 1.5 }}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {translate("Created At")}
                      </motion.th>
                      <motion.th
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={inputTopAnimation}
                        transition={{ duration: 1.5 }}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {translate("Edit")}
                      </motion.th>
                      <motion.th
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={inputTopAnimation}
                        transition={{ duration: 1.5 }}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {translate("Preview & Delete")}
                      </motion.th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {categories?.map((category) => (
                      <motion.tr
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={inputLeftAnimation}
                        transition={{ duration: 1.2 }}
                        key={category?._id}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={baseUrl(category?.image, 8)}
                                alt={category?.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {category?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {category?.courses?.length}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {category?.user?.name}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(category?.createdAt).toLocaleDateString()}
                        </td>
                        {/* edit icon */}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <Link
                            to={`/admin/update-course-category/${category?._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>

                            <span className="sr-only">, {category?.name}</span>
                          </Link>
                        </td>
                        {/* delete icon */}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <Box display="flex">
                            <Link
                              to={`/admin/categorywise-courses/${category?._id}`}
                            >
                              <button
                                type="button"
                                data-drawer-target="drawer-read-product-advanced"
                                data-drawer-show="drawer-read-product-advanced"
                                aria-controls="drawer-read-product-advanced"
                                class="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewbox="0 0 24 24"
                                  fill="currentColor"
                                  class="w-4 h-4 mr-2 -ml-0.5"
                                  style={{
                                    width: "26px",
                                    height: "22px",
                                  }}
                                >
                                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                  />
                                </svg>
                                {translate("Preview")}
                              </button>
                            </Link>
                            <button
                              onClick={() => {
                                setCategoryId(category?._id);
                                handleClickOpen();
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </Box>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
