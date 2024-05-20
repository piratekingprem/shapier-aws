module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS product_categories(
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_category_name varchar(226) NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": "DROP TABLE IF EXISTS product_categories"
}