const { ethers } = require('hardhat')
const fs = require('fs')

const toWei = (num) => ethers.parseEther(num.toString())

async function createMovie(cinemaContract) {
  const movieId = 1
  const name = 'The Matrix'
  const banner = 'https://example.com/matrix-banner.jpg'
  const imageUrl = 'https://example.com/matrix-image.jpg'
  const videoUrl = 'https://example.com/matrix-trailer.mp4'
  const genre = 'Science Fiction'
  const description =
    'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
  const caption = 'Welcome to the Real World.'
  const casts = 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss'
  const running = 136 // Running time in minutes
  const released = 915148800000 // Release date as Unix timestamp (March 31, 1999)

  const tx = await cinemaContract.addMovie(
    name,
    banner,
    imageUrl,
    videoUrl,
    genre,
    description,
    caption,
    casts,
    running,
    released
  )
  await tx.wait()
}

async function getMovies(cinemaContract) {
  const result = await cinemaContract.getMovies()
  console.log('Movies:', result)
}

async function createTimeSlot(cinemaContract, movieId, ticketCost) {
  const startTime = Math.floor(Date.now()) // Current Unix timestamp
  const endTime = Math.floor(Date.now()) + 7200 // Current Unix timestamp + 2 hours
  const capacity = 50
  const day = Math.floor(Date.now())

  const tx = await cinemaContract.addTimeSlot(
    movieId,
    toWei(ticketCost),
    startTime,
    endTime,
    capacity,
    day
  )
  await tx.wait()
}

async function getTimeslots(cinemaContract, movieId) {
  const result = await cinemaContract.getTimeSlots(movieId)
  console.log('Time Slots:', result)
}

async function buyTicket(ticketContract, slotId, ticketCost) {
  const tx = await ticketContract.buyTickets(slotId, 1, {
    value: toWei(ticketCost),
  })
  await tx.wait()
}

async function getTickets(ticketContract, slotId) {
  const result = await ticketContract.getTicketHolders(slotId)
  console.log('Ticket Holders:', result)
}

async function main() {
  let cinemaContract, ticketContract
  try {
    // Load contract addresses
    const contractAddresses = fs.readFileSync(
      './contracts/contractAddress.json',
      'utf8'
    )
    const { cinemaContract: cinemaAddress, ticketContract: ticketAddress } =
      JSON.parse(contractAddresses)

    // Connect to deployed contracts
    cinemaContract = await ethers.getContractAt('DappCinemas', cinemaAddress)
    ticketContract = await ethers.getContractAt('DappTickets', ticketAddress)
    const movieId = 1
    const slotId = 1
    const ticketCost = 0.05

    // Creates movie
    // await createMovie(cinemaContract)

    // Creates timeslot
    // await createTimeSlot(cinemaContract, movieId, ticketCost)

    // Buys ticket
    // await buyTicket(ticketContract, slotId, ticketCost)

    // Reading results
    await getMovies(cinemaContract)
    await getTimeslots(cinemaContract, movieId)
    await getTickets(ticketContract, slotId)

    console.log('Contract interaction completed successfully.')
  } catch (error) {
    console.error('Error:', error)
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error)
  process.exitCode = 1
})
