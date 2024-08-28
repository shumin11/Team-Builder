const mongoose = require('mongoose');

const MemberScheme = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  age: Number,
  image_url: String,
  gender: String
});

const MemberDetailSchema = new mongoose.Schema({
  member_id: mongoose.Schema.Types.ObjectId,
  name: String,
  ranking: Number
});

const Member = mongoose.model('Member', MemberScheme);
const MemberDetail = mongoose.model('MemberDetail', MemberDetailSchema);

module.exports = {
  Member,
  MemberDetail
};