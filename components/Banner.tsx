const Banner: React.FC = () => {
  const Image =
    'https://github.com/Daltonic/dappCinemas/blob/main/src/asset/heroimage.jpg?raw=true'
  return (
    <div
      style={{ backgroundImage: 'url(' + Image + ')' }}
      className="w-full h-full rounded-3xl bg-no-repeat bg-cover bg-center mb-4 flex flex-col"
    >
      <div className="text-white p-8 space-y-8">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold">AVATAR</h3>
          <p className="text-xl font-medium">THE WAY OF THE WATER</p>
        </div>
        <button
          className="bg-transparent font-bold border-2 border-red-600
            py-2 px-8 text-black rounded-full
            transition duration-300 ease-in-out
            hover:border-white hover:text-white"
        >
          WATCH
        </button>
      </div>
    </div>
  )
}

export default Banner
