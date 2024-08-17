const express = require("express");
const web3 = require("@solana/web3.js");

const router = express.Router();

// const {readFileSync, writeFile} = require("node:fs");

router.get("/", function (req, res, next) {
  // const data = readFileSync("../data/data.json");
  // var jsonObj = JSON.parse(data);
  // res.json(jsonObj);
  res.json();
});

router.post("/", function (req, res) {
  // writeFile("../data/data.json", JSON.stringify(req.body), "utf-8", err=>{err?res.send({success: false, error: err}):res.send({success: true, error:null});})
});

module.exports = router;
