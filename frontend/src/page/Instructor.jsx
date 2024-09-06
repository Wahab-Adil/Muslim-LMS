import React, { useTransition, useState, useEffect } from "react";
import { Button, useMediaQuery } from "@mui/material";
import {
  getAdminPublicProfile,
  selectAdminPublicProfile,
} from "../store/auth/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../utils/baseUrl";
import ReactQuill from "react-quill";

const AboutSection = () => {
  const dispatch = useDispatch();
  const AdminProfile = useSelector(selectAdminPublicProfile);
  const matches_800 = useMediaQuery("(max-width:800px)");
  useEffect(() => {
    dispatch(getAdminPublicProfile());
  }, []);

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
              src={baseUrl(AdminProfile?.user?.landingPagePhoto, 8)}
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
                  __html: AdminProfile?.user?.landingPageHeading,
                }}
              />
              <p className="text-black lg:text-lg">
                {" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: AdminProfile?.user?.landingPageSubtitle,
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
