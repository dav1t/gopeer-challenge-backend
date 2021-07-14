const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3000

mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})