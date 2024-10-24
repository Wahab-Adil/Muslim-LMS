import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import useLocale from "../hook/useLocales";
import React, { useEffect } from "react";
import { comCss } from "./ComponentsCss";
import { Link } from "react-router-dom";
import logo from "../image/logo.svg";
import playstore from "../image/playstore.webp";
import appstore from "../image/appstore.webp";
import facebook from "../image/facebook.svg";
import linkedin from "../image/linkedin.svg";
import youtube from "../image/youtube.svg";
import instagram from "../image/instagram.svg";
import {
  getAdminPublicProfile,
  selectAdminPublicProfile,
} from "../store/auth/admin/adminSlice";
import { useSelector, useDispatch } from "react-redux";

const Footer = () => {
  const { translate } = useLocale();
  const dispatch = useDispatch();
  const adminProfile = useSelector(selectAdminPublicProfile);

  console.log("admin", adminProfile);

  useEffect(() => {
    dispatch(getAdminPublicProfile());
  }, []);
  const classes = comCss();
  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <Box className={classes.footer_content}>
          <Grid container spacing={{ md: 2, lg: 4 }}>
            <Grid item md={4} sm={6} xs={12}>
              <Box className={classes.footer_1}>
                <Link to="/">
                  <img src={logo} alt="logo" className={classes.footer_logo} />
                </Link>
                <Typography variant="h5" component="h5">
                  Download Our Mobile App
                </Typography>
                <Box className={classes.footer_1_app_stor}>
                  <Link to="/">
                    <img
                      src={playstore}
                      alt="logo"
                      className={classes.img_responsive}
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src={appstore}
                      alt="logo"
                      className={classes.img_responsive}
                    />
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item md={2.5} sm={6} xs={12}>
              <Box className={classes.footer_2}>
                <Typography
                  variant="h3"
                  component="h3"
                  className={classes.footer_title}
                >
                  {translate("Links")}
                </Typography>
                <Link
                  to="/"
                  className={`${classes.nav_link} ${classes.footer_link}`}
                >
                  {translate("Home")}
                </Link>
                <Link
                  to={`/user/${adminProfile?.user?._id}`}
                  className={`${classes.nav_link} ${classes.footer_link}`}
                >
                  {translate("profile")}
                </Link>
                <Link
                  to="/contact"
                  className={`${classes.nav_link} ${classes.footer_link}`}
                >
                  {translate("Contact Us")}
                </Link>
                <Link
                  to="/about"
                  className={`${classes.nav_link} ${classes.footer_link}`}
                >
                  {translate("About Us")}
                </Link>
              </Box>
            </Grid>
            <Grid item md={2.5} sm={6} xs={12}>
              <Box className={classes.footer_3}>
                <Typography
                  variant="h3"
                  component="h3"
                  className={classes.footer_title}
                >
                  {translate("Easy Access")}
                </Typography>
                <Link
                  to="/courses"
                  className={`${classes.nav_link} ${classes.footer_link}`}
                >
                  {translate("Courses")}
                </Link>
                <Link
                  to="/articles"
                  className={`${classes.nav_link} ${classes.footer_link}`}
                >
                  {translate("Articles")}
                </Link>
                <Link
                  to="/login"
                  className={`${classes.nav_link} ${classes.footer_link}`}
                >
                  {translate("Login")}
                </Link>
                <Link
                  to="/register"
                  className={`${classes.nav_link} ${classes.footer_link}`}
                >
                  {translate("Register")}
                </Link>
              </Box>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <Box className={classes.footer_4}>
                <Typography
                  variant="h3"
                  component="h3"
                  className={classes.footer_title}
                >
                  {translate("Keep up with us at")}
                </Typography>
                <List className={classes.footer_4_list}>
                  <ListItem>
                    <strong>{translate("Call")}: &nbsp;</strong>
                    &nbsp; 0093700640171
                  </ListItem>
                  <ListItem>
                    <strong>{translate("What's App")}: &nbsp;</strong>
                    &nbsp; 0093700640171
                  </ListItem>
                  <ListItem>
                    <strong>{translate("Email")}:</strong> &nbsp;
                    <Link to="/">{adminProfile?.user?.email}</Link>
                  </ListItem>
                </List>
                <Box className={classes.footer_4_sosial_media}>
                  <Link to="/">
                    <img
                      src={facebook}
                      alt="logo"
                      className={classes.img_responsive}
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src={instagram}
                      alt="logo"
                      className={classes.img_responsive}
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src={youtube}
                      alt="logo"
                      className={classes.img_responsive}
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src={linkedin}
                      alt="logo"
                      className={classes.img_responsive}
                    />
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h5" component="p">
          {translate("© 2024 Muslim Afghan. All Rights Reserved")}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
