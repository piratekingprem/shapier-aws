module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS product_image(
        id INT AUTO_INCREMENT primary key,
        product_id INT NULL,
        image_url VARCHAR(255) NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": `DROP TABLE IF EXISTS product_image`
}