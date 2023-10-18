import { Banner, BookModal, Details, TimeslotList } from '@/components'
import { getMovie } from '@/services/blockchain'
import { generateMovieData } from '@/utils/fakeData'
import { FeaturedStruct, MovieStruct } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'

const Page: NextPage<{ movieData: MovieStruct }> = ({ movieData }) => {
  const movie = movieData

  const timeSlots = [
    { startTime: '10:00 AM', endTime: '12:00 PM' },
    { startTime: '2:00 PM', endTime: '4:00 PM' },
  ]

  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <Banner movie={movie as FeaturedStruct} ticket />
      <Details movie={movie} />
      <TimeslotList slots={timeSlots} />
      <BookModal movie={movie} />
    </div>
  )
}

export default Page

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query
  const movieData: MovieStruct = await getMovie(Number(id))
  return {
    props: { movieData: JSON.parse(JSON.stringify(movieData)) },
  }
}
