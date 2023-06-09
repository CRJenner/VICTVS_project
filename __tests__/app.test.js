const {seed} = require("../db/seeds/seed")
const data = require("../db/data")
const request = require("supertest");
const app = require("../app")
const db = require("../db/connection")
const moment = require('moment')

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("app", () => {
    describe('GET /api', () => {
        test("200: responds with an array of candidates details", () => {
            return request(app)
            .get("/api")
            .expect(200)
            .then(({body}) => {
                const {candidateData} = body;
                candidateData.forEach((candidate) => {
                    expect(candidate).toMatchObject({
                        title: expect.any(String),
                        description: expect.any(String),
                        candidateid: expect.any(Number),
                        candidatename: expect.any(String),
                        date: expect.any(String),
                        locationname: expect.any(String),
                        latitude: expect.any(String),
                        longitude: expect.any(String),
                    })
                })
                expect(candidateData).toHaveLength(20)
            })
        })
        test('404: Error issued for invalid endpoint ', () => {
            return request(app)
            .get("/Wrong_Endpoint")
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid pathway")
            })
        });
       
    
    })
    describe("queries-> ordering and filtering", () => {
        test("200: collect a 200 status which accepts order query for date ?order=desc", () => {
            return request(app)
              .get("/api")
              .query({sort_by: "date", order: "DESC"})
              .expect(200)
              .then(({ body }) => {
                const { candidateData } = body;
                expect(candidateData).toBeSorted( {key: "date", descending: true });
              });
          });
          test("200: collect a 200 status which filters for location", () => {
            return request(app)
              .get("/api?locationname=London")
              .query({sort_by: "date", order: "DESC"})
              .expect(200)
              .then(({ body }) => {
                const { candidateData } = body;
                expect(candidateData.length).toBe(11)
                candidateData.forEach((candidate) => {
                    expect(candidate.locationname).toBe('London');
                  })
                });
          });
          test("200: collect a 200 status which filters for candidate", () => {
            return request(app)
              .get("/api?candidatename=Wilmers")
              .query({sort_by: "date", order: "DESC"})
              .expect(200)
              .then(({ body }) => {
                const { candidateData } = body;
                expect(candidateData.length).toBe(14)
                candidateData.forEach((candidate) => {
                    expect(candidate.candidatename).toBe('Wilmers');
                  })
                });
          });
          test("200: collect a 200 status which filters for date", () => {
            return request(app)
              .get("/api")
              .query({sort_by: "date", order: "DESC", date: "05/05/2023 14:30:00"})
              .expect(200)
              .then(({ body }) => {
                const { candidateData } = body;
                expect(candidateData.length).toBe(18);
                candidateData.forEach((candidate) => {
                  expect(candidate.date).toBe("2023-05-05T13:30:00.000Z");
                });
              });
          });
          test("400: Responds with a 400 for invalid sort_by query", () => {
            return request(app)
              .get("/api")
              .query({sort_by: "inValidSortBy", order: "ASC"})
              .expect(400)
              .then(({body}) => {
                expect(body.msg).toBe("Invalid sort query, try again.");
              });
          });
          test("400: should return status: 400 for invalid order query", () => {
            return request(app)
              .get("/api")
              .expect(400)
              .query({sort_by: "date", order: "invalidOrderQuery"})
              .then(({ body }) => {
                expect(body.msg).toBe("Invalid order query, try again");
              });
          });
          test("404: filtering has nothing in the db", () => {
            return request(app)
            .get("/api")
            .expect(404)
            .query({sort_by: "date", order: "ASC", location: "London", date: "05/05/2023 14:30:00", candidatename: "Bob"})
            .then(({ body }) => {
              expect(body.msg).toBe("No information with these filters");
            });
          })
        })
         
          
    })
    describe("GET /api/:id", () => {
      test('200: GET - an array of objects specific to the id', () => {
        return request(app)
        .get("/api/2")
        .expect(200)
        .then(({body}) => {
          expect(body.id_info).toMatchObject({
          id: 2,
          title: 'VICTVS2',
          description: 'VICTVS Exam 2',
          candidateid: 1,
          candidatename: 'Donnelly',
          date: '2023-05-05T13:30:00.000Z',
          locationname: 'Sydney',
          latitude: '-33.86882',
          longitude: '151.20929'
        })
        })
      })
      
      test("400: responds with a 400 for an invalid id", () => {
        return request(app)
        .get("/api/invalid_id")
        .expect(400)
        .then(({body}) => {
          const {msg} = body
          expect(msg).toBe("Invalid id, please try with a number")
        })
      })
      test("404: responds with a 404 if it is a valid id but is not in the db", () => {
        return request(app)
          .get("/api/99999")
          .expect(404)
          .then((res) => {
            const { msg } = res.body;
            expect(msg).toBe("ID not found, try another number.");
          });
      });
    });





