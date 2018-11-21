const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const projectRoutes = require('./api/routes/projects');

mongoose.connect(
	"mongodb://ovisimon:" + process.env.MONGO_PASSWORD + "@indoo-shard-00-00-bdcr7.mongodb.net:27017,indoo-shard-00-01-bdcr7.mongodb.net:27017,indoo-shard-00-02-bdcr7.mongodb.net:27017/test?ssl=true&replicaSet=indoo-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers", 
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

app.use("/projects", projectRoutes);

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	}); 
});

module.exports = app;