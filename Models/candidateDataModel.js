const db = require("../db/connection");

exports.fetchCandidateData = (sort_by = "date", order = "ASC", locationname, candidatename, date) => {
    if(!["date"].includes(sort_by)){
        return Promise.reject({
            status: 400,
            msg:  "Invalid sort query, try again."
          })
    }
    if(!["DESC", "ASC"].includes(order)){
        return Promise.reject({
            status: 400,
            msg: "Invalid order query, try again"
        })
    }
    
    const paramQuery = [];
    let initialQuery = `SELECT * FROM candidates`;
    
    if (locationname) {
        paramQuery.push(locationname);
        initialQuery += ` WHERE locationname = $${paramQuery.length} `;
    }
    if (candidatename) {
        paramQuery.push(candidatename);
        initialQuery += `${paramQuery.length === 1 ? ' WHERE' : ' AND'} candidatename = $${paramQuery.length} `;
    }
    if (date) {
        paramQuery.push(date);
        initialQuery += `${paramQuery.length === 1 ? ' WHERE' : ' AND'} date = $${paramQuery.length} `;
    }
    
    initialQuery += ` ORDER BY ${sort_by} ${order};`;
    
    return db.query(initialQuery, paramQuery)
        .then(({ rows: candidates }) => {
            if(candidates.length === 0){
                return Promise.reject({
                    status: 404,
                    msg: "No information with these filters",
                  });
            }
            return candidates
        });
}

exports.fetchCandidateDataById = (id) => {
    if (isNaN(id)) {
        return Promise.reject({
          status: 400,
          msg: "Invalid id, please try with a number",
        });
      }
    
return db.query(`
SELECT * FROM candidates WHERE candidates.id = $1`, [id])
.then(({ rows: candidates }) => { 
        if(candidates.length === 0){
        return Promise.reject({
            status: 404,
            msg: "ID not found, try another number.",
          });
    }
    return candidates[0] })
}







