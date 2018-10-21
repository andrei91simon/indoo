const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Project = require("../models/project");
//const s3 = require("../../s3.js");
const Busboy = require('busboy');

const fs = require('fs');
const AWS = require('aws-sdk');


const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'indoodesign',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});
 
router.post('/uploadToS3', upload.array('photos', 30), function(req, res, next) {
  res.send({"message": 'Successfully uploaded ' + req.files.length + ' files!'});
})

/*
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './server/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
  },
  fileFilter: fileFilter
}); */

router.get("/", (req, res, next) => {
	Project.find()
	.exec()
	.then(docs => {
		console.log(docs);
		if(docs.length >= 0) {
			res.status(200).json(docs);
		} else {
			res.status(404).json({
				message: "No entries found"
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});
/*
router.post("/uploadPhoto", upload.single('photo'), (req, res, next) => {
	res.status(200).json({});
})

router.post("/uploadToS3", (req, res, next) => {
	let fileName = req.body.filename;
	s3("server/uploads/" + fileName);
	res.status(200).json({});
}) */

router.post("/", (req, res, next) => {

	const project = new Project({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		category: req.body.category,
		location: req.body.location,
		area: req.body.area,
		status: req.body.status,
		photoUrls: req.body.photoUrls,
		image: req.body.image
	});
	project
		.save()
		.then(result => {
		console.log(result);
		res.status(201).json({
			message: "Created project successfully",
			createdProject: {
				_id: result._id,
				title: result.title,
				category: result.category,
				location: result.location,
				area: result.area,
				status: req.body.status,
				photoUrls: result.photoUrls,
				image: result.image,
				request: {
					type: 'GET',
					url: "http://localhost:3000/projects/" + result._id
				}
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	}); 
});

router.get('/:projectId', (req, res, next) => {
	const id = req.params.projectId;
	Project.findById(id)
	.exec()
	.then(doc => {
		console.log("From database", doc);
		if(doc) {
			res.status(200).json(doc);
		} else {
			res
				.status(404)
				.json({ message: "No valid entry found for provided ID" });
		}
	})
	.catch(err => { 
		console.log(err);
		res.status(500).json({error: err});
	});
});

router.patch('/:projectId', (req, res, next) => {
	const id = req.params.projectId;
	const props = req.body;
	console.log(props);
	Project.update({_id: id}, props)
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.delete('/:projectId', (req, res, next) => {
	const id = req.params.projectId;
	Project.deleteOne({_id: id})
	.exec()
	.then( result =>  {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;