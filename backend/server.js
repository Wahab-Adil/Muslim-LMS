// import cloudinary from "cloudinary";
// import nodeCron from "node-cron";
// import { Stats } from "./models/Stats.js";

import app from "./app/app.js";

import http from "http";

const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// })

// nodeCron.schedule("0 0 0 1 * *", async()=>{ //on every months first day this function will execute
//     try {
//         await Stats.create({});
//     } catch (error) {
//         console.log(error)
//     }
// })
