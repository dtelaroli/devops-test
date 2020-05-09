const filter = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Referer, User-Agent, Accept, x-api-key");
  next();
}

module.exports = filter;
