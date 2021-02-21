export interface conversation {
  id: number
  text: string
  user_gender: "male" | "female" | "virtual"
  lang: "ar" | "en"
  dialect: "eg" | "gf" | "std"
  user: {
    id: number
    followers_count: number
  }
}
export interface filters {
  gender?: ["male" | "female" | "virtual"]
  language?: ["ar" | "en"]
  dialect?: ["eg" | "gf" | "std"]
  followers_count_range?: {
    gte?: number | null
    lte?: number | null
  }
}
export interface feed {
  name: string
  filters: filters
}
