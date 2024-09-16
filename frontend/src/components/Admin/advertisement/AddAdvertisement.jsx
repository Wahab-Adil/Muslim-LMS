import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { AiOutlineDelete } from "react-icons/ai";
import { BsImages } from "react-icons/bs";

// yup & formik
import * as yup from "yup";
import { useFormik } from "formik";
import TextError from "../../../components/TextError";

// framer motion
import { motion } from "framer-motion";

// yup
const RegisterSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  background: yup.string().required(),
  image: yup.string().required(),
});

// redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// store
import {
  createAdvertisement,
  selectIsLoading,
} from "../../../store/features/advertisement/advertisementSlice";
import ReactQuill from "react-quill";
// store

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

const inputLeftAnimation = {
  hidden: { opacity: 0, x: -200 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const inputRightAnimation = {
  hidden: { opacity: 0, x: 200 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

import useLocale from "../../../hook/useLocales";

export default function AddAdvertisement() {
  // redux
  const { translate } = useLocale();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  // state
  const quillRef = useRef(null);
  const [title, setTitle] = useState();
  const [imageUrl, setImageUrl] = useState({ imageUrl: null, showImage: null });
  const [backgroundUrl, setBackgroundUrl] = useState({
    imageUrl: null,
    showImage: null,
  });

  const initialValues = {
    subtitle: "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", values.subtitle);
    formData.append(
      "background",
      backgroundUrl.imageUrl ? backgroundUrl.imageUrl : "default"
    );
    formData.append(
      "image",
      imageUrl?.imageUrl ? imageUrl.imageUrl : "default"
    );
    const data = await dispatch(createAdvertisement(formData));
    if (data?.meta?.requestStatus === "fulfilled") {
      navigate("/admin/manage-advertisement");
    }
  };

  const handleOnChange = (e) => {
    const quill = quillRef?.current?.getEditor();
    const html = quill?.root?.innerHTML;
    setTitle(html);
  };

  const handleImageUrlDelete = () => {
    setImageUrl({ imageUrl: null, showImage: null });
  };
  const handleBackgroundUrlDelete = () => {
    setBackgroundUrl({ imageUrl: null, showImage: null });
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl({ imageUrl: file, showImage: imageUrl });
  };
  const handleBackgroundFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setBackgroundUrl({ imageUrl: file, showImage: imageUrl });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Box>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-10 lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              {translate("Add New Advertisement")}
            </h2>
            <h5 class="mb-4  font-bold text-gray-900 dark:text-white">
              {translate("Please Add Short and Simple Title")}
              <br />
              {translate("And Subtitle And Select")}
              <br />
              {translate("ColorFul Background with Transparent Image")}
            </h5>
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
                  variants={inputLeftAnimation}
                  transition={{ duration: 2 }}
                  className="w-full"
                >
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translate("title")}
                  </label>
                  <ReactQuill
                    style={{ color: "black" }}
                    ref={quillRef}
                    modules={{
                      toolbar: toolbarOptions,
                    }}
                    theme="snow"
                    value={title}
                    onChange={handleOnChange}
                  />
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={inputRightAnimation}
                  transition={{ duration: 2.5 }}
                >
                  <label
                    for="name"
                    class="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    {translate("Advertisement subtitle")}
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    onCreateTodo
                    id="name"
                    class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={translate("subtitle")}
                    required=""
                    value={values?.subtitle}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {formError.subtitle ? (
                    <TextError error={formError.subtitle} />
                  ) : null}
                </motion.div>

                <motion.Box
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={inputLeftAnimation}
                  transition={{ duration: 3 }}
                >
                  {/* background Image */}
                  <label
                    style={{ marginBottom: "1rem" }}
                    for="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                      imageUrl ? "0" : "py-16"
                    } `}
                  >
                    <h2>{translate("Background image")}</h2>
                    {backgroundUrl.showImage ? (
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
                          <Button
                            sx={{
                              color: "red",
                              "&:hover": {
                                color: "red",
                              },
                              alignSelf: "end",
                              mt: "1rem",
                            }}
                            onClick={handleBackgroundUrlDelete}
                          >
                            <AiOutlineDelete
                              style={{
                                width: "1.22rem",
                                height: "1.22rem",
                              }}
                            />
                          </Button>

                          <img
                            style={{ height: "300px", width: "100%" }}
                            src={backgroundUrl.showImage}
                            class="w-full rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                            alt="..."
                          />

                          {/* <img src={imageUrl} width={"100%"} /> */}
                        </Box>
                      </Box>
                    ) : (
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

                        <h4 class="text-center text-gray-900 text-sm font-medium leading-snug">
                          {translate("Select Background Image")}
                        </h4>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBackgroundFileChange}
                          id="dropzone-file"
                          class="hidden"
                          required
                        />
                      </>
                    )}
                  </label>

                  <label
                    for="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                      imageUrl ? "0" : "py-16"
                    } `}
                  >
                    <h2>{translate("Transparent image")}</h2>
                    {imageUrl.showImage ? (
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
                          <Button
                            sx={{
                              color: "red",
                              "&:hover": {
                                color: "red",
                              },
                              alignSelf: "end",
                              mt: "1rem",
                            }}
                            onClick={handleImageUrlDelete}
                          >
                            <AiOutlineDelete
                              style={{
                                width: "1.22rem",
                                height: "1.22rem",
                              }}
                            />
                          </Button>

                          <img
                            style={{ height: "300px", width: "100%" }}
                            src={imageUrl.showImage}
                            class="w-full rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                            alt="..."
                          />

                          {/* <img src={imageUrl} width={"100%"} /> */}
                        </Box>
                      </Box>
                    ) : (
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

                        <h4 class="text-center text-gray-900 text-sm font-medium leading-snug">
                          {translate("Select Transparent Image")}
                        </h4>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          id="dropzone-file"
                          class="hidden"
                          required
                        />
                      </>
                    )}
                  </label>
                </motion.Box>
              </Box>
            </Box>
            <motion.button
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={inputRightAnimation}
              transition={{ duration: 3 }}
              type="submit"
              onClick={(e) => handleSubmit(e)}
              class="inline-flex  items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              style={{ backgroundColor: "#754ffe" }}
            >
              {translate("Add Advertisement")}
            </motion.button>
          </div>
        </section>
      </Box>
    </>
  );
}
