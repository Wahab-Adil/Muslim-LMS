import React, { useState } from "react";

// drawer
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import Category from "./Category/Category";
import Ratings from "./Rating/Ratings";
import Language from "./Language/Language";
import "./Sidebar.css";
import { ButtonBase } from "@mui/material";

const Sidebar = ({
  open,
  toggleDrawer,
  AllCategories,
  handleCategoryChange,
  handleRatingsChange,
  handleLanguageChange,
  selectedCategory,
  selectedLanguage,
}) => {
  const DrawerList = (
    <Box sx={{ width: 300, marginTop: "5rem" }} role="presentation">
      <List>
        <Category
          AllCategories={AllCategories}
          handleChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
        <Divider />

        <Ratings handleChange={handleRatingsChange} />
        <Divider />

        <Language
          selectedLanguage={selectedLanguage}
          handleChange={handleLanguageChange}
        />
      </List>
    </Box>
  );

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;
