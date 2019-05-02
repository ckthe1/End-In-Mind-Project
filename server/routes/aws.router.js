const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
require("dotenv").config();
const cleanFilename = require('./cleanFilename')
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



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

  return s3.upload(params).promise();
};

 var params = {
   Bucket: process.env.S3_BUCKET,
   MaxKeys: 10
 };



 router.get("/signed-url", rejectUnauthenticated, async (req, resp) => {

  // console.log('getting signed url', req.query);
   let params = { Bucket: process.env.S3_BUCKET, Key: req.query.key };

   s3.getObject(params, async (error, data) =>{

    if (error) {
      console.log("error getting bucket object", error);
      getObjectError = true;
      resp.sendStatus(500);
    }else {

      // console.log("got bucket object OK!", data);
      let signedUrl = await s3.getSignedUrl(`getObject`, params);
      resp.send({ signedUrl });
    }
   })
 })


 router.get("/", rejectUnauthenticated, (request, response) => {
   console.log('hi were in the get route');

  s3.listObjects(params, function(err, data) {

      if (err) {
        // an error occurred
        console.log(err, err.stack);
        response.sendStatus(500);
      }
      
      else {

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
router.post("/", rejectUnauthenticated, (request, response) => {
  const form = new multiparty.Form();

  form.parse(request, async (error, fields, files) => {
    
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



router.delete("/", rejectUnauthenticated, (req, res) => {

  console.log('attemptig to delete from aws bucket', req.query);

  if (!req.user.is_super_admin) {
    console.log('Attempt to delete file from AWS bucket from a non-super-admin', req.user);
    res.sendStatus(500);
    return;
  }

   var params = {
     Bucket: process.env.S3_BUCKET,
     Key: req.query.awsKey
   };


   s3.deleteObject(params, function(err, data) {

     if (err) {
       // an error occurred
       console.log(err, err.stack);
       res.sendStatus(500);
     }

     else {
      // successful response
      console.log("Successful delete aws",data); 
      res.sendStatus(200);
     }
   });
});


module.exports = router;