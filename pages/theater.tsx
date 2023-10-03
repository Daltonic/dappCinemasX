import { MovieCard, TheaterPlayer } from '@/components'
import SubscribeBtn from '@/components/SubscribeBtn'
import { generateMovieData } from '@/utils/fakeData'
import { MovieStruct } from '@/utils/type.dt'
import { NextPage } from 'next'

const Page: NextPage<{ moviesData: MovieStruct[] }> = ({ moviesData }) => {
  const movies = moviesData

  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <SubscribeBtn />

      {/* Section for displaying the YouTube player */}
      <div className="my-4">
        <TheaterPlayer movie={movies[0]} />
      </div>

      <div className="my-4 space-y-6">
        <h4 className='text-center text-3xl my-4'>Your Avaialble Movies</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie: MovieStruct, i: number) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page

export const getServerSideProps = async () => {
  const moviesData: MovieStruct[] = generateMovieData(5)
  return {
    props: { moviesData: JSON.parse(JSON.stringify(moviesData)) },
  }
}
