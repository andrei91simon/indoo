const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});


const uploadFile = (file) => {
    let fileName = file;
    fs.readFile(fileName, (err, data) => {

    let fil = fs.createReadStream(file); 

     if (err) throw err;
     const params = {
        Bucket: 'indoodesign', // pass your bucket name
        Key: fileName.replace("server/uploads/", ""), // file will be saved as testBucket/contacts.csv
        Body: fil,
        ContentType: 'image/jpeg',
        ContentEncoding: 'base64',
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err;
         console.log(`File uploaded successfully at ${data.Location}`);
     });
  });
};


module.exports = uploadFile;