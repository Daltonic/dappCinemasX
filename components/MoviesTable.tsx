import { MovieStruct } from '@/utils/type.dt'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MovieActions } from '.'
import { formatDate } from '@/utils/helper'

const MoviesTable: React.FC<{ movies: MovieStruct[] }> = ({ movies }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Genre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date Added
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movies.map((movie: MovieStruct, i: number) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Image
                  className="h-16 w-16 object-cover rounded shadow-md"
                  src={movie.imageUrl}
                  alt={movie.name}
                  width={50}
                  height={50}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-red-600 capitalize">
                <Link href={'/movie/' + movie.id}>{movie.name}</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{movie.genre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatDate(movie.timestamp)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <MovieActions movie={movie} index={i} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MoviesTable