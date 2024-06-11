const { instance } = require("../helpers/commonHelper");
const paymentModel = require("../models/payment");
const crypto = require("crypto");
// require("dotenv").config();
exports.checkout = async (req, res, next) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // Ensure amount is a number
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message, // Send the error message back
    });
  }
};
exports.paymentVerification = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET);
    // order_id + " | " + razorpay_payment_id

    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");
    
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: " Transaction is not legit!" });
    }

    res.json({
      msg: " Transaction is legit!",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
    

  } catch (error) {
    next(error);
  }
};
exports.getPayment = async () => {
  console.log(process.env.RAZORPAY_API_SECRET);
};
