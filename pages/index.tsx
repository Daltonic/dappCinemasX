import { Banner, Footer, NavBtn, Offers } from '@/components'
import MovieCards from '@/components/MovieCards'
import { generateMovieData } from '@/utils/fakeData'
import { MovieStruct } from '@/utils/type.dt'

export default function Home({ moviesData }: { moviesData: MovieStruct[] }) {
  const movies = moviesData
  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <Banner />
      <MovieCards title="Top movies showing this week" movies={movies} />
      <Offers />
      <Footer />
      <NavBtn />
    </div>
  )
}

export const getServerSideProps = async () => {
  const moviesData: MovieStruct[] = generateMovieData(5)
  return {
    props: { moviesData: JSON.parse(JSON.stringify(moviesData)) },
  }
}
