import { formatDate, formatTime } from '@/utils/helper'
import { TimeSlotStruct } from '@/utils/type.dt'
import Link from 'next/link'
import React from 'react'
import { TimeslotActions } from '.'

const TimeslotsTable: React.FC<{ slots: TimeSlotStruct[] }> = ({ slots }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Day
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ticket
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Balance
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Starts
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ends
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Capacity
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {slots.map((slot: TimeSlotStruct, i: number) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-red-600 capitalize">
                <Link href={`/timeslot/${slot.movieId}/${slot.id}`}>
                  {formatDate(slot.day)}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {slot.ticketCost.toFixed(2)} ETH
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {slot.balance.toFixed(2)} ETH
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatTime(slot.startTime)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatTime(slot.endTime)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {slot.seats}/{slot.capacity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TimeslotActions slot={slot} index={i} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TimeslotsTable
