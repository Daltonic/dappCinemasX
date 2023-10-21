import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import { formatTime } from '@/utils/helper'
import { NextPage } from 'next'
import { AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { TimeSlotParams } from '@/utils/type.dt'

type Slot = {
  startTime: number
  endTime: number
}

const Page: NextPage = () => {
  const [ticketCost, setTicketCost] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [capacity, setCapacity] = useState('')
  const [selectedDay, setSelectedDay] = useState(null)

  const [blockedStamps, setBlockedStamps] = useState<number[]>([])
  const currentSlots: Slot[] = useMemo(() => [], [])
  const timeInterval = 30

  const [ticketCosts, setTicketCosts] = useState<string[]>([])
  const [startTimes, setStartTimes] = useState<number[]>([])
  const [endTimes, setEndTimes] = useState<number[]>([])
  const [capacities, setCapacities] = useState<number[]>([])
  const [viewingDays, setViewingDays] = useState<number[]>([])

  const router = useRouter()
  const { movieId } = router.query

  const initAvailableSlot = useCallback(() => {
    const timestamps: number[] = []

    currentSlots.forEach((slot) => {
      const { startTime, endTime } = slot
      let currTime = new Date(startTime)

      while (currTime < new Date(endTime)) {
        timestamps.push(currTime.getTime())
        currTime.setMinutes(currTime.getMinutes() + 10)
      }
    })

    setBlockedStamps(timestamps)
  }, [currentSlots]) // add any dependencies here

  useEffect(() => {
    const fetchData = async () => {
      //   await getSlotsByDay(selectedDay)
      initAvailableSlot()
    }

    if (selectedDay) fetchData()
  }, [initAvailableSlot, selectedDay])

  useEffect(() => {
    if (currentSlots.length > 0) {
      initAvailableSlot()
    }
  }, [currentSlots, initAvailableSlot])

  const dateMax = () => {
    if (selectedDay && startTime) {
      const startOfDay = new Date(selectedDay)
      startOfDay.setHours(0, 0, 0, 0)
      const minStartTime =
        startOfDay.toLocaleDateString() === new Date().toLocaleDateString()
          ? new Date()
          : startOfDay

      const maxStartTime = new Date(selectedDay).setHours(23, 59, 59, 999)
      const minEndTime = new Date(startTime)
      const maxEndTime = new Date(selectedDay).setHours(23, 59, 59, 999)

      return { startOfDay, minStartTime, maxStartTime, maxEndTime, minEndTime }
    }
  }

  const dateMaxValue = dateMax()

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedDay || !startTime || !endTime || !capacity || !ticketCost)
      return

    setTicketCosts((prev) => [ticketCost, ...prev]) // convert to ethers first
    setStartTimes((prev) => [new Date(startTime).getTime(), ...prev])
    setEndTimes((prev) => [new Date(endTime).getTime(), ...prev])
    setCapacities((prev) => [Number(capacity), ...prev])
    setViewingDays((prev) => [selectedDay, ...prev])
    resetForm()
  }

  const handleSelectedDay = async (date: Date) => {
    const day = new Date(date)
    const options = {
      year: 'numeric' as const,
      month: '2-digit' as const,
      day: '2-digit' as const,
    }
    const newDate = new Date(
      `${day.toLocaleDateString('en-US', options).replace(/\//g, '-')}`
    ).getTime()

    setSelectedDay(newDate as any)
  }

  const resetForm = () => {
    setSelectedDay(null)
    setStartTime(null)
    setEndTime(null)
    setTicketCost('')
    setCapacity('')
  }

  const removeSlot = (index: number) => {
    ticketCosts.splice(index, 1)
    startTimes.splice(index, 1)
    endTimes.splice(index, 1)
    capacities.splice(index, 1)
    viewingDays.splice(index, 1)

    setTicketCosts((prevState) => [...prevState])
    setStartTimes((prevState) => [...prevState])
    setEndTimes((prevState) => [...prevState])
    setCapacities((prevState) => [...prevState])
    setViewingDays((prevState) => [...prevState])
  }

  const saveMovieSlot = async () => {
    if (
      viewingDays.length < 1 ||
      startTimes.length < 1 ||
      endTimes.length < 1 ||
      capacities.length < 1 ||
      ticketCosts.length < 1
    )
      return

    const timeSlotParams: TimeSlotParams = {
      movieId: Number(movieId),
      ticketCosts,
      startTimes,
      endTimes,
      capacities,
      days: viewingDays,
    }

    console.log(timeSlotParams)
  }

  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <div className="block justify-center items-center m-auto w-full sm:w-3/5">
        <h3 className="my-3 text-3xl font-bold">Add Timeslots</h3>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <DatePicker
              selected={startTime}
              onChange={setStartTime}
              showTimeSelect
              showTimeSelectOnly
              minDate={selectedDay ? new Date(selectedDay) : undefined}
              maxDate={selectedDay ? new Date(selectedDay) : undefined}
              minTime={dateMaxValue ? dateMaxValue.minStartTime : undefined}
              maxTime={dateMaxValue ? dateMaxValue.maxStartTime : undefined}
              timeCaption="Start Time"
              excludeTimes={blockedStamps}
              timeIntervals={timeInterval}
              dateFormat="h:mm aa"
              placeholderText="Select start time..."
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <DatePicker
              selected={endTime}
              onChange={setEndTime}
              showTimeSelect
              showTimeSelectOnly
              minDate={selectedDay ? new Date(selectedDay) : undefined}
              maxDate={selectedDay ? new Date(selectedDay) : undefined}
              minTime={dateMaxValue ? dateMaxValue.minEndTime : undefined}
              maxTime={dateMaxValue ? dateMaxValue.maxEndTime : undefined}
              timeCaption="End Time"
              excludeTimes={blockedStamps}
              timeIntervals={timeInterval}
              dateFormat="h:mm aa"
              timeFormat="p"
              placeholderText="Select end time..."
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="Ticket Cost e.g. 0.02 ETH"
              value={ticketCost}
              onChange={(e) => setTicketCost(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="number"
              name="capacity"
              placeholder="Capacity e.g. 20"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>

          {startTimes.length > 0 && (
            <div className="flex flex-wrap justify-center items-center mt-5 space-x-2 text-xs">
              {startTimes.slice(0, 2).map((time, i) => (
                <span
                  key={i}
                  className="flex space-x-1 px-2 py-1 mt-1 font-semibold text-gray-700 bg-gray-200 rounded-full"
                >
                  <span>
                    {formatTime(time)} - {formatTime(endTimes[i])}
                  </span>
                  <button onClick={() => removeSlot(i)}>
                    <FaTimes />
                  </button>
                </span>
              ))}
              {startTimes.length - startTimes.slice(0, 2).length > 0 && (
                <span
                  className="flex items-center justify-center px-2 py-1 
                  font-semibold text-gray-700 bg-gray-200 rounded-full
                  hover:bg-gray-300 mt-1"
                >
                  +{startTimes.length - startTimes.slice(0, 2).length}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col space-y-4 justify-between items-center mt-6">
            <button
              className="p-3 bg-red-600 rounded-full text-white shadow-lg"
              type="submit"
            >
              <AiOutlinePlus size={17} />
            </button>

            <button
              onClick={saveMovieSlot}
              type="button"
              className="bg-red-600 font-bold text-white border-2 border-red-600
              py-2 px-8 rounded-full transition duration-300 ease-in-out
              hover:bg-transparent hover:text-red-600 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
