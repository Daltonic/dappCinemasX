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

export interface MovieParams {
  poster: string
  banner: string
  name: string
  genre: string
  casts: string
  description: string
  released: string
  duration: string
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

export interface GlobalState {
  wallet: string
  bookModal: string
  withdrawalModal: string
}

export interface RootState {
  globalStates: GlobalState
}
