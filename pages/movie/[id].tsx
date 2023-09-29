import { Banner, BookModal, Details, TimeslotList } from '@/components'
import { generateMovieData } from '@/utils/fakeData'
import { FeaturedStruct, MovieStruct } from '@/utils/type.dt'
import { NextPage } from 'next'

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

export const getServerSideProps = async () => {
  const movieData: MovieStruct = generateMovieData(1)[0]
  return {
    props: { movieData: JSON.parse(JSON.stringify(movieData)) },
  }
}
