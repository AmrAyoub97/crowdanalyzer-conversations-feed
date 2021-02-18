import express from "express"
import validate from "../validators/feeds"
const router = express.Router()

// define a route handler for the default home page
router.post(
  "/",
  validate,
  async (request: express.Request, response: express.Request) => {
    console.log("route")
  }
)
router.get(
  "/:feedName",
  async (request: express.Request, response: express.Request) => {}
)

module.exports = router
