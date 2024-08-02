const express = require("express");
const multer = require("multer");
const orderController = require("../Controller/order.controller");

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Define the route for file upload
router.post("/order-upload", upload.single("file"), orderController.uploadFile);
router.get("/orders/:soNo", orderController.getOrderBySoNo);

module.exports = router;
