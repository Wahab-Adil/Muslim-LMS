import multer from "multer";

const upload = (path) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${path}`);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  return multer({ storage });
};

export default upload;
