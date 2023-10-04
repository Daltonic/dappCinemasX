import { globalActions } from '@/store/globalSlices'
import React from 'react'
import { useDispatch } from 'react-redux'

const TimeslotList = ({ slots }) => {
  const dispatch = useDispatch()
  const { setBookModal } = globalActions

  return (
    <div className="flex flex-col items-center mb-10 w-full sm:w-3/6 mx-auto">
      <h2 className="text-xl font-bold mb-2">Available Time Slots</h2>
      <ul className="text-gray-700 text-sm space-y-1 mt-2 max-h-44">
        {slots.map((slot: any, i: number) => (
          <li key={i} className="mb-2">
            <div className="flex items-center">
              {slot.startTime} - {slot.endTime}
            </div>
          </li>
        ))}
      </ul>

      <div>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-full
            hover:bg-red-500 transition duration-300 mt-4"
          onClick={() => dispatch(setBookModal('scale-100'))}
        >
          Book Ticket
        </button>
      </div>
    </div>
  )
}

export default TimeslotList
