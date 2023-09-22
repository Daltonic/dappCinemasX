import { Banner } from '@/components'
import MovieCards from '@/components/MovieCards'
import { generateMovieData } from '@/utils/fakeData'
import { MovieStruct } from '@/utils/type.dt'

export default function Home({ moviesData }: { moviesData: MovieStruct[] }) {
  const movies = moviesData
  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <Banner />
      <div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold p-4">Movies</h2>
          <MovieCards movies={movies} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const moviesData: MovieStruct[] = generateMovieData(5)
  return {
    props: { moviesData: JSON.parse(JSON.stringify(moviesData)) },
  }
}
