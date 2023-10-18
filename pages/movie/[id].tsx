import { Banner, BookModal, Details, TimeslotList } from '@/components'
import { getActiveTimeSlots, getMovie } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import {
  FeaturedStruct,
  MovieStruct,
  RootState,
  TimeSlotStruct,
} from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'

interface PageProps {
  movieData: MovieStruct
  slotsData: TimeSlotStruct[]
}

const Page: NextPage<PageProps> = ({ movieData, slotsData }) => {
  const { setMovie } = globalActions
  const dispatch = useDispatch()
  dispatch(setMovie(movieData))

  const { movie } = useSelector((states: RootState) => states.globalStates)

  return movie ? (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <Banner movie={movie as FeaturedStruct} ticket />
      <Details movie={movie} />
      {slotsData.length > 0 && <TimeslotList slots={slotsData} />}
      <BookModal movie={movie} />
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query
  const movieData: MovieStruct = await getMovie(Number(id))
  const slotsData: TimeSlotStruct[] = await getActiveTimeSlots(Number(id))

  return {
    props: {
      movieData: JSON.parse(JSON.stringify(movieData)),
      slotsData: JSON.parse(JSON.stringify(slotsData)),
    },
  }
}
