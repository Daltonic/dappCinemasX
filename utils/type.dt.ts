export interface MovieStruct {
  id: number
  name: string
  imageUrl: string
  genre: string
  description: string
  timestamp: number
  deleted: boolean
}

export interface TruncateParams {
  text: string
  startChars: number
  endChars: number
  maxLength: number
}
