var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;

let ProjectSchema = new Schema({
  id: SchemaTypes.ObjectId,
  title: String,
  category: String,
  location: String,
  area: Number,
  status: String,
  photoUrls: [String]
});

mongoose.model('Project', ProjectSchema);

