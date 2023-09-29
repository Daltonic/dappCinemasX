import React from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { Menu } from '@headlessui/react'
import Link from 'next/link'

const NavBtn = () => {
  return (
    <Menu as="div" className="relative text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className="p-3 bg-red-600 rounded-full text-white shadow-lg
          fixed right-10 bottom-10"
          >
            <HiChevronDown
              size={17}
              className={
                open
                  ? 'rotate-180 transform transition-transform duration-300'
                  : 'transform transition-transform duration-300'
              }
            />
          </Menu.Button>
          <Menu.Items
            className="fixed right-10 bottom-[90px] w-56 origin-top-right
            divide-y divide-gray-200 rounded-md shadow-lg
            ing-1 ring-opacity-5 focus:outline-none border border-gray-200"
          >
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={'/'}
                  className={`flex justify-start items-center bg-white space-x-1 ${
                    active ? 'text-white bg-red-600' : 'text-black'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm
                  hover:bg-red-600 hover:text-white`}
                >
                  <span>Home</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={'/movie/add'}
                  className={`flex justify-start items-center bg-white space-x-1 ${
                    active ? 'text-white bg-red-600' : 'text-black'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm
                hover:bg-red-600 hover:text-white`}
                >
                  <span>Add Movie</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={'/movie/manage'}
                  className={`flex justify-start items-center bg-white space-x-1 ${
                    active ? 'text-white bg-red-600' : 'text-black'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm
                hover:bg-red-600 hover:text-white`}
                >
                  <span>Manage Movies</span>
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}

export default NavBtn
