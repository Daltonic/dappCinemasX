import { MovieStruct } from '@/utils/type.dt'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { FaTimes } from 'react-icons/fa'

const BookModal: React.FC<{ movie: MovieStruct }> = ({ movie }) => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [tickets, setTickets] = useState('')

  const closeModal = () => {
    // setGlobalState('deleteSlotModal', 'scale-0')
  }

  const handleSelectedDay = async (date: Date) => {
    const day = new Date(date)
    const formattedDate = `${day.getFullYear().toString().slice(-2)}-${(
      '0' +
      (day.getMonth() + 1)
    ).slice(-2)}-${('0' + day.getDate()).slice(-2)}`
    const newDate = new Date(formattedDate).getTime()

    console.log(newDate)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 scale-100`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Select Slot</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
              <DatePicker
                selected={selectedDay}
                onChange={(date: Date) => handleSelectedDay(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Time"
                minDate={Date.now()}
                className="block w-full text-sm text-slate-500 bg-transparent
                border-0 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="number"
              name="capacity"
              placeholder="Tickets e.g. 3"
              value={tickets}
              onChange={(e) => setTickets(e.target.value)}
            />
          </div>

          <button
            className="flex flex-row justify-center items-center w-full text-white text-md
          bg-red-500 py-2 px-5 rounded-full drop-shadow-xl border border-transparent
          hover:bg-transparent hover:border-red-500 hover:text-red-500 focus:outline-none mt-5"
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookModal
