import { GlobalState, MovieStruct, TimeSlotStruct } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const globalActions = {
  setOwner: (state: GlobalState, action: PayloadAction<string>) => {
    state.owner = action.payload
  },
  setWallet: (state: GlobalState, action: PayloadAction<string>) => {
    state.wallet = action.payload
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
  setFinishSlotModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.finishSlotModal = action.payload
  },
  setFindHolderModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.findHolderModal = action.payload
  },
  setWithdrawalModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.withdrawalModal = action.payload
  },
  setHolders: (state: GlobalState, action: PayloadAction<string[]>) => {
    state.holders = action.payload
  },
  setMovies: (state: GlobalState, action: PayloadAction<MovieStruct[]>) => {
    state.movies = action.payload
  },
  setMovie: (state: GlobalState, action: PayloadAction<MovieStruct | null>) => {
    state.movie = action.payload
  },
  setTimeslots: (
    state: GlobalState,
    action: PayloadAction<TimeSlotStruct[]>
  ) => {
    state.timeslots = action.payload
  },
  setTimeslot: (
    state: GlobalState,
    action: PayloadAction<TimeSlotStruct | null>
  ) => {
    state.timeslot = action.payload
  },
}
