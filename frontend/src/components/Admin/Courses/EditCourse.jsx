import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

// icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { BsImages } from "react-icons/bs";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

//    ---------store----------

//Course
import {
  Video_UpdateCourse,
  Video_CourseDetails,
  selectVideoCourse,
  selectIsLoading,
} from "../../../store/features/video/courses/videoCoursesSlice";

// chapter Or Section
import {
  Video_DeleteSection,
  selectIsLoading as Video_DeleteSection_IsLoading,
} from "../../../store/features/video/section/videoSectionSlice";

// store
import {
  Video_AllCategories,
  selectVideoAllCategories,
} from "../../../store/features/video/category/videoCategorySlice";

// redux
import { useDispatch, useSelector } from "react-redux";

// yup & formik
import * as yup from "yup";
import { useFormik } from "formik";
import TextError from "../../../components/TextError";
import Loader from "../../../components/loader/Loader";
import baseUrl from "../../../utils/baseUrl";

// yup
const RegisterSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().required(),
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditCourse() {
  // redux
  const courseId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const AllCategories = useSelector(selectVideoAllCategories);
  const Course = useSelector(selectVideoCourse);

  useEffect(() => {
    dispatch(Video_CourseDetails(courseId?.id));
    dispatch(Video_AllCategories());
  }, []);

  // state
  const [open, setOpen] = useState(false);
  const [DeleteSectionId, setDeleteSectionId] = useState();
  const quillRef = useRef(null);
  const [descriptionValue, setDescripitonValue] = useState();
  const [showImg, setShowImg] = useState();
  const [ImageUrl, setImageUrl] = useState({
    image: "",
    thumbnail: Course?.thumbnail ? Course?.thumbnail : null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // hooks
  const initialValues = {
    title: Course?.title && Course?.title,
    category: Course?.category ? Course?.category : "",
  };

  const {
    values,
    errors: formError,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: async () => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, category } = values;
    const formData = new FormData();
    formData.append("id", courseId?.id);
    formData.append("title", title);
    formData.append("description", descriptionValue);
    formData.append("category", category);
    formData.append("thumbnail", ImageUrl.image);
    const data = { id: courseId?.id, formData };

    dispatch(Video_UpdateCourse(data));
  };

  const toolbarOptions = [
    ["bold", "italic", "underline"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  // handlers

  const handleDeleteImage = () => {
    setImageUrl({ image: "", thumbnail: "" });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setShowImg(imageUrl);
    setImageUrl({ image: file });
  };

  const handleOnChange = (e) => {
    const quill = quillRef.current.getEditor();
    const html = quill.root.innerHTML;
    setDescripitonValue(html);
  };

  return (
    <>
      {/* {error && <ErrorMsg message={error?.message} />} */}
      {/* {isAdded && <SuccessMsg message="Product Added Successfully" />} */}
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
              dispatch(Video_DeleteSection(DeleteSectionId));
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-10 lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Edit this Course
            </h2>

            <Box
              sx={{
                display: "flex",
                gap: "3rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                className="w-full"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onCreateTodo
                    id="name"
                    class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Course name"
                    required=""
                    value={values?.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {formError.title ? (
                    <TextError error={formError.title} />
                  ) : null}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="category"
                    class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-primary-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select category</option>

                    {AllCategories?.map((cate) => {
                      return (
                        <>
                          <option value={cate?.name}>{cate?.name}</option>
                        </>
                      );
                    })}
                  </select>
                  {formError?.category ? (
                    <TextError error={formError.category} />
                  ) : null}
                </div>

                <div className="w-full">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <ReactQuill
                    style={{ color: "black" }}
                    ref={quillRef}
                    modules={{
                      toolbar: toolbarOptions,
                    }}
                    theme="snow"
                    value={descriptionValue}
                    onChange={handleOnChange}
                  />
                  {descriptionValue === "" ? (
                    <TextError error={"Description Required"} />
                  ) : null}
                </div>

                {/* upload image */}

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
                {/* )}   */}
                {/*  */}
              </Box>

              {/* Chapters block */}

              <div className="w-full">
                <label
                  for="description"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".4rem",
                  }}
                  class="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Course Chapter's
                </label>

                <Box
                  className="bg-indigo-100 px-6 pb-4"
                  sx={{
                    borderRadius: "4px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <label
                      for="description"
                      class="block text-xs font-medium text-gray-900 dark:text-black text-end"
                    >
                      Course Chapter's
                    </label>

                    <Link to="/admin/add-chapter">
                      <button
                        type="submit"
                        class="inline-flex  items-center px-5 py-1 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-sm focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        style={{
                          alignItems: "center",
                          backgroundColor: "#754ffe",
                          cursor: "pointer",
                        }}
                      >
                        <label
                          for="description"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".4rem",
                            color: "white",
                            cursor: "pointer",
                          }}
                          class="block text-xs font-medium text-gray-900 dark:text-white text-end"
                        >
                          <AiOutlinePlusCircle
                            style={{ width: ".9rem", height: ".9rem" }}
                          />
                          Add Chapter's
                        </label>
                      </button>
                    </Link>
                  </Box>

                  {/* course chapters show here */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".6rem",
                    }}
                  >
                    <span class="dark:text-white">
                      {" "}
                      All Chapter's:({Course?.sections?.length})
                    </span>
                    <tbody style={{ maxWidth: "500px", overflowY: "scroll" }}>
                      {Course?.sections?.map((section, idx) => {
                        return (
                          <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <th
                              scope="row"
                              class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <div class="flex items-center mr-3">
                                <Typography
                                  style={{
                                    fontSize: ".8rem",
                                    textWrap: "wrap",
                                  }}
                                >
                                  {idx + 1}- {section?.title}
                                </Typography>
                              </div>
                            </th>

                            <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <div class="flex items-center justify-end space-x-4">
                                <Link
                                  to={`/admin/section-preview/${section?.id}`}
                                >
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
                                  type="button"
                                  onClick={() => {
                                    handleClickOpen();
                                    setDeleteSectionId(section?.id);
                                  }}
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
                  </Box>
                </Box>
              </div>
            </Box>
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              class="inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              style={{
                backgroundColor: "#754ffe",
              }}
            >
              update
            </button>
          </div>
        </section>
      </Box>
    </>
  );
}
