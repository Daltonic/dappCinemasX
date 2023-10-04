import React from 'react'
import { FaDollarSign, FaUserLock } from 'react-icons/fa'

const SubscribeBtn: React.FC = () => {
  const subscribed = false
  return (
    <section className="container mx-auto p-6 flex flex-col items-stretch justify-center gap-2 sm:items-center">
      <div className="flex rounded-xl bg-gray-100 p-1 text-gray-900 dark:bg-gray-900">
        <div className="flex w-full list-none gap-1">
          {/* DMA Button with Pop-up */}
          <div className="relative group w-1/2">
            <button type="button" className="w-full cursor-pointer">
              <div
                className={`flex w-full items-center justify-center gap-1 rounded-lg border py-3
                outline-none transition-opacity duration-100 sm:w-auto sm:min-w-[148px] md:gap-2
                md:py-2.5 border-black/10 hover:!opacity-100 px-2.5
                text-gray-500 hover:text-white ${
                  subscribed
                    ? 'text-gray-500 hover:text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                <FaUserLock />
                <span className="truncate text-sm font-medium md:pr-1.5 pr-1.5">
                  Free
                </span>
              </div>
            </button>
            {/* Pop-up */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white py-2 px-4 rounded-lg text-sm w-max">
              You are on free membership
            </div>
          </div>

          {/* DMA Plus Button with Pop-up */}
          <div className="relative group w-1/2">
            <button
              onClick={() => console.log('Subscribed')}
              type="button"
              className="w-full cursor-pointer"
            >
              <div
                className={`flex w-full items-center justify-center gap-1 rounded-lg border py-3
                    outline-none transition-opacity duration-100 sm:w-auto sm:min-w-[148px]
                    md:py-2.5 border-transparent px-2.5
                    text-gray-500 hover:text-white ${
                      !subscribed
                        ? 'text-gray-500 hover:text-white'
                        : 'bg-red-600 text-white'
                    }`}
              >
                <FaDollarSign className="text-red-700" />
                <span className="truncate text-sm font-medium md:pr-1.5 pr-1.5">
                  8.44 Plus
                </span>
              </div>
            </button>
            {/* Pop-up */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white py-2 px-4 rounded-lg text-sm w-max">
              Subscribe to access Dapp Cinemas Plus Resources
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubscribeBtn
