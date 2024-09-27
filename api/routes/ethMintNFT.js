require("ts-node").register();
const express = require("express");
const minter = require("../minterETH.js");

const router = express.Router();

const { readFileSync, writeFile } = require("node:fs");

router.post("/", function (req, res, next) {
  console.log("Mint NFT for follow meta:" + req.body.metaURL);
  minter(req.body.metaURL);
  res.json({ state: "eth out" });
});

module.exports = router;
