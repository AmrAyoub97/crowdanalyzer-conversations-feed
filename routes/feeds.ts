import express from "express"
import validate from "../middlewares/feeds"
import Feeds from "../models/Feeds"
import { search } from "../clients/es-client"
import { feed } from "../interfaces/feed"
const router = express.Router()

router.post(
  "/",
  validate,
  async (request: express.Request, response: express.Response) => {
    try {
      const feed: feed = request.body
      await Feeds.create(feed)
        .then(() => response.status(200).send({ feed_name: feed.name }))
        .catch(() => response.status(400).send("Feed Name Is ALready Exists"))
    } catch (error) {
      return response.sendStatus(500)
    }
  }
)

router.get(
  "/",
  async (request: express.Request, response: express.Response) => {
    try {
      const feeds = await Feeds.find({}).select("- _id")
      return response.status(200).send(feeds)
    } catch (error) {
      return response.sendStatus(500)
    }
  }
)

router.get(
  "/:feedName",
  async (request: express.Request, response: express.Response) => {
    try {
      const feedName = request.params.feedName
      const doc = await Feeds.findOne({ name: feedName })
      if (!doc) return response.status(400).send("Filter Feed Doesn't Exist")
      const feed: feed = JSON.parse(JSON.stringify(doc))
      const result = await search(feed.filters)
      return response.status(200).send(result)
    } catch (error) {
      return response.sendStatus(500)
    }
  }
)

module.exports = router
