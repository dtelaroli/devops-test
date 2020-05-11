const express = require("express");
const router = express.Router();
const { shipping } = require("../controllers");
const { shippingModel } = require("../models");

router.post("/", shippingModel, shipping.create);
router.post("/confirmation", shippingModel, shipping.confirmation);

module.exports = router;
