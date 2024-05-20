module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS product(
        id INT AUTO_INCREMENT PRIMARY KEY,
        product varchar(225) NULL,
        product_image varchar(225) NULL,
        product_price varchar(36) NULL,
        product_description varchar(225) NULL,
        product_category_id varchar(36) NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": "DROP TABLE IF EXISTS product"
}