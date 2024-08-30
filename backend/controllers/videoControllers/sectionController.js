import Course from "../../models/videoModels/Course.js";
import Section from "../../models/videoModels/Section.js";
import asyncHandler from "express-async-handler";

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
  // check if section exist
  if (!sectionExist) {
    res.status(404);
    throw new Error("Section not found try again.");
  }
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
  const section = await Section.findById(sectionId);

  if (!section) {
    res.status(404);
    throw new Error("Section not found.");
  }

  section?.videos?.push({
    video: {
      title: title,
      url: videoPath,
      duration: duration,
    },
  });

  await section.save();

  res.status(200).json({
    success: true,
    message: `Video added to section`,
    section,
  });
});
// delete videos from specific sectino

export const deleteVideoFromSection = asyncHandler(async (req, res) => {
  const { sectionId, videoId } = req.params;
  const section = await Section.findById(sectionId);

  if (!section) {
    res.status(404);
    throw new Error("Section not found.");
  }

  const newVideos = section?.videos?.filter(
    (video) => video._id?.toString() !== videoId?.toString()
  );

  section.videos = newVideos;

  await section.save();

  res.status(200).json({
    success: true,
    message: `Video Removed From section`,
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
