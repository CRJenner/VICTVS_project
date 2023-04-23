const db = require("../connection");
const {candidates} = require('../data')
const format = require("pg-format")
const moment = require('moment');

function seed(){
    console.log(candidates)
	return db
    .query(`DROP TABLE IF EXISTS candidates;`)
    .then(()=>{
        return createCandidates()
    })
    .then(()=>{
        return insertCandidates(candidates)
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
    Date TIMESTAMP WITH TIME ZONE NOT NULL,
    LocationName VARCHAR,
    Latitude NUMERIC NOT NULL,
    Longitude NUMERIC NOT NULL
  );`);
}

function insertCandidates(candidates){
    const arrangedData = arrangeCandidatesData(candidates)
    const queryString = format(`
    INSERT INTO candidates 
    (Title, Description, Candidateid, CandidateName, Date, LocationName, Latitude, Longitude) 
    VALUES 
    %L 
    RETURNING *;
    `, arrangedData

    )
    return db.query(queryString)
}

function arrangeCandidatesData(candidatesData){
    const result = [];
    if(!candidatesData) return result;
    candidatesData.forEach((candidate) => {
        const formattedDate = moment(candidate.Date, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        result.push([candidate.Title, candidate.Description, candidate.Candidateid, candidate.CandidateName, formattedDate, candidate.LocationName, candidate.Latitude, candidate.Longitude ])
    })
    return result
}
module.exports = {seed};




