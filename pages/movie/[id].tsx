import { Banner, BookModal, Details, TimeslotList } from '@/components'
import { globalActions } from '@/store/globalSlices'
import { generateFakeTimeSlots, generateMovieData } from '@/utils/fakeData'
import {
  FeaturedStruct,
  MovieStruct,
  RootState,
  TimeSlotStruct,
} from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface PageProps {
  movieData: MovieStruct
  slotsData: TimeSlotStruct[]
}

const Page: NextPage<PageProps> = ({ movieData, slotsData }) => {
  const { movie, timeslots } = useSelector(
    (states: RootState) => states.globalStates
  )
  const dispatch = useDispatch()
  const { setMovie, setTimeSlots } = globalActions

  useEffect(() => {
    dispatch(setMovie(movieData))
    dispatch(setTimeSlots(slotsData))
  }, [dispatch, setMovie, movieData, setTimeSlots, slotsData])

  return movie ? (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <Banner movie={movie as FeaturedStruct} ticket />
      <Details movie={movie} />
      {timeslots.length > 0 && <TimeslotList slots={timeslots} />}
      <BookModal timeSlots={timeslots} />
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
  const movieData: MovieStruct = generateMovieData(1)[0]
  const slotsData: TimeSlotStruct[] = generateFakeTimeSlots(Number(id))

  return {
    props: {
      movieData: JSON.parse(JSON.stringify(movieData)),
      slotsData: JSON.parse(JSON.stringify(slotsData)),
    },
  }
}
