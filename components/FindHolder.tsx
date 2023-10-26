import { globalActions } from '@/store/globalSlices'
import { RootState } from '@/utils/type.dt'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { TbSearch } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'

const FindHolder = () => {
  const { findHoldersModal, holders } = useSelector(
    (states: RootState) => states.globalStates
  )

  const { setFindHoldersModal } = globalActions
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setFindHoldersModal('scale-0'))
  }

  const [address, setAddress] = useState('')
  const [addresses, setAddresses] = useState<string[]>([])

  const handleSearch = (characters: string) => {
    const sanitizedCharacters = characters.trim().toLowerCase()
    setAddress(sanitizedCharacters)
    setAddresses([])

    if (sanitizedCharacters !== '') {
      for (let i = 0; i < holders.length; i++) {
        const walletAddress = holders[i].toLowerCase()
        if (walletAddress.trim() !== '') {
          const regex = /^0x[a-fA-F0-9]{40}$/
          if (
            regex.test(walletAddress) &&
            walletAddress.includes(sanitizedCharacters)
          ) {
            setAddresses((prevState) => [walletAddress, ...prevState])
          }
        }
      }
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${findHoldersModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Find Holder</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <div
              className="flex border border-gray-200 text-gray-500 p-2
              items-center rounded-full w-full"
            >
              <TbSearch size={20} className="hidden md:flex" />
              <input
                onChange={(e) => handleSearch(e.target.value)}
                value={address}
                placeholder="Search holders ETH address"
                className="border-none flex-1 text-m px-2 outline-none"
              />
            </div>
          </div>

          {addresses.length > 0 && (
            <div className="flex flex-col justify-center items-center rounded-xl mb-5">
              <div className="text-red-800 font-medium">
                Found {addresses.length} match(es)
              </div>
              <div className="mt-2">
                {addresses.map((address, i) => (
                  <pre key={i}>{address}</pre>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FindHolder
