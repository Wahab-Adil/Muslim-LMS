import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { motion } from "framer-motion";

import {
  selectAllSelectedAdvertisments,
  deleteSelectedAdvertisement,
  selectIsLoading,
  getSelectedAdvertisements,
  selectadvertisement,
} from "../../../store/features/advertisement/advertisementSlice";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../components/loader/Loader.jsx";

import {
  FILTER_Data,
  selectFilteredAdvertisement,
} from "../../../store/features/advertisement/AdvertisementSearch";
// paginate

import Paginate from "../../paginate/paginate";
import baseUrl from "../../../utils/baseUrl";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
import useLocale from "../../../hook/useLocales";
import { useMediaQuery, useTheme } from "@mui/material";

export default function ManageAdvertisement() {
  const { translate } = useLocale();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  // store
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const Advertisement = useSelector(selectAllSelectedAdvertisments);
  const FilteredAdvertisements = useSelector(selectFilteredAdvertisement);

  const [currentItems, setCurrentItems] = useState([]);
  const [search, setSearch] = useState("");
  const [CourseId, setCourseId] = useState();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getSelectedAdvertisements());
  }, []);

  useEffect(() => {
    dispatch(FILTER_Data({ Data: Advertisement, search }));
  }, [Advertisement, search, dispatch]);

  const inputTopAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const inputBottomAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const inputLeftAnimation = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const inputRightAnimation = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  return (
    <>
      {isLoading && <Loader />}

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
            {translate("Are You Sure To Delete Advertisement")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{translate("Cancel")}</Button>
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              handleClose();

              await dispatch(deleteSelectedAdvertisement(CourseId));
              await dispatch(getSelectedAdvertisements());
            }}
          >
            {translate("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <section
        class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased"
        style={{
          marginTop: "-6rem",
          paddingTop: "8rem",
        }}
      >
        {/* table starts here */}
        <div
          class="mx-auto max-w-screen-2xl px-4 lg:px-12"
          style={{
            overflow: "auto",
          }}
        >
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div class="flex-1 flex items-center space-x-2">
                <h5>
                  <span class="text-gray-500"> {translate("Showing")} :</span>(
                  {currentItems?.length})
                  <span class="text-gray-500">
                    {translate("From advertisements")}:
                  </span>
                  <span class="dark:text-white">
                    {" "}
                    ({Advertisement?.length})
                  </span>
                </h5>

                <div
                  id="results-tooltip"
                  role="tooltip"
                  class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  Showing 1-100 of 436 results
                  <div class="tooltip-arrow" data-popper-arrow=""></div>
                </div>
              </div>
              <div class="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3"></div>
            </div>
            <div class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
              <div class="w-full md:w-1/2">
                <form class="flex items-center">
                  <label for="simple-search" class="sr-only">
                    {translate("Search")}
                  </label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      placeholder={translate("Search for courses")}
                      required
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </form>
              </div>
              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Link to={"/admin/add-advertisement"}>
                  <motion.button
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={inputRightAnimation}
                    transition={{ duration: 1.5 }}
                    type="button"
                    id="createProductButton"
                    data-modal-toggle="createProductModal"
                    class="flex items-center justify-center text-white bg-indigo-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    style={{ backgroundColor: "#754ffe" }}
                  >
                    <svg
                      class="h-3.5 w-3.5 mr-1.5 -ml-1"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      style={{
                        width: "19px",
                        height: "18px",
                      }}
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    {translate("Add advertisement")}
                  </motion.button>
                </Link>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="p-4">
                      {translate("Background")}
                    </th>

                    {smDown ? null : (
                      <th scope="col" class="p-4">
                        {translate("Title")}
                      </th>
                    )}

                    <th scope="col" class="p-4">
                      {translate("Actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((advertisement) => {
                    return (
                      <motion.tr
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={inputLeftAnimation}
                        transition={{ duration: 1.2 }}
                        class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <th
                          scope="row"
                          class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div class="flex items-center ">
                            <motion.img
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={inputTopAnimation}
                              transition={{ duration: 1.5 }}
                              src={baseUrl(advertisement?.background, 8)}
                              alt="iMac Front Image"
                              class={`h-8 w-auto ${
                                smDown ? undefined : "mr-3"
                              }`}
                            />
                            <div style={{ paddingRight: 39 }} />
                            <div class="flex items-center ">
                              <motion.img
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={inputBottomAnimation}
                                transition={{ duration: 1.5 }}
                                src={baseUrl(advertisement?.image, 8)}
                                alt="iMac Front Image"
                                class={`h-8 w-auto ${
                                  smDown ? "mr-60" : "mr-3"
                                }`}
                              />
                            </div>
                          </div>
                        </th>
                        {smDown ? null : (
                          <th
                            scope="row"
                            class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: `${advertisement?.title?.slice(
                                  0,
                                  30
                                )}...`,
                              }}
                            />
                          </th>
                        )}

                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div class="flex items-center space-x-4">
                            <button
                              onClick={() => {
                                handleClickOpen();
                                setCourseId(advertisement?._id);
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
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paginate
          FilterData={FilteredAdvertisements}
          currentItems={currentItems}
          setCurrentItems={setCurrentItems}
          itemsPerPage={5}
        />
      </div>
    </>
  );
}
