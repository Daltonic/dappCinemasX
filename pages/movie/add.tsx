import { MovieParams } from '@/utils/type.dt'
import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const Page: NextPage = () => {
  const [movie, setMovie] = useState<MovieParams>({
    name: '',
    banner: '',
    imageUrl: '',
    videoUrl: '',
    genre: '',
    casts: '',
    description: '',
    caption: '',
    released: '',
    running: '',
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    for (let key in movie) {
      if (movie[key as keyof typeof movie] === '') {
        toast.warn(`Please fill in the ${key} field.`)
        return
      }
    }
    console.log(movie)
  }

  const resetForm = () => {
    setMovie({
      name: '',
      banner: '',
      imageUrl: '',
      videoUrl: '',
      genre: '',
      casts: '',
      description: '',
      caption: '',
      released: '',
      running: '',
    })
  }

  return (
    <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
      <div className="block justify-center items-center m-auto w-full sm:w-3/5">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-4">
            <h2>Add Movies</h2>
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

          <div className="flex justify-between items-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
              <input
                className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
                type="text"
                name="caption"
                placeholder="Movie caption"
                value={movie.caption}
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
          </div>

          <div className="flex justify-between items-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
              <input
                className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
                type="text"
                name="imageUrl"
                placeholder="Movie imageUrl URL"
                value={movie.imageUrl}
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
                name="videoUrl"
                placeholder="Movie video URL"
                value={movie.videoUrl}
                onChange={handleChange}
                pattern="https?://.+"
                title="Please enter a valid video URL https?://.+(\.mp4|\.mov|\.avi|\.flv|\.wmv|\.mkv)"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
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
                name="running"
                placeholder="Movie runnings e.g. 1hr 30min"
                value={movie.running}
                onChange={handleChange}
                required
              />
            </div>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
