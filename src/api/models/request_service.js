const db = require("../../config/db");

exports.store = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const request_service = await db.query(
      `INSERT INTO request_service(first_name,last_name,mobile,email,zip_code,service_id,address) VALUES(?,?,?,?,?,?,?)`,
      [
        params.first_name,
        params.last_name,
        params.mobile,
        params.email,
        params.zip_code,
        params.service_id,
        params.address,
      ]
    );
    (message = "Error in creating request_service"), (code = 400), (data = []);
    if (request_service.affectedRows) {
      (message = "Successfully created the service"),
        (code = 201),
        (data = request_service);
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};

exports.get = async () => {
  let message = "Something went wrong";
  (code = 500), (data = []);
  try {
    const request_service = await db.query(
      `SELECT request_service.*, service.*  from request_service
       LEFT JOIN service ON request_service.service_id = service.id 
       ORDER BY request_service.created_at DESC`,
      []
    );
    (message = "No request found"), (code = 400), (data = []);
    if (request_service) {
      (message = "Request fetched successfully"),
        (code = 200),
        (data = request_service);
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
    const request_service = await db.query(
      `SELECT * from request_service WHERE id=${id}`,
      []
    );
    (message = "No request found"), (code = 400), (data = []);
    if (request_service) {
      (message = "Request fetched successfully"),
        (code = 200),
        (data = request_service);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};
