import Link from 'next/link'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { MovieStruct } from '@/utils/type.dt'
import { truncate } from '@/utils/helper'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const MovieCards: React.FC<{ movies: MovieStruct[]; title: string }> = ({
  movies,
  title,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      // Add more breakpoints as needed
    ],
  }

  return (
    <>
      <h2 className="text-xl font-semibold uppercase my-4">{title}</h2>

      <Slider {...settings}>
        {movies.map((movie: MovieStruct, i: number) => (
          <div key={i} className="px-2 py-4">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </>
  )
}

const MovieCard: React.FC<{ movie: MovieStruct }> = ({ movie }) => {
  return (
    <div
      className="relative block overflow-hidden shadow-lg
      hover:shadow-xl transition duration-300 transform"
    >
      <div className="flex">
        <div className="w-1/2 h-80">
          <div className="relative h-full">
            <Link
              href={`/movie/${movie.id}`}
              className="absolute bottom-0 left-0 right-0 h-full
              flex justify-center items-center bg-black z-40
              hover:opacity-75 opacity-0 transition-opacity duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3l14 9-14 9V3z"
                />
              </svg>
            </Link>

            <Image
              src={movie.imageUrl}
              alt={movie.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="relative flex flex-col w-1/2 bg-white h-80">
          <div className="flex flex-col p-4">
            <Link
              href={`/movie/${movie.id}`}
              className="text-xl font-semibold capitalize"
            >
              {truncate({
                text: movie.name,
                startChars: 17,
                endChars: 0,
                maxLength: 21,
              })}
            </Link>
            <small className=" mb-2">01 hours 46 minutes</small>

            <p className="flex flex-col text-gray-600 text-sm space-y-1 mt-2 max-h-44 overflow-hidden">
              <span>
                {truncate({
                  text: movie.description,
                  startChars: 54,
                  endChars: 0,
                  maxLength: 57,
                })}
              </span>
              <span>
                <strong>Genre:</strong> Action
              </span>
              <span>
                <strong>Cast:</strong> 50 Cent, Andy Garcia, Dolph Ludngren, Iko
                Uwais, Jason Statham, Megan Fox, Randy Couture, Sylvester
                Stallone, Tony Jaa
              </span>
              <span>
                <strong>Release Date:</strong> September 22, 2023
              </span>
            </p>
          </div>
          <Link
            className="absolute bottom-0 left-0 right-0 bg-transparent py-2 px-3.5
            text-black hover:text-red-600 flex justify-start items-center space-x-1
            transition duration-300 ease-in-out border-t border-gray-200 text-sm"
            href={`/movie/${movie.id}`}
          >
            <AiOutlineInfoCircle /> <span>Details</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieCards
