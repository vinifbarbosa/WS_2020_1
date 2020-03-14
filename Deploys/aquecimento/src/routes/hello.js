const express = require("express");

const helloCtrl = require("../controllers/hello_controller");

const router = express.Router();

//Web service/endpoint
router.get("/", helloCtrl.sendHello);

module.exports = router;