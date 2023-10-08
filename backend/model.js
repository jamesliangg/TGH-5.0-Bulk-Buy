const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestOrderSchema = new Schema({
  uid: Number, // String is shorthand for {type: String}
  req: Object,
});

const requestOrder = mongoose.model("requestOrder", requestOrderSchema);
console.log(first);
module.exports = mongoose.model("requestOrderSchema", requestOrderSchema);
