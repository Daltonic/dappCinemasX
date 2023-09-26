import Link from 'next/link'
import { TbSearch } from 'react-icons/tb'
import { ConnectBtn } from '.'

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

        <ConnectBtn />
      </div>
    </div>
  )
}

export default Menu
