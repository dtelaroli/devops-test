const express = require("express");
const router = express.Router();
const { payment } = require("../controllers");
const { paymentModel } = require("../models");

router.post("/", paymentModel, payment.create);
router.post("/confirmation", paymentModel, payment.confirmation);

module.exports = router;
