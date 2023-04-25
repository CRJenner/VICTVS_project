const {fetchCandidateData} = require("../Models/candidateDataModel")


exports.getCandidateData = (request, response, next) => {
    const {sort_by, order} = request.query;
    fetchCandidateData(sort_by, order)
    .then((candidateData) => {
        response.status(200).send({candidateData})
    })
    .catch((err) => {
        next(err)
    })
}