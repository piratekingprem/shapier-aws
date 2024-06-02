module.exports = {
  up: `ALTER TABLE product
        ADD COLUMN sale_price INT NULL,
        ADD COLUMN minimum_qauntity INT NULL,
        ADD COLUMN per_base VARCHAR(225) NULL
    `,
  down: `ALTER TABLE product 
    DROP COLUMN sale_price
    DROP COLUMN minimum_qauntity INT NULL,
    DROP COLUMN per_base VARCHAR(225) NULL
    `
};
