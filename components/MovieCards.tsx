import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { MovieStruct } from '@/utils/type.dt'
import { MovieCard } from '.'

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
      <h2 className="text-xl font-semibold uppercase my-8 text-center">
        {title}
      </h2>

      {movies.length > 3 ? (
        <Slider {...settings}>
          {movies.map((movie: MovieStruct, i: number) => (
            <div key={i} className="px-2 py-4">
              <MovieCard movie={movie} />
            </div>
          ))}
        </Slider>
      ) : (
        <div>
          {movies.map((movie: MovieStruct, i: number) => (
            <div key={i} className="px-2 py-4 w-1/3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default MovieCards
