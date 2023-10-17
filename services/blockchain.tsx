import { ethers } from 'ethers'
import address from '@/contracts/contractAddress.json'
import dappCinemasAbi from '@/artifacts/contracts/DappCinemas.sol/DappCinemas.json'
import dappTicketsAbi from '@/artifacts/contracts/DappTickets.sol/DappTickets.json'
import { MovieParams, MovieStruct } from '@/utils/type.dt'

const toWei = (num: number) => ethers.parseEther(num.toString())
const fromWei = (num: number) => ethers.formatEther(num)

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

const getMovies = async (): Promise<MovieStruct[]> => {
  const contract = await getEthereumContract()
  const movies = await contract.dappCinemas.getMovies()
  return structuredMovies(movies)
}

const loadData = async () => {}

const structuredMovies = (movies: MovieStruct[]): MovieStruct[] =>
  movies
    .map((movie) => ({
      id: Number(movie.id),
      name: movie.name,
      banner: movie.banner,
      imageUrl: movie.imageUrl,
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

export { createMovie, loadData, getMovies }
