import { Banner, Contact, FeaturedMovie, Offers } from '@/components'
import MovieCards from '@/components/MovieCards'
import { globalActions } from '@/store/globalSlices'
import { generateMovieData } from '@/utils/fakeData'
import { FeaturedStruct, MovieStruct, RootState } from '@/utils/type.dt'
import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page: NextPage<{ moviesData: MovieStruct[] }> = ({ moviesData }) => {
  const { movies } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setMovies } = globalActions

  useEffect(() => {
    dispatch(setMovies(moviesData))
  }, [dispatch, setMovies, moviesData])

  const getRandomMovie = (movies: any) => {
    const randomIndex = Math.floor(Math.random() * movies.length)
    return movies[randomIndex]
  }

  const banners: FeaturedStruct[] = [
    {
      id: 1,
      name: 'Avengers 2',
      caption: 'The uprising of ultron',
      banner:
        'https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg',
    },
    {
      id: 2,
      name: 'Interception',
      caption: 'The dark night',
      banner:
        'https://collider.com/wp-content/uploads/inception_movie_poster_banner_01.jpg',
    },
    {
      id: 3,
      name: 'Hobbit',
      caption: 'An unexpect journey',
      banner:
        'https://i0.wp.com/1.bp.blogspot.com/-Ckda2-8O_ao/UHJElqpSjJI/AAAAAAAAAMM/PlbU0wywjYc/s1600/hobbit_an_unexpected_journey_movie_banner_poster%2B%25284%2529.jpg',
    },
  ]

  const featured: FeaturedStruct[] = [
    {
      id: 1,
      name: 'Fast X',
      caption: 'The maniac regim',
      banner:
        'https://i.pinimg.com/originals/4e/2a/50/4e2a50cbc88254139ba16943039fcead.png',
      description: `After the events of F9, Dom Toretto and his family are living a relatively peaceful life.
      However, their happiness is short-lived when Dante Reyes, the son of Hernan Reyes,
      comes after them. Dante is seeking revenge for his father's death, and he will
      stop at nothing to destroy Dom and his family.`,
    },
    {
      id: 2,
      name: 'Adipurush',
      caption: 'Arrows of the gods',
      banner:
        'https://m.media-amazon.com/images/M/MV5BNGY3YmVmN2UtNWZiNy00YTRlLTlhOTItNzlkZmFmZDA1N2QzXkEyXkFqcGdeQXVyMTU4Mzg1OTU2._V1_FMjpg_UX1000_.jpg',
      description: `The film tells the story of Raghava, the prince of Ayodhya, who is exiled to the forest
      for 14 years by his father, King Dasharatha. During his exile, Raghava falls in
      love with and marries Janaki, a princess from the nearby kingdom of Mithila.
      However, their happiness is short-lived, as Janaki is kidnapped by Lankesh,
      the demon king of Lanka. Raghava, with the help of his brother Lakshmana and the
      monkey god Hanuman, sets out to rescue Janaki and defeat Lankesh.`,
    },
  ]

  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <Banner movie={getRandomMovie(banners)} />
      <MovieCards title="Top movies showing this week" movies={movies} />
      <Offers />
      <FeaturedMovie movie={getRandomMovie(featured)} />
      <Contact />
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
