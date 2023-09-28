export interface MovieStruct {
  id: number
  name: string
  imageUrl: string
  genre: string
  caption?: string
  description: string
  timestamp: number
  deleted: boolean
}

export interface FeaturedStruct {
  id: number
  name: string
  imageUrl: string
  caption: string
  description?: string
}

export interface TruncateParams {
  text: string
  startChars: number
  endChars: number
  maxLength: number
}
