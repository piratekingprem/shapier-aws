module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS product(
        id INT AUTO_INCREMENT PRIMARY KEY,
        product varchar(225) NULL,
        product_image varchar(225) NULL,
        product_description TEXT NULL,
        product_price DECIMAL(10, 2) NULL,
        stock INT,
        subcategory_id INT,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": "DROP TABLE IF EXISTS product"
}