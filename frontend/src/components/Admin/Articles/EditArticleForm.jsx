import { Box, Button } from "@mui/material";
import ReactQuill from "react-quill";
import { useRef, useEffect } from "react";
import TextError from "../../../components/TextError";
// icons
import { AiOutlineDelete } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import "react-quill/dist/quill.snow.css";
import baseUrl from "../../../utils/baseUrl";
import { motion } from "framer-motion";

// Animation configuration
const scrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function EditArticle({
  ImageUrl,
  AllCategories,
  handleOnChange,
  handleFileChange,
  handleDeleteImage,
  toolbarOptions,
  handleSubmit,
  values,
  formError,
  handleBlur,
  handleChange,
  descriptionValue,
  showImg,
}) {
  const quillRef = useRef(null);

  return (
    <Box
      component={motion.div}
      variants={scrollVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.2 }}
    >
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-10 lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit this Article
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
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Article Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="name"
                  className="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Article name"
                  value={values?.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {formError.title ? <TextError error={formError.title} /> : null}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select category</option>
                  {AllCategories?.map((cate, idx) => (
                    <option key={cate * idx} value={cate?.name}>
                      {cate?.name}
                    </option>
                  ))}
                </select>
                {formError?.category ? (
                  <TextError error={formError.category} />
                ) : null}
              </div>

              <div className="w-full">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <div>
                  <ReactQuill
                    defaultValue={descriptionValue}
                    style={{ color: "black" }}
                    ref={quillRef}
                    modules={{ toolbar: toolbarOptions }}
                    theme="snow"
                    value={descriptionValue}
                    onChange={handleOnChange}
                  />
                </div>
                {descriptionValue === "" ? (
                  <TextError error={"Description Required"} />
                ) : null}
              </div>

              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                  ImageUrl ? "0" : "py-16"
                }`}
              >
                <Box sx={{ borderRadius: "4px" }}>
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
                            "&:hover": { color: "red" },
                            alignSelf: "end",
                            mt: "1rem",
                          }}
                          onClick={handleDeleteImage}
                        >
                          <AiOutlineDelete
                            style={{ width: "1.22rem", height: "1.22rem" }}
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
                          className="w-full rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                          alt="Preview"
                        />
                      </>
                    ) : null}

                    {!ImageUrl.image && !ImageUrl.thumbnail ? (
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
                        <h2 className="text-center text-gray-400 text-xs font-normal leading-4 mb-1">
                          image smaller than 15mb
                        </h2>
                        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                          Drag and Drop your file here or
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
                    ) : null}
                  </Box>
                </Box>
              </label>
            </Box>
          </Box>
          <Button
            onClick={() => handleSubmit()}
            sx={{
              backgroundColor: "#754ffe",
              color: "white",
              "&:hover": { backgroundColor: "#6b3cbe" },
              mt: 2,
              px: 4,
              py: 2,
            }}
          >
            Update
          </Button>
        </div>
      </section>
    </Box>
  );
}
