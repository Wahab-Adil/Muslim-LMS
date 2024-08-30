import { Suspense, useEffect } from "react";
import { Routes, Route, useRoutes, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import LanguageWrapper from "./components/languageWrapper";

import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import CourseDetails from "./page/CourseDetails";
import Privacypolicy from "./page/Privacypolicy";
import Faq from "./page/Faq";
import ScrollToTops from "./components/ScrollToTops";
// import CourseFilters from "./components/ProductsFilters";
import CustomerProfile from "./components/Users/Profile/CustomerProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UpdateCategory from "./components/Admin/Categories/UpdateArticleCategory";
import AddCategory from "./components/Admin/Categories/AddArticleCategory";
import UpdateArticleCategory from "./components/Admin/Categories/UpdateArticleCategory";
import UpdateCourseCategory from "./components/Admin/Categories/UpateCourseCategory";
import ManageArticleCategories from "./components/Admin/Categories/ManageArticleCategories";
import ManageArticleReviews from "./page/manageArticleReview/ManageArticleReviews";
import ManageCourseReviews from "./page/manageCourseReview/ManageCourseReviews";
import ManageCourseCategories from "./components/Admin/Categories/ManageCourseCategories";
import ManageCategoryWiseCourses from "./components/Admin/Categories/ManageCategoryWiseCourses";
import ManageCategoryWiseArticles from "./components/Admin/Categories/ManageCategoryWiseArticles";
import AddCourseCategory from "./components/Admin/Categories/AddCourseCategory";

import Articles from "./page/Articles";
import ArticleDetails from "./page/ArticleDetails";
import InstructorProfile from "./page/InstructorProfile";
import ManageCourses from "./components/Admin/Courses/ManageCourses";
import CourseCategory from "./components/CourseCategory";
import ArticleCategory from "./components/ArticleCategory";
import Section from "./components/Admin/Courses/Section";
import SectionPreview from "./components/Admin/Courses/SectionPreview";
import AddCourse from "./components/Admin/Courses/AddCourse";
import ManageArticles from "./components/Admin/Articles/ManageArticles";
import Settings from "./components/Admin/Settings";
import AddArticle from "./components/Admin/Articles/AddArticle";
import AddChapter from "./components/Admin/Courses/AddChapter";
import EditChapter from "./components/Admin/Courses/EditChapter";
import AddVideoToPlayList from "./components/Admin/Courses/AddVideoToPlayList";
import PreviewVideoCourse from "./components/Admin/Courses/previewVideoCourse";
import EditCourse from "./components/Admin/Courses/EditCourse";
import EditArticle from "./components/Admin/Articles/EditArticle";
import CourseFilter from "./page/CourseFilter/CourseFilter";
import ArticleFilter from "./page/ArticleFilter/ArticleFilter";
import CoursePlayList from "./page/CoursePlayList/CoursePlayList";
// advertisement
import AddAdvertisement from "./components/Admin/advertisement/AddAdvertisement";
import EditAdvertisement from "./components/Admin/advertisement/EditAdvertisement";
import ManageAdvertisement from "./components/Admin/advertisement/ManageAdvertisement";

// all reviews
import AllCoursesReviews from "./page/Reviews/AllCoursesReviews/AllCoursesReviews";
import AllArticleReviews from "./page/Reviews/AllArticlesReviews/AllArticleReviews";
// 404 page
import NotFoundPage from "./page/404";

// auth pages
import Register from "./page/auth/Register";
import Login from "./page/auth/Login";
import Forgot from "./page/auth/Forgot";
import Reset from "./page/auth/Reset";

// utils
import ProtectAdmin from "./utils/ProtectAdmin";

import AddCourseStep from "./components/Admin/Courses/AddCourseStep";
import "./locale/index";

const AppContent = () => {
  let routes = useRoutes([
    { path: "/", element: <Navigate to="/en" replace /> },
    {
      path: "/:lang",
      element: <LanguageWrapper />,
      children: [
        { path: "", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "/course-playlist/:id", element: <CoursePlayList /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/reset", element: <Reset /> },
        { path: "/forgot", element: <Forgot /> },
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/user/:id", element: <InstructorProfile /> },
        { path: "/courses", element: <CourseFilter /> },
        { path: "/articles", element: <ArticleFilter /> },
        { path: "/category/course/:id", element: <CourseCategory /> },
        { path: "/category/article/:id", element: <ArticleCategory /> },
        { path: "/course-details/:id", element: <CourseDetails /> },
        { path: "/articles", element: <Articles /> },
        { path: "/contact", element: <Contact /> },
        { path: "/article-details/:id", element: <ArticleDetails /> },
        { path: "/privacypolicy", element: <Privacypolicy /> },
        { path: "/profile", element: <CustomerProfile /> },
        { path: "/faq", element: <Faq /> },
        {
          path: "admin",
          element: <ProtectAdmin />,
          children: [
            { path: "", element: <AdminDashboard /> },
            { path: "courses/all/reviews", element: <AllCoursesReviews /> },
            { path: "articles/all/reviews", element: <AllArticleReviews /> },
            { path: "settings", element: <Settings /> },
            { path: "add-advertisement", element: <AddAdvertisement /> },
            { path: "edit-advertisement/:id", element: <EditAdvertisement /> },
            { path: "manage-advertisement", element: <ManageAdvertisement /> },
            { path: "add-course", element: <AddCourseStep /> },
            { path: "edit-course/:id", element: <EditCourse /> },
            { path: "manage-courses", element: <ManageCourses /> },
            { path: "section/:id", element: <Section /> },
            {
              path: "section-preview/:section_pre_Id",
              element: <SectionPreview />,
            },
            { path: "add-chapter/:courseId", element: <AddChapter /> },
            { path: "edit-chapter/:courseId", element: <EditChapter /> },
            { path: "add-video/:sectionId", element: <AddVideoToPlayList /> },
            {
              path: "pre-video/:courseId/:videoId/:idx",
              element: <PreviewVideoCourse />,
            },
            { path: "add-article", element: <AddArticle /> },
            { path: "edit-article/:id", element: <EditArticle /> },
            { path: "manage-articles", element: <ManageArticles /> },
            { path: "add-article-category", element: <AddCategory /> },
            {
              path: "update-article-category/:id",
              element: <UpdateArticleCategory />,
            },
            {
              path: "update-course-category/:id",
              element: <UpdateCourseCategory />,
            },
            {
              path: "manage-article-category",
              element: <ManageArticleCategories />,
            },
            {
              path: "manage-article-reviews/:id",
              element: <ManageArticleReviews />,
            },
            {
              path: "categorywise-article/:id",
              element: <ManageCategoryWiseArticles />,
            },
            {
              path: "manage-course-category",
              element: <ManageCourseCategories />,
            },
            {
              path: "manage-course-review/:id",
              element: <ManageCourseReviews />,
            },
            {
              path: "categorywise-courses/:id",
              element: <ManageCategoryWiseCourses />,
            },
            { path: "edit-category/:id", element: <UpdateCategory /> },
            { path: "add-course-category", element: <AddCourseCategory /> },
          ],
        },

        { path: "*", element: <NotFoundPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/ps" replace /> },
  ]);
  return <Suspense fallback={"loading..."}>{routes}</Suspense>;
};

function App() {
  return (
    <>
      <Box sx={{ mt: "5rem" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Navbar />
        <Box sx={{ mt: "4rem" }} />
        <AppContent />
      </Box>
    </>
  );
}

export default App;
