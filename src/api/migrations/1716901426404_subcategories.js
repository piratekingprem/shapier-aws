module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS subcategories(
        subcategory_id INT AUTO_INCREMENT PRIMARY KEY,
        subcategory_name VARCHAR(255) NOT NULL,
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": "DROP TABLE IF EXISTS subcategories"
}