import multer from "multer";
import { BadRequest } from "../errors/errors.js";

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
});

const allowedMimeTypes = ["image/png", "image/jpg", "image/jpge"];

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (_, { mimetype }, cb) => {
    if (allowedMimeTypes.includes(mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new BadRequest("File types allowed .jpeg, .jpg and .png."));
    }
  },
}).single("photo");
