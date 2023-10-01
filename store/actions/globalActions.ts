import { GlobalState } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const globalActions = {
  setWallet: (state: GlobalState, action: PayloadAction<string>) => {
    state.wallet = action.payload
  },
  setBookModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.bookModal = action.payload
  },
  setWithdrawalModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.withdrawalModal = action.payload
  },
}
