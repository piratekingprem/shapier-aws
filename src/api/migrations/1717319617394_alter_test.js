module.exports = {
    "up": "ALTER TABLE test ADD COLUMN kingKie VARCHAR(255) NULL",
    "down": "ALTER TABLE test DROP COLUMN kingKie"
}