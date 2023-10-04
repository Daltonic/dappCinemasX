import { truncate } from '@/utils/helper'
import { MovieStruct } from '@/utils/type.dt'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

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
              className="absolute bottom-0 left-0 right-0 h-full z-40
                flex justify-center items-center hover:opacity-75 opacity-0
                bg-gradient-to-b from-transparent to-black transition-opacity duration-300"
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
              sizes=""
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

export default MovieCard
