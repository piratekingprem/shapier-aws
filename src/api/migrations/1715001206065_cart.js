module.exports = {
  up: `CREATE TABLE IF NOT EXISTS cart(
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        product_id INT NULL,
        quantity INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
  down: "DROP TABLE IF EXISTS cart"
};