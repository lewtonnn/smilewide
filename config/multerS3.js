require('dotenv').config({ path: '../.env' });
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const path = require('path');

function initFileUploader(folderOnS3) {

  aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: 'eu-central-1',
  });

  const s3 = new aws.S3();

  return multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME + folderOnS3,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
      },
    }),
  });
}

module.exports = initFileUploader;