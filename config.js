const config = {
  dbUrl: process.env.DB_URL || 'mongodb+srv://db_user_portfolio:ygQZIvAVBSLQFwQl@cluster0.n227s.mongodb.net/portfolioDB?retryWrites=true&w=majority',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
};

module.exports = config;