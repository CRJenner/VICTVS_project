const express = require('express')
const app = express()
const {getCandidateData, getCandidateDataById} = require("./Controllers/candidateDataController")
const cors = require('cors');

app.use(cors());

app.get("/api", getCandidateData)
app.get("/api/:id", getCandidateDataById)

app.all("/*", (request, response, next) => {
    response.status(404).send({ msg: "Invalid pathway"})
  })

  app.use((err, request, response, next) => {
    if (err.status && err.msg) {
      response.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
  });
  

  app.use((err, request, response, next) => {
    response.status(500).send("Server Error!");
  });



module.exports = app