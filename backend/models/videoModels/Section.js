import mongoose from "mongoose";
const schema = mongoose.Schema;

const sectionSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
      ref: "Course",
    },
    description: {
      type: String,
      required: true,
    },
    videos: [
      {
        video: {
          title: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
          duration: {
            type: String,
            required: true,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

sectionSchema.virtual("totalVideos").get(function () {
  const section = this;
  const totalVideos = section?.lessons?.length;
  return totalVideos;
});

const Section = mongoose.model("Section", sectionSchema);
export default Section;
