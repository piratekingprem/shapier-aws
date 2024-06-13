module.exports = {
  up: `CREATE TABLE IF NOT EXISTS orders_product(
         id INT AUTO_INCREMENT PRIMARY KEY,
         order_id INT NULL,
         product_id INT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
  down: "DROP TABLE IF EXISTS orders_product",
};
