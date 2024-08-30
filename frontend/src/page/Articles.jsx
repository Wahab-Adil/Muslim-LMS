import React from "react";
import { pageCss } from "./PageCss";
import Pagebanner from "../components/Pagebanner";
import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import Blogs from "../components/ArticleCard";
import ArticleCard from "../components/ArticleCard";
import Testimonials from "./Testimonials";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

import useRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";

const Articles = () => {
  useRedirectLoggedOutUser("/login");
  const classes = pageCss();
  return (
    <Box>
      <header class="dark:bg-gray-900 mt-20">
        <div class="container px-6 py-16 mx-auto">
          <div class="items-center lg:flex">
            <div class="w-full lg:w-1/2">
              <div class="lg:max-w-lg">
                <h2 className="font-manrope text-5xl text-gray-900 font-bold leading-[4rem] mb-7 text-center lg:text-left">
                  Philosophy of Learning At
                  <span style={{ color: "#754ffe" }}> Muslim Afghan LMS</span>
                </h2>

                <p className="text-lg text-gray-500 mb-16 text-center lg:text-left">
                  As human beings, we respond to and process visual data better
                  than any other type of data. Our brain processes images 60,000
                  times faster than text! And 90 percent of information
                  transmitted to the brain is visual. Since we now know we are
                  visual by nature, we can use this tool to express ourselves on
                  this platform better. It will also increase our productivity
                  and effectiveness as both learners and instructors on this
                  platform.
                </p>
              </div>
            </div>

            <div class="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                class="w-full h-full max-w-md"
                src="https://cdni.iconscout.com/illustration/premium/thumb/writing-letter-7329959-5991640.png"
                alt="email illustration vector art"
              />
            </div>
          </div>
        </div>
      </header>
      <Box className={classes.blog_section_all}>
        <div
          className="w-full"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="max-w-xl mb-12">
            <div className="flex space-x-4">
              <div className="flex rounded-md overflow-hidden w-full">
                <input
                  type="text"
                  className="w-full rounded-md rounded-r-none"
                  id="searchBar"
                  placeholder="Search Articles"
                />
                <button
                  className="bg-indigo-600 text-white px-6 text-lg font-semibold rounded-r-md"
                  style={{ paddingTop: "8px", paddingBottom: "8px" }}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {data.map((item) => (
              <Grid item xs={12} sm={4} key={item}>
                <ArticleCard />
              </Grid>
            ))}

            <Box className={classes.pagination}>
              <Stack spacing={2}>
                <Pagination count={6} variant="outlined" shape="rounded" />
              </Stack>
            </Box>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Articles;
