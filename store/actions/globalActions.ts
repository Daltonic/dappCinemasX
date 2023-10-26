import {
  GlobalState,
  MovieStruct,
  TicketStruct,
  TimeSlotStruct,
} from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const globalActions = {
  setMovies: (state: GlobalState, action: PayloadAction<MovieStruct[]>) => {
    state.movies = action.payload
  },
  setMovie: (state: GlobalState, action: PayloadAction<MovieStruct | null>) => {
    state.movie = action.payload
  },
  setTimeSlots: (
    state: GlobalState,
    action: PayloadAction<TimeSlotStruct[]>
  ) => {
    state.timeslots = action.payload
  },
  setTimeSlot: (state: GlobalState, action: PayloadAction<TimeSlotStruct | null>) => {
    state.timeslot = action.payload
  },
  setTickets: (state: GlobalState, action: PayloadAction<TicketStruct[]>) => {
    state.tickets = action.payload
  },
  setHolders: (state: GlobalState, action: PayloadAction<string[]>) => {
    state.holders = action.payload
  },
  setBookModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.bookModal = action.payload
  },
  setDeleteModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.deleteModal = action.payload
  },
  setDeleteSlotModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.deleteSlotModal = action.payload
  },
  setFindHoldersModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.findHoldersModal = action.payload
  },
  setWithdrawalModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.withdrawalModal = action.payload
  },
  setBalance: (state: GlobalState, action: PayloadAction<number>) => {
    state.balance = action.payload
  },
}
