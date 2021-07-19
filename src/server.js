const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./middleware/auth');
const UrlController = require('./controller/url.controller');

mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})

const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/users.route');
const urlRouter = require('./routes/url.router');

app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/url', authenticateToken, urlRouter);

const urlController = new UrlController();
app.get('/:shortenedUrl', async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    const id = mongoose.Types.ObjectId();
    token = jwt.sign({ _id: id, isAuthenticated: false }, process.env.ACCESS_SECRET_TOKEN);
    res.header("x-auth-token", token);
  }

  try {
    var user = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
  } catch (err) {
    next(err);
  }

  const urlMap = await urlController.getFullUrl(req.params.shortenedUrl);
  if (!urlMap) return res.status(404).send();

  urlController.createUrlVisit(urlMap.id, user._id);

  res.send({ redirectUrl: urlMap.url });
})

app.use(function errorHandler(err, req, res, _next) {
  const code = err.statusCode || 500;

  if (code === 500) {
    console.error(err.stack);
  }

  res.status(code).send({ message: err.message });
});

app.listen(process.env.PORT, () => { console.log('App running on port:', process.env.PORT) });