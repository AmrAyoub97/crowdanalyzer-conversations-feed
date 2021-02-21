import mongoose from "mongoose"
const MongoSchema = mongoose.Schema

const followersCountRangeSchema = new MongoSchema({
  gte: { type: Number, min: 0, default: null },
  lte: { type: Number, min: 0, default: null },
})

const filtersSchema = new MongoSchema({
  gender: {
    type: [String],
    enum: ["male", "female", "virtual"],
    lowercase: true,
    default: undefined,
  },
  dialect: {
    type: [String],
    enum: ["gf", "std", "eg"],
    lowercase: true,
    default: undefined,
  },
  language: {
    type: [String],
    enum: ["ar", "en"],
    lowercase: true,
    default: undefined,
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
