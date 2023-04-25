const db = require("../db/connection");

exports.fetchCandidateData = (sort_by = "date",
order = "DESC", locationname) => {
console.log(locationname)
    const paramQuery = [];
    let initialQuery = `SELECT * FROM candidates`;
    if(locationname){
        paramQuery.push(locationname)
        initialQuery+= ` WHERE locationname = $1 `
    } else {
        initialQuery+= ` ORDER BY ${sort_by} ${order};`    }
    
    return db.query(initialQuery,paramQuery)
    .then(({rows: candidates}) => {
        return candidates
    })
}