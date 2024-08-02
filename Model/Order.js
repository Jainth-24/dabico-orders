const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  soNo: String, // SO. No
  customerPO: String, // Customer PO
  accountId: String, // Account ID
  accountName: String, // Account Name
  contactName: String, // Contact Name
  phone: String, // Phone
  email: String, // Email
  stage: String, // Stage
  status: String, // Status
  orderDate: Date, // Order Date
  submittalsApprovedDate: Date, // Submittals Approved Date
  submittalApproved: Date, // Submittal Approved
  bomAndPartsUnderProcess: Date, // BOM & Parts under process
  mfgUnderProcess: Date, // MFG under process
  shipDate: Date // Ship Date
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
