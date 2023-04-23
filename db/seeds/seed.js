const db = require("../connection");
const {candidates} = require('../data')

function seed(){
	return db
    .query(`DROP TABLE IF EXISTS candidates;`)
    .then(()=>{
        return createCandidates()
    })
}
function createCandidates(){
    return db
    .query(`
  CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    Title VARCHAR NOT NULL,
    Description VARCHAR NOT NULL,
    Candidateid INT NOT NULL,
    CandidateName VARCHAR NOT NULL,
    Date TIMESTAMP NOT NULL,
    LocationName VARCHAR,
    Latitude INT NOT NULL,
    Longitude INT NOT NULL
  );`);
}
module.exports = {seed};




