import express from "express"
import feedsSchema from "../validators/feeds"

function validate(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const feed = request.body
  const { error, value } = feedsSchema.validate(feed)
  if (error) response.status(400).send(error.message)
  next()
}
export default validate
