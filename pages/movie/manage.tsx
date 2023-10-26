import { DeleteMovie, MoviesTable, Withdrawal } from '@/components'
import { globalActions } from '@/store/globalSlices'
import { generateMovieData } from '@/utils/fakeData'
import { MovieStruct, RootState } from '@/utils/type.dt'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const Page: NextPage<{ moviesData: MovieStruct[] }> = ({ moviesData }) => {
  const { movies, balance } = useSelector(
    (states: RootState) => states.globalStates
  )
  const dispatch = useDispatch()
  const { setMovies, setWithdrawalModal } = globalActions

  useEffect(() => {
    dispatch(setMovies(moviesData))
  }, [dispatch, setMovies, moviesData])

  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <h3 className="my-3 text-3xl font-bold">Manage Movies</h3>

      <MoviesTable movies={movies} />

      <div className="flex justify-center items-center space-x-2 mt-4">
        <Link
          href={'/movie/add'}
          className="bg-transparent font-bold border-2 border-red-600
            py-2 px-8 text-red-600 rounded-full hover:text-white
            transition duration-300 ease-in-out hover:bg-red-600"
        >
          Add Movie
        </Link>
        <button
          className="bg-red-600 font-bold text-white border-2 border-red-600
            py-2 px-8 rounded-full flex justify-center items-center space-x-1
            transition duration-300 ease-in-out
            hover:bg-transparent hover:text-red-600"
          onClick={() => dispatch(setWithdrawalModal('scale-100'))}
        >
          <span>Withdraw</span> <FaEthereum /> {balance.toFixed(2)}
        </button>
      </div>
      <Withdrawal />
      <DeleteMovie />
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
