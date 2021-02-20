import Joi from "joi"

const followersCountRangeSchema = Joi.object({
  gte: Joi.number().min(0),
  lte: Joi.number().min(0),
}).or("gte", "lte")

const filtersSchema = Joi.object({
  gender: Joi.array()
    .items(Joi.string().valid("male", "female", "virtual"))
    .unique(function comparator(a, b) {
      return a === b
    })
    .max(3),
  dialect: Joi.array()
    .items(Joi.string().valid("gf", "std", "eg"))
    .unique(function comparator(a, b) {
      return a === b
    })
    .max(3),
  language: Joi.array()
    .items(Joi.string().valid("ar", "en"))
    .unique(function comparator(a, b) {
      return a === b
    })
    .max(2),
  followers_count_range: followersCountRangeSchema,
}).or("gender", "dialect", "language", "followers_count_range")

const feedsSchema = Joi.object({
  name: Joi.string().token().min(3).max(30).required(),
  filters: filtersSchema.required(),
})

export default feedsSchema
