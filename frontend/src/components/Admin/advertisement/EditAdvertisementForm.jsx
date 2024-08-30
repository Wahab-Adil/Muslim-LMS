import { useEffect, useState, useRef } from "react";

import { Link, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { AiOutlineDelete } from "react-icons/ai";
import { BsImages } from "react-icons/bs";

// yup & formik
import * as yup from "yup";
import { useFormik } from "formik";
import TextError from "../../../components/TextError";
import baseUrl from "../../../utils/baseUrl";

// yup
const RegisterSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
});

// redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// store
import ReactQuill from "react-quill";
// store

import {
  updateAdvertisement,
  selectIsLoading,
} from "../../../store/features/advertisement/advertisementSlice";

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

export default function EditAdvertisementForm({ Advertisment }) {
  const dispatch = useDispatch();
  const initialValues = {
    title: Advertisment?.advertisement?.title
      ? Advertisment?.advertisement?.title
      : "",
    subtitle: Advertisment?.advertisement?.subtitle,
  };
  const [subtitle, setSubtitle] = useState(initialValues?.subtitle);
  const {
    values,
    errors: formError,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
  });

  const [imageUrl, setImageUrl] = useState({
    imageUrl: null,
    showImage: Advertisment?.advertisement?.image
      ? Advertisment?.advertisement?.image
      : null,
  });
  const [backgroundUrl, setBackgroundUrl] = useState({
    imageUrl: null,
    showImage: Advertisment?.advertisement?.background
      ? Advertisment?.advertisement?.background
      : null,
  });

  const handleSubmit = async () => {
    const { title } = values;
    const formData = new FormData();
    formData.append("title", "adil");
    formData.append("subtitle", "subtitle");

    const data = { id: Advertisment?.advertisement._id, formData };
    await dispatch(updateAdvertisement(data));
  };

  const handleOnChange = (e) => {
    const quill = quillRef?.current?.getEditor();
    const html = quill?.root?.innerHTML;
    setSubtitle(html);
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

  const navigate = useNavigate();

  // state
  const quillRef = useRef(null);

  return (
    <>
      <Box>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-10 lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Add New Advertisement
            </h2>
            <h5 class="mb-4  font-bold text-gray-900 dark:text-white">
              Please Add Short and Simple Title
              <br /> And Subtitle And Select
              <br /> ColorFul Background with Transparent Image
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
                <div>
                  <label
                    for="name"
                    class="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Advertisement Title
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

                <div className="w-full">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Subtitle
                  </label>
                  <ReactQuill
                    name="subtitle"
                    style={{ color: "black" }}
                    ref={quillRef}
                    modules={{
                      toolbar: toolbarOptions,
                    }}
                    theme="snow"
                    value={subtitle}
                    onBlur={handleBlur}
                    onChange={handleOnChange}
                  />
                </div>

                <Box display="flex">
                  {/* background Image */}
                  <label
                    for="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                      imageUrl ? "0" : "py-16"
                    } `}
                  >
                    <h2>Background image</h2>
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
                            src={baseUrl(backgroundUrl.showImage, 8)}
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
                        <h2 class="text-center text-gray-400   text-xs font-normal leading-4 mb-1">
                          image smaller than 15mb
                        </h2>
                        <h4 class="text-center text-gray-900 text-sm font-medium leading-snug">
                          Select Background Image
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
                    <h2>Transparent image</h2>
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
                            src={baseUrl(imageUrl.showImage, 8)}
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
                        <h2 class="text-center text-gray-400   text-xs font-normal leading-4 mb-1">
                          image smaller than 15mb
                        </h2>
                        <h4 class="text-center text-gray-900 text-sm font-medium leading-snug">
                          Select Transparent Image
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
                </Box>
              </Box>
            </Box>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              class="inline-flex  items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              style={{ backgroundColor: "#754ffe" }}
            >
              Add Advertisement
            </button>
          </div>
        </section>
      </Box>
    </>
  );
}
