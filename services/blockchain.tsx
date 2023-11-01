import { ethers } from 'ethers'
import address from '@/contracts/contractAddress.json'
import dappCinemasAbi from '@/artifacts/contracts/DappCinemas.sol/DappCinemas.json'
import dappTicketsAbi from '@/artifacts/contracts/DappTickets.sol/DappTickets.json'
import {
  MovieParams,
  MovieStruct,
  TicketStruct,
  TimeSlotParams,
  TimeSlotStruct,
} from '@/utils/type.dt'
import { globalActions } from '@/store/globalSlices'
import { store } from '@/store'

const toWei = (num: number) => ethers.parseEther(num.toString())
const fromWei = (num: number) => ethers.formatEther(num)
const { setMovies, setTimeSlots, setBalance } = globalActions

const Contracts = {
  dappCinemasAddress: address.cinemaContract,
  dappTicketsAddress: address.ticketContract,
  dappCinemasAbi: dappCinemasAbi.abi,
  dappTicketsAbi: dappTicketsAbi.abi,
}

let ethereum: any
let tx: any

if (typeof window !== 'undefined') ethereum = (window as any).ethereum

const getEthereumContracts = async () => {
  const accounts = await ethereum?.request?.({ method: 'eth_accounts' })

  if (accounts?.length > 0) {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    const contracts = {
      dappCinemas: new ethers.Contract(
        Contracts.dappCinemasAddress,
        Contracts.dappCinemasAbi,
        signer
      ),
      dappTickets: new ethers.Contract(
        Contracts.dappTicketsAddress,
        Contracts.dappTicketsAbi,
        signer
      ),
    }

    return contracts
  } else {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
    const wallet = ethers.Wallet.createRandom()
    const signer = wallet.connect(provider)
    const contracts = {
      dappCinemas: new ethers.Contract(
        Contracts.dappCinemasAddress,
        Contracts.dappCinemasAbi,
        signer
      ),
      dappTickets: new ethers.Contract(
        Contracts.dappTicketsAddress,
        Contracts.dappTicketsAbi,
        signer
      ),
    }

    return contracts
  }
}

const getMovies = async (): Promise<MovieStruct[]> => {
  const contract = await getEthereumContracts()
  const movies = await contract.dappCinemas.getMovies()
  return structuredMovies(movies)
}

const getMovie = async (movieId: number): Promise<MovieStruct> => {
  const contract = await getEthereumContracts()
  const movies = await contract.dappCinemas.getMovie(movieId)
  return structuredMovies([movies])[0]
}

const getTimeSlots = async (movieId: number): Promise<TimeSlotStruct[]> => {
  const contract = await getEthereumContracts()
  const timeslots = await contract.dappCinemas.getTimeSlots(movieId)
  return structuredSlots(timeslots)
}

const getActiveTimeSlots = async (
  movieId: number
): Promise<TimeSlotStruct[]> => {
  const contract = await getEthereumContracts()
  const timeslots = await contract.dappCinemas.getActiveTimeSlots(movieId)
  return structuredSlots(timeslots)
}

const getTimeSlotsTickets = async (slotId: number): Promise<TicketStruct[]> => {
  const contract = await getEthereumContracts()
  const tickets = await contract.dappTickets.getTickets(slotId)
  return structuredTickets(tickets)
}

const getTimeSlotsHolders = async (slotId: number): Promise<string[]> => {
  const contract = await getEthereumContracts()
  const holders = await contract.dappTickets.getTicketHolders(slotId)
  return holders
}

const createMovie = async (movie: MovieParams): Promise<any> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.dappCinemas.addMovie(
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
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const updateMovie = async (movie: MovieParams): Promise<any> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.dappCinemas.updateMovie(
      movie.id,
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
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const deleteMovie = async (movie: MovieStruct): Promise<any> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.dappCinemas.deleteMovie(movie.id)
    await tx.wait()

    const movies = await getMovies()
    store.dispatch(setMovies(movies))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const createSlot = async (slot: TimeSlotParams): Promise<any> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.dappCinemas.addTimeSlot(
      slot.movieId,
      slot.ticketCosts.map((cost) => toWei(Number(cost))),
      slot.startTimes,
      slot.endTimes,
      slot.capacities,
      slot.days
    )
    await tx.wait()
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const deleteSlot = async (slot: TimeSlotStruct): Promise<any> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.dappTickets.deleteTickets(slot.id)
    await tx.wait()

    const slots = await getTimeSlots(slot.movieId)
    store.dispatch(setTimeSlots(slots))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const finishSlot = async (slot: TimeSlotStruct): Promise<any> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.dappTickets.completeTickets(slot.id)
    await tx.wait()

    const slots = await getTimeSlots(slot.movieId)
    store.dispatch(setTimeSlots(slots))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const bookSlot = async (
  slot: TimeSlotStruct,
  tickets: number
): Promise<any> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.dappTickets.buyTickets(slot.id, tickets, {
      value: toWei(slot.ticketCost),
    })
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const withdrawal = async (receiver: string, amount: number): Promise<any> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.dappTickets.withdrawTo(receiver, toWei(amount))
    await tx.wait()

    const balance = await getBalance()
    store.dispatch(setBalance(balance))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const getBalance = async () => {
  const contract = await getEthereumContracts()
  const balance = await contract.dappTickets.balance()
  return Number(fromWei(balance))
}

const structuredMovies = (movies: MovieStruct[]): MovieStruct[] =>
  movies
    .map((movie) => ({
      id: Number(movie.id),
      name: movie.name,
      banner: movie.banner,
      imageUrl: movie.imageUrl,
      videoUrl: movie.videoUrl,
      genre: movie.genre,
      caption: movie.caption,
      casts: movie.casts,
      released: movie.released,
      running: movie.running,
      description: movie.description,
      timestamp: Number(movie.timestamp),
      deleted: movie.deleted,
    }))
    .sort((a, b) => b.timestamp - a.timestamp)

const structuredSlots = (slots: TimeSlotStruct[]): TimeSlotStruct[] =>
  slots
    .map((slot) => ({
      id: Number(slot.id),
      movieId: Number(slot.movieId),
      ticketCost: Number(fromWei(slot.ticketCost)),
      startTime: Number(slot.startTime),
      endTime: Number(slot.endTime),
      capacity: Number(slot.capacity),
      seats: Number(slot.seats),
      deleted: slot.deleted,
      completed: slot.completed,
      day: Number(slot.day),
      balance: Number(fromWei(slot.balance)),
    }))
    .sort((a, b) => a.day - b.day)

const structuredTickets = (tickets: TicketStruct[]): TicketStruct[] =>
  tickets
    .map((ticket) => ({
      id: Number(ticket.id),
      movieId: Number(ticket.movieId),
      slotId: Number(ticket.slotId),
      cost: Number(fromWei(ticket.cost)),
      timestamp: Number(ticket.timestamp),
      day: Number(ticket.day),
      owner: ticket.owner,
      refunded: ticket.refunded,
    }))
    .sort((a, b) => b.timestamp - a.timestamp)

export {
  getMovies,
  getMovie,
  getTimeSlots,
  getActiveTimeSlots,
  createMovie,
  updateMovie,
  deleteMovie,
  createSlot,
  deleteSlot,
  bookSlot,
  finishSlot,
  getBalance,
  getTimeSlotsTickets,
  getTimeSlotsHolders,
  withdrawal,
}
