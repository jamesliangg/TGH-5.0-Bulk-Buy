const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");

const DriverSchema = new Schema({
  first_name: String,
  last_name: String,
  license_number: String,
  phone: String,
  dob: Date,
  make: String,
  model: String,
  year: Number,
  plate_number: String,
  username: String,
  password: String,
  user_type: String,
});

// DriverSchema.pre("save", function (next) {
//   const user = this;
//   // bcrypt.hash(user.password, 10, (error, hash) => {
//     user.password = hash;
//     next();
//   });
// });

const Driver = mongoose.model("Driver", DriverSchema);
module.exports = { Driver };
