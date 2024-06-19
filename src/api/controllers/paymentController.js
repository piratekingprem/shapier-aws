const { mailoption,transporter } = require("../../config/smtp");
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
    const payment = {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    };

    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
    console.log("req body", req.body);
    const userPayment = await paymentModel.store(req.body);

    mailoption.to = "rp0617430@gmail.com"
    mailoption.subject = "Order Created"
    mailoption.html = `<p>Your order with order ID ${razorpay_order_id} has been created successfully.</p>`
    
    await transporter.sendMail(mailoption);
    
    return res.send(userPayment);
  } catch (error) {
    next(error);
  }
};

exports.getPayment = async () => {
  console.log(process.env.RAZORPAY_API_SECRET);
};

exports.get_order = async (req, res, next) => {
  try {
    const order = await paymentModel.get();
    return res.json(order);
  } catch (error) {
    next(error);
  }
};
