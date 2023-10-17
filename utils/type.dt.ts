export interface MovieStruct {
  id: number
  name: string
  imageUrl: string
  genre: string
  banner?: string
  caption?: string
  casts?: string
  released?: string
  running?: string
  description: string
  timestamp: number
  deleted: boolean
}

export interface MovieParams {
  name: string
  banner: string
  imageUrl: string
  videoUrl: string
  genre: string
  description: string
  caption: string
  casts: string
  running: string
  released: string
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

export interface TicketStruct {
  id: number
  movieId: number
  slotId: number
  owner: string
  cost: number
  timestamp: number
  day: number
  refunded: boolean
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
  deleteSlotModal: string
  withdrawalModal: string
  findHolderModal: string
  holders: string[]
  movies: MovieStruct[]
  movie: MovieStruct | null
  timeslots: TimeSlotStruct[]
  timeslot: TimeSlotStruct | null
}

export interface RootState {
  globalStates: GlobalState
}
