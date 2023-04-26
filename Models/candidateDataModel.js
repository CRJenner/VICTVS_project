const db = require("../db/connection");

exports.fetchCandidateData = (sort_by = "date", order = "ASC", locationname, candidatename, date) => {
    
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
        .then(({ rows: candidates }) => candidates);
}









