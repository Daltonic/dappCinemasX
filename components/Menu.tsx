import Link from 'next/link'
import { TbSearch } from 'react-icons/tb'

const Menu: React.FC = () => {
  return (
    <div className="flex flex-col justify-center w-full p-2 space-y-2 sm:hidden">
      <div className="flex space-x-4 p-2 justify-center w-full  shadow-md">
        <form>
          <div className="flex border border-gray-200 text-gray-500 p-2 items-center rounded-full min-w-[25vw] max-w-[560px]">
            <TbSearch size={20} className="hidden md:flex" />
            <input
              placeholder="Search everything"
              className="border-none flex-1 text-m px-2 outline-none"
            />
          </div>
        </form>
      </div>

      <div className="flex flex-col space-y-4 items-center text-center w-full  ">
        <Link className="p-2 shadow-md w-full bg-white" href="/">
          Movies
        </Link>
        <Link className="p-2 shadow-md w-full bg-white" href="/manage/movies">
          Manage Movie
        </Link>
        <Link className="p-2 shadow-md w-full bg-white" href="/add/movies">
          Add Movie
        </Link>
        <div className="flex mt-4 list-none">
          <button
            type="button"
            className="inline-block px-6 py-2 border-2 border-red-600  font-medium text-xs leading-tight uppercase rounded-full hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-gradient-to-r from-cyan-500 to-red-500 hover:text-white hover:border-white"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  )
}

export default Menu
