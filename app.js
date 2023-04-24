const express = require('express')
const app = express()
const {getCandidateData} = require("./Controllers/candidateDataController")

app.get("/api", getCandidateData)

app.all("/*", (request, response, next) => {
    response.status(404).send({ msg: "Invalid pathway"})
  })

  app.use((err, request, response, next) => {
    response.status(500).send("Server Error!");
  });



module.exports = app