import { truncate } from '@/utils/helper'
import { MovieStruct } from '@/utils/type.dt'
import React from 'react'

const FeaturedMovie: React.FC<{ movie: MovieStruct }> = ({ movie }) => {
  return (
    <>
      <h2 className="text-xl font-semibold uppercase mt-4 mb-8 text-center">
        Featured Movie
      </h2>
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div
            className="md:w-2/5 bg-cover bg-cente bg-no-repeat h-[30rem] object-cover relative"
            style={{ backgroundImage: 'url(' + movie.banner + ')' }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-full
              flex justify-center items-center z-40 hover:opacity-75 opacity-30
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
            </div>
          </div>

          <div className="md:w-3/5 md:pl-8">
            <h2 className="text-3xl font-semibold mb-2">{movie.name}</h2>
            <p className="text-gray-300 text-lg mb-4">
              {truncate({
                text: movie.description,
                startChars: 254,
                endChars: 0,
                maxLength: 257,
              })}
            </p>

            <p className="text-red-600 text-xl mb-4">
              Released September 22, 2023
            </p>

            <p className="flex flex-col text-gray-300 text-sm space-y-1 mt-2 max-h-44 overflow-hidden">
              <span>
                <strong>Genre:</strong> Action
              </span>
              <span>
                <strong>Cast:</strong> 50 Cent, Andy Garcia, Dolph Ludngren, Iko
                Uwais, Jason Statham, Megan Fox, Randy Couture, Sylvester
                Stallone, Tony Jaa
              </span>
            </p>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded-full
            hover:bg-red-500 transition duration-300 mt-4"
            >
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturedMovie
