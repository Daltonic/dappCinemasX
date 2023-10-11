// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./DappShared.sol";

contract DappCinemas is DappShared {
    using Counters for Counters.Counter;
    Counters.Counter private _totalMovies;
    Counters.Counter private _totalSlots;

    mapping(uint256 => bool) movieExists;
    mapping(uint256 => MovieStruct) movies;
    mapping(uint256 => TimeSlotStruct) movieTimeSlot;

    bytes32 public constant TICKET_ROLE = keccak256("TICKET_ROLE");
    address _current_controller;

    function grantAccess(address _dappCinemas) public onlyOwner {
        _setupRole(TICKET_ROLE, _dappCinemas);
        _revokeRole(TICKET_ROLE, _current_controller);
        _current_controller = _dappCinemas;
    }

    function hasSlot(
        uint256 slotId
    ) public view returns (TimeSlotStruct memory) {
        return movieTimeSlot[slotId];
    }

    // Movie related functions
    function addMovie(
        string memory _name,
        string memory _banner,
        string memory _imageUrl,
        string memory _videoUrl,
        string memory _genre,
        string memory _description,
        string memory _caption,
        string memory _casts,
        uint256 _running,
        uint256 _released
    ) public onlyOwner {
        _totalMovies.increment();
        uint256 newMovieId = _totalMovies.current();

        MovieStruct memory movie;
        movie.id = newMovieId;
        movie.name = _name;
        movie.banner = _banner;
        movie.imageUrl = _imageUrl;
        movie.videoUrl = _videoUrl;
        movie.genre = _genre;
        movie.description = _description;
        movie.caption = _caption;
        movie.casts = _casts;
        movie.running = _running;
        movie.released = _released;
        movie.timestamp = currentTime();

        movies[newMovieId] = movie;
        movieExists[newMovieId] = true;

        emit Action("Movie added");
    }

    function updateMovie(
        uint256 _movieId,
        string memory _name,
        string memory _banner,
        string memory _imageUrl,
        string memory _videoUrl,
        string memory _genre,
        string memory _description,
        string memory _caption,
        string memory _casts,
        uint256 _running,
        uint256 _released
    ) public onlyOwner {
        require(movieExists[_movieId], "Movie does not exist");

        movies[_movieId].name = _name;
        movies[_movieId].banner = _banner;
        movies[_movieId].imageUrl = _imageUrl;
        movies[_movieId].videoUrl = _videoUrl;
        movies[_movieId].genre = _genre;
        movies[_movieId].description = _description;
        movies[_movieId].caption = _caption;
        movies[_movieId].casts = _casts;
        movies[_movieId].running = _running;
        movies[_movieId].released = _released;

        emit Action("Movie updated");
    }

    function deleteMovie(uint256 _movieId) public onlyOwner {
        require(movieExists[_movieId], "Movie does not exist");

        movies[_movieId].deleted = true;
        movieExists[_movieId] = false;

        emit Action("Movie deleted");
    }

    // Timeslot related functions
    function addTimeSlot(
        uint256 _movieId,
        uint256 _ticketCost,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _capacity,
        uint256 _day
    ) public onlyOwner {
        require(movieExists[_movieId], "Movie does not exist");

        _totalSlots.increment();
        uint256 newSlotId = _totalSlots.current();

        TimeSlotStruct memory timeSlot;
        timeSlot.id = newSlotId;
        timeSlot.movieId = _movieId;
        timeSlot.ticketCost = _ticketCost;
        timeSlot.startTime = _startTime;
        timeSlot.endTime = _endTime;
        timeSlot.capacity = _capacity;
        timeSlot.seats = 0;
        timeSlot.deleted = false;
        timeSlot.completed = false;
        timeSlot.day = _day;
        timeSlot.balance = 0;

        movieTimeSlot[newSlotId] = timeSlot;

        emit Action("Timeslot added");
    }

    function deleteTimeSlot(uint256 _slotId) public {
        require(hasRole(TICKET_ROLE, msg.sender), "Caller is not a ticket contract");
        movieTimeSlot[_slotId].deleted = true;
        emit Action("Timeslot deleted");
    }

    function completeTimeSlot(uint256 _slotId) public {
        require(hasRole(TICKET_ROLE, msg.sender), "Caller is not a ticket contract");
        movieTimeSlot[_slotId].completed = true;
        emit Action("Timeslot completed");
    }

    function getMovies() public view returns (MovieStruct[] memory Movies) {
        uint256 totalMovies;
        for (uint256 i = 1; i <= _totalMovies.current(); i++) {
            if (!movies[i].deleted) totalMovies++;
        }

        Movies = new MovieStruct[](totalMovies);

        uint256 index;
        for (uint256 i = 1; i <= _totalMovies.current(); i++) {
            if (!movies[i].deleted) {
                Movies[index++] = movies[i];
            }
        }
    }

    function getMovie(
        uint256 movieId
    ) public view returns (MovieStruct memory) {
        return movies[movieId];
    }

    function getTimeSlotsByDay(
        uint256 day
    ) public view returns (TimeSlotStruct[] memory MovieSlots) {
        uint256 available;
        for (uint256 i = 0; i < _totalSlots.current(); i++) {
            if (
                movieTimeSlot[i + 1].day == day && !movieTimeSlot[i + 1].deleted
            ) {
                available++;
            }
        }

        MovieSlots = new TimeSlotStruct[](available);

        uint256 index;
        for (uint256 i = 0; i < _totalSlots.current(); i++) {
            if (
                movieTimeSlot[i + 1].day == day && !movieTimeSlot[i + 1].deleted
            ) {
                MovieSlots[index].startTime = movieTimeSlot[i + 1].startTime;
                MovieSlots[index++].endTime = movieTimeSlot[i + 1].endTime;
            }
        }
    }

    function getTimeSlot(
        uint256 slotId
    ) public view returns (TimeSlotStruct memory) {
        return movieTimeSlot[slotId];
    }

    function getTimeSlots(
        uint256 movieId
    ) public view returns (TimeSlotStruct[] memory MovieSlots) {
        uint256 available;
        for (uint256 i = 0; i < _totalSlots.current(); i++) {
            if (
                movieTimeSlot[i + 1].movieId == movieId &&
                !movieTimeSlot[i + 1].deleted
            ) {
                available++;
            }
        }

        MovieSlots = new TimeSlotStruct[](available);

        uint256 index;
        for (uint256 i = 0; i < _totalSlots.current(); i++) {
            if (
                movieTimeSlot[i + 1].movieId == movieId &&
                !movieTimeSlot[i + 1].deleted
            ) {
                MovieSlots[index++] = movieTimeSlot[i + 1];
            }
        }
    }
}
