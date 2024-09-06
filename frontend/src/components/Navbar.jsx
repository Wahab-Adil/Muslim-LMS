import {
  Box,
  Button,
  Container,
  Drawer,
  Hidden,
  IconButton,
  InputBase,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { comCss } from "./ComponentsCss";
import logo from "../image/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import useLocales from "../hook/useLocales";

import Profile from "../page/profile";
// languaage PopOver
import LanguagePopover from "./LanguagePopover";

// store
import { selectIsAdmin } from "../store/auth/user/userSlice";
import { useSelector } from "react-redux";
console.log();

const Navbar = () => {
  const { currentLang, translate } = useLocales();
  // redux
  const isAdmin = localStorage.getItem("IsAdmin");
  const classes = comCss();
  const [openMenu, setOpenMenu] = useState(false);

  const [scrollNavbar, setScrollNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 90) {
      setScrollNavbar(true);
    } else {
      setScrollNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  useEffect(() => {
    if (
      currentLang.value === "fa" ||
      currentLang.value === "ps" ||
      currentLang.value === "ar"
    ) {
      document.documentElement.dir = "rtl";
    } else if (currentLang.value === "en") {
      document.documentElement.dir = "ltr";
    }
  }, [currentLang.value]);

  return (
    <Box
      className={classes.navbar_section_active}
      // : `${classes.navbar_section}`
      sx={{
        justifyContent: "space-between",
        direction: document.documentElement.dir === "ltr" ? "rtl" : "ltr",
      }}
    >
      <Container maxWidth="lg">
        <Box className={classes.navbar_box}>
          <Box className={classes.navbar_laft}>
            <Box className={classes.navbar_laft_logo}>
              <NavLink to="/">
                <img src={logo} alt="logo" className={classes.img_responsive} />
              </NavLink>
            </Box>
            <Box className={classes.navbar_laft_menu}>
              <Box className={classes.navbar_link_computer}>
                <NavLink to="/" className={`${classes.nav_link}`}>
                  {translate("Home")}
                </NavLink>

                <NavLink to="courses" className={`${classes.nav_link}`}>
                  {translate("Courses")}
                </NavLink>
                <NavLink to="articles" className={`${classes.nav_link}`}>
                  {translate("Articles")}
                </NavLink>
                <NavLink to="about" className={`${classes.nav_link}`}>
                  {translate("About")}
                </NavLink>
                <NavLink to="contact" className={`${classes.nav_link}`}>
                  {translate("Contact")}
                </NavLink>

                <LanguagePopover />
                <Box sx={{ mr: 2 }} />
                <Profile />
              </Box>

              <Box className={classes.navbar_link_mobail}>
                <IconButton onClick={() => setOpenMenu(!openMenu)}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor={"right"}
                  open={openMenu}
                  onClose={() => setOpenMenu(!openMenu)}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <IconButton
                    onClick={() => setOpenMenu(!openMenu)}
                    className={classes.clossessideNav}
                  >
                    <CloseIcon />
                  </IconButton>

                  {isAdmin === "admin" ? (
                    <Button
                      component={NavLink}
                      to={"/admin"}
                      variant="contained"
                      disableElevation
                      mb={"1rem"}
                      sx={{
                        backgroundColor: "#754ffe",
                        "&:hover": {
                          backgroundColor: "#754ffe",
                          color: "white",
                        },
                      }}
                    >
                      {translate("Dashboard")}
                    </Button>
                  ) : null}

                  <NavLink
                    style={{ marginTop: "1rem" }}
                    to="/"
                    className={`${classes.nav_link} ${classes.nav_link_mobail}`}
                  >
                    {translate("Home")}
                  </NavLink>

                  <NavLink
                    to="courses"
                    className={`${classes.nav_link} ${classes.nav_link_mobail}`}
                  >
                    {translate("Courses")}
                  </NavLink>
                  <NavLink
                    to="articles"
                    className={`${classes.nav_link} ${classes.nav_link_mobail}`}
                  >
                    {translate("Articles")}
                  </NavLink>
                  <NavLink
                    to="about"
                    className={`${classes.nav_link} ${classes.nav_link_mobail}`}
                  >
                    {translate("About")}
                  </NavLink>
                  <NavLink
                    to="contact"
                    className={`${classes.nav_link} ${classes.nav_link_mobail}`}
                  >
                    {translate("Contact")}
                  </NavLink>
                </Drawer>
              </Box>
            </Box>
          </Box>
          {/* button left nav bar */}
          <Box className={classes.navbar_right}></Box>
          <Hidden mdDown>
            {isAdmin === "admin" ? (
              <Button
                component={NavLink}
                to={"/admin"}
                variant="contained"
                disableElevation
                mb={"1rem"}
                sx={{
                  backgroundColor: "#754ffe",
                  "&:hover": {
                    backgroundColor: "#754ffe",
                    color: "white",
                  },
                }}
              >
                {translate("Dashboard")}
              </Button>
            ) : null}
          </Hidden>
        </Box>
      </Container>
    </Box>
  );
};
export default Navbar;
