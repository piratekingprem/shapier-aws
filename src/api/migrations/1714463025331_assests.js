module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS assests(
        id INT AUTO_INCREMENT PRIMARY KEY,
        assests_image varchar(225) NULL,
        assest_for varchar(225) Null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": "DROP TABLE IF EXISTS assests"
}