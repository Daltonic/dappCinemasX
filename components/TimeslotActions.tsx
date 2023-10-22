import { Menu } from "@headlessui/react";
import { TfiTicket } from "react-icons/tfi";
import { BsFileEarmarkCheck, BsTrash3 } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Link from "next/link";
import { TimeSlotStruct } from "@/utils/type.dt";

const TimeslotActions: React.FC<{ slot: TimeSlotStruct; index: number }> = ({
  slot,
  index,
}) => {
  const openDeleteSlot = () => {};

  const openFinishSlot = () => {};

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
        {!slot.completed && (
          <>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex justify-start items-center space-x-1 ${
                    active ? "bg-red-500 text-white" : "text-red-500"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={openDeleteSlot}
                >
                  <BsTrash3 size={17} />
                  <span>Delete</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex justify-start items-center space-x-1 ${
                    active ? "bg-gray-200 text-black" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={openFinishSlot}
                >
                  <BsFileEarmarkCheck size={17} />
                  <span>Finish up</span>
                </button>
              )}
            </Menu.Item>
          </>
        )}

        <Menu.Item>
          {({ active }) => (
            <Link
              href={`/ticketholders/${slot.movieId}/${slot.id}`}
              className={`flex justify-start items-center space-x-1 ${
                active ? "bg-gray-200 text-black" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <TfiTicket size={17} />
              <span>Ticket Holders</span>
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default TimeslotActions;
