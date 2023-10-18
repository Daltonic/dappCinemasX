import { globalActions } from '@/store/globalSlices'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'

const TimeslotList: React.FC<{ slots: any[]; movieId: number }> = ({
  slots,
  movieId,
}) => {
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

      <div className="flex justify-center space-x-2 mt-4">
        <button
          className="px-4 py-2 rounded-full
            hover:bg-red-500 transition duration-300
            bg-transparent font-bold border-2 border-red-600
            text-red-600 hover:border-white hover:text-white"
          onClick={() => dispatch(setBookModal('scale-100'))}
        >
          Book Ticket
        </button>
        <Link
          href={'/movie/edit/' + movieId}
          className="bg-red-600 font-bold text-white border-2 border-red-600
          py-2 px-4 rounded-full transition duration-300 ease-in-out
          hover:bg-transparent hover:text-red-600"
        >
          Edit
        </Link>
      </div>
    </div>
  )
}

export default TimeslotList
