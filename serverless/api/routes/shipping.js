const express = require("express");
const router = express.Router();
const { shipping } = require("../controllers");
const { shippingModel } = require("../models");

router.post("/start", shippingModel, shipping.start);
router.post("/end", shippingModel, shipping.end);

module.exports = router;
