import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { comCss } from "./ComponentsCss";
import heroimg from "../image/hero-img.png";
import { NavLink } from "react-router-dom";
import animationData from "../lotties/Animation1.json";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import animationData1 from "../lotties/ویډیو ګانی سره تیریدل.json";
import {
  getAllAdvertisement,
  selectAllAdvertisement,
} from "../store/features/advertisement/advertisementSlice";

//
import "swiper/css";
import { useSelector, useDispatch } from "react-redux";
import baseUrl from "../utils/baseUrl";
import useLocales from "../hook/useLocales";
//

const Hero = () => {
  //
  const { translate } = useLocales();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAdvertisement());
  }, []);
  const AllAdvertisement = useSelector(selectAllAdvertisement);
  localStorage.setItem("advertisement", AllAdvertisement);

  const comclasses = comCss();
  const classes = comCss();
  const matches_450 = useMediaQuery("(max-width:450px)");

  return (
    <Swiper className="mySwiper">
      {AllAdvertisement?.map((advertisement) => {
        return (
          <SwiperSlide>
            <div
              style={{ minHeight: "600px" }}
              className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8"
            >
              <img
                style={{
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  left: 0,
                  minHeight: "500px",
                  minWidth: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                src={baseUrl(advertisement?.background, 8)}
              />
              {/* <!-- Grid --> */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                <div style={{ textAlign: "start", marginTop: 3 }}>
                  <div
                    style={{ paddingTop: "3rem" }}
                    className="block text-2xl font-bold text-gray-800 sm:text-3xl lg:text-5xl lg:leading-tight dark:text-white "
                    dangerouslySetInnerHTML={{
                      __html: advertisement?.title,
                    }}
                  />
                  <div
                    className="mt-3 text-lg text-gray-800 dark:text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: advertisement?.subtitle,
                    }}
                  />

                  {/* <!-- Buttons --> */}
                  <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                    <Button
                      sx={{
                        marginRight: "12px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                      component={NavLink}
                      to="/courses"
                      className={`${comclasses.button} ${comclasses.button_4}`}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "4px",
                          width: "10rem",
                        }}
                      >
                        {translate("Search Courses")}
                        <svg
                          className="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </Box>
                    </Button>

                    {/* <a className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                Contact sales team
              </a> */}
                  </div>
                  {/* <!-- End Buttons --> */}
                </div>
                {/* <!-- End Col --> */}

                <div className="relative ms-4">
                  <img
                    src={baseUrl(advertisement?.image, 8)}
                    minHeight={"500px"}
                    width={matches_450 ? 250 : 400}
                  />
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Hero;
