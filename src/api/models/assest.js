const db = require("../../config/db");

exports.store = async (file, params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  var image = null;
  if (file) {
    image = file.filename;
  }
  try {
    const assests = await db.query(
      `INSERT INTO assests(assests_image,assest_for) VALUES (?,?)`,
      [image, params.assest_for]
    );
    (message = "Error in creating the assests"), (code = 400), (data = []);
    if (assests.affectedRows) {
      message = "Assest creted successfully";
      code = 201;
      data = assests;
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};

exports.get = async () =>{
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const assests = await db.query('SELECT * FROM assests',[]);
        message = 'NO assests available', code = 400, data = [];
        if(assests.length){
            message = 'assests fetched successfully',
            code = 200,
            data = assests
        }
    } catch (error) {
        message = error;
    }

    return {message,code,data}
}

exports.get__by_id = async (id) =>{
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const assest = await db.query('SELECT * FROM assests WHERE id=${id}',[]);
        message = 'NO Assests available', code = 400, data = [];
        if(assest.length){
            message = 'Accests fetched successfully',
            code = 200,
            data = assest
        }
    } catch (error) {
        message = error;
    }

    return {message,code,data}
}