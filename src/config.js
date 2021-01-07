module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV:process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:passw0rd@localhost:5432/aiptestdb',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/aip-test'
}