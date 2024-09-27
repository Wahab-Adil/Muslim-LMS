import multer from "multer";
import path from "path";

const upload = (folder) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${folder}`);
    },
    filename: function (req, file, cb) {
      // Create a unique filename using the original name and a timestamp
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname); // Get the file extension
      const baseName = path.basename(file.originalname, ext); // Get the original name without extension
      const newFilename = `${baseName}-${uniqueSuffix}${ext}`; // Create new filename

      cb(null, newFilename);
    },
  });

  return multer({ storage });
};

export default upload;
