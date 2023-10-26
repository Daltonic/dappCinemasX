import { DeleteSlot, FinishSlot, TimeslotsTable } from '@/components'
import { globalActions } from '@/store/globalSlices'
import { generateFakeTimeSlots } from '@/utils/fakeData'
import { RootState, TimeSlotStruct } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page: NextPage<{ slotsData: TimeSlotStruct[] }> = ({ slotsData }) => {
  const router = useRouter()
  const { movieId } = router.query

  const { timeslots } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setTimeSlots } = globalActions

  useEffect(() => {
    dispatch(setTimeSlots(slotsData))
  }, [dispatch, setTimeSlots, slotsData])

  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <h3 className="my-3 text-3xl font-bold">Manage Timeslots</h3>

      <TimeslotsTable slots={timeslots} />

      <div className="flex justify-center items-center space-x-2 mt-4">
        <Link
          href={`/timeslots/${movieId}/add`}
          className="bg-transparent font-bold border-2 border-red-600
            py-2 px-8 text-red-600 rounded-full hover:text-white
            transition duration-300 ease-in-out hover:bg-red-600"
        >
          Add Slot
        </Link>

        <Link
          href={`/movie/manage`}
          className="bg-red-600 font-bold text-white border-2 border-red-600
            py-2 px-8 rounded-full
            transition duration-300 ease-in-out
            hover:bg-transparent hover:text-red-600"
        >
          Back to Movies
        </Link>
      </div>

      <DeleteSlot />
      <FinishSlot />
    </div>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { movieId } = context.query
  const slotsData: TimeSlotStruct[] = generateFakeTimeSlots(Number(movieId))

  return {
    props: { slotsData: JSON.parse(JSON.stringify(slotsData)) },
  }
}
