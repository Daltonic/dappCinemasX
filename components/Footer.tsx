import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col justify-start border-t border-gray-200 py-3">
      <div className="flex content-center items-center justify-between w-full sm:w-4/5 p-2 sm:px-0 mx-auto">
        <p>Made with ♥️ by Dapp Mentors</p>
        <p>&copy;{new Date().getFullYear()} right reserved.</p>
      </div>
    </div>
  )
}

export default Footer
