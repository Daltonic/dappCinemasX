import React from 'react'

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center my-5 py-2 space-y-2">
      <h4 className="font-bold text-2xl">About Us</h4>
      <p className='w-full sm:w-2/3'>
        Welcome to the ultimate luxury movie Cinema showing with a private
        lounge, plus electronic recliner seats. This cinema sets the new
        benchmark for multiplexes in Rivers State. by introducing a
        sophisticated club ambiance, serving a wide variety of fine food and top
        wine list.
      </p>
      <div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-full
            hover:bg-green-500 transition duration-300 mt-4"
        >
          Contact Us
        </button>
      </div>
    </div>
  )
}

export default Contact
