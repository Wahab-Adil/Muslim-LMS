import React, { useEffect, useState } from "react";
import {
  getAdminProfile,
  selectIsLoading,
  selectAdminProfile,
} from "../../store/auth/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader.jsx";
import { Box, Button } from "@mui/material";

// assets
import course1 from "../../assets/icon-images/couse1.png";
import article from "../../assets/icon-images/article.png";
import views from "../../assets/icon-images/views.png";
import baseUrl from "../../utils/baseUrl";
import useLocale from "../../hook/useLocales";
import { NavLink } from "react-router-dom";

const AdminProfile = () => {
  const { translate, currentLang } = useLocale();
  useEffect(() => {
    if (
      currentLang.value === "fa" ||
      currentLang.value === "ps" ||
      currentLang.value === "ar"
    ) {
      document.documentElement.dir = "rtl";
    } else if (currentLang.value === "en") {
      document.documentElement.dir = "ltr";
    }
  }, [currentLang.value]);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const AdminProfile = useSelector(selectAdminProfile);
  useEffect(() => {
    dispatch(getAdminProfile());
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      <div className="max-width-full mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>

        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32"
            src={baseUrl(AdminProfile?.user?.avatar, 8)}
            alt="avatar"
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{AdminProfile?.user?.name}</h2>
          <p className="text-gray-500">{AdminProfile?.user?.role}</p>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center justify-around">
            <img
              title={translate("total Courses")}
              className="object-cover object-center h-32"
              src={course1}
              style={{ maxWidth: "50px", height: "50px" }}
              alt="calculation"
            />
            <div>{AdminProfile?.user?.courses?.length}</div>
          </li>
          <li className="flex flex-col items-center justify-around">
            <img
              title={translate("total Views")}
              className="object-cover object-center h-32"
              src={views}
              style={{ maxWidth: "50px", height: "50px" }}
              alt="avatar"
            />
            <div>{AdminProfile?.totalViews}</div>
          </li>
          <li className="flex flex-col items-center justify-between">
            <img
              title={translate("total Articles")}
              className="object-cover object-center h-32"
              src={article}
              style={{ maxWidth: "50px", height: "50px" }}
              alt="calculation"
            />
            <div>{AdminProfile?.user?.articles?.length}</div>
          </li>
        </ul>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            component={NavLink}
            to={`/admin/edit-profile`}
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#754ffe",
              "&:hover": {
                backgroundColor: "#754ffe",
                color: "white",
              },
              mt: "1rem",
              mb: "1rem",
            }}
          >
            {translate("Edit Profile")}
          </Button>
        </Box>
      </div>
      <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
        <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div class="p-4 bg-green-400">
            <img
              title="total Courses"
              className="object-cover object-center h-32"
              src={course1}
              style={{ maxWidth: "50px", height: "50px" }}
              alt="calculation"
            />
          </div>
          <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">
              {translate("Courses Total Ratings")}
            </h3>
            <p class="text-3xl">{AdminProfile?.user?.coursesTotalRatings}</p>
          </div>
        </div>

        <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div class="p-4 bg-indigo-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              ></path>
            </svg>
          </div>
          <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">
              {translate("Courses Total Comments")}
            </h3>
            <p class="text-3xl">{AdminProfile?.user?.coursesTotalComments}</p>
          </div>
        </div>
        <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div class="p-4 bg-indigo-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              ></path>
            </svg>
          </div>
          <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">
              {translate("Articles Total Comments")}
            </h3>
            <p class="text-3xl">{AdminProfile?.user?.articlesTotalComments}</p>
          </div>
        </div>
        <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div class="p-4 bg-red-400">
            <img
              title="total Articles"
              className="object-cover object-center h-32"
              src={article}
              style={{ maxWidth: "50px", height: "50px" }}
              alt="calculation"
            />
          </div>
          <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">
              {translate("Articles Total Ratings")}
            </h3>
            <p class="text-3xl">{AdminProfile?.user?.articlesTotalRatings}</p>
          </div>
        </div>
      </div>
      <div
        style={{ margin: "auto", mt: "2rem" }}
        class="bg-white width-full shadow overflow-hidden sm:rounded-lg"
      >
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {translate(`${AdminProfile?.user?.role} Info`)}
          </h3>
          <p class="mt-1 max-w-3xl text-sm text-gray-500">
            {translate(
              `Details and informations about ${AdminProfile?.user?.role}`
            )}
          </p>
        </div>
        <div class="border-t border-gray-200">
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              {" "}
              {translate("Name")}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {AdminProfile?.user?.name}
            </dd>
          </div>
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-900">
                {translate("Email")}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {AdminProfile?.user?.email}
              </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-900">
                {translate("Password")}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {AdminProfile?.user?.password}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-900">
                {translate("Role")}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {AdminProfile?.user?.role}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-900">
                {translate("Bio")}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {AdminProfile?.user?.bio}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-900">
                {translate("Admin Location")}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {AdminProfile?.user?.location === "" ||
                !AdminProfile?.user?.location
                  ? "Not Provided"
                  : null}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-900">
                {translate("Total Members")}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {AdminProfile?.user?.totalUsers - 1}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
