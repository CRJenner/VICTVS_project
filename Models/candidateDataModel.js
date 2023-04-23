const db = require("../db/connection");

exports.fetchCandidateData = () => {
    return db.query(`SELECT * FROM candidates;`)
    .then(({rows: candidates}) => {
        return candidates
    })
}