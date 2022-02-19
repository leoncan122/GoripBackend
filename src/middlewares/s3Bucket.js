const aws = require("aws-sdk");
require("dotenv").config();
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_URL_IMG } = process.env;

aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "eu-west-3",
});

exports.uploadImageAws = (req) => {
  const fileExtension = req.body.photo.split(";")[0].split(":")[1];
  const s3 = new aws.S3({ params: { Bucket: "gorip-images" } });
  const data = {
    Key: "spots/spot-".concat(Date.now().toString(), ".txt"),
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
  // console.log(result);
  return `${AWS_URL_IMG}/spots/${result.params.Key}`;
};

exports.downloadImageAws = (id) => {
  const s3 = new aws.S3({ params: { Bucket: "gorip-images" } });
  const base64 = s3.getObject({ Key: `spots/${id}.txt` });
  return base64.promise();
};
