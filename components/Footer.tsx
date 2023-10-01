import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className="absolute bottom-0 right-0 left-0 flex flex-col
    justify-start border-t border-gray-200 py-3 bg-white">
      <div className="flex content-center items-center justify-between w-full sm:w-4/5 p-2 sm:px-0 mx-auto">
        <p>Made with ♥️ by Dapp Mentors</p>
        <p>&copy;{new Date().getFullYear()} All right reserved.</p>
      </div>
    </div>
  )
}

export default Footer
