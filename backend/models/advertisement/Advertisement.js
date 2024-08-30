import mongoose from "mongoose";
const AdvertisementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter Title"],
    },
    subtitle: {
      type: String,
      required: [true, "Please enter subtitle"],
    },
    image: {
      type: String,
    },
    background: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//we are creating a all user methods below
const advertisement = mongoose.model("Advertisement", AdvertisementSchema);
export default advertisement;
