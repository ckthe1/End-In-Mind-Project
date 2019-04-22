const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
require("dotenv").config();
const cleanFilename = require('./cleanFilename')



// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: "bazookalip",
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
//  console.log(params);
  
  return s3.upload(params).promise();
};

// console.log('my bucket is', process.env.S3_BUCKET);

 var params = {
   Bucket: process.env.S3_BUCKET,
   MaxKeys: 10
 };


 router.get("/", (request, response) => {
   console.log('hi were in the get route kthx');

  const objectsArray = s3.listObjects(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        response.sendStatus(500);
      }
      // an error occurred
      else {
        // console.log('raw data', data.Contents); // successful response

        const siftedArray = data.Contents.map(obj => {
          let params = {Bucket: process.env.S3_BUCKET, Key: obj.Key};
          let url = s3.getSignedUrl(`getObject`, params);
          return {
            key: obj.Key,
            eTag: obj.ETag,
            size: obj.Size,
            storageClass: obj.StorageClass,
            signedURL: url
          } 
        })

        response.send({ siftedArray });
      }
    });
 })

 
// Define POST route
router.post("/", (request, response) => {
    console.log('is this working?');
  
    
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    // console.log(files);
    
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const newFilename = cleanFilename(files.file[0].originalFilename);
      const fileName = `Public/${newFilename}_${timestamp}`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (error) {
        console.log(error);
      return response.status(400).send(error)
    }
  });
});



router.delete("/", (req, res) => {
  console.log("/ DELETE request was hit taco");
  console.log("req.query:", req.query);
   var params = {
     Bucket: process.env.S3_BUCKET,
     Key: req.query.awsKey
   };

   console.log("params:", params);

   s3.deleteObject(params, function(err, data) {

     if (err) {
       console.log(err, err.stack);
       res.sendStatus(500);
     }

     // an error occurred
     else {
      console.log(data); // successful response
      res.sendStatus(200);
     }
   });
});






module.exports = router;