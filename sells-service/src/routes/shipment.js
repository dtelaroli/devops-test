const express = require("express");
const router = express.Router();
const { shipment } = require("../controllers");
const { shipmentModel } = require("../models");

router.post("/confirmation", shipmentModel, shipment.confirmation);

module.exports = router;
