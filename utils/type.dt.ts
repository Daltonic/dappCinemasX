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

export interface TimeSlotStruct {
  id: number
  movieId: number
  ticketCost: number
  startTime: number
  endTime: number
  capacity: number
  seats: number
  deleted: boolean
  completed: boolean
  day: number
  balance: number
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
  deleteModal: string
  withdrawalModal: string
  movies: MovieStruct[]
  movie: MovieStruct | null
}

export interface RootState {
  globalStates: GlobalState
}
