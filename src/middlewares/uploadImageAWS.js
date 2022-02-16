const aws = require("aws-sdk");
require("dotenv").config();
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_URL_IMG } = process.env;

aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "eu-west-3",
});

exports.uploadImageAws = async (req, res, next) => {
  const s3 = new aws.S3({ params: { Bucket: "gorip-images" } });
  const data = {
    Key: "spot-".concat(Date.now().toString()),
    Body: req.body.photo,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
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
  req.url = `${AWS_URL_IMG}/${result.params.Key}`;
  next();
};
