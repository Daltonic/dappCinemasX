import { Menu } from "@headlessui/react";
import { FiEdit } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Link from "next/link";
import { MovieStruct } from "@/utils/type.dt";

const MovieActions: React.FC<{ movie: MovieStruct; index: number }> = ({
  movie,
  index,
}) => {
  const openDeleteMovie = () => {};

  return (
    <Menu as="div" className="relative text-left">
      <Menu.Button
        className="inline-flex w-full justify-center
          rounded-lg px-4 py-2 text-sm font-medium text-black
          hover:bg-opacity-30 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75"
      >
        <BiDotsVerticalRounded size={17} />
      </Menu.Button>
      <Menu.Items
        className={`absolute right-10 ${
          index === 0 ? `top-10` : `bottom-10`
        } mt-2 w-56 origin-top-right
        divide-y divide-gray-100 rounded-md bg-white shadow-md 
        ing-1 ring-black ring-opacity-5 focus:outline-none z-40`}
      >
        <Menu.Item>
          {({ active }) => (
            <Link
              href={`/movie/edit/` + movie.id}
              className={`flex justify-start items-center space-x-1 ${
                active ? "bg-gray-200 text-black" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <FiEdit size={17} />
              <span>Edit</span>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              href={"/timeslots/" + movie.id}
              className={`flex justify-start items-center space-x-1 ${
                active ? "bg-gray-200 text-black" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <FaRegCalendarCheck size={17} />
              <span>Slots</span>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? "bg-red-500 text-white" : "text-red-500"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              onClick={openDeleteMovie}
            >
              <BsTrash3 size={17} />
              <span>Delete</span>
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default MovieActions;
