import express from "express";
import {
  createAdvertisement,
  getSingleAdvertisement,
  getAllAdvertisement,
  getSelectedAdvertisements,
  deleteAdvertisement,
  SelectAdvertisement,
  deleteSelectedAdvertisement,
} from "../../controllers/advertisementControllers/adertisement.js";
import { isLoggedIn, isAdmin } from "../../middlewares/index.js";
import upload from "../../config/uploadFiles.js";

const router = express.Router();

// create new Advertisement
router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload("advertisement").fields([
    { name: "background", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  createAdvertisement
);

// get all Selected Advertisement
router.get("/show", getSelectedAdvertisements);
// get all Advertisement
router.get("/", getAllAdvertisement);
// get Advertisement details
router.get("/:id", isLoggedIn, getSingleAdvertisement);
// delete Advertisement
router.delete("/:id", isLoggedIn, isAdmin, deleteAdvertisement);
// delete selected Advertisement
router.delete(
  "/selected/:id",
  isLoggedIn,
  isAdmin,
  deleteSelectedAdvertisement
);
// select Advertisement
router.get("/select/:id", isLoggedIn, isAdmin, SelectAdvertisement);

export default router;
