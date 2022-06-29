const aws = require("aws-sdk");
require("dotenv").config();
const fs = require("fs");
const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_URL_IMG } = process.env;

aws.config.update({
  region: "eu-west-3",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

exports.uploadImageAwsTest = (file) => {
  console.log(file.filename);
  const fileStream = fs.createReadStream(file.path);
  const s3 = new aws.S3({
    params: { Bucket: "gorip-images", Key: AWS_SECRET_KEY },
  });
  const uploadParams = {
    Key: file.filename,
    Body: fileStream,
  };

  return s3.upload(uploadParams).promise();
};
exports.uploadImageAws = (req) => {
  const fileExtension = req.body.photo.split(";")[0].split(":")[1];
  const s3 = new aws.S3({
    params: { Bucket: "gorip-images", Key: AWS_SECRET_KEY },
  });
  const data = {
    Key: "vergafile",
    Body: req.body.photo.split(",")[1],
    ContentEncoding: "base64",
    ContentType: `${fileExtension}`,
    //ACL: "public-read",
  };
  const result = s3.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log("Error uploading data: ", data);
    } else {
      //data return the file id
      console.log("successfully uploaded the image!");
    }
  });
  console.log(result);
  return `${AWS_URL_IMG}/spots/${result.params.Key}`;
};

exports.downloadImageAws = (id) => {
  const s3 = new aws.S3({ params: { Bucket: "gorip-images" } });
  const image = s3.getObject({ Key: `${id}` });

  return image.promise();
};
