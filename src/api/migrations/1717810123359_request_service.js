module.exports = {
  up: `CREATE TABLE IF NOT EXISTS request_service(
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(225) NULL,
          last_name VARCHAR(225) NULL,
          mobile BIGINT(20) NULL,
          email VARCHAR(225) NULL,
          zip_code VARCHAR(225) NULL,
          service_id INT,
          address VARCHAR(225) NULL, 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP       
      )`,
  down: "DROP TABLE IF EXISTS request_service",
};
