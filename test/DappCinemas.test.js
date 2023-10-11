const { expect } = require('chai')

const toWei = (num) => ethers.parseEther(num.toString())
const fromWei = (num) => ethers.formatEther(num)

describe('Contracts', () => {
  let cinemaContract, ticketContract, result

  // Movies variables
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

  // Slot varibales
  const slotId = 1
  const ticketCost = 100
  const startTime = Math.floor(Date.now()) // Current Unix timestamp
  const endTime = Math.floor(Date.now()) + 7200 // Current Unix timestamp + 2 hours
  const capacity = 50
  const day = Math.floor(Date.now())

  beforeEach(async () => {
    ;[deployer, buyer1, buyer2] = await ethers.getSigners()

    cinemaContract = await ethers.deployContract('DappCinemas')
    await cinemaContract.waitForDeployment()

    ticketContract = await ethers.deployContract('DappTickets', [
      cinemaContract,
    ])
    await ticketContract.waitForDeployment()
    await cinemaContract.grantAccess(ticketContract)
  })

  // describe('Movies', () => {
  //   beforeEach(async () => {
  //     await cinemaContract.addMovie(
  //       name,
  //       banner,
  //       imageUrl,
  //       videoUrl,
  //       genre,
  //       description,
  //       caption,
  //       casts,
  //       running,
  //       released
  //     )
  //   })

  //   describe('Success', () => {
  //     it('should confirm movie creation', async () => {
  //       result = await cinemaContract.getMovies()
  //       expect(result).to.have.lengthOf(1)

  //       result = await cinemaContract.getMovie(movieId)
  //       expect(result.name).to.be.equal(name)
  //     })

  //     it('should confirm movie update', async () => {
  //       result = await cinemaContract.getMovie(movieId)
  //       expect(result.name).to.be.equal(name)

  //       const newName = 'Matrix X'
  //       await cinemaContract.updateMovie(
  //         movieId,
  //         newName,
  //         banner,
  //         imageUrl,
  //         videoUrl,
  //         genre,
  //         description,
  //         caption,
  //         casts,
  //         running,
  //         released
  //       )

  //       result = await cinemaContract.getMovie(movieId)
  //       expect(result.name).to.be.equal(newName)
  //     })

  //     it('should confirm movie deletion', async () => {
  //       result = await cinemaContract.getMovies()
  //       expect(result).to.have.lengthOf(1)

  //       result = await cinemaContract.getMovie(movieId)
  //       expect(result.deleted).to.be.equal(false)

  //       await cinemaContract.deleteMovie(movieId)

  //       result = await cinemaContract.getMovies()
  //       expect(result).to.have.lengthOf(0)

  //       result = await cinemaContract.getMovie(movieId)
  //       expect(result.deleted).to.be.equal(true)
  //     })
  //   })
  // })

  // describe('Timeslots', () => {
  //   beforeEach(async () => {
  //     await cinemaContract.addMovie(
  //       name,
  //       banner,
  //       imageUrl,
  //       videoUrl,
  //       genre,
  //       description,
  //       caption,
  //       casts,
  //       running,
  //       released
  //     )

  //     await cinemaContract.addTimeSlot(
  //       movieId,
  //       ticketCost,
  //       startTime,
  //       endTime,
  //       capacity,
  //       day
  //     )
  //   })

  //   describe('Success', () => {
  //     it('should confirm slot creation', async () => {
  //       result = await cinemaContract.getTimeSlots(movieId)
  //       expect(result).to.have.lengthOf(1)
  //     })

  //     it('should confirm slot deletion', async () => {
  //       result = await cinemaContract.getTimeSlots(movieId)
  //       expect(result).to.have.lengthOf(1)

  //       result = await cinemaContract.getTimeSlot(slotId)
  //       expect(result.deleted).to.be.equal(false)

  //       await cinemaContract.deleteTimeSlot(slotId)

  //       result = await cinemaContract.getTimeSlots(movieId)
  //       expect(result).to.have.lengthOf(0)

  //       result = await cinemaContract.getTimeSlot(slotId)
  //       expect(result.deleted).to.be.equal(true)
  //     })

  //     it('should confirm slot completion', async () => {
  //       result = await cinemaContract.getTimeSlot(slotId)
  //       expect(result.completed).to.be.equal(false)

  //       await cinemaContract.completeTimeSlot(slotId)

  //       result = await cinemaContract.getTimeSlot(slotId)
  //       expect(result.completed).to.be.equal(true)
  //     })
  //   })
  // })

  describe('Tickets', () => {
    beforeEach(async () => {
      await cinemaContract.addMovie(
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

      await cinemaContract.addTimeSlot(
        movieId,
        ticketCost,
        startTime,
        endTime,
        capacity,
        day
      )

      await ticketContract
        .connect(buyer1)
        .buyTickets(slotId, 1, { value: toWei(ticketCost) })
    })

    describe('Success', () => {
      it('should confirm ticket creation', async () => {
        result = await ticketContract.getTicketHolders(slotId)
        expect(result).to.have.lengthOf(1)
      })

      it('should confirm tickets deletion', async () => {
        await ticketContract
          .connect(buyer2)
          .buyTickets(slotId, 1, { value: toWei(ticketCost) })

        result = await ticketContract.getTicketHolders(slotId)
        expect(result).to.have.lengthOf(2)

        await ticketContract.deleteTickets(slotId)

        result = await ticketContract.getTicketHolders(slotId)
        expect(result).to.have.lengthOf(0)
      })

      it('should confirm tickets completion', async () => {
        await ticketContract
          .connect(buyer2)
          .buyTickets(slotId, 1, { value: toWei(ticketCost) })

        result = await ticketContract.getTicketHolders(slotId)
        expect(result).to.have.lengthOf(2)

        await ticketContract.completeTickets(slotId)

        result = await ticketContract.getTicketHolders(slotId)
        expect(result).to.have.lengthOf(2)
      })
    })
  })
})
