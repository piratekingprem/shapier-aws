module.exports = {
  up: `CREATE TABLE IF NOT EXISTS zip_check(
        id INT AUTO_INCREMENT PRIMARY KEY,
        zip VARCHAR(225) NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp ON UPDATE CURRENT_TIMESTAMP    
    )`,
  down: "DROP TABLE IF EXISTS zip_check",
};
