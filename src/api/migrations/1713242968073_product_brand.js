module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS product_brands(
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_brand_name VARCHAR(255) NOT NULL,
        product_image varchar(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": "DROP TABLE IF EXISTS product_brands"
}