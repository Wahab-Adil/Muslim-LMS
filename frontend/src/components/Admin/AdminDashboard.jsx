import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  ChakraProvider,
  Hide,
  Show,
} from "@chakra-ui/react";
import { Box, Hidden, Button, Typography } from "@mui/material";
import AdminProfile from "./AdminProfile";
import FetchFromApi from "../../utils/FetchFromApi";

// icons

import { PiVideoThin } from "react-icons/pi";
import { MdOutlineVideoSettings } from "react-icons/md";
import { MdVideoLibrary } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { TbCategory2 } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { HiPencilSquare } from "react-icons/hi2";
import { GrUserSettings } from "react-icons/gr";

import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProfile,
  selectAdminProfile,
  selectIsLoading,
} from "../../store/auth/admin/adminSlice";

import { motion, AnimatePresence } from "framer-motion";
import useLocale from "../../hook/useLocales";
import baseUrl from "../../utils/baseUrl";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sidebarVariants = {
  open: { width: "16rem", opacity: 1, transition: { duration: 0.3 } },
  closed: { width: "4rem", opacity: 0.8, transition: { duration: 0.3 } },
};

const itemVariants = {
  hover: { scale: 1.1, transition: { duration: 0.2 } },
  rest: { scale: 1 },
};

export default function AdminDashboard() {
  // localization
  const { translate } = useLocale();

  const [selectedTab, setSelectedTab] = useState();
  const [selectedTabOpen, setSelectedTabOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  //redux
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const btnRef = React.useRef();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAdminProfile());
    setIsAdminRoute(window.location.pathname === "/admin" ? true : false);
  }, []);
  const AdminProf = useSelector(selectAdminProfile);

  const AdvertisementLink = [
    {
      name: translate("Add Category"),
      href: "add-article-category",
      icon: () => <TbCategory2 size={"1.5rem"} />,
    },
    {
      name: translate("Add Advertisement"),
      href: "add-advertisement",
      icon: () => <TbCategory2 size={"1.5rem"} />,
    },
    {
      name: translate("Manage Advertisement"),
      href: "manage-advertisement",
      icon: () => <TbCategory2 size={"1.5rem"} />,
    },
  ];

  const courseLinks = [
    {
      name: translate("Add Course"),
      href: "add-course",
      icon: () => <MdVideoLibrary size={"1.5rem"} />,
      current: false,
    },
    {
      name: translate("Manage Courses"),
      href: "manage-courses",
      icon: () => <MdOutlineVideoSettings size={"1.5rem"} />,
    },
    {
      name: translate("Course Categories"),
      href: "manage-course-category",
      icon: TbCategoryPlus,
    },
    {
      name: translate("Courses Reviews"),
      href: "courses/all/reviews",
      icon: TbCategoryPlus,
    },
  ];

  const CategoryLink = [
    {
      name: translate("Add Category"),
      href: "add-article-category",
      icon: () => <TbCategory2 size={"1.5rem"} />,
    },
  ];

  const articleLinks = [
    {
      name: translate("Add Article"),
      href: "add-article",
      icon: () => <GrArticle size={"1.5rem"} />,
    },
    {
      name: translate("Manage Articles"),
      href: "manage-articles",
      icon: () => <HiPencilSquare size={"1.5rem"} />,
    },
    {
      name: translate("Article Categories"),
      href: "manage-article-category",
      icon: TbCategoryPlus,
    },
    {
      name: translate("Articles Reviews"),
      href: "articles/all/reviews",
      icon: TbCategoryPlus,
    },
  ];
  return (
    <Box>
      <ChakraProvider>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent
            style={{
              width: "60%",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgb(22 78 99)",
                height: "100%",
                width: "100%",
              }}
              style={{
                overflow: "auto",
              }}
            >
              <DrawerCloseButton
                top={"5.5rem"}
                right={"1.5rem"}
                bgColor={"white"}
                f
              />
              <Box sx={{ marginTop: "5rem" }} />

              {/* mobile links */}
              <Box sx={{ pt: "2rem" }} />
              {/* courses links  */}
              <div className="mt-1 pt-1">
                <Box
                  className="space-y-1 px-2"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {AdvertisementLink.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white"
                      style={{
                        gap: ".4rem",
                        height: "2.7rem",
                        minWidth: "165px",
                      }}
                    >
                      <item.icon
                        className="h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </Box>
              </div>
              {/* courses links  */}
              <div className="mt-1 pt-1">
                <Box
                  className="space-y-1 px-2"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {courseLinks.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="group  flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white"
                      style={{
                        gap: ".4rem",
                        height: "2.7rem",
                      }}
                    >
                      <item.icon
                        className="h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </Box>
              </div>
              {/* category links */}
              <div className="mt-1 pt-1">
                <Box
                  className="space-y-1 px-2"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {CategoryLink.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="group  flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white"
                      style={{
                        gap: ".4rem",
                        height: "2.7rem",
                      }}
                    >
                      <item.icon
                        className="h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </Box>
              </div>
              {/* articles links */}
              <div className="mt-1 pt-1">
                <Box
                  className="space-y-1 px-2"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {articleLinks.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="group  flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white"
                      style={{
                        gap: ".4rem",
                        height: "2.7rem",
                      }}
                    >
                      <item.icon
                        className="h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </Box>
              </div>
            </Box>
          </DrawerContent>
        </Drawer>
      </ChakraProvider>
      <div
        style={{
          display: "flex",
          fontSize: "0.8rem",
        }}
      >
        {/* Static sidebar for desktop */}
        <motion.div
          style={{
            position: "relative",
            top: -50,
            boxShadow: "rgba(149, 157, 165, 0.3) 0px 18px 24px",
          }}
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col"
        >
          {/* Sidebar component, swap this element with another sidebar if you like */}

          <aside class="flex" style={{ marginTop: 50 }}>
            <div class="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
              <Box>
                <Link to="/admin">
                  <img
                    title={translate("profile")}
                    class="object-cover w-8 h-8 rounded-full"
                    src={baseUrl(AdminProf?.user?.avatar,8)}
                    alt="profile page"
                  />
                </Link>
              </Box>
              <Box
                style={{ color: "#754FFE" }}
                onClick={() => {
                  setSelectedTab("advertisement");
                  setSelectedTabOpen(!selectedTabOpen);
                }}
                title={translate("advertisement")}
                class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </Box>
              <Box
                onClick={() => {
                  setSelectedTab("course");
                  setSelectedTabOpen(!selectedTabOpen);
                }}
                title={translate("course")}
                style={{ color: "#754FFE" }}
                class="p-1.5 text-blue-500 transition-colors duration-200 rounded-lg dark:text-blue-400 dark:bg-gray-800"
              >
                <MdOutlineVideoSettings size={"1.5rem"} />
              </Box>
              <Box
                onClick={() => {
                  setSelectedTab("category");
                  setSelectedTabOpen(!selectedTabOpen);
                }}
                title={translate("category")}
                style={{ color: "#754FFE" }}
                class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                <TbCategory2 size={"1.5rem"} />
              </Box>

              <Box
                onClick={() => {
                  setSelectedTab("article");
                  setSelectedTabOpen(!selectedTabOpen);
                }}
                title={translate("article")}
                style={{ color: "#754FFE" }}
                class="p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                <GrArticle size={"1.5rem"} />
              </Box>
            </div>

            {selectedTabOpen && (
              <Box
                sx={{
                  marginTop: "-30rem",
                  whiteSpace: "nowrap",
                  minWidth: "200px",
                  paddingLeft: "2 0px",
                }}
              >
                {selectedTab === "advertisement" && (
                  <div className="mt-1 pt-1">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {AdvertisementLink.map((item) => (
                        <Box>
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className="p-1.5 text-black-500 focus:outline-nones transition-colors duration-200 rounded-lg focus:text-blue-400 dark:hover:bg-gray-800 hover:bg-gray-100"
                            style={{
                              display: "flex",
                              gap: ".4rem",
                              height: "2.7rem",
                              minWidth: "165px",
                            }}
                          >
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                            <Typography
                              style={{ color: "#754FFE" }}
                              variant="body2"
                            >
                              {translate(`${item.name}`)}
                            </Typography>
                          </NavLink>
                        </Box>
                      ))}
                    </Box>
                  </div>
                )}
                {/* courses links desktop */}
                {selectedTab === "course" && (
                  <div className="mt-1 pt-1">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {courseLinks.map((item) => (
                        <NavLink
                          className="p-1.5 text-black-500 focus:outline-nones transition-colors duration-200 rounded-lg focus:text-blue-400 dark:hover:bg-gray-800 hover:bg-gray-100"
                          key={item.name}
                          to={item.href}
                          style={{
                            display: "flex",
                            gap: ".4rem",
                            height: "2.7rem",
                          }}
                        >
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                          <Typography
                            style={{ color: "#754FFE" }}
                            variant="body2"
                          >
                            {translate(`${item.name}`)}
                          </Typography>
                        </NavLink>
                      ))}
                    </Box>
                  </div>
                )}

                {/* category links */}
                {selectedTab === "category" && (
                  <div style={{ marginTop: "-5rem" }} className="pt-1">
                    <Box
                      className="space-y-1 px-2"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {CategoryLink.map((item) => (
                        <NavLink
                          className="p-1.5 text-black-500 focus:outline-nones transition-colors duration-200 rounded-lg focus:text-blue-400 dark:hover:bg-gray-800 hover:bg-gray-100"
                          key={item.name}
                          to={item.href}
                          style={{
                            display: "flex",
                            gap: ".4rem",
                            height: "2.7rem",
                          }}
                        >
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                          <Typography
                            style={{ color: "#754FFE" }}
                            variant="body2"
                          >
                            {translate(`${item.name}`)}
                          </Typography>
                        </NavLink>
                      ))}
                    </Box>
                  </div>
                )}

                {/* articles links */}
                {selectedTab === "article" && (
                  <div className="mt-1 pt-1">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {articleLinks.map((item) => (
                        <NavLink
                          className="p-1.5 text-black-500 focus:outline-nones transition-colors duration-200 rounded-lg focus:text-blue-400 dark:hover:bg-gray-800 hover:bg-gray-100"
                          key={item.name}
                          to={item.href}
                          style={{
                            display: "flex",
                            gap: ".4rem",
                            height: "2.7rem",
                          }}
                        >
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                          <Typography
                            style={{ color: "#754FFE" }}
                            variant="body2"
                          >
                            {translate(`${item.name}`)}
                          </Typography>
                        </NavLink>
                      ))}
                    </Box>
                  </div>
                )}
              </Box>
            )}
          </aside>
        </motion.div>

        <div className="flex flex-1 flex-col ">
          <Hidden lgUp>
            <Button
              variant="contained"
              disableElevation
              ref={btnRef}
              onClick={onOpen}
              mb={"1rem"}
              sx={{
                backgroundColor: "#754ffe",
                padding: "0",

                "&:hover": {
                  backgroundColor: "#754ffe",
                },
                mt: "1rem",
              }}
            >
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </Hidden>

          <main className="w-full">
            <Box />
            {isAdminRoute ? (
              <Box>
                <AdminProfile />
              </Box>
            ) : (
              <Box
                sx={{
                  mt: "2rem",
                }}
              >
                <Outlet />{" "}
              </Box>
            )}

            {/* content */}
          </main>
        </div>
      </div>
    </Box>
  );
}

//
