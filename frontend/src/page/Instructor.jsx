import React, { useTransition, useState, useEffect } from "react";
import { Button, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../utils/baseUrl";
import ReactQuill from "react-quill";

const AboutSection = ({ AdminProfile }) => {
  const dispatch = useDispatch();
  const matches_800 = useMediaQuery("(max-width:800px)");
  console.log("admin", AdminProfile);

  return (
    <section>
      {AdminProfile?.user?.landingPagePhoto === "default" &&
      AdminProfile?.user?.landingPageHeading === "default" &&
      AdminProfile?.user?.landingPageSubtitle === "default" ? null : (
        <>
          {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: matches_800 ? "column" : "row",
            }}
            className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16"
          >
            <img
              alt={AdminProfile?.name}
              src={baseUrl(AdminProfile?.landingPagePhoto, 8)}
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
                  __html: AdminProfile?.landingPageHeading,
                }}
              />
              <p className="text-black lg:text-lg">
                {" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: AdminProfile?.landingPageSubtitle,
                  }}
                />
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AboutSection;
