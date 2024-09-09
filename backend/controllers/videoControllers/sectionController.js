import Course from "../../models/videoModels/Course.js";
import Section from "../../models/videoModels/Section.js";
import asyncHandler from "express-async-handler";
import ffmpeg from "fluent-ffmpeg";

import fs from "fs-extra";
import path from "path";
import { dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createSection = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, description } = req.body;

  // check if courses exist in our databse if not we well not save section
  const course = await Course.findOne({ _id: courseId });
  if (!course) {
    res.status(404);
    throw new Error("Course Not Found.");
  } else if (course) {
    // if course exist we well find that course and store a new sectsion in that course
    const section = await Section.create({
      title,
      description,
      course: course._id,
    });

    // add section to the course sections Array
    course?.sections?.push(section._id);
    await course?.save();

    return res.status(201).json({
      message: "Course Created Successfully.",
      section,
      course,
    });
  }
});

export const SectionDetails = asyncHandler(async (req, res) => {
  const sectionId = req?.params?.section_pr_Id;

  // find the section in the database
  const sectionExist = await Section.findById(sectionId);
  // check if section exist
  if (!sectionExist) {
    res.status(404);
    throw new Error("Section not found try again.");
  }
  return res.status(200).json({
    success: true,
    message: "Section Fetched successfully.",
    sectionExist,
  });
});

export const deleteSection = asyncHandler(async (req, res) => {
  const sectionId = req?.params?.sectionId;
  // find the section in the database
  const sectionExist = await Section.findById(sectionId);
  const section = await Section.findById(sectionId);
  // check if section exist
  if (!sectionExist) {
    res.status(404);
    throw new Error("Section not found try again.");
  }

  const deletePromises = section.videos.map(async (videoList) => {
    const videoPath = path.join(__dirname, "..", "..", videoList.video.url); // Adjust path if needed
    if (await fs.pathExists(videoPath)) {
      await fs.unlink(videoPath);
      console.log(`Deleted: ${videoPath}`);
    }
  });

  // Wait for all deletions to complete
  await Promise.all(deletePromises);

  // we well find the course in which this section is added
  const course = await Course.findById(sectionExist?.course);

  // search in the sections array of course and find this section that we want to delete and delete it
  const newSection = course?.sections?.filter(
    (section) => section?._id?.toString() !== sectionExist?._id?.toString()
  );

  course.sections = newSection;
  // save the change in course
  await course?.save();
  await sectionExist?.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Lecture deleted successfully.",
    sectionExist,
  });
});

// add videos to specific sectino

export const addVideoToSection = asyncHandler(async (req, res) => {
  const videoPath = req?.file?.path;
  const sectionId = req.params.sectionId;
  const { title, duration } = req.body;

  // Validate if video path exists
  if (!videoPath) {
    res.status(400);
    throw new Error("Video file is required.");
  }

  const section = await Section.findById(sectionId);

  if (!section) {
    res.status(404);
    throw new Error("Section not found.");
  }

  // Add video details to section
  section.videos.push({
    video: {
      title: title,
      url: videoPath,
      duration: duration,
    },
  });

  await section.save();

  res.status(200).json({
    success: true,
    message: "Video added to section",
    section,
  });
});

// delete videos from specific sectino

export const deleteVideoFromSection = asyncHandler(async (req, res) => {
  const { sectionId, videoId } = req.params;

  // Find the section by its ID
  const section = await Section.findById(sectionId);

  if (!section) {
    res.status(404);
    throw new Error("Section not found.");
  }

  // Find the video in the section to get its path
  const foundedVideo = section.videos.find(
    (video) => video._id.toString() === videoId.toString()
  );

  // Filter out the video to be deleted
  const newVideos = section.videos.filter(
    (video) => video._id.toString() !== videoId.toString()
  );

  section.videos = newVideos;

  // Save the updated section
  await section.save();

  if (foundedVideo) {
    // Construct the path to the video file in the uploads folder
    const videoPath = path.join(__dirname, "..", "..", foundedVideo.video.url);

    if (await fs.pathExists(videoPath)) {
      await fs.unlink(videoPath);
    }
  }

  res.status(200).json({
    success: true,
    message: "Video removed from section",
    section,
  });
});

// preview  videos from specific section

export const previewVideoFromSection = asyncHandler(async (req, res) => {
  const { sectionId, videoId } = req.params;

  const section = await Section.findById(sectionId);

  if (!section) {
    res.status(404);
    throw new Error("Section not found.");
  }

  const ExistVideo = section?.videos?.find(
    (video) => video._id?.toString() === videoId?.toString()
  );

  res.status(200).json({
    success: true,
    message: `Video Fetched from section`,
    ExistVideo,
  });
});
