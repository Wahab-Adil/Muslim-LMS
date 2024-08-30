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
import baseUrl from "../../../utils/baseUrl";

import { ReviewsTwoTone } from "@mui/icons-material";

import {
  deleteArticle,
  selectIsLoading as OperationLoading,
} from "../../../store/features/article/articleSlice";

import {
  ArticleSingleCategory,
  selectIsLoading,
  selectArticleCategory,
} from "../../../store/features/article/category/articleCategorySlice";

import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../components/loader/Loader.jsx";

import {
  FILTER_Data,
  selectFilteredArticles,
} from "../../../store/features/article/Articles_Search";
// paginate

import Paginate from "../../paginate/paginate";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ManageArticles() {
  // store
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isOperationLoading = useSelector(OperationLoading);
  const data = useSelector(selectArticleCategory);
  const AllArticles = data?.category?.articles;
  console.log("AllArticles", data);

  const FiteredArticles = useSelector(selectFilteredArticles);

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
    dispatch(ArticleSingleCategory(id));
  }, []);

  useEffect(() => {
    dispatch(FILTER_Data({ Data: AllArticles ? AllArticles : [], search }));
  }, [AllArticles, search, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {isOperationLoading && <Loader />}

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
            Are You Sure To Delete Course
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              handleClose();
              await dispatch(deleteArticle(CourseId));
              dispatch(ArticleSingleCategory(id));
            }}
          >
            Delete
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
                  <span class="text-gray-500"> Showing :</span>(
                  {currentItems?.length})
                  <span class="text-gray-500">From Articles:</span>
                  <span class="dark:text-white"> ({AllArticles?.length})</span>
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
                <Link to={"/admin/add-article"}>
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
                    Add Article
                  </button>
                </Link>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="p-4">
                      Article Name
                    </th>
                    <th scope="col" class="p-4">
                      Category
                    </th>

                    <th scope="col" class="p-4">
                      views
                    </th>
                    <th scope="col" class="p-4">
                      Reviews
                    </th>

                    <th scope="col" class="p-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((article) => {
                    return (
                      <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <th
                          scope="row"
                          class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div class="flex items-center mr-3">
                            <img
                              src={baseUrl(article?.thumbnail, 8)}
                              alt="iMac Front Image"
                              class="h-8 w-auto mr-3"
                            />
                            {article?.title}
                          </div>
                        </th>
                        <td class="px-4 py-3">
                          <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {article?.category}
                          </span>
                        </td>

                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {article?.views}
                        </td>
                        <td>
                          <Link
                            to={`/admin/manage-article-reviews/${article?.id}`}
                          >
                            <button
                              type="button"
                              data-drawer-target="drawer-read-product-advanced"
                              data-drawer-show="drawer-read-product-advanced"
                              aria-controls="drawer-read-product-advanced"
                              class="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              <ReviewsTwoTone /> Reviews
                            </button>
                          </Link>
                        </td>
                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div class="flex items-center space-x-4">
                            <Link to={`/admin/edit-article/${article?.id}`}>
                              <button
                                type="button"
                                data-drawer-target="drawer-update-product"
                                data-drawer-show="drawer-update-product"
                                aria-controls="drawer-update-product"
                                class="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                style={{ backgroundColor: "#754ffe" }}
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
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                  <path
                                    fill-rule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                Edit
                              </button>
                            </Link>

                            <Link to={`/article-details/${article?.id}`}>
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
                              title="delete"
                              onClick={() => {
                                handleClickOpen();
                                setCourseId(article?.id);
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
                      </tr>
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
          FilterData={FiteredArticles}
          currentItems={currentItems}
          setCurrentItems={setCurrentItems}
          itemsPerPage={5}
        />
      </div>
    </>
  );
}
