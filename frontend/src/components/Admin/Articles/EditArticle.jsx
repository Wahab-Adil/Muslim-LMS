import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditArticleForm from "./EditArticleForm";
import {
  updateArticle,
  ArticleDetails,
  selectArticle,
  selectIsLoading,
} from "../../../store/features/article/articleSlice";
import {
  ArticleAllCategory,
  selectAllArticleCategories,
} from "../../../store/features/article/category/articleCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import Loader from "../../../components/loader/Loader";

// Yup validation schema
const RegisterSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  image: yup.string().required("Image is required"),
});

export default function EditArticle() {
  const { id: articleId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const { allCategoreis: AllCategories } = useSelector(
    selectAllArticleCategories
  );
  console.log(AllCategories);
  const Data = useSelector(selectArticle);

  const [SelectedArticle, setSelectedArticle] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [showImg, setShowImg] = useState("");
  const [ImageUrl, setImageUrl] = useState({
    image: "",
    thumbnail: "",
  });

  const quillRef = useRef(null);

  // Effect for fetching article details
  useEffect(() => {
    dispatch(ArticleDetails(articleId));
    dispatch(ArticleAllCategory());
  }, [articleId, dispatch]);

  // Update `SelectedArticle` when `Data` changes
  useEffect(() => {
    if (Data?.article) {
      setSelectedArticle(Data.article);
      setDescriptionValue(Data.article.description || "");
      setImageUrl({
        image: Data.article.thumbnail || "",
        thumbnail: Data.article.thumbnail || "",
      });
    }
  }, [Data]);

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true, // Important for resetting form when initial values change
    initialValues: {
      title: SelectedArticle?.title || "",
      category: SelectedArticle?.category || "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", descriptionValue);
      formData.append("category", values.category);
      formData.append("thumbnail", ImageUrl.image);
      const data = { id: articleId, formData };

      const request = await dispatch(updateArticle(data));
      if (request?.meta?.requestStatus === "fulfilled") {
        navigate("/admin/manage-articles");
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setShowImg(imageUrl);
    setImageUrl({ image: file });
  };

  const handleOnChange = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      setDescriptionValue(quill.root.innerHTML);
    }
  };

  const handleDeleteImage = () => {
    setImageUrl({ image: "", thumbnail: "" });
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", formik.values.title);
    formData.append("description", descriptionValue);
    formData.append("category", formik.values.category);
    formData.append("thumbnail", ImageUrl.image);
    const data = { id: articleId, formData };

    const request = dispatch(updateArticle(data));
    if (request?.meta?.requestStatus === "fulfilled") {
      navigate("/admin/manage-articles");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <EditArticleForm
        key={articleId}
        AllCategories={AllCategories}
        handleOnChange={handleOnChange}
        handleFileChange={handleFileChange}
        handleDeleteImage={handleDeleteImage}
        toolbarOptions={toolbarOptions}
        handleSubmit={handleSubmit}
        SelectedArticle={SelectedArticle}
        values={formik.values}
        formError={formik.errors}
        handleBlur={formik.handleBlur}
        handleChange={formik.handleChange}
        descriptionValue={descriptionValue}
        ImageUrl={ImageUrl}
        showImg={showImg}
        setShowImg={setShowImg}
        id={articleId}
      />
    </>
  );
}

// Define toolbar options for ReactQuill
const toolbarOptions = [
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];
