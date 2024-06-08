module.exports = {
  up: `CREATE TABLE IF NOT EXISTS request_service(
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name varchar(225) NULL,
          last_name varchar(225) Null,
          mobile bigint(20) NULL,
          email varchar(225) NULL,
          service_id INT,
          address varchar(225) NULL, 
          created_at timestamp DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamp ON UPDATE CURRENT_TIMESTAMP       
      )`,
  down: "DROP TABLE IF EXISTS request_service",
};
