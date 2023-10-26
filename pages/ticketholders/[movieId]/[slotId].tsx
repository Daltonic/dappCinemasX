import { FindHolder } from '@/components'
import { globalActions } from '@/store/globalSlices'
import { generateTickets } from '@/utils/fakeData'
import { truncate } from '@/utils/helper'
import { RootState, TicketStruct } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface PageStruct {
  ticketsData: TicketStruct[]
  holdersData: string[]
}

const Page: NextPage<PageStruct> = ({ ticketsData, holdersData }) => {
  const router = useRouter()
  const { movieId } = router.query

  const { tickets, holders } = useSelector(
    (states: RootState) => states.globalStates
  )
  const dispatch = useDispatch()
  const { setTickets, setHolders, setFindHoldersModal } = globalActions

  useEffect(() => {
    dispatch(setTickets(ticketsData))
    dispatch(setHolders(holdersData))
  }, [dispatch, setTickets, ticketsData, setHolders, holdersData])

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
          onClick={() => dispatch(setFindHoldersModal('scale-100'))}
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slotId } = context.query
  const ticketsData: TicketStruct[] = generateTickets(Number(slotId))
  const holdersData: string[] = ticketsData.map((ticket) => ticket.owner)

  return {
    props: {
      ticketsData: JSON.parse(JSON.stringify(ticketsData)),
      holdersData: JSON.parse(JSON.stringify(holdersData)),
    },
  }
}
