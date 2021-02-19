import express from "express"
import validate from "../middlewares/feeds"
const router = express.Router()

router.post(
  "/",
  validate,
  async (request: express.Request, response: express.Response) => {
    response.status(200).send("Valid")
  }
)
router.get(
  "/:feedName",
  async (request: express.Request, response: express.Request) => {}
)

module.exports = router
