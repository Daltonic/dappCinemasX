import { FeaturedStruct } from '@/utils/type.dt'

const Banner: React.FC<{ movie: FeaturedStruct }> = ({ movie }) => {
  return (
    <div
      style={{ backgroundImage: 'url(' + movie.imageUrl + ')' }}
      className="w-full h-full rounded-3xl bg-no-repeat bg-cover bg-center mt-8 mb-4 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 rounded-3xl"></div>
      <div className="flex flex-col justify-end text-white p-8 space-y-8 relative z-10 h-80">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold uppercase">{movie.name}</h3>
          <p className="text-xl font-medium uppercase">{movie.caption}</p>
        </div>
        <div>
          <button
            className="bg-transparent font-bold border-2 border-red-600
            py-2 px-8 text-red-600 rounded-full
            transition duration-300 ease-in-out
            hover:border-white hover:text-white"
          >
            WATCH
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
