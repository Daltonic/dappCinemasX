import Image from 'next/image'
import React from 'react'
import { BsChatSquareDots } from 'react-icons/bs'
import { CgIfDesign } from 'react-icons/cg'
import { FaSwatchbook } from 'react-icons/fa'

const Offers: React.FC = () => {
  const items = [
    'https://cdn.britannica.com/08/190708-050-634BBDC0/Woman-container-popcorn-cinema-movie-theater.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAf1FsKL9TZ5Isml9NPV1_P666Y_YjNvKMYqTeIlJgFpPrehKt2Q4qGBQ1YCn7ueEGw7s&usqp=CAU',
    'https://img.freepik.com/premium-photo/film-movie-background-clapperboard-film-reels-theater_488220-20500.jpg',
    'https://us.123rf.com/450wm/ket4up/ket4up1805/ket4up180500017/102674789-cinema-tickets-background-vector-movie-poster-illustration.jpg?ver=6',
    'https://media.istockphoto.com/id/1175497926/photo/interior-of-empty-movie-theater-with-red-seats.webp?b=1&s=170667a&w=0&k=20&c=O2tWR8sOOJkFgrgEWoBp3_3yWHVPZ--_gnccYSIHfQc=',
    'https://media.npr.org/assets/img/2020/05/05/plazamarqueeduringclosure_custom-965476b67c1a760bdb3e16991ce8d65098605f62-s1100-c50.jpeg',
  ]

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row px-4 py-8 space-x-4">
          <div className="w-full sm:w-8/12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {items.map((item: any, i: number) => (
                <div key={i} className="flex flex-col col-span-1 md:col-span-1">
                  <div
                    className="p-4 rounded-lg shadow-lg overflow-hidden
                    hover:shadow-xl transition duration-300 transform hover:scale-105 flex-grow h-44"
                  >
                    <Image
                      src={item}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full sm:w-4/12 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Dapp Cinemas Zone</h2>
            <div className="mb-4">
              <span className="font-semibold">
                3 big reasons to join the Kada Cinemas Zone Community
                <a href="#"></a>
              </span>
            </div>

            <ul className="space-y-2">
              <li className="mb-2 flex items-center">
                <div className="rounded-full bg-gray-100 p-4">
                  <BsChatSquareDots className="text-black text-xl" />
                </div>
                <span className="text ml-2">
                  Share your opinion on films on Dapp cinema platform
                </span>
              </li>
              <li className="mb-2 flex items-center">
                <div className="rounded-full bg-gray-100 p-4">
                  <CgIfDesign className="text-black text-xl" />
                </div>
                <span className="text ml-2">
                  Customize your Cinema showtimes and find relevant information.
                </span>
              </li>
              <li className="mb-2 flex items-center">
                <div className="rounded-full bg-gray-100 p-4">
                  <FaSwatchbook className="text-black text-xl" />
                </div>
                <span className="text ml-2">
                  Add films to your Watchlist - your personal film brain...
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offers
