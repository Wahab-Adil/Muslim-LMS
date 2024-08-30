import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQueries } from "@tanstack/react-query";
import ToolbarOption from "../../ToolbarOption.jsx";
import axios from "axios";

//animated components for react-select
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

// icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { BsImages } from "react-icons/bs";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { PiVideoFill } from "react-icons/pi";
import useLocale from "../../../hook/useLocales.js";

export default function AddCourse() {
  const { translate } = useLocale();
  // hooks
  const [imageUrl, setImageUrl] = useState("");
  const quillRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, description, category, imageUrl });
  };

  const mutation = useMutation({ mutationFn: handleSubmit });

  if (mutation.isPending) return "Loading...";

  if (mutation.error) return "An error has occurred: " + "errrrr";

  // handlers

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    console.log(imageUrl);
  };

  const handleOnChange = (e) => {
    const quill = quillRef.current.getEditor();
    // const delta = quill.getContents();
    const html = quill.root.innerHTML;
    // console.log("Delta:", delta);
    console.log("HTML:", html);
  };

  return (
    <>
      <Box>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-10 lg:py-16">
            <h2
              style={{
                direction:
                  document.documentElement.dir === "rtl" ? "ltr" : "rtl",
              }}
              class="mb-4 text-xl font-bold text-gray-900 dark:text-white"
            >
              {translate("Create a New Course")}
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
                    {translate("Course Title")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={translate("type course name")}
                    required=""
                    value={addCourse?.title}
                  />
                </div>

                <div>
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translate("Category")}
                  </label>
                  <select
                    id="category"
                    class="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-primary-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected="">{translate("Select category")}</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                </div>

                <div className="w-full">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translate("Description")}
                  </label>
                  <ReactQuill
                    ref={quillRef}
                    modules={{
                      toolbar: ToolbarOption,
                    }}
                    theme="snow"
                    // value={addCourse?.description}
                    onChange={handleOnChange}
                  />
                </div>

                {/* upload image */}

                <label
                  for="dropzone-file"
                  className={`flex flex-col items-center justify-center w-full border border-gray-300 border-dashed cursor-pointer bg-gray-50 ${
                    imageUrl ? "0" : "py-16"
                  } `}
                >
                  {imageUrl ? (
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
                          onClick={() => setImageUrl("")}
                        >
                          <AiOutlineDelete
                            style={{
                              width: "1.22rem",
                              height: "1.22rem",
                            }}
                          />
                        </Button>

                        <img
                          src={imageUrl}
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
                        {translate("Drag and Drop your file")}
                      </h4>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id="dropzone-file"
                        class="hidden"
                      />
                    </>
                  )}
                </label>
                {/* )}   */}
                {/*  */}
              </Box>

              {/* Chapters block */}
            </Box>
            <button
              onClick={handleSubmit}
              class="inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              style={{
                backgroundColor: "#754ffe",
              }}
            >
              {translate("Create Course")}
            </button>
          </div>
        </section>
      </Box>
    </>
  );
}
