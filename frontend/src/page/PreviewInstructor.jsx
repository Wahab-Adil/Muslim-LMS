import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import useRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";

const PreviewInstructor = () => {
  useRedirectLoggedOutUser("/login");
  const matches_800 = useMediaQuery("(max-width:800px)");

  const [image, setImage] = useState();
  const [heading, setHeading] = useState();
  const [subtitle, setSubtitle] = useState();
  useEffect(() => {
    setImage(localStorage.getItem("landingPagePhoto"));
    setHeading(localStorage.getItem("landingPageHeading"));
    setSubtitle(localStorage.getItem("landingPageSubtitle"));
  }, []);

  console.log(image, heading, subtitle);
  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: matches_800 ? "column" : "row",
        }}
        className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16"
      >
        <Link
          style={{ marginTop: "3rem" }}
          to={"/admin/edit-profile"}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-[#754ffe] focus:ring-offset-2 transition-colors duration-300"
        >
          Back
        </Link>
        <img
          src={image}
          style={{
            width: matches_800 ? "80%" : "50%",
            height: "400px",
            borderRadius: "10px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "space-between",
            width: matches_800 ? "100%" : "50%",
            textAlign: matches_800 ? "center" : "start",
          }}
          className=" md:mt-0 text-left flex flex-col h-full"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: heading,
            }}
          />
          <p className="text-black lg:text-lg">
            {" "}
            <div
              dangerouslySetInnerHTML={{
                __html: subtitle,
              }}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreviewInstructor;
