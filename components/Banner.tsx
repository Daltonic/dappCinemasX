const Banner: React.FC = () => {
  const images = [
    {
      id: '1',
      name: 'Avengers 2',
      caption: 'The uprising of ultron',
      image:
        'https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg',
    },
    {
      id: '2',
      name: 'Interception',
      caption: 'The dark night',
      image:
        'https://collider.com/wp-content/uploads/inception_movie_poster_banner_01.jpg',
    },
    {
      id: '3',
      name: 'Hobbit',
      caption: 'An unexpect journey',
      image:
        'https://i0.wp.com/1.bp.blogspot.com/-Ckda2-8O_ao/UHJElqpSjJI/AAAAAAAAAMM/PlbU0wywjYc/s1600/hobbit_an_unexpected_journey_movie_banner_poster%2B%25284%2529.jpg',
    },
  ]

  const getRandomImage = (images: any) => {
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
  }

  const image = getRandomImage(images)

  return (
    <div
      style={{ backgroundImage: 'url(' + image.image + ')' }}
      className="w-full h-full rounded-3xl bg-no-repeat bg-cover bg-center mb-4 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 rounded-3xl"></div>
      <div className="flex flex-col justify-end text-white p-8 space-y-8 relative z-10 h-80">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold uppercase">{image.name}</h3>
          <p className="text-xl font-medium uppercase">{image.caption}</p>
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
