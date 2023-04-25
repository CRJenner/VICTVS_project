const db = require("../db/connection");

exports.fetchCandidateData = () => {
    
    return db.query(`SELECT * FROM candidates ORDER BY date DESC;`)
    .then(({rows: candidates}) => {
        return candidates
    })
}