export interface MovieStruct {
  id: number
  name: string
  banner?: string
  imageUrl: string
  videoUrl: string
  genre: string
  caption?: string
  casts?: string
  released?: string
  running?: string
  description: string
  timestamp: number
  deleted: boolean
}

export interface MovieParams {
  id?: number
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
  banner: string
  caption: string
  description?: string
}

export interface TimeSlotParams {
  movieId: number
  ticketCosts: string[]
  startTimes: number[]
  endTimes: number[]
  capacities: number[]
  days: number[]
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
  movies: MovieStruct[]
  movie: MovieStruct | null
  timeslots: TimeSlotStruct[]
  timeslot: TimeSlotStruct | null
  tickets: TicketStruct[]
  holders: string[]
  bookModal: string
  deleteModal: string
  deleteSlotModal: string
  findHoldersModal: string
  withdrawalModal: string
  balance: number
}

export interface RootState {
  globalStates: GlobalState
}
