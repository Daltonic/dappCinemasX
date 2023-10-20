import { globalActions } from '@/store/globalSlices'
import { formatDate, formatTime } from '@/utils/helper'
import { TimeSlotStruct } from '@/utils/type.dt'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

const TimeslotList: React.FC<{ slots: TimeSlotStruct[] }> = ({ slots }) => {
  const dispatch = useDispatch()
  const { setBookModal } = globalActions

  return (
    <div className="flex flex-col items-center mb-10 w-full sm:w-3/6 mx-auto">
      <h2 className="text-xl font-bold mb-2">Available Time Slots</h2>
      <ul className="text-gray-700 text-sm space-y-1 mt-2 max-h-44">
        {slots.map((slot: TimeSlotStruct, i: number) => (
          <li key={i} className="mb-2">
            <div className="flex items-center">
              {formatDate(slot.day)} @{formatTime(slot.startTime)} -{' '}
              {formatTime(slot.endTime)} <FaEthereum /> {slot.ticketCost.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center space-x-2 mt-4">
        <button
          className="bg-red-600 font-bold text-white border-2 border-red-600
          py-2 px-4 rounded-full transition duration-300 ease-in-out
          hover:bg-transparent hover:text-red-600"
          onClick={() => dispatch(setBookModal('scale-100'))}
        >
          Book Ticket
        </button>
      </div>
    </div>
  )
}

export default TimeslotList
