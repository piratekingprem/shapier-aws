module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS banners(
        id INT AUTO_INCREMENT PRIMARY KEY,
        banner_image varchar(225) NULL,
        banner_category varchar(225) NULL
    )`,
    "down": "DROP TABLE IF EXISTS banners"
}