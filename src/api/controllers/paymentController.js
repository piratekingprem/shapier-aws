const { mailoption, transporter } = require("../../config/smtp");
const { instance } = require("../helpers/commonHelper");
const paymentModel = require("../models/payment");
const crypto = require("crypto");
const accountSid  = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');

const client = twilio(accountSid, authToken);

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

    // MAIL
    mailoption.to = `${req.body.billingInfo.email}`;
    mailoption.subject = "Order Created";
    mailoption.html = `  
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Order Confirmation</h2>
    <p>Dear ${req.body.billingInfo.firstName},</p>
    <p>Thank you for your order. We are pleased to confirm that your order has been successfully created.</p>
    <h4>Order Details:</h4>
    <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
    <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
    <p>We are processing your order and will notify you once it has been shipped.</p>
    <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
    <p>Best regards,</p>
    <p><strong>Shapier Team</strong></p>
  </div>`;
    await transporter.sendMail(mailoption);

    // WhatsApp Notification to Vendor
    const vendorWhatsAppNumber = 6377692127; // Vendor's WhatsApp number
    const twilioWhatsAppNumber =14155238886; // Your Twilio WhatsApp sender number

    await client.messages.create({
      from: `whatsapp:${twilioWhatsAppNumber}`,
      to: `whatsapp:${vendorWhatsAppNumber}`,
      body: `New Order Created!\nOrder ID: ${razorpay_order_id}\nPayment ID: ${razorpay_payment_id}\nCustomer: ${req.body.billingInfo.firstName} ${req.body.billingInfo.lastName}\nAmount: ${req.body.amount} INR`,
    });

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
