const express = require("express");
const router = express.Router();
const { payment } = require("../controllers");
const { paymentValidation } = require("../validations");

router.post("/confirmation", paymentValidation, payment.confirmation);

module.exports = router;
