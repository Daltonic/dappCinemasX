import { MovieStruct } from './type.dt'
import { faker } from '@faker-js/faker'

export const generateMovieData = (count: number) => {
  const movies: MovieStruct[] = []

  for (let i = 0; i < count; i++) {
    const movie: MovieStruct = {
      id: i + 1,
      name: faker.word.words(5),
      imageUrl: faker.image.imageUrl(),
      genre: faker.word.words(3),
      description: faker.lorem.paragraph(),
      timestamp: Date.now(),
      deleted: false,
    }
    movies.push(movie)
  }

  return movies
}
