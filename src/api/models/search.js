const db = require("../../config/db");

exports.get_search_product = async (query) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const search = await db.query(`SELECT * FROM product WHERE product LIKE ?`, [`%${query}%`]);
    (message = "No product found"), (code = 404), (data = []);
    if (search.length) {
      (message = "Product fetched successfully"), (code = 200), (data = search);
    }
  } catch (error) {
    message = error;
  }
  return {message,code,data};
};
