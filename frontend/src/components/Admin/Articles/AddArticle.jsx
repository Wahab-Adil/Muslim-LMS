import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { BsImages } from "react-icons/bs";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// yup & formik
import * as yup from "yup";
import { useFormik } from "formik";
import TextError from "../../../components/TextError";
import useLocale from "../../../hook/useLocales";

// yup
const RegisterSchema = yup.object().shape({
  title: yup.string().required(),
  language: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().required(),
});

// redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// store
import {
  createArticle,
  selectIsLoading,
} from "../../../store/features/article/articleSlice";
// store
import {
  ArticleAllCategory,
  selectAllArticleCategories,
} from "../../../store/features/article/category/articleCategorySlice";

export default function AddArticle() {
  const { translate } = useLocale();
  // redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const AllArticles = useSelector(selectAllArticleCategories);

  useEffect(() => {
    dispatch(ArticleAllCategory());
  }, [dispatch]);

  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState({ imageUrl: null, showImage: null });
  const quillRef = useRef(null);
  const [descriptionValue, setDescripitonValue] = useState("");

  const initialValues = {
    title: "",
    language: "",
    description: "",
    category: "",
  };

  const {
    values,
    errors: formError,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("language", values.language);
    formData.append("description", descriptionValue);
    formData.append("category", values.category);
    formData.append("thumbnail", imageUrl?.imageUrl);
    dispatch(createArticle(formData));
  };

  const handleOnChange = (e) => {
    const quill = quillRef.current.getEditor();
    const html = quill.root.innerHTML;
    setDescripitonValue(html);
  };

  const handleDeleteVideo = () => {
    setImageUrl({ imageUrl: null, showImage: null });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl({ imageUrl: file, showImage: imageUrl });
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

  const inputAnimation = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <>
      <Box>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-10 lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              {translate("Add New Article")}
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
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={inputAnimation}
                  transition={{ duration: 1.5 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    {translate("Title")}
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="name"
                    className="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={translate("Type Article name")}
                    required
                    value={values?.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {formError.title ? (
                    <TextError error={formError.title} />
                  ) : null}
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={inputAnimation}
                  transition={{ duration: 1.5 }}
                >
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translate("Category")}
                  </label>
                  <select
                    id="category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="category"
                    className="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">{translate("Select category")}</option>
                    {AllArticles?.allCategoreis?.map((cate) => (
                      <option key={cate.name} value={cate.name}>
                        {cate.name}
                      </option>
                    ))}
                  </select>
                  {formError?.category ? (
                    <TextError error={formError.category} />
                  ) : null}
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={inputAnimation}
                  transition={{ duration: 1.5 }}
                >
                  <label
                    htmlFor="language"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translate("Languages")}
                  </label>
                  <select
                    id="language"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="language"
                    className="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">{translate("Select Languages")}</option>
                    {["pashto", "dari", "english", "arabic"].map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  {formError?.language ? (
                    <TextError error={formError.language} />
                  ) : null}
                </motion.div>

                <div className="w-full">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translate("Description")}
                  </label>
                  <ReactQuill
                    style={{ color: "black" }}
                    ref={quillRef}
                    modules={{ toolbar: toolbarOptions }}
                    theme="snow"
                    value={descriptionValue}
                    onChange={handleOnChange}
                  />
                </div>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={inputAnimation}
                  transition={{ duration: 1.5 }}
                >
                  <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                      imageUrl ? "0" : "py-16"
                    } `}
                  >
                    {imageUrl.showImage ? (
                      <Box sx={{ borderRadius: "4px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            sx={{
                              color: "red",
                              "&:hover": { color: "red" },
                              alignSelf: "end",
                              mt: "1rem",
                            }}
                            onClick={handleDeleteVideo}
                          >
                            <AiOutlineDelete
                              style={{ width: "1.22rem", height: "1.22rem" }}
                            />
                          </Button>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: ".6rem",
                          }}
                        >
                          <img
                            src={imageUrl.showImage}
                            className="w-full rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                            alt="..."
                          />
                        </Box>
                      </Box>
                    ) : (
                      <>
                        <div className="mb-3 flex items-center justify-center">
                          <BsImages
                            style={{
                              width: "3rem",
                              height: "3rem",
                              marginBottom: "1rem",
                              color: "#754ffe",
                            }}
                          />
                        </div>

                        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                          {translate("Drag and Drop your file")}
                        </h4>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          id="dropzone-file"
                          className="hidden"
                          required
                        />
                      </>
                    )}
                  </label>
                </motion.div>
              </Box>
            </Box>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={inputAnimation}
              transition={{ duration: 3 }}
            >
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                style={{ backgroundColor: "#754ffe" }}
              >
                {translate("Add Article")}
              </button>
            </motion.div>
          </div>
        </section>
      </Box>
    </>
  );
}
