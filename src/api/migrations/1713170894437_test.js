module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS test(
        id INT AUTO_INCREMENT primary key,
        tester_name varchar(36) Null,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": `DROP TABLE IF EXISTS test`
}