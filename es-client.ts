import elasticsearch from "elasticsearch"
import fs from "fs"
import { conversation } from "./interfaces/feed"
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

export async function search(query: any) {
  const results = await esClient.search({
    index: "conversations",
    body: {
      query: {
        bool: {
          filter: {
            terms: {
              gender: query.filters.gender,
              language: query.filters.language,
              dialect: query.filters.dialect,
            },
            range: {
              "user.followers_count": {
                gte: query.filters.followers_count_range.gte,
                lte: query.filters.followers_count_range.lte,
              },
            },
          },
        },
      },
    },
  })
  return results
}
