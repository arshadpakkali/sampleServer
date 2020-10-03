var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const randomSchema = new mongoose.Schema({
  value: Number,
});

const Random = mongoose.model("Random", randomSchema);

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/data", async (req, res) => {
  let data = await Random.find().select("-_id -__v");
  res.json(data);
});

router.post("/add/:no", (req, res) => {
  let data = req.params.no;

  const item = new Random({ value: data });

  item.save();

  res.json("Data Saved in Db");
});

module.exports = router;
