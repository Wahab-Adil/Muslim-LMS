import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import "../index.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NavigateNextTwoToneIcon from "@mui/icons-material/NavigateNextTwoTone";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import {
  FunnelIcon,
  LanguageIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  Stack,
  Button,
} from "@mui/material";
import { Hidden } from "@mui/material";
// star icon
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { comCss } from "./ComponentsCss";
import Footer from "./Footer";

import {
  ArticleSingleCategory,
  selectArticleCategory,
  selectIsLoading,
} from "../store/features/article/category/articleCategorySlice";

import { ArticleAllCategory } from "../store/features/article/category/articleCategorySlice";

import { useDispatch, useSelector } from "react-redux";
import Loader from "./loader/Loader";
import { useParams, Link } from "react-router-dom";

import filterCourses from "../utils/filter";
import moment from "moment";
import baseUrl from "../utils/baseUrl";
import ReactPaginate from "react-paginate";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const starsStyle = {
  fontSize: ".8rem",
  color: "#b4690e",
};
// ratings
const ratings = [
  {
    stars: [
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStarHalfAlt style={starsStyle} />,
    ],
    title: "4.5",
  },
  {
    stars: [
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
    ],
    title: "4.0",
  },
  {
    stars: [
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStarHalfAlt style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
    ],
    title: "3.5",
  },
  {
    stars: [
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
    ],
    title: "3.0",
  },
  {
    stars: [
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
    ],
    title: "2.0",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ArticleCategory() {
  const matches_450 = useMediaQuery("(max-width:450px)");
  const matches_920 = useMediaQuery("(max-width:926px)");
  // redux
  const categoryId = useParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(ArticleSingleCategory(categoryId?.id));
    dispatch(ArticleAllCategory());
  }, []);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const CategoryArticles = useSelector(selectArticleCategory);

  // filter
  const [rating, setRating] = useState();
  const [language, setLanguage] = useState();

  const filterArticles = CategoryArticles?.category?.articles?.filter(
    (article) =>
      article?.title?.toLowerCase()?.indexOf(search?.toLowerCase()) !== -1
  );

  function filteredData(products, selected, search) {
    let filteredProducts = products;

    // Filtering Input Items
    if (search) {
      filteredProducts = filterArticles;
    } else {
      if (selected?.options?.rating) {
        const ratingThreshold = parseFloat(selected?.options?.rating);

        // Filter courses based on the rating threshold
        filteredProducts = products?.filter(
          (course) => course?.averageRating >= ratingThreshold
        );
      }
      // Applying selected filter
      if (!selected?.options) {
        if (
          selected?.options?.language === "" &&
          selected?.options?.rating === ""
        ) {
          filteredProducts = products;
        } else if (
          selected?.options?.language === null &&
          selected?.options?.rating === null
        ) {
          setLanguage("");
          setRating("");
          filteredProducts = products;
        }
      } else if (selected?.options?.language && !selected?.options?.rating) {
        filteredProducts = filteredProducts?.filter((course) => {
          return course?.language === selected?.options?.language;
        });

        // if Two Option Exist
      } else if (selected?.options?.language && selected?.options?.rating) {
        filteredProducts = filteredProducts?.filter(
          ({ language, averageRating }) => {
            return (
              language === selected?.options?.language &&
              averageRating === parseFloat(selected?.options?.rating)
            );
          }
        );
      }
    }
    return filteredProducts?.map((article) => (
      <Articles
        length={CategoryArticles?.category?.articles?.length}
        key={Math.random()}
        article={article}
      />
    ));
  }

  const result = filteredData(
    CategoryArticles?.category?.articles,
    { options: { rating, language } },
    search
  );

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 4;
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  const indexOfLastItem = (pageNumber + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result?.slice(indexOfFirstItem, indexOfLastItem);

  // states

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const classes = comCss();

  return (
    <>
      {isLoading && <Loader />}
      <div>
        {/* <Pagebanner title="Search for Courses" /> */}
        {/* Search for courses start */}
        <Box className={classes.page_banner}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h2"
              sx={{
                textAlign: { xs: "center", sm: "start" },
                marginBottom: "3rem",
                fontWeight: "700 !important",
                fontSize: {
                  xs: "1.4rem !important",
                  sm: "3rem !important",
                },
                color: "white",
              }}
            >
              Search for Articles
            </Typography>
          </Container>
        </Box>
        {/* Search for courses end  */}
        <div>
          {/* Mobile menu */}
          <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileMenuOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pt-5 pb-2">
                      <button
                        type="button"
                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>

        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Mobile Filters */}

                    <form className="mt-4 border-t border-gray-200 w-full">
                      <Disclosure
                        as="div"
                        key="disclosure"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <Typography
                                  sx={{
                                    fontSize: "1rem !important",
                                    color: "black",
                                    fontWeight: "600",
                                  }}
                                >
                                  Ratings
                                </Typography>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6 mt-2">
                                {ratings?.map((rating, idx) => (
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white  hover:text-gray-500 h-4">
                                    <Box
                                      key={idx}
                                      sx={{
                                        display: "flex",
                                        gap: ".7rem",
                                        alignItems: "center",
                                      }}
                                    >
                                      <input
                                        onClick={() => setRating(rating.title)}
                                        name="price"
                                        type="radio"
                                        className="h-4 w-4 rounded border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: ".5rem",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "2px",
                                          }}
                                        >
                                          {rating?.stars?.map((star) => {
                                            return star;
                                          })}
                                        </Box>
                                        <Typography
                                          sx={{
                                            fontSize: ".9rem",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {rating.title}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Disclosure.Button>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      {/*  end price categories section  mobile*/}

                      {/* course language section categories section */}
                      <Disclosure
                        as="div"
                        key="disclosure"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <Typography
                                  sx={{
                                    fontSize: "1rem !important",
                                    color: "black",
                                    fontWeight: "600",
                                  }}
                                >
                                  Language
                                </Typography>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-2">
                                {["pashto", "dari", "english"]?.map(
                                  (lang, idx) => (
                                    <Disclosure.Button
                                      className="flex w-full items-center justify-between bg-white  hover:text-gray-500 h-6"
                                      key={idx}
                                    >
                                      <Box
                                        key={lang}
                                        sx={{
                                          display: "flex",
                                          gap: ".7rem",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          onClick={() =>
                                            setLanguage(
                                              lang.toLocaleLowerCase()
                                            )
                                          }
                                          name="brand"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <Typography
                                          sx={{
                                            fontSize: ".9rem",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {lang}
                                        </Typography>
                                      </Box>
                                    </Disclosure.Button>
                                  )
                                )}
                              </div>
                            </Disclosure.Panel>
                            <Button
                              onClick={() => {
                                setRating();
                                setLanguage();
                              }}
                              variant="contained"
                              sx={{
                                backgroundColor: "#754ffe",
                                "&:hover": {
                                  backgroundColor: "#754ffe",
                                },
                                fontSize: "1rem !important",
                                color: "white",
                                fontWeight: "600",
                                marginTop: "1rem",
                              }}
                            >
                              Reset Filter
                            </Button>
                          </>
                        )}
                      </Disclosure>
                      {/*  end product language section */}
                    </form>
                    {/* end of mobile filters */}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/*  */}
          {/* <!-- component --> */}

          {/*  */}

          <main
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            style={{ marginTop: "4rem" }}
          >
            <div
              className="w-full"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="max-w-xl">
                <div className="flex space-x-4">
                  <div className="flex rounded-md overflow-hidden w-full">
                    <input
                      type="text"
                      className="w-full rounded-md rounded-r-none "
                      id="searchBar"
                      placeholder="Search for courses"
                      required
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="bg-indigo-600 text-white px-6 text-lg font-semibold rounded-r-md"
                      style={{ paddingTop: "8px", paddingBottom: "8px" }}
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  textAlign: { xs: "center", sm: "start" },
                  marginBottom: "3rem",
                  fontWeight: "600 !important",
                  fontSize: {
                    xs: "1rem !important",
                    sm: "1.8rem !important",
                  },
                }}
              >
                {search
                  ? undefined
                  : `showing (${currentItems?.length}) Articles of 
                (${CategoryArticles?.category?.articles?.length})`}
              </Typography>
              {/* sort */}
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  {/* sort item links */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <Box
                sx={{
                  display: "flex",
                }}
              >
                {/* Desktop  Filters */}
                <Hidden smDown>
                  <Box>
                    <form
                      className="hidden lg:block w-100"
                      style={{ width: "20rem" }}
                    >
                      <Button
                        onClick={() => {
                          setRating();
                          setLanguage();
                        }}
                        variant="contained"
                        sx={{
                          backgroundColor: "#754ffe",
                          "&:hover": {
                            backgroundColor: "#754ffe",
                          },
                          fontSize: "1rem !important",
                          color: "white",
                          fontWeight: "600",
                          marginBottom: ".5rem",
                        }}
                      >
                        Reset Filter
                      </Button>
                      {/* price categories section Desktop*/}
                      <Disclosure
                        as="div"
                        key="disclosure"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <Typography
                                  sx={{
                                    fontSize: "1rem !important",
                                    color: "black",
                                    fontWeight: "600",
                                  }}
                                >
                                  Ratings
                                </Typography>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6 mt-2">
                                {ratings?.map((rating, idx) => (
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white  hover:text-gray-500 h-4">
                                    <Box
                                      key={idx}
                                      sx={{
                                        display: "flex",
                                        gap: ".7rem",
                                        alignItems: "center",
                                      }}
                                    >
                                      <input
                                        onClick={() => setRating(rating.title)}
                                        name="rating"
                                        type="radio"
                                        className="h-4 w-4 rounded border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: ".5rem",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "2px",
                                          }}
                                        >
                                          {rating?.stars?.map((star) => {
                                            return star;
                                          })}
                                        </Box>
                                        <Typography
                                          sx={{
                                            fontSize: ".9rem",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {rating.title}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Disclosure.Button>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      {/*  end price categories section  Desktop*/}

                      {/* course language section categories section */}
                      <Disclosure
                        as="div"
                        key="disclosure"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <Typography
                                  sx={{
                                    fontSize: "1rem !important",
                                    color: "black",
                                    fontWeight: "600",
                                  }}
                                >
                                  Language
                                </Typography>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-2">
                                {["pashto", "dari", "english"]?.map(
                                  (language, idx) => (
                                    <Disclosure.Button
                                      className="flex w-full items-center justify-between bg-white  hover:text-gray-500 h-6"
                                      key={idx}
                                    >
                                      <Box
                                        key={language}
                                        sx={{
                                          display: "flex",
                                          gap: ".7rem",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          onClick={() => setLanguage(language)}
                                          name="brand"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <Typography
                                          sx={{
                                            fontSize: ".9rem",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {language}
                                        </Typography>
                                      </Box>
                                    </Disclosure.Button>
                                  )
                                )}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      {/*  end product language section */}
                    </form>
                  </Box>
                </Hidden>
                {/* desktop End */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    justifyContent: matches_920 ? "center" : undefined,
                  }}
                >
                  {currentItems}
                </Box>
              </Box>
              <Box mt={4} sx={{ display: "flex", justifyContent: "center" }}>
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
              </Box>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

export const Articles = ({ article, length }) => {
  const matches_450 = useMediaQuery("(max-width:450px)");
  const matches_920 = useMediaQuery("(max-width:926px)");
  const findLangLocale = (language) => {
    if (!language) {
      return "";
    }
    if (language === "dari") {
      return "دری";
    } else if (language === "pashto") {
      return "پښتو";
    } else if (language === "arabic") {
      return "عربی";
    } else {
      return language;
    }
  };
  return (
    <>
      <Box>
        {length === 0 && (
          <Typography
            style={{
              textAlign: "center",
              fontSize: ".9rem",
              fontWeight: 700,
            }}
          >
            No Articles With Filter Options You Selected
          </Typography>
        )}

        <Link
          style={{
            maxWidth: matches_450 ? "60%" : "300px",
          }}
          to={`/article-details/${article?.id}`}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            key={article?.id}
          >
            <div
              className="flex max-w-lg overflow-hidden bg-white rounded-lg dark:bg-gray-800 "
              style={{
                position: "relative",
                backgroundColor: "rgba(218,228,237,.32)",
                maxHeight: matches_450 ? "130px" : "100%",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  backgroundColor: "#754ffe",
                }}
                className=" z-30 absolute top-0 left-2 w-20 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white"
              >
                {findLangLocale(article?.language)}
              </span>
              <Box>
                <img
                  style={{
                    maxWidth: "190px",
                    minHeight: "190px",
                    maxHeight: "190px",
                    borderRight: "3px dotted white",
                  }}
                  src={baseUrl(article?.thumbnail, 8)}
                  alt=""
                />
              </Box>
              <Box
                sx={{
                  width: "15rem",
                  px: "1rem",
                  py: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Typography
                  style={{
                    textAlign: "start",
                    fontSize: ".9rem",
                    fontWeight: 700,
                  }}
                >
                  {article?.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link to={`/user/${article?.writer?._id}`}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{
                          height: "2rem",
                          width: "2rem",
                        }}
                        className="object-cover rounded-full"
                        src={baseUrl(article?.writer?.avatar, 8)}
                        alt="Avatar"
                      />
                      <Stack
                        sx={{
                          ml: ".6rem",
                          alignItems: "start",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: ".8rem",
                            fontWeight: "bold",
                            margin: 0,
                            color: "#754ffe",
                            "&:hover": {
                              color: "#a190e2",
                            },
                          }}
                        >
                          {article?.writer?.name}
                        </Typography>

                        <span
                          style={{
                            fontSize: ".7rem",
                            fontWeight: "bold",
                            margin: 0,
                            color: "gray",
                          }}
                        >
                          {moment(article?.updatedAt).format("MMMM Do YYYY")}
                        </span>
                        <span
                          style={{
                            fontSize: ".7rem",
                            fontWeight: "bold",
                            margin: 0,
                            color: "gray",
                          }}
                        >
                          {moment(
                            moment(article?.updatedAt).format("MMMM Do YYYY"),
                            "MMMM Do YYYY"
                          ).fromNow()}
                        </span>
                      </Stack>
                    </Box>
                  </Link>
                </Box>
              </Box>
            </div>
          </Box>
        </Link>
      </Box>
    </>
  );
};
