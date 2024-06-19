const db = require("../../config/db");

exports.store = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const seller = await db.query(
      `INSERT INTO seller(mobile,company_name,contact_name,email,city,additional_info) VALUES(?,?,?,?,?,?)`,
      [
        params.mobile,
        params.company_name,
        params.contact_name,
        params.email,
        params.city,
        params.additional_info,
      ]
    );
    (message = "Error in creating the seller"), (code = 400), (data = []);
    if (seller.affectedRows) {
      (message = "Seller created successfully"), (code = 201), (data = seller);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};

exports.get = async () => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const seller = await db.query(`SELECT * FROM seller`, []);
    (message = "No seller found"), (code = 400), (data = []);
    if (seller.length) {
      (message = "Seller fetched successfully"), (code = 200), (data = seller);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};

exports.get_by_id = async (id) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const seller = await db.query(`SELECT * FROM seller WHERE id = ${id}`, []);
    (message = "No seller found"), (code = 400), (data = []);
    if (seller.length) {
      (message = "Seller fetched successfully"), (code = 200), (data = seller);
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};
