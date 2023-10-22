import { RiErrorWarningFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";

const DeleteMovie: React.FC = () => {
  const deleteModal = "scale-0",
    movie = null;

  const closeModal = () => {};

  const handleSubmit = async () => {
    console.log(movie);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${deleteModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Delete Movie</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <RiErrorWarningFill className="text-6xl text-red-700 " />
            <p className="p-2">
              Are you sure you want to delete{" "}
              <span className="italic">{`"INSERT MOVIE NAME"`}</span>
            </p>
          </div>

          <button
            className="flex flex-row justify-center items-center w-full text-white text-md
            bg-red-600 py-2 px-5 rounded-full drop-shadow-xl border border-transparent
            hover:bg-transparent hover:border-red-500 hover:text-red-500 focus:outline-none mt-5"
            onClick={handleSubmit}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovie;
