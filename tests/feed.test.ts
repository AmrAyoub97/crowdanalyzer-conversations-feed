import request from "supertest"

let server: any
describe("Feeds API", () => {
  before(() => {
    server = require("../index")
  })
  after(async () => {
    server.close()
  })

  describe("Insert Valid Feeds", () => {
    it("should return status code 200, and should be valid", async () => {
      const feed = {
        name: "Marketing_Feed",
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
    it("should return status code 200, and should be valid", async () => {
      const feed = {
        name: "Marketing_Feed_1",
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
        name: "Marketing_Feed_2",
        filters: {
          gender: ["male", "female"],
          dialect: ["gf", "egy"],
        },
      }
      await request(server).post("/feeds").send(feed).expect(200)
    })
    it("should return status code 200, and should be valid", async () => {
      const feed = {
        name: "Marketing_Feed_3",
        filters: {
          gender: ["male", "virtual"],
        },
      }
      await request(server).post("/feeds").send(feed).expect(200)
    })
  })

  describe("Insert Non-Valid Feeds", () => {
    //Invalid feed name
    it("should return status code 400, and shouldn't be valid", async () => {
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
      await request(server).post("/feeds").send(feed).expect(400)
    })

    //Invalid filters object is undefined
    it("should return status code 400, and shouldn't be valid", async () => {
      const feed = {
        name: "Marketing_Feed_3",
      }
      await request(server).post("/feeds").send(feed).expect(400)
    })

    //Invalid filters object is empty
    it("should return status code 400, and shouldn't be valid", async () => {
      const feed = {
        name: "Marketing_Feed",
        filters: {},
      }
      await request(server).post("/feeds").send(feed).expect(400)
    })

    //Invalid filters gender values not unique
    it("should return status code 400, and shouldn't be valid", async () => {
      const feed = {
        name: "Marketing_Feed",
        filters: {
          gender: ["virtual", "virtual"],
          dialect: ["gf", "std"],
          language: ["en", "ar"],
        },
      }
      await request(server).post("/feeds").send(feed).expect(400)
    })

    //Invalid filters gender type
    it("should return status code 400, and shouldn't be valid", async () => {
      const feed = {
        name: "Marketing_Feed",
        filters: {
          gender: ["aa"],
        },
      }
      await request(server).post("/feeds").send(feed).expect(400)
    })

    //Invalid filters gender array size more than max
    it("should return status code 400, and shouldn't be valid", async () => {
      const feed = {
        name: "Marketing_Feed",
        filters: {
          gender: ["male", "female", "virtual", "virtual"],
        },
      }
      await request(server).post("/feeds").send(feed).expect(400)
    })

    //Invalid filters followers_count_range empty object
    it("should return status code 400, and shouldn't be valid", async () => {
      const feed = {
        name: "Marketing_Feed",
        filters: {
          gender: ["male", "virtual"],
          dialect: ["gf"],
          language: ["en"],
          followers_count_range: {},
        },
      }
      await request(server).post("/feeds").send(feed).expect(400)
    })

    //Invalid filters followers_count_range gte
    it("should return status code 400, and shouldn't be valid", async () => {
      const feed = {
        name: "Marketing_Feed",
        filters: {
          gender: ["male", "virtual"],
          dialect: ["gf"],
          language: ["en"],
          followers_count_range: {
            gte: -1,
            lte: 100,
          },
        },
      }
      await request(server).post("/feeds").send(feed).expect(400)
    })
  })
})
