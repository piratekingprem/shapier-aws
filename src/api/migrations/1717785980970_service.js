module.exports = {
  up: `CREATE TABLE IF NOT EXISTS service(
        id INT AUTO_INCREMENT PRIMARY KEY,
        service_name varchar(225) NULL,
        type_of varchar(225) Null,
        image_of_service varchar(255) NULL
    )`,
  down: "DROP TABLE IF EXISTS service",
};
