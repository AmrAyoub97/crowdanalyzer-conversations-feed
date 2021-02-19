import Joi from "joi"
import express from "express"

const followersCountRangeSchema = Joi.object({
  gte: Joi.number().min(0),
  lte: Joi.number().min(0),
}).or("gte", "lte")

const filtersSchema = Joi.object({
  gender: Joi.array()
    .items(Joi.string().valid("male", "female", "virtual"))
    .max(3),
  dialect: Joi.array().items(Joi.string().valid("gf", "std", "egy")).max(3),
  language: Joi.array().items(Joi.string().valid("ar", "en")).max(2),
  followers_count_range: followersCountRangeSchema,
}).or("gender", "dialect", "language", "followers_count_range")

const feedsSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  filters: filtersSchema,
})

function validate(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  console.log("validate")
  const feed = request.body
  const { error, value } = feedsSchema.validate(feed)
  if (error) response.status(400).send(error.message)
  next()
}
export default validate
