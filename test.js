const mongoose = require("mongoose");

const toySchema = new mongoose.Schema({
  color: String,
  name: String,
});

const Toy = mongoose.model("Toys", toySchema);

Toy.schema.path("color").validate(function (value) {
  return /red|green|blue/i.test(value);
}, "Invalid color");

const opts = { runValidators: true };
Toy.updateOne({}, { color: "blue" }, opts, function (err) {
  return err;
});
console.log("passed");
