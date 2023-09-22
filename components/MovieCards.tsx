import Link from 'next/link'
import Image from 'next/image'

const MovieCards = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {movies.map((movie: any, i: number) => (
        <Link
          key={i}
          href={`/movie/${movie.id}`}
          className="flex justify-start flex-row space-x-8  sm:space-x-0
          sm:flex-col p-3 space-y-2 shadow-lg w-auto rounded-lg border border-gray-200"
        >
          <div className="flex h-full w-auto">
            <Image
              src={movie.imageUrl}
              className="rounded-lg object-cover h-64 w-full"
              width={100}
              height={64}
              alt="movie name"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold md:text-lg my-2">{movie.name}</h3>
            <p className="text-gray-600 font-light text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              ratione esse quos vero! Dolorum labore animi harum accusamus vel
              quaerat ducimus officiis enim minima ipsa, ad blanditiis quod
              assumenda esse?
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MovieCards
