import "./env";

import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWSS3_ID_KEY,
  secretAccessKey: process.env.AWSS3_SECRET_KEY,
  region: process.env.AWSS3_REGION
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "prismagraam",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { location }
  } = req;
  res.json({ location });
};
