const db = require("../../config/db");

exports.store = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    console.log(params.razorpay_order_id);
  } catch (error) {
    message = error;
  }
  return {message,code,data};
};
