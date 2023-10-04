import { MovieParams } from '@/utils/type.dt'
import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

const Page: NextPage = () => {
  const [movie, setMovie] = useState<MovieParams>({
    poster: '',
    banner: '',
    name: '',
    genre: '',
    casts: '',
    description: '',
    released: '',
    duration: '',
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    for (let key in movie) {
      if (movie[key as keyof typeof movie] === '') {
        toast.warn(`Please fill in the ${key} field.`)
        return
      }
    }

    console.log(movie)
    resetForm()
  }

  const resetForm = () => {
    setMovie({
      poster: '',
      banner: '',
      name: '',
      genre: '',
      casts: '',
      description: '',
      released: '',
      duration: '',
    })
  }

  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <div className="block justify-center items-center m-auto w-full sm:w-3/5">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-4">
            <h2>Edit Movies</h2>
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="poster"
              placeholder="Movie poster URL"
              value={movie.poster}
              onChange={handleChange}
              pattern="https?://.+(\.png|\.jpg|\.jpeg|\.gif)"
              title="Please enter a valid image URL (http(s)://...(.png|.jpg|.jpeg|.gif))"
              required
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="banner"
              placeholder="Movie banner URL"
              value={movie.banner}
              onChange={handleChange}
              pattern="https?://.+(\.png|\.jpg|\.jpeg|\.gif)"
              title="Please enter a valid image URL (http(s)://...(.png|.jpg|.jpeg|.gif))"
              required
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="name"
              placeholder="Movie name"
              value={movie.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="released"
              placeholder="Movie release date e.g. 1st March 2024"
              value={movie.released}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="duration"
              placeholder="Movie durations e.g. 1hr 30min"
              value={movie.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="genre"
              placeholder="Movie genre e.g. action, romance, sc-fi"
              value={movie.genre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="casts"
              placeholder="Movie casts and directors e.g. Chris Prat, Dwyne Johnson, Kevin Heart"
              value={movie.casts}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
            <textarea
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              placeholder="Movie Description"
              name="description"
              value={movie.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              className="w-full text-white text-md bg-red-600 py-2 px-5 rounded-full
            drop-shadow-xl border border-transparent hover:bg-transparent hover:border-red-500
            hover:text-red-500 focus:outline-none mt-5"
            >
              Updated
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
