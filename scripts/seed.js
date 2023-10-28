const { faker } = require('@faker-js/faker')
const { ethers } = require('hardhat')
const fs = require('fs')

const toWei = (num) => ethers.parseEther(num.toString())

const movies = [
  {
    banner:
      'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',
    caption: 'Dead Reckoning Part One',
    casts:
      'Tom Cruise, Hayley Atwell, Ving Rhames, Simon Pegg, Rebecca Ferguson, Vanessa Kirby, Esai Morales, Pom Klementieff, Henry Czerny',
    description:
      "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the world's fate at stake and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan must consider that nothing can matter more than his mission—not even the lives of those he cares about most.",
    genre: 'Action, Thriller',
    imageUrl:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
    name: 'Mission: Impossible',
    released: 'July 12th, 2023',
    running: '2h 44m',
    videoUrl: 'https://youtu.be/avz06PDqDbM?si=CrFJvLIiI4jZT8hh',
  },
  {
    banner:
      'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/rMvPXy8PUjj1o8o1pzgQbdNCsvj.jpg',
    caption: `They'll die when they're dead`,
    casts:
      'Jason Statham, 50 Cent, Megan Fox, Dolph Lundgren, Iko Uwais, Andy García, Sylvester Stallone, Tony Jaa, Randy Couture',
    description:
      'Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world’s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give “new blood” a whole new meaning.',
    genre: 'Action, Adventure, Thriller',
    imageUrl:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/iwsMu0ehRPbtaSxqiaUDQB9qMWT.jpg',
    name: 'Expend4bles',
    released: 'September 22nd, 2023',
    running: '1h 43m',
    videoUrl: 'https://youtu.be/DhlaBO-SwVE?si=64N-_J0f5wqZVTIx',
  },
  {
    banner:
      'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cHNqobjzfLj88lpIYqkZpecwQEC.jpg',
    caption: 'Justice knows no borders',
    casts:
      'Denzel Washington, Dakota Fanning, Eugenio Mastrandrea, David Denman, Gaia Scodellaro, Remo Girone, Andrea Scarduzio, Andrea Dodero, Daniele Perrone',
    description: `Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.`,
    genre: 'Action, Thriller, Crime, Drama',
    imageUrl:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg',
    name: 'The Equalizer',
    released: 'September 1st, 2023',
    running: '1h 49m',
    videoUrl: 'https://youtu.be/19ikl8vy4zs?si=1HjOja7COQXqnpND',
  },
  {
    banner:
      'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg',
    caption: 'All roads lead to the truth',
    casts:
      'Liam Neeson, Noma Dumezweni, Lilly Aspell, Jack Champion, Arian Moayed, Embeth Davidtz, Matthew Modine, Emily Kusche, Luca Márkus',
    description: `When a mysterious caller puts a bomb under his car seat, Matt Turner begins a high-speed chase across the city to complete a specific series of tasks. With his kids trapped in the back seat and a bomb that will explode if they get out of the car, a normal commute becomes a twisted game of life or death as Matt follows the stranger's increasingly dangerous instructions in a race against time to save his family.`,
    genre: 'Action, Thriller, Crime',
    imageUrl:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/ljl70pjLIX1hx3bPyCCbxGj6WPr.jpg',
    name: 'Retribution',
    released: 'August 25th, 2023',
    running: '1h 33m',
    videoUrl: 'https://youtu.be/jzQn0-WH4WM?si=pP7bjxtOATEhW1fe',
  },
  {
    banner:
      'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/pA3vdhadJPxF5GA1uo8OPTiNQDT.jpg',
    caption: 'Fight for the light. Silence the darkness',
    casts:
      'Jim Caviezel, Mira Sorvino, Bill Camp, Gerardo Taracena, Kurt Fuller, José Zúñiga, Eduardo Verástegui, Scott Haze, Yessica Borroto Perryman',
    description: `The story of Tim Ballard, a former US government agent, who quits his job in order to devote his life to rescuing children from global sex traffickers.`,
    genre: 'Action, Drama',
    imageUrl:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/qA5kPYZA7FkVvqcEfJRoOy4kpHg.jpg',
    name: 'Sound of Freedom',
    released: 'July 4th, 2023',
    running: '2h 11m',
    videoUrl: 'https://youtu.be/UwSBQWI-bek?si=N-NIkSJ-Ud-pdUfQ',
  },
]

async function createMovie(cinemaContract, movie) {
  const tx = await cinemaContract.addMovie(
    movie.name,
    movie.banner,
    movie.imageUrl,
    movie.videoUrl,
    movie.genre,
    movie.description,
    movie.caption,
    movie.casts,
    movie.running,
    movie.released
  )
  await tx.wait()
}

async function createTimeSlot(cinemaContract, movieId, count) {
  for (let i = 0; i < count; i++) {
    const startTime = faker.date.future().getTime()
    const endTime =
      startTime + faker.number.int({ min: 1, max: 3 }) * 60 * 60 * 1000
    const ticketCost = faker.number.float({ min: 0.02, max: 0.5 })
    const capacity = faker.number.int({ min: 10, max: 50 })

    const tx = await cinemaContract.addTimeSlot(
      movieId,
      [toWei(ticketCost)],
      [startTime],
      [endTime],
      [capacity],
      [startTime]
    )

    await tx.wait()
  }
}

async function buyTicket(ticketContract, slotId, ticketCost, count) {
  for (let i = 0; i < count; i++) {
    const tx = await ticketContract.buyTickets(slotId, 1, {
      value: toWei(ticketCost),
    })
    await tx.wait()
  }
}

async function getMovies(cinemaContract) {
  const result = await cinemaContract.getMovies()
  console.log('Movies:', result)
}

async function getTimeslots(cinemaContract, movieId) {
  const result = await cinemaContract.getTimeSlots(movieId)
  console.log('Time Slots:', result)
}

async function getTickets(ticketContract, slotId) {
  const result = await ticketContract.getTicketHolders(slotId)
  console.log('Ticket Holders:', result)
}

async function main() {
  let cinemaContract, ticketContract

  try {
    const contractAddresses = fs.readFileSync(
      './contracts/contractAddress.json',
      'utf8'
    )

    const { cinemaContract: cinemaAddress, ticketContract: ticketAddress } =
      JSON.parse(contractAddresses)

    cinemaContract = await ethers.getContractAt('DappCinemas', cinemaAddress)
    ticketContract = await ethers.getContractAt('DappTickets', ticketAddress)

    const movieId = 1
    const slotId = 1
    const ticketCost = 0.5

    // movies.forEach(async (movie) => {
    //   await createMovie(cinemaContract, movie)
    // })

    // movies.forEach(async (movie, i) => {
    //   const count = faker.number.int({ min: 1, max: 4 })
    //   await createTimeSlot(cinemaContract, i + 1, count)
    // })

    // await buyTicket(ticketContract, slotId, ticketCost, 3)
    // await buyTicket(ticketContract, slotId, ticketCost, 3)
    // await buyTicket(ticketContract, slotId, ticketCost, 3)
    // await buyTicket(ticketContract, slotId+1, ticketCost, 3)
    // await buyTicket(ticketContract, slotId+2, ticketCost, 3)
    // await buyTicket(ticketContract, slotId+3, ticketCost, 3)
    // await buyTicket(ticketContract, slotId+4, ticketCost, 3)

    // await getMovies(cinemaContract)
    // await getTimeslots(cinemaContract, movieId)
    // await getTickets(ticketContract, slotId)
  } catch (error) {
    console.error('Unhandled error:', error)
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error)
  process.exitCode = 1
})
