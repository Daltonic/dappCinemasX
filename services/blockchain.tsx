import { ethers } from 'ethers'
import address from '@/contracts/contractAddress.json'
import dappCinemasAbi from '@/artifacts/contracts/DappCinemas.sol/DappCinemas.json'
import dappTicketsAbi from '@/artifacts/contracts/DappTickets.sol/DappTickets.json'
import {
  MovieParams,
  MovieStruct,
  TimeSlotParams,
  TimeSlotStruct,
} from '@/utils/type.dt'
import { store } from '@/store'
import { globalActions } from '@/store/globalSlices'

const toWei = (num: number) => ethers.parseEther(num.toString())
const fromWei = (num: number) => ethers.formatEther(num)

const { setMovies } = globalActions

const Contract = {
  dappCinemasAddress: address.cinemaContract,
  dappTicketsAddress: address.ticketContract,
  dappCinemasAbi: dappCinemasAbi.abi,
  dappTicketsAbi: dappTicketsAbi.abi,
}

let ethereum: any
let tx: any

if (typeof window !== 'undefined') ethereum = (window as any).ethereum

const getEthereumContract = async () => {
  const accounts = await ethereum?.request?.({ method: 'eth_accounts' })
  if (accounts?.length > 0) {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    const contract = {
      dappCinemas: new ethers.Contract(
        Contract.dappCinemasAddress,
        Contract.dappCinemasAbi,
        signer
      ),
      dappTickets: new ethers.Contract(
        Contract.dappTicketsAddress,
        Contract.dappTicketsAbi,
        signer
      ),
    }
    return contract
  } else {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
    const wallet = ethers.Wallet.createRandom()
    const signer = wallet.connect(provider)
    const contract = {
      dappCinemas: new ethers.Contract(
        Contract.dappCinemasAddress,
        Contract.dappCinemasAbi,
        signer
      ),
      dappTickets: new ethers.Contract(
        Contract.dappTicketsAddress,
        Contract.dappTicketsAbi,
        signer
      ),
    }
    return contract
  }
}

const createMovie = async (movie: MovieParams) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.dappCinemas.addMovie(
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

const updateMovie = async (movie: MovieParams) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.dappCinemas.updateMovie(
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

const deleteMovie = async (movie: MovieParams) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.dappCinemas.deleteMovie(movie.id)

    await tx.wait()

    const movies = await getMovies()
    store.dispatch(setMovies(movies))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const getMovies = async (): Promise<MovieStruct[]> => {
  const contract = await getEthereumContract()
  const movies = await contract.dappCinemas.getMovies()
  return structuredMovies(movies)
}

const getMovie = async (movieId: number): Promise<MovieStruct> => {
  const contract = await getEthereumContract()
  const movie = await contract.dappCinemas.getMovie(movieId)
  return structuredMovies([movie])[0]
}

const createSlot = async (data: TimeSlotParams) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.dappCinemas.addTimeSlot(
      data.movieId,
      data.ticketCosts.map((cost) => toWei(Number(cost))),
      data.startTimes,
      data.endTimes,
      data.capacities,
      data.days
    )

    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const getTimeSlots = async (movieId: number): Promise<TimeSlotStruct[]> => {
  const contract = await getEthereumContract()
  const timeSlots = await contract.dappCinemas.getTimeSlots(movieId)
  return structuredSlots(timeSlots)
}

const loadData = async () => {}

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
    .sort((a, b) => b.startTime - a.startTime)

export {
  createMovie,
  updateMovie,
  deleteMovie,
  loadData,
  getMovies,
  getMovie,
  createSlot,
  getTimeSlots
}
