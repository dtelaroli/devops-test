const express = require("express");
const router = express.Router();
const { shipment } = require("../controllers");
const { shipmentValidation } = require("../validations");

router.post("/confirmation", shipmentValidation, shipment.confirmation);

module.exports = router;
