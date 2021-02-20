import express from "express"
import { feed } from "../interfaces/feed"
import feedsSchema from "../validators/feeds"

function validate(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { error, value } = feedsSchema.validate(request.body)
  if (error) return response.status(400).send(error.message)
  next()
}
export default validate
