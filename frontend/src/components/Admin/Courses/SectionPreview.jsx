import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import {
  selectVideo_section,
  Video_DeleteFromSection,
  Video_get_Section,
  selectIsLoading,
} from "../../../store/features/video/section/videoSectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import Loader from "../../../components/loader/Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SectionPreview() {
  // router
  const { section_pre_Id } = useParams();
  // redux
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const section = useSelector(selectVideo_section);
  console.log(section);

  const [search, setSearch] = useState("");

  const [DeleteSectionId, setDeleteSectionId] = useState();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(Video_get_Section(section_pre_Id));
  }, []);

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
        <DialogTitle sx={{ px: "10rem" }}>{"Section Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You Sure To Delete Section
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleClose();
              dispatch(
                Video_DeleteFromSection({ section_pre_Id, DeleteSectionId })
              );
              dispatch(Video_get_Section(section_pre_Id));
            }}
          >
            Agree
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
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <Typography
              style={{
                fontSize: ".9rem",
                fontWeight: 700,
              }}
            >
              Section Name:
            </Typography>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              {section?.title}
            </Typography>
          </Box>
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div class="flex-1 flex items-center space-x-2">
                <h5>
                  <span class="text-gray-500">All Belonged Videos:</span>
                  <span class="dark:text-white">
                    {" "}
                    ({section?.videos?.length})
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
                    Search
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
                      placeholder="Search for courses"
                      required
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </form>
              </div>
              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Link
                  to={`/admin/add-chapter/${localStorage.getItem("courseId")}`}
                >
                  <button
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
                    Add New Section
                  </button>
                </Link>
              </div>
              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Link to={"/admin/add-course"}>
                  <button
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
                    Add New Course
                  </button>
                </Link>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="p-4">
                      No
                    </th>
                    <th scope="col" class="p-4">
                      Section Title
                    </th>
                    <th scope="col" class="p-4">
                      Video Duration
                    </th>

                    <th style={{ textAlign: "center" }} scope="col" class="p-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {section?.videos
                    ?.filter((section) => {
                      return section?.video?.title
                        ?.toLowerCase()
                        .includes(search?.toLowerCase());
                    })
                    .map((item, idx) => {
                      return (
                        <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <th
                            scope="row"
                            class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div class="flex items-center ">{idx + 1}</div>
                          </th>
                          <th
                            scope="row"
                            class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div class="flex items-center mr-3">
                              {item?.video.title}
                            </div>
                          </th>
                          <th
                            scope="row"
                            class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item?.video?.duration}
                          </th>

                          <td class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div class="flex items-center justify-center space-x-4">
                              <Link to={`/pre-video/${item?.id}`}>
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
                                  Preview
                                </button>
                              </Link>

                              <button
                                onClick={() => {
                                  handleClickOpen();
                                  console.log(item?._id);
                                  setDeleteSectionId(item?._id);
                                }}
                                type="button"
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
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <form
        action="#"
        id="drawer-update-product"
        class="fixed top-0 left-0 z-40 w-full h-screen max-w-3xl p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
        tabindex="-1"
        aria-labelledby="drawer-update-product-label"
        aria-hidden="true"
      >
        <h5
          id="drawer-label"
          class="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          New Product
        </h5>
        <button
          type="button"
          data-drawer-dismiss="drawer-update-product"
          aria-controls="drawer-update-product"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <div class="grid gap-4 sm:grid-cols-3 sm:gap-6 ">
          <div class="space-y-4 sm:col-span-2 sm:space-y-6">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value="Apple iMac 27&ldquo;"
                placeholder="Type product name"
                required=""
              />
            </div>
            <div>
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                  <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                    <div class="flex items-center space-x-1 sm:pr-4">
                      <button
                        type="button"
                        class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Attach file</span>
                      </button>
                      <button
                        type="button"
                        class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Embed map</span>
                      </button>
                      <button
                        type="button"
                        class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Upload image</span>
                      </button>
                      <button
                        type="button"
                        class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Format code</span>
                      </button>
                      <button
                        type="button"
                        class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Add emoji</span>
                      </button>
                    </div>
                    <div class="flex-wrap items-center hidden space-x-1 sm:flex sm:pl-4">
                      <button
                        type="button"
                        class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Add list</span>
                      </button>
                      <button
                        type="button"
                        class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Settings</span>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-tooltip-target="tooltip-fullscreen"
                    class="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Full screen</span>
                  </button>
                  <div
                    id="tooltip-fullscreen"
                    role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    data-popper-reference-hidden=""
                    data-popper-escaped=""
                    data-popper-placement="bottom"
                    style={{
                      position: " absolute",
                      inset: " 0px auto auto 0px",
                      margin: "0px",
                      transform: "translate3d(0px, 335px, 0px)",
                    }}
                  >
                    Show full screen
                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800">
                  <textarea
                    id="description"
                    rows="8"
                    class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write product description here"
                    required=""
                  >
                    Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7
                    processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4
                    memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB
                    SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard
                    - US
                  </textarea>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Images
              </span>
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
                    alt="imac image"
                  />
                  <button
                    type="button"
                    class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Remove image</span>
                  </button>
                </div>
                <div class="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                    alt="imac image"
                  />
                  <button
                    type="button"
                    class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Remove image</span>
                  </button>
                </div>
                <div class="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png"
                    alt="imac image"
                  />
                  <button
                    type="button"
                    class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Remove image</span>
                  </button>
                </div>
                <div class="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
                    alt="imac image"
                  />
                  <button
                    type="button"
                    class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Remove image</span>
                  </button>
                </div>
              </div>
              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      class="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewbox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span>
                      or drag and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
            </div>
            <div class="flex items-center mb-4">
              <input
                id="product-options"
                type="checkbox"
                value=""
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="product-options"
                class="ml-2 text-sm text-gray-500 dark:text-gray-300"
              >
                Product has multiple options, like different colors or sizes
              </label>
            </div>
            <div class="relative">
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
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                datepicker=""
                id="datepicker"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 datepicker-input"
                value="15/08/2022"
                placeholder="Select date"
              />
            </div>
          </div>
          <div class="space-y-4 sm:space-y-6">
            <div>
              <label
                for="product-brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <input
                type="text"
                id="product-brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value="Apple"
                placeholder="Product Brand"
                required=""
              />
            </div>
            <div>
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected="">Electronics</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
            </div>
            <div>
              <label
                for="item-weight"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Item Weight (kg)
              </label>
              <input
                type="number"
                name="item-weight"
                id="item-weight"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value="12"
                placeholder="Ex. 12"
                required=""
              />
            </div>
            <div>
              <label
                for="length"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Length (cm)
              </label>
              <input
                type="number"
                name="length"
                id="lenght"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value="105"
                placeholder="Ex. 105"
                required=""
              />
            </div>
            <div>
              <label
                for="breadth"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Breadth (cm)
              </label>
              <input
                type="number"
                name="breadth"
                id="breadth"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value="15"
                placeholder="Ex. 15"
                required=""
              />
            </div>
            <div>
              <label
                for="width"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Width (cm)
              </label>
              <input
                type="number"
                name="width"
                id="width"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value="23"
                placeholder="Ex. 23"
                required=""
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-6 sm:w-1/2">
          <button
            type="submit"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update product
          </button>
          <button
            type="button"
            class="text-red-600 inline-flex justify-center items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 mr-1 -ml-1"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Delete
          </button>
        </div>
      </form>
      <div
        id="drawer-read-product-advanced"
        class="overflow-y-auto fixed top-0 left-0 z-40 p-4 w-full max-w-lg h-screen bg-white transition-transform -translate-x-full dark:bg-gray-800"
        tabindex="-1"
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <div>
          <h4
            id="read-drawer-label"
            class="mb-1.5 leading-none text-xl font-semibold text-gray-900 dark:text-white"
          >
            Apple iMac 25"
          </h4>
          <h5 class="mb-5 text-xl font-bold text-gray-900 dark:text-white">
            $2999
          </h5>
        </div>
        <button
          type="button"
          data-drawer-dismiss="drawer-read-product-advanced"
          aria-controls="drawer-read-product-advanced"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <div class="grid grid-cols-3 gap-4 mb-4 sm:mb-5">
          <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
              alt="iMac Side Image"
            />
          </div>
          <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
              alt="iMac Front Image"
            />
          </div>
          <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png"
              alt="iMac Back Image"
            />
          </div>
          <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
              alt="iMac Back Image"
            />
          </div>
          <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png"
              alt="iMac Front Image"
            />
          </div>
          <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
              alt="iMac Side Image"
            />
          </div>
        </div>
        <dl class="sm:mb-5">
          <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Details
          </dt>
          <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            Standard glass ,3.8GHz 8-core 10th-generation Intel Core i7
            processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory,
            Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage,
            Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US.
          </dd>
        </dl>
        <dl class="grid grid-cols-2 gap-4 mb-4">
          <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Shipping
            </dt>
            <dd class="flex items-center text-gray-500 dark:text-gray-400">
              <svg
                class="w-4 h-4 mr-1.5"
                aria-hidden="true"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
              United States, Europe
            </dd>
          </div>
          <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Colors
            </dt>
            <dd class="flex items-center space-x-2 font-light text-gray-500 dark:text-gray-400">
              <div class="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full"></div>
              <div class="flex-shrink-0 w-6 h-6 bg-indigo-400 rounded-full"></div>
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600"></div>
              <div class="flex-shrink-0 w-6 h-6 bg-pink-400 rounded-full"></div>
              <div class="flex-shrink-0 w-6 h-6 bg-teal-300 rounded-full"></div>
              <div class="flex-shrink-0 w-6 h-6 bg-green-300 rounded-full"></div>
            </dd>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Product State
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">
              <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                <svg
                  aria-hidden="true"
                  class="mr-1 w-3 h-3"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                New
              </span>
            </dd>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Sold by
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">Flowbite</dd>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Ships from
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">Flowbite</dd>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Brand
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">Apple</dd>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Dimensions (cm)
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">105 x 15 x 23</dd>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Item weight
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">12kg</dd>
          </div>
        </dl>
        <div class="flex bottom-0 left-0 justify-center pb-4 space-x-4 w-full">
          <button
            type="button"
            class="text-white w-full inline-flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              aria-hidden="true"
              class="mr-1 -ml-1 w-5 h-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              />
            </svg>
            Edit
          </button>
          <button
            type="button"
            class="inline-flex w-full items-center text-white justify-center bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 ardk:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 mr-1.5 -ml-1"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "26px",
                height: "22px",
              }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
      <div
        id="delete-modal"
        tabindex="-1"
        hidden
        class={`fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative w-full h-auto max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="delete-modal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
              <svg
                aria-hidden="true"
                class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <button
                data-modal-toggle="delete-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-toggle="delete-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
    </>
  );
}
