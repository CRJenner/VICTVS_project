const express = require('express')
const app = express()
const {getCandidateData} = require("./Controllers/candidateDataController")

app.get("/api", getCandidateData)
app.all("/*", (request, response, next) => {
    response.status(404).send({ msg: "Invalid pathway"})
  })

app.listen(3001, () => {
    console.log("server started on port 3001")
})

module.exports = app