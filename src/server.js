const express = require('express')
const mongoose = require("mongoose")
require('dotenv').config();
const app = express()
const jwt = require('jsonwebtoken');
const port = 3000

mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = {name: username}

  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN)

  res.json({accessToken})
})

app.get('*', authenticateToken, (req, res, next) => {
  res.send('REDIRECTING BITCHCC')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function authenticateToken(req, res, next) {
  
}