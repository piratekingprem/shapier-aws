module.exports = {
  up: `CREATE TABLE IF NOT EXISTS seller(
          id INT AUTO_INCREMENT PRIMARY KEY,
          mobile bigint(20) NULL,
          company_name varchar(225) NULL,
          contact_name varchar(225) NULL,
          email VARCHAR(225) NULL,
          city varchar(225) NULL,
          additional_info TEXT NULL,
          created_at timestamp DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamp ON UPDATE CURRENT_TIMESTAMP
    )`,
  down: "DROP TABLE IF EXISTS seller",
};
