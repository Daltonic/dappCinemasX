import { globalActions } from '@/store/globalSlices'
import { FeaturedStruct } from '@/utils/type.dt'
import { useDispatch } from 'react-redux'

const Banner: React.FC<{ movie: FeaturedStruct; ticket?: boolean }> = ({
  movie,
  ticket,
}) => {
  const { setBookModal } = globalActions
  const dispatch = useDispatch()

  return (
    <div
      style={{ backgroundImage: 'url(' + movie.banner + ')' }}
      className="w-full h-full rounded-3xl bg-no-repeat bg-cover bg-center mt-8 mb-4 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 rounded-3xl"></div>
      <div className="flex flex-col justify-end text-white p-8 space-y-8 relative z-10 h-80">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold uppercase">{movie.name}</h3>
          <p className="text-xl font-medium uppercase">{movie.caption}</p>
        </div>
        <div className="flex justify-start space-x-2">
          <button
            className="bg-transparent font-bold border-2 border-red-600
            py-2 px-8 text-red-600 rounded-full
            transition duration-300 ease-in-out
            hover:border-white hover:text-white"
          >
            WATCH
          </button>

          {ticket && (
            <button
              className="bg-red-600 font-bold text-white border-2 border-red-600
            py-2 px-8 rounded-full
            transition duration-300 ease-in-out
            hover:bg-transparent hover:text-red-600"
              onClick={() => dispatch(setBookModal('scale-100'))}
            >
              Buy Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner
