const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: String,
	category: String,
	location: String,
	area: Number,
	status: String,
	photoUrls: [String],
	image: String
});

module.exports = mongoose.model('Project', projectSchema);