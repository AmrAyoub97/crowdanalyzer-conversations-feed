import express from "express"
import validate from "../middlewares/feeds"
import Feeds from "../models/Feeds"
const router = express.Router()

router.post(
  "/",
  validate,
  async (request: express.Request, response: express.Response) => {
    try {
      const feed = request.body
      console.log("route path")
      await Feeds.create(feed, (err: any) => {
        if (err) throw new Error(err)
      })
      return response.status(200).send("Valid")
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
      console.log("error", error)
      return response.sendStatus(500)
    }
  }
)

router.get(
  "/:feedName",
  async (request: express.Request, response: express.Response) => {}
)

module.exports = router
