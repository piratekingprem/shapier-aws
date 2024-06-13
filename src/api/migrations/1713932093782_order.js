module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NULL,
        user_id INT NULL,
        total_amount DOUBLE(15,2) DEFAULT 0.0,
        payment_mode VARCHAR(255) NULL,
        payment_status VARCHAR(255) NULL,
        bill_firstName VARCHAR(225) NULL,
        bil_lastName VARCHAR(225) NULL,
        bill_mobile VARCHAR(225) NULL,
        bill_address VARCHAR(225) NULL,
        bill_pincode VARCHAR(225) NULL,
        bill_city VARCHAR(225) NULL,
        bill_state VARCHAR(225) NULL,
        bill_email VARCHAR(225) NULL,
        gst_no VARCHAR(225) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": "DROP TABLE IF EXISTS orders"
}