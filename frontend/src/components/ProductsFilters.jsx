import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Transition,
  RadioGroup,
} from "@headlessui/react";
import "../index.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  Box,
  Typography,
  Autocomplete,
  Container,
  Button,
} from "@mui/material";
import { Hidden } from "@mui/material";
// star icon
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Pagebanner from "./Pagebanner";
import Course from "./Course";
import courses from "../utils/data";
import { comCss } from "./ComponentsCss";
import Footer from "./Footer";

import {
  Video_AllCourse,
  selectIsLoading,
  selectAllCourses,
} from "../store/features/video/courses/videoCoursesSlice";

import {
  Video_AllCategories,
  // selectIsLoading,
  selectVideoAllCategories,
} from "../store/features/video/category/videoCategorySlice";

import { useDispatch, useSelector } from "react-redux";
import Loader from "./loader/Loader";
// filter
import Fiteration from "../utils/filter";

// paginate
import Paginate from "./paginate/paginate";

import {
  FILTER_DATA,
  selectFilteredData,
} from "../store/features/video/courses/Courses_Search";

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
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductsFilters() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const AllCourses = useSelector(selectAllCourses);
  const AllCategories = useSelector(selectVideoAllCategories);
  const FilterCourses = useSelector(selectFilteredData);

  const [search, setSearch] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [category, setCategory] = useState();
  const [rating, setRating] = useState();
  const [language, setLanguage] = useState();
  const [filteredCourses, setFilteredCourses] = useState();

  useEffect(() => {
    dispatch(Video_AllCourse());
    setCurrentItems(AllCourses);
    dispatch(Video_AllCategories());
  }, []);

  useEffect(() => {
    dispatch(FILTER_DATA({ Data: filteredCourses, search }));
  }, [AllCourses, search]);

  useEffect(() => {
    setFilteredCourses(
      Fiteration(AllCourses, {
        category,
        rating,
        language,
      })
    );
  }, [category, rating, language]);

  useEffect(() => {
    dispatch(FILTER_DATA({ Data: filteredCourses, search }));
  }, [filteredCourses]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const classes = comCss();

  return (
    <div>
      {/* Search for courses start */}
      {isLoading && <Loader />}

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
            Search for Courses
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
                    {/* colors categories mobile section */}
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
                                Categories
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
                            <div className="space-y-6">
                              <RadioGroup>
                                <div className="flex items-start  flex-row flex-wrap">
                                  {AllCategories?.map((cat) => (
                                    <>
                                      <input
                                        onClick={() => setCategory(cat.name)}
                                        name="brand"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <Typography
                                        sx={{
                                          marginLeft: 1,
                                          fontSize: ".9rem",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {cat?.name}
                                      </Typography>
                                    </>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    {/* colors end categories section */}

                    {/* price categories section mobile*/}
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
                              {["Pashto", "Dari", "English"]?.map(
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
                                        onClick={() => setLanguage(lang)}
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
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    type="text"
                    className="w-full rounded-md rounded-r-none "
                    id="searchBar"
                    placeholder="Search Courses"
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
              Showing ({currentItems?.length}) of ({AllCourses?.length}) courses
            </Typography>
            {/* sort */}
            <div className="flex items-center">
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
            <Button
              onClick={() => {
                setCategory();
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
                marginBottom: "1rem",
              }}
            >
              Reset Filter
            </Button>
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
                    <h3 className="sr-only">Categories</h3>

                    {/* colors categories Desktop section */}
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
                                Categories
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
                            <div className="space-y-6">
                              <RadioGroup>
                                <div className="flex items-start  flex-row flex-wrap">
                                  {AllCategories?.map((cat, idx) => (
                                    <div key={cat?.name + idx}>
                                      <input
                                        onClick={() => setCategory(cat.name)}
                                        name="brand"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <Typography
                                        sx={{
                                          marginLeft: 1,
                                          fontSize: ".9rem",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {cat?.name}
                                      </Typography>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    {/* colors end categories section */}

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
                                <Disclosure.Button
                                  key={rating + idx}
                                  className="flex w-full items-center justify-between bg-white  hover:text-gray-500 h-4"
                                >
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
                              {["Pashto", "Dari", "English"]?.map(
                                (language, idx) => (
                                  <Disclosure.Button
                                    className="flex w-full items-center justify-between bg-white  hover:text-gray-500 h-6"
                                    key={idx + language}
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
              {/* Product grid */}
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "3rem",
                    marginLeft: ".7rem",
                  }}
                >
                  {currentItems?.map((course, idx) => {
                    return (
                      <>
                        <div key={course + idx} style={{ flex: 0.2 }}>
                          <Course course={course} />
                        </div>
                      </>
                    );
                  })}
                </Box>
              </>
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              {/* <Paginate
                FilterData={FilterCourses}
                setCurrentItems={setCurrentItems}
                itemsPerPage={5}
              /> */}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
