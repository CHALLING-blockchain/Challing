import AWS from "aws-sdk";
import { v4 } from "uuid";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY,
});
const s3 = new AWS.S3({

params: { Bucket: process.env.REACT_APP_BUCKET_NAME },
region: process.env.REACT_APP_BUCKET_REGION,
})
export const uploadImageFile =async (image) => {
  const s3BaseUrl='https://special7333.s3.ap-northeast-2.amazonaws.com/'

  const imgName=v4()+'.jpg'
  const params = {
    ACL: 'public-read',
    Body: image,
    Bucket: process.env.REACT_APP_BUCKET_NAME,
    Key: imgName,
    ContentEncoding: 'base64', // required
    ContentType: `image/png` // required. Notice the back ticks
  }
    
  return new Promise((resolve) => {
    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      }
      resolve(data.Location);
    });
  });
};
