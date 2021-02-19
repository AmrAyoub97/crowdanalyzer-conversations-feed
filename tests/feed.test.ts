import request from "supertest"

let server: any
describe("Feeds API", () => {
  beforeEach(() => {
    server = require("../index")
  })
  afterEach(async () => {
    server.close()
  })

  describe("Insert valid Feeds", () => {
    it("should return status code 200, and should be valid", async () => {
      const feed = {
        name: "Marketing Feed",
        filters: {
          gender: ["male", "virtual"],
          dialect: ["gf"],
          language: ["en"],
          followers_count_range: {
            gte: 100,
            lte: 30000,
          },
        },
      }
      await request(server).post("/feeds").send(feed).expect(200)
    })
  })
  it("should return status code 200, and should be valid", async () => {
    const feed = {
      name: "Marketing Feed",
      filters: {
        gender: ["virtual", "female"],
        dialect: ["gf", "std"],
        language: ["en", "ar"],
      },
    }
    await request(server).post("/feeds").send(feed).expect(200)
  })
  it("should return status code 200, and should be valid", async () => {
    const feed = {
      name: "Marketing Feed",
      filters: {
        gender: ["male", "female"],
        dialect: ["gf", "egy"],
      },
    }
    await request(server).post("/feeds").send(feed).expect(200)
  })
  it("should return status code 200, and should be valid", async () => {
    const feed = {
      name: "Marketing Feed",
      filters: {
        gender: ["male", "virtual"],
      },
    }
    await request(server).post("/feeds").send(feed).expect(200)
  })
})
