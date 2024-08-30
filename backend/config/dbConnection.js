import mongoose from "mongoose";

const dbConnect = async () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));
  console.log("db connected successfull...");
};

export default dbConnect;
