import asyncHandler from "express-async-handler";
import Advertisement from "../../models/advertisement/Advertisement.js";
import SelectedAdvertisement from "../../models/advertisement/SelectedAdvertisement.js";
import User from "../../models/User.js";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// create  Advertisement
export const createAdvertisement = asyncHandler(async (req, res) => {
  const { title, subtitle } = req.body;

  const background = req?.files["background"]?.[0]?.path;
  const image = req?.files["image"]?.[0]?.path;

  // check if category exist or not
  const AdvertisementExist = await Advertisement.findOne({ title });
  if (AdvertisementExist) {
    res.status(302);
    throw new Error("Advertisment already exist");
  }
  const advertisement = await Advertisement.create({
    title: title?.toUpperCase(),
    subtitle,
    image,
    background,
  });

  res.status(201).json({
    message: "Advertisement created successfully.",
    advertisement,
  });
});

// get all Advertisement
export const getAllAdvertisement = asyncHandler(async (req, res) => {
  // check if Advertisement exist or not
  const allAdvertisement = await Advertisement.find({}).sort({ createdAt: -1 });
  if (!allAdvertisement) {
    res.status(404);
    throw new Error("No Advertisement Found");
  }
  res.status(201).json({
    message: "all Advertisement fetched successfully.",
    allAdvertisement,
  });
});

// get all Advertisement
export const getSelectedAdvertisements = asyncHandler(async (req, res) => {
  // check if Advertisement exist or not
  const allAdvertisement = await SelectedAdvertisement.find({});
  if (!allAdvertisement) {
    res.status(404);
    throw new Error("No Advertisement Found");
  }
  res.status(201).json({
    message: "all Advertisement fetched successfully.",
    allAdvertisement,
  });
});

// get single Advertisement by id
export const getSingleAdvertisement = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const advertisement = await Advertisement.findById(id);

  // check if advertisement not found
  if (!advertisement) {
    res.status(404);
    throw new Error("No Advertisement Found");
  }

  res.status(200).json({
    message: "advertisement found.",
    advertisement,
  });
});

// delete only one Advertisement by id
export const deleteAdvertisement = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId);
  if (user.role === "user") {
    res.status(400);
    throw new Error("cant delete Advertisement,Admin Only.");
  }
  const advertisement = await Advertisement.findById(req.params.id);
  if (!advertisement) {
    res.status(404);
    throw new Error("No advertisement Found.");
  }

  await advertisement.deleteOne();

  res.json({
    message: "advertisement deleted and unSelected.",
  });
});

// Select Advetisement to Show

export const SelectAdvertisement = asyncHandler(async (req, res) => {
  const advertisement = await Advertisement.findById(req.params.id);

  if (!advertisement) {
    res.status(404);
    throw new Error("No Advertisement Found");
  }

  const ExistedAdvertisement = await SelectedAdvertisement.findById(
    req.params.id
  );

  if (ExistedAdvertisement) {
    res.status(302);
    throw new Error("advertisement Already Selected.");
  }

  SelectedAdvertisement.create({
    _id: advertisement?._id,
    title: advertisement?.title,
    subtitle: advertisement?.subtitle,
    image: advertisement?.image,
    background: advertisement?.background,
  });

  res.status(200).json({
    success: true,
    message: `advertisement Selected.`,
  });
});

export const deleteSelectedAdvertisement = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId);
  if (user.role === "user") {
    res.status(400);
    throw new Error("cant delete Advertisement,Admin Only.");
  }
  const advertisement = await Advertisement.findById(req.params.id);
  const selectedAdvertisments = await SelectedAdvertisement.findById(
    req.params.id
  );

  if (!selectedAdvertisments) {
    res.status(404);
    throw new Error("No advertisement Found.");
  }

  if (advertisement) {
    await advertisement.deleteOne();
    if (advertisement?.image) {
      const advetisementImage = path.join(
        __dirname,
        "..",
        "..",
        advertisement?.image
      );
      if (await fs.pathExists(advetisementImage)) {
        await fs.unlink(advetisementImage);
      }
    }

    if (advertisement?.background) {
      const advetisementBackground = path.join(
        __dirname,
        "..",
        "..",
        advertisement?.background
      );

      if (await fs.pathExists(advetisementBackground)) {
        await fs.unlink(advetisementBackground);
      }
    }
  }

  if (selectedAdvertisments) {
    await selectedAdvertisments.deleteOne();

    if (selectedAdvertisments?.image) {
      const selectedAdvertisementImage = path.join(
        __dirname,
        "..",
        "..",
        selectedAdvertisments?.image
      );

      if (await fs.pathExists(selectedAdvertisementImage)) {
        await fs.unlink(selectedAdvertisementImage);
      }
    }

    if (selectedAdvertisments?.background) {
      const SelectedAdvetisementBackground = path.join(
        __dirname,
        "..",
        "..",
        selectedAdvertisments?.background
      );
      if (await fs.pathExists(SelectedAdvetisementBackground)) {
        await fs.unlink(SelectedAdvetisementBackground);
      }
    }
  }

  res.json({
    message: "advertisement unSelected/removed.",
  });
});
