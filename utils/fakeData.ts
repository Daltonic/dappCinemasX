import { MovieStruct, TicketStruct, TimeSlotStruct } from './type.dt'
import { faker } from '@faker-js/faker'

export const generateMovieData = (n: number): MovieStruct[] => {
  const movies: MovieStruct[] = []

  for (let i = 0; i < n; i++) {
    const releaseDate = faker.date.past()
    const formattedReleaseDate = `${releaseDate.toLocaleString('default', {
      month: 'long',
    })} ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`

    const movie: MovieStruct = {
      id: i + 1,
      name: faker.word.words(5),
      banner: faker.image.urlPicsumPhotos(),
      imageUrl: faker.image.urlPicsumPhotos(),
      videoUrl: 'https://youtu.be/eoOaKN4qCKw?si=G_JwhwfED7ZNzUwq',
      genre: faker.word.words(3),
      caption: faker.word.words(3),
      casts:
        'Anshuman Prasad, Roberta Federico, Salim Alrazouk, Alessandro Troso, Géza Kerti',
      released: formattedReleaseDate,
      running: `${faker.number.int({ min: 1, max: 3 })}h ${faker.number.int({
        min: 1,
        max: 59,
      })}m`,
      description: faker.lorem.paragraph(),
      timestamp: Date.now(),
      deleted: false,
    }
    movies.push(movie)
  }

  return movies
}

export const generateFakeTimeSlots = (n: number): TimeSlotStruct[] => {
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

export const generateTickets = (n: number): TicketStruct[] => {
  const tickets: TicketStruct[] = []

  for (let i = 0; i < n; i++) {
    const ticket: TicketStruct = {
      id: i,
      movieId: faker.number.int({ min: 1, max: 100 }),
      slotId: faker.number.int({ min: 1, max: 50 }),
      owner: faker.string.hexadecimal({
        length: { min: 42, max: 42 },
        prefix: '0x',
      }),
      cost: faker.number.float({ min: 0.02, max: 0.5 }),
      timestamp: faker.date.past().getTime(),
      day: faker.date.future().getTime(),
      refunded: faker.datatype.boolean(),
    }

    tickets.push(ticket)
  }

  return tickets
}