const db = require("../../config/db");

exports.store_service = async (file, params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];

  let image = file ? file.filename : null;
  try {
    const service = await db.query(
      `INSERT INTO service(service_name, type_of, image_of_service) VALUES (?, ?, ?)`,
      [params.service_name, params.type_of, image]
    );

    if (service.affectedRows > 0) {
      message = "Service created successfully";
      code = 201;
      data = service;
    } else {
      message = "Error in creating service";
      code = 400;
    }
  } catch (error) {
    message = error.message;
  }
  return { message, code, data };
};

exports.get_service = async () => {
  let message = "Something went wrong",
    code = 500,
    data = [];

  try {
    const service = await db.query(`SELECT * FROM service`);

    if (service.length > 0) {
      message = "Service fetched successfully";
      code = 200;
      data = service;
    } else {
      message = "No service found";
      code = 404;
    }
  } catch (error) {
    message = error.message;
  }
  return { message, code, data };
};

exports.get_service_by_id = async (id) => {
  let message = "Something went wrong",
    code = 500,
    data = [];

  try {
    const service = await db.query(`SELECT * FROM service WHERE id = ?`, [id]);

    if (service.length > 0) {
      message = "Service fetched successfully";
      code = 200;
      data = service;
    } else {
      message = "No service found";
      code = 404;
    }
  } catch (error) {
    message = error.message;
  }
  return { message, code, data };
};

exports.get_service_by_name = async (service_name) => {
  let message = "Something went wrong",
    code = 500,
    data = [];

  try {
    const service = await db.query(`SELECT * FROM service WHERE service_name LIKE ?`, [`%${service_name}%`]);

    if (service.length > 0) {
      message = "Service fetched successfully";
      code = 200;
      data = service;
    } else {
      message = "No service found";
      code = 404;
    }
  } catch (error) {
    message = error.message;
  }
  return { message, code, data };
};
