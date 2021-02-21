import elasticsearch from "elasticsearch"
import fs from "fs"
import { conversation, filters } from "./interfaces/feed"
require("dotenv").config()

const esClient = new elasticsearch.Client({
  host: `http://${process.env.ES_HOSTNAME}:${process.env.ES_PORT}`,
})

export async function init_es_index() {
  console.log("init_es_index")
  let bulkBody: any[] = []

  const conversations: conversation[] = JSON.parse(
    fs.readFileSync("converstions.json", "utf8")
  )

  conversations.forEach((item: conversation) => {
    bulkBody.push({
      index: {
        _index: process.env.ES_INDEX_NAME,
        _type: process.env.ES_TYPE_NAME,
        _id: item.id,
      },
    })

    bulkBody.push(item)
  })

  esClient
    .bulk({ refresh: true, body: bulkBody })
    .then(response => {
      let errorCount = 0
      response.items.forEach((item: any) => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error)
        }
      })
      console.log(
        `Successfully indexed ${conversations.length - errorCount}
           out of ${conversations.length} items`
      )
    })
    .catch(err => console.log("error", err))
}

export async function search(feedFilters: filters) {
  let esFilters: any = []
  Object.keys(feedFilters).forEach(key => {
    switch (key) {
      case "language":
        feedFilters?.language &&
          esFilters.push({
            terms: {
              lang: feedFilters?.language,
            },
          })
        break
      case "dialect":
        feedFilters?.dialect &&
          esFilters.push({
            terms: {
              dialect: feedFilters?.dialect,
            },
          })
        break
      case "gender":
        feedFilters?.gender &&
          esFilters.push({
            terms: {
              user_gender: feedFilters?.gender,
            },
          })
        break
      default:
        break
    }
  })
  esFilters.push({
    range: {
      "user.followers_count": {
        gte: feedFilters?.followers_count_range?.gte,
        lte: feedFilters?.followers_count_range?.lte,
      },
    },
  })
  const results = await esClient.search({
    index: "conversations",
    body: {
      query: {
        bool: {
          must: esFilters,
        },
      },
    },
  })
  const res = results.hits.hits.map(item => {
    return item._source
  })
  return res
}
