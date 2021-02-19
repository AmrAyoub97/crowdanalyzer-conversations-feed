import mongoose from "mongoose"
const MongoSchema = mongoose.Schema

const followersCountRangeSchema = new MongoSchema({
  gte: { type: Number, min: 0 },
  lte: { type: Number, min: 0 },
})

const filtersSchema = new MongoSchema({
  gender: {
    type: [String],
    enum: ["male", "female", "virtual"],
    lowercase: true,
  },
  dialect: {
    type: [String],
    enum: ["gf", "std", "egy"],
    lowercase: true,
  },
  language: {
    type: [String],
    enum: ["ar", "en"],
    lowercase: true,
  },
  followers_count_range: followersCountRangeSchema,
})

// Create Feeds Mongo Schema
const FeedsSchema = new MongoSchema({
  name: {
    index: true,
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  filters: filtersSchema,
})

export default mongoose.model("Feeds", FeedsSchema)
