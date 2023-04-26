const {fetchCandidateData, fetchCandidateDataById} = require("../Models/candidateDataModel")


exports.getCandidateData = (request, response, next) => {
    const {sort_by, order, locationname, candidatename, date} = request.query;
    fetchCandidateData(sort_by, order, locationname, candidatename, date)
    .then((candidateData) => {
        response.status(200).send({candidateData})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getCandidateDataById = (request, response, next) => {
    const {id} = request.params;
    fetchCandidateDataById(id).then((id_info) => {
        console.log(id_info)
        response.status(200).send({id_info})
    })
    .catch((err) => {
        next(err)
    })
}