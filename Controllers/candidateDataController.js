const {fetchCandidateData} = require("../Models/candidateDataModel")


exports.getCandidateData = (request, response, next) => {
    const {sort_by, order, locationname} = request.query;
    console.log(request.query)
    fetchCandidateData(sort_by, order, locationname)
    .then((candidateData) => {
        response.status(200).send({candidateData})
    })
    .catch((err) => {
        next(err)
    })
}