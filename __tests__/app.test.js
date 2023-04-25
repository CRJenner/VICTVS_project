const {seed} = require("../db/seeds/seed")
const data = require("../db/data")
const request = require("supertest");
const app = require("../app")
const db = require("../db/connection")

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
        test("200: collect a 200 status which accepts order query for date ?order=asc", () => {
            return request(app)
              .get("/api")
              .query({sort_by: "date", order: "DESC"})
              .expect(200)
              .then(({ body }) => {
                const { candidateData } = body;
                expect(candidateData).toBeSorted( {key: "date", descending: true });
              });
          });
    
    })
})




