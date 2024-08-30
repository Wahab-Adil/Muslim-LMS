import mongoose, { mongo } from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    about: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], //enum means it has only these predefined values
      default: "user",
    },
    avatar: {
      type: String,
      required: true,
    },
    landingPagePhoto: {
      type: String,
      default: "default",
    },
    landingPageHeading: {
      type: String,
      default: "default",
    },
    landingPageSubtitle: {
      type: String,
      default: "default",
    },
    coursesTotalRatings: {
      type: Number,
    },
    articlesTotalRatings: {
      type: Number,
    },
    articlesTotalComments: {
      type: Number,
    },
    coursesTotalComments: {
      type: Number,
    },
    totalUsers: {
      type: Number,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
    playlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    articlesPlaylist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//we are creating a all user methods below
const User = mongoose.model("User", UserSchema);
export default User;
