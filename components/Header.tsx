import { useState } from 'react'
import Link from 'next/link'
import { MdMenu } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { TbSearch } from 'react-icons/tb'
import { ConnectBtn, Menu } from '.'

const Header: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className="flex flex-col justify-start border-b border-gray-200">
      <div className="flex content-center items-center justify-between w-full sm:w-4/5 p-2 sm:px-0 mx-auto">
        <div className="flex p-2">
          <Link href="/">
            Dapp <span className="text-red-600"> Cinemas</span>
          </Link>
        </div>

        <div className="flex space-x-4 p-1">
          <form>
            <div className="hidden sm:flex border border-gray-200 text-gray-500 p-2 items-center rounded-full min-w-[25vw] max-w-[560px]">
              <TbSearch size={20} className="hidden md:flex" />
              <input
                placeholder="Search everything"
                className="border-none flex-1 text-m px-2 outline-none"
              />
            </div>
          </form>

          <div className='hidden sm:flex'>
          <ConnectBtn />
          </div>
        </div>

        <div className="flex m-4 sm:hidden">
          {toggleMenu ? (
            <AiOutlineClose
              size={20}
              onClick={() => setToggleMenu(false)}
              className="cursor-pointer"
            />
          ) : (
            <MdMenu
              size={30}
              onClick={() => setToggleMenu(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      {toggleMenu && <Menu />}
    </div>
  )
}
export default Header
