module.exports = {
    "up":   `ALTER TABLE product_categories ADD product_category_image varchar(225) NULL`,
    "down": "ALTER TABLE DROP product_category_image"   
}