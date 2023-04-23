const {fetchCandidateData} = require("../Models/candidateDataModel")


exports.getCandidateData = (request, response, next) => {
    fetchCandidateData()
    .then((candidateData) => {
        response.status(200).send({candidateData})
    })
    .catch((err) => {
        next(err)
    })
}