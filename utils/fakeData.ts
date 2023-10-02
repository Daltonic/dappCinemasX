import { MovieStruct, TimeSlotStruct } from './type.dt'
import { faker } from '@faker-js/faker'

export const generateMovieData = (count: number): MovieStruct[] => {
  const movies: MovieStruct[] = []

  for (let i = 0; i < count; i++) {
    const movie: MovieStruct = {
      id: i + 1,
      name: faker.word.words(5),
      imageUrl: faker.image.urlPicsumPhotos(),
      genre: faker.word.words(3),
      caption: faker.word.words(3),
      description: faker.lorem.paragraph(),
      timestamp: Date.now(),
      deleted: false,
    }
    movies.push(movie)
  }

  return movies
}

export function generateFakeTimeSlots(n: number): TimeSlotStruct[] {
  const timeSlots: TimeSlotStruct[] = []

  for (let i = 0; i < n; i++) {
    const startTime = faker.date.future().getTime()
    const endTime =
      startTime + faker.number.int({ min: 1, max: 3 }) * 60 * 60 * 1000
    const ticketCost = faker.number.float({ min: 0.02, max: 0.5 })
    const balance = faker.number.float({ min: 1.02, max: 10.5 })
    const capacity = faker.number.int({ min: 50, max: 200 })
    const seats = faker.number.int({ min: 0, max: capacity })

    const timeSlot: TimeSlotStruct = {
      id: i + 1,
      movieId: faker.number.int({ min: 1, max: 100 }),
      ticketCost,
      startTime,
      endTime,
      capacity,
      seats,
      deleted: faker.datatype.boolean(),
      completed: faker.datatype.boolean(),
      day: startTime,
      balance,
    }

    timeSlots.push(timeSlot)
  }

  return timeSlots
}
