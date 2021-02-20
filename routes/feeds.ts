import express from "express"
import validate from "../middlewares/feeds"
import Feeds from "../models/Feeds"
import { search } from "../es-client"
const router = express.Router()

router.post(
  "/",
  validate,
  async (request: express.Request, response: express.Response) => {
    try {
      const feed = request.body
      Feeds.create(feed)
        .then(() => response.status(200).send("Inserted"))
        .catch(() => response.status(400).send("duplicate key error"))
    } catch (error) {
      return response.sendStatus(500)
    }
  }
)

router.get(
  "/",
  async (request: express.Request, response: express.Response) => {
    try {
      const feeds = await Feeds.find({})
      return response.status(200).send(feeds)
    } catch (error) {
      return response.sendStatus(500)
    }
  }
)

router.get(
  "/:feed_name",
  async (request: express.Request, response: express.Response) => {
    try {
      const feedName = request.params.feed_name
      const feed = await Feeds.findOne({ name: feedName })
      if (!feed) return response.status(400).send("Filter Feed Doesn't Exist")
      //search(feed)
      return response.status(200).send(feed)
    } catch (error) {
      return response.sendStatus(500)
    }
  }
)

module.exports = router
