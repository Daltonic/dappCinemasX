import { FindHolder } from '@/components'
import { globalActions } from '@/store/globalSlices'
import { generateTickets } from '@/utils/fakeData'
import { truncate } from '@/utils/helper'
import { TicketStruct } from '@/utils/type.dt'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'

const Page: NextPage<{ ticketsData: TicketStruct[] }> = ({ ticketsData }) => {
  const router = useRouter()
  const { movieId, slotId } = router.query
  const dispatch = useDispatch()

  const { setFindHolderModal } = globalActions
  const tickets = ticketsData

  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <h3 className="my-3 text-3xl font-bold">Ticket Holders</h3>
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
                Cost
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Holder
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket: TicketStruct, i: number) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ticket.cost.toFixed(2)} ETH
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {truncate({
                    text: ticket.owner,
                    startChars: 4,
                    endChars: 4,
                    maxLength: 11,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          className="bg-transparent font-bold border-2 border-red-600
            py-2 px-8 text-red-600 rounded-full hover:text-white
            transition duration-300 ease-in-out hover:bg-red-600"
          onClick={() => dispatch(setFindHolderModal('scale-100'))}
        >
          Find Holders
        </button>

        <Link
          href={`/timeslots/${movieId}`}
          className="bg-red-600 font-bold text-white border-2 border-red-600
            py-2 px-8 rounded-full
            transition duration-300 ease-in-out
            hover:bg-transparent hover:text-red-600"
        >
          Back to slots
        </Link>
      </div>

      <FindHolder />
    </div>
  )
}

export default Page

export const getServerSideProps = async () => {
  const ticketsData: TicketStruct[] = generateTickets(5)

  return {
    props: { ticketsData: JSON.parse(JSON.stringify(ticketsData)) },
  }
}
