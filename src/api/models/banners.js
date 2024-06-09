const db = require("../../config/db");

exports.store = async (file, params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  let image = file ? file.filename : null;
  try {
    const banners = await db.query(
      `INSERT INTO banners(banner_image,banner_category) VALUES(?,?)`,
      [image, params.banner_category]
    );
    (message = "Error in creating the banner"), (code = 400), (data = []);
    if (banners.affectedRows) {
      (message = "Succesfully created banners"), (code = 201), (data = banners);
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
    const banner = await db.query(`SELECT * from banners WHERE id=${id}`, []);
    (message = "No banners found"), (code = 400), (data = []);
    if (banner.length) {
      (message = "Succesfully fetched banners"), (code = 200), (data = banner);
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
    const banner = await db.query(`SELECT * from banners`, []);
    (message = "No banners found"), (code = 400), (data = []);
    if (banner.length) {
      (message = "Succesfully fetched banners"), (code = 200), (data = banner);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};

exports.get_by_banner_category = async (banner_category) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const banner = await db.query(
      `SELECT * from banners WHERE banner_category='${banner_category}'`,
      []
    );
    (message = "No banners found"), (code = 400), (data = []);
    if (banner.length) {
      (message = "Succesfully fetched banners"), (code = 200), (data = banner);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};
