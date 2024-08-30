import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

// yup & formik
import * as yup from "yup";
import { useFormik } from "formik";
import TextError from "../../TextError";
import { BsImages } from "react-icons/bs";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";

// yup
const CategorySchema = yup.object().shape({
  name: yup.string().required(),
});

import Loader from "../../loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import {
  Video_SingleCategory,
  Video_UpdateCategory,
  selectVideoCategory,
  selectIsLoading,
} from "../../../store/features/video/category/videoCategorySlice";
import baseUrl from "../../../utils/baseUrl";

export default function AddCourseCategory() {
  // redux
  const { id } = useParams();
  const dispatch = useDispatch();
  const IsLoading = useSelector(selectIsLoading);
  const data = useSelector(selectVideoCategory);
  const VideoCategory = data?.category;

  console.log("video Cate", VideoCategory);

  const [showImg, setShowImg] = useState();
  const [ImageUrl, setImageUrl] = useState({
    image: "",
    thumbnail: VideoCategory?.image ? VideoCategory?.image : null,
  });

  useEffect(() => {
    dispatch(Video_SingleCategory(id));
  }, []);

  const initialValues = {
    name: VideoCategory?.name,
  };

  const {
    values,
    errors: formError,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: CategorySchema,
    onSubmit: async () => {
      console.log("called");
      const { name } = values;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", ImageUrl.image);
      const data = {
        id,
        formData,
      };
      dispatch(Video_UpdateCategory(data));
    },
  });

  const handleDeleteImage = () => {
    setImageUrl({ image: "", thumbnail: "" });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setShowImg(imageUrl);
    setImageUrl({ image: file });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-(-1) sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <svg
            className="mx-auto h-10 text-blue-600 w-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Add Course Category
          </h2>
        </div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-.5">
                  <input
                    type="text"
                    name="name"
                    onCreateTodo
                    id="name"
                    class="bg-white-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 white w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Category name"
                    required=""
                    value={values?.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {formError.name ? <TextError error={formError.name} /> : null}
                  <label
                    style={{ marginTop: "2rem" }}
                    for="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                      ImageUrl ? "0" : "py-16"
                    } `}
                  >
                    <Box
                      // className="bg-indigo-100 px-6 pb-4"
                      sx={{
                        borderRadius: "4px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      ></Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ".6rem",
                        }}
                      >
                        <label
                          for="dropzone-file"
                          className={`flex flex-col items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                            ImageUrl ? "0" : "py-16"
                          } `}
                        >
                          <Box
                            // className="bg-indigo-100 px-6 pb-4"
                            sx={{
                              borderRadius: "4px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            ></Box>

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: ".6rem",
                              }}
                            >
                              {ImageUrl.image || ImageUrl.thumbnail ? (
                                <>
                                  <Button
                                    sx={{
                                      color: "red",
                                      "&:hover": {
                                        color: "red",
                                      },
                                      alignSelf: "end",
                                      mt: "1rem",
                                    }}
                                    onClick={handleDeleteImage}
                                  >
                                    <AiOutlineDelete
                                      style={{
                                        width: "1.22rem",
                                        height: "1.22rem",
                                      }}
                                    />
                                  </Button>

                                  <img
                                    src={
                                      ImageUrl.thumbnail
                                        ? baseUrl(ImageUrl.thumbnail, 8)
                                        : !ImageUrl.thumbnail
                                        ? showImg
                                        : null
                                    }
                                    class="w-full rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                                    alt="..."
                                  />
                                </>
                              ) : null}

                              {/* <img src={imageUrl} width={"100%"} /> */}
                            </Box>
                            {!ImageUrl.image && !ImageUrl.thumbnail ? (
                              <>
                                <div class="mb-3 flex items-center justify-center">
                                  <BsImages
                                    style={{
                                      width: "3rem",
                                      height: "3rem",
                                      marginBottom: "1rem",
                                      color: "#754ffe",
                                    }}
                                  />
                                </div>
                                <h2 class="text-center text-gray-400   text-xs font-normal leading-4 mb-1">
                                  image smaller than 15mb
                                </h2>
                                <h4 class="text-center text-gray-900 text-sm font-medium leading-snug">
                                  Drag and Drop your file here or
                                </h4>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  id="dropzone-file"
                                  class="hidden"
                                  required
                                />
                              </>
                            ) : null}
                          </Box>
                        </label>
                      </Box>
                    </Box>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Course Category
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2Add Product Brand gap-3">
                {/* <div>
                  <Link
                    to="/admin/add-brand"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    Add Course Category
                  </Link>
                </div> */}

                <div>
                  <div>
                    <Link
                      to="/admin/add-article-category"
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      Add Article Category
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
