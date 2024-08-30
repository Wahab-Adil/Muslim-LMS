import { configureStore } from "@reduxjs/toolkit";

// user & Admin
import UserReducer from "./auth/user/userSlice";
import AdminReducer from "./auth/admin/adminSlice";

// ARTICLES
import ArticleReducer from "./features/article/articleSlice";
import ArticleCategoryReducer from "./features/article/category/articleCategorySlice";
import ArticleReviewReducer from "./features/article/reviews/articleReviewsSlice";

// VIDEOS
import videoCategoryReducer from "./features/video/category/videoCategorySlice";
import videoCourseReducer from "./features/video/courses/videoCoursesSlice";
import videoReviewReducer from "./features/video/reviews/videoReviewsSlice";
import videoSectionReducer from "./features/video/section/videoSectionSlice";

// search

// // Article
import ArticleCate_Search from "./features/article/category/Article_CategorySearch";
import Article_Search from "./features/article/Articles_Search";

// Courses
import CourseCate_Search from "./features/video/category/Courses_CategorySearch";
import Course_Search from "./features/video/courses/Courses_Search";

// Advertisement Search
import AdvertisementSearchReducer from "./features/advertisement/AdvertisementSearch";

// advertisements
import AdvertisementReducer from "./features/advertisement/advertisementSlice";

// global Reviews
import GlobalReviewsReducer from "./features/globalReviews/globalReviewSlice";

export const store = configureStore({
  reducer: {
    // user & admin
    user: UserReducer,
    admin: AdminReducer,

    // article Reducers
    article: ArticleReducer,
    articleCategory: ArticleCategoryReducer,
    articleReview: ArticleReviewReducer,

    // videos Reducers
    videoCategory: videoCategoryReducer,
    videoCourse: videoCourseReducer,
    videoReview: videoReviewReducer,
    videoSection: videoSectionReducer,

    // advertisement
    advertisement: AdvertisementReducer,

    // // search
    ArticleSearch: Article_Search,
    CourseSearch: Course_Search,
    ArticleCategory_Search: ArticleCate_Search,
    CourseCategory_Search: CourseCate_Search,
    advertisementSearch: AdvertisementSearchReducer,

    // global Review
    globalReview: GlobalReviewsReducer,
  },
});
