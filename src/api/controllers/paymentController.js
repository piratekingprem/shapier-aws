const { instance } = require("../helpers/commonHelper");
const paymentModel = require("../models/payment");

exports.checkout = async (req, res, next) => {
  try {
    const options = {
      amount: Number(req.body.amount) * 100, // Ensure amount is a number
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order)
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
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
      console.log("sig recevied", razorpay_signature);
      console.log("sig generated", expectedSignature);

    const isAuthentic = expectedSignature === razorpay_signature;

    const paymentData = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    };

    if (isAuthentic) {
      const payment = await paymentModel.store(paymentData);
      res.send(payment);
      // res.redirect(
      //   // `http://localhost:5000/paymentsuccess?reference=${razorpay_payment_id}`
      // );
    }
  } catch (error) {
    next(error);
  }
};
