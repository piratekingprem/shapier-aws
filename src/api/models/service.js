const db = require("../../config/db");

exports.store_service = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const service = await db.query(
      `INSERT INTO service(service_name,type_of) VALUES(?,?)`,
      [params.service_name, params.type_of]
    );
    message = "Errror in creating service",code = 400, data = []
    if(service){
        message = "Service created succesfully",
        code = 201,
        data = []
    }
  } catch (error) {
    message = error
  }
  return {message,code,data};
};

exports.get_service  = async () => {
    let message = "Something went wrong",
    code = 500,
    data = [];
    try {
        const service =  await db.query(
            `SELECT * FROM service`,[]
        )
        message = "No service found" ,code = 400, data = []
        if(service){
            message = "Service fetched successfully",
            code = 200,
            data = service
        }
    } catch (error) {
        message = error
    }
    return {message,code,data};
}

exports.get_service_by_id = async (id) => {
    let message = "Something went wrong",
    code = 500,
    data = [];
    try {
        const service = await db.query(
            `SELECT * FROM service WHERE id = ${id}`,[]
        )
        message = "No service found", code = 400, data = []
        if(service){
            message = "Service fetched successfully",
            code = 200,
            data = service
        }
    }catch(error){
        message = error
    }
    return {message,code,data};
}