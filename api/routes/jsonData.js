const express = require("express");

const router = express.Router();

const { readFileSync, writeFile } = require("node:fs");

router.get("/", function (req, res, next) {
  console.log("i try to get json");
  const data = readFileSync("./data/data.json");
  console.log(data);
  var jsonObj = JSON.parse(data);
  res.json(jsonObj);
});

router.post("/", function (req, res) {
  writeFile("./data/data.json", JSON.stringify(req.body), "utf-8", (err) => {
    err
      ? res.send({ success: false, error: err })
      : res.send({ success: true, error: null });
  });
});

module.exports = router;
