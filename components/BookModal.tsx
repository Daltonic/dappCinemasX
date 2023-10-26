import { RootState, TimeSlotStruct } from '@/utils/type.dt'
import React, { useState, Fragment, useEffect, FormEvent } from 'react'
import { FaEthereum, FaTimes } from 'react-icons/fa'
import { Listbox, Transition } from '@headlessui/react'
import { BsChevronExpand, BsCheck2 } from 'react-icons/bs'
import { formatDate, formatTime } from '@/utils/helper'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'

const BookModal: React.FC<{ timeSlots: TimeSlotStruct[] }> = ({
  timeSlots,
}) => {
  const [tickets, setTickets] = useState('')
  const [selected, setSelected] = useState<TimeSlotStruct>(timeSlots[0])
  const { bookModal } = useSelector((states: RootState) => states.globalStates)

  const { setBookModal } = globalActions
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setBookModal('scale-0'))
  }

  useEffect(() => {
    setSelected(timeSlots[0])
  }, [timeSlots])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Number(tickets) < 1)
      return toast.warn('Ticket must be greater than zero')

    console.log(tickets)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${bookModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
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

          <div className="flex justify-between items-center p-2 w-full">
            <div className="w-full z-50">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button
                    className="relative w-full cursor-default rounded-lg bg-white
                  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500
                  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                  focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span className="block truncate">
                      {formatDate(selected.day)} @
                      {formatTime(selected.startTime)} -{' '}
                      {formatTime(selected.endTime)}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <BsChevronExpand
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {timeSlots.map((slot: TimeSlotStruct, i: number) => (
                        <Listbox.Option
                          key={i}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-red-100 text-red-900'
                                : 'text-gray-900'
                            }`
                          }
                          value={slot}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {formatDate(slot.day)} @
                                {formatTime(slot.startTime)} -{' '}
                                {formatTime(slot.endTime)}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <BsCheck2
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full">
            <div
              className="flex justify-start items-center space-x-2 relative w-full cursor-default rounded-lg bg-white
              py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500
              focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
              focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <FaEthereum /> {selected.ticketCost.toFixed(2)}
            </div>
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full">
            <div
              className="relative w-full cursor-default rounded-lg bg-white
              py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500
              focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
              focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <input
                className="block w-full text-sm text-slate-500 bg-transparent
                border-0 focus:outline-none focus:ring-0"
                type="number"
                name="tickets"
                placeholder="Tickets e.g. 3"
                value={tickets}
                min={1}
                max={5}
                onChange={(e) => setTickets(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            className="flex flex-row justify-center items-center w-full text-white text-md
          bg-red-600 py-2 px-5 rounded-full drop-shadow-xl border border-transparent
          hover:bg-transparent hover:border-red-500 hover:text-red-500 focus:outline-none mt-5"
          >
            Book Slot
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookModal
