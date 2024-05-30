const { instance } = require("../helpers/commonHelper");

exports.checkout = async (req, res, next) => {
    try {
        const options = {
            amount: Number(req.body.amount) * 100, // Ensure amount is a number
            currency: "INR"
        };
        const order = await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message // Send the error message back
        });
    }
};
