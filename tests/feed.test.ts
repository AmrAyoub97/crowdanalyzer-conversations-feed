import { assert } from "chai"
import request from "supertest"

let server: any
describe("Feeds API", () => {
  before(async () => {
    server = await require("../index")
  })
  after(async () => {
    server.close()
  })
  const feed = {
    name: "test_feed_1",
    filters: {
      gender: ["male", "virtual"],
      dialect: ["std"],
      language: ["ar"],
      followers_count_range: {
        lte: 30000,
      },
    },
  }
  const feed_2 = {
    name: "test_feed_2",
    filters: {
      gender: ["virtual"],
    },
  }
  const feed_3 = {
    name: "test_feed_3",
    filters: {
      followers_count_range: {
        lte: 200,
      },
    },
  }
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

  describe("Insert Valid Feeds", () => {
    it("should return status code 200, and should be valid", async () => {
      await request(server).post("/feeds").send(feed).expect(200)
    })
    it("should return status code 400, dublicate Key", async () => {
      const feed = {
        name: "test_feed_1",
        filters: {
          gender: ["virtual", "female"],
          dialect: ["gf", "std"],
          language: ["en", "ar"],
        },
      }
      await request(server).post("/feeds").send(feed).expect(400)
    })
    it("should return status code 200, and should be valid", async () => {
      await request(server).post("/feeds").send(feed_2).expect(200)
    })
    it("should return status code 200, and should be valid", async () => {
      await request(server).post("/feeds").send(feed_3).expect(200)
    })
  })

  describe("Get Conversations Per Feed Filter", () => {
    it("should return 10 conversations", async () => {
      const res = await request(server).get("/feeds/test_feed_1").expect(200)
      assert.equal(res.body.length, 10)
    })
    it("should return 3 conversations", async () => {
      const res = await request(server).get("/feeds/test_feed_2").expect(200)
      assert.equal(res.body.length, 3)
    })
    it("should return 10 conversations", async () => {
      const res = await request(server).get("/feeds/test_feed_3").expect(200)
      assert.equal(res.body.length, 10)
    })
  })
})
