// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./DappShared.sol";

contract DappCinemas is DappShared, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _totalMovies;
    Counters.Counter private _totalSlots;

    struct MovieStruct {
        uint256 id;
        string name;
        string banner;
        string imageUrl;
        string videoUrl;
        string genre;
        string description;
        string caption;
        string casts;
        string running;
        string released;
        uint256 timestamp;
        bool deleted;
    }

    mapping(uint256 => bool) movieExists;
    mapping(uint256 => MovieStruct) movies;
    mapping(uint256 => TimeSlotStruct) movieTimeSlot;

    bytes32 public constant TICKET_ROLE = keccak256("TICKET_ROLE");
    address _current_controller;

    function grantAccess(address _dappTicket) public onlyOwner {
        _setupRole(TICKET_ROLE, _dappTicket);
        _revokeRole(TICKET_ROLE, _current_controller);
        _current_controller = _dappTicket;
    }

    function addMovie(
        string memory _name,
        string memory _banner,
        string memory _imageUrl,
        string memory _videoUrl,
        string memory _genre,
        string memory _description,
        string memory _caption,
        string memory _casts,
        string memory _running,
        string memory _released
    ) public onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_banner).length > 0, "Banner cannot be empty");
        require(bytes(_imageUrl).length > 0, "ImageUrl cannot be empty");
        require(bytes(_videoUrl).length > 0, "VideoUrl cannot be empty");
        require(bytes(_genre).length > 0, "Genre cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_caption).length > 0, "Caption cannot be empty");
        require(bytes(_running).length > 0, "Running cannot be empty");
        require(bytes(_released).length > 0, "Released cannot be empty");

        _totalMovies.increment();
        uint256 movieId = _totalMovies.current();

        MovieStruct memory movie;
        movie.id = movieId;
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

        movies[movieId] = movie;
        movieExists[movieId] = true;

        emit Action("Movie Added");
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
        string memory _running,
        string memory _released
    ) public onlyOwner {
        require(movieExists[_movieId], "Movie not found");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_banner).length > 0, "Banner cannot be empty");
        require(bytes(_imageUrl).length > 0, "ImageUrl cannot be empty");
        require(bytes(_videoUrl).length > 0, "VideoUrl cannot be empty");
        require(bytes(_genre).length > 0, "Genre cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_caption).length > 0, "Caption cannot be empty");
        require(bytes(_running).length > 0, "Running cannot be empty");
        require(bytes(_released).length > 0, "Released cannot be empty");

        movies[_movieId].id = _movieId;
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
        require(movieExists[_movieId], "Movie not found");

        movies[_movieId].deleted = true;
        movieExists[_movieId] = false;

        emit Action("Movie updated");
    }

    function addTimeSlot(
        uint256 _movieId,
        uint256[] memory _ticketCosts,
        uint256[] memory _startTimes,
        uint256[] memory _endTimes,
        uint256[] memory _capacities,
        uint256[] memory _days
    ) public onlyOwner {
        require(movieExists[_movieId], "Movie not found");
        require(_ticketCosts.length > 0, "Ticket costs cannot be empty");
        require(_startTimes.length > 0, "Start times cannot be empty");
        require(_endTimes.length > 0, "End times cannot be empty");
        require(_capacities.length > 0, "Capacities cannot be empty");
        require(_days.length > 0, "Days cannot be empty");
        require(
            _ticketCosts.length == _startTimes.length &&
            _startTimes.length == _endTimes.length &&
            _endTimes.length == _capacities.length &&
            _capacities.length == _days.length &&
            _days.length == _ticketCosts.length,
            "Unequal array memebers detected"
        );

        for(uint256 i = 0; i < _ticketCosts.length; i++) {
            _totalSlots.increment();
            uint256 slotId = _totalSlots.current();

            TimeSlotStruct memory slot;
            slot.id = slotId;
            slot.movieId = _movieId;
            slot.ticketCost = _ticketCosts[i];
            slot.startTime = _startTimes[i];
            slot.endTime = _endTimes[i];
            slot.day = _days[i];

            movieTimeSlot[slotId] = slot;
        }

        emit Action("Timeslot created");
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
    
    function setTimeSlot(TimeSlotStruct memory slot) public {
        require(hasRole(TICKET_ROLE, msg.sender), "Caller is not a ticket contract");
        
        movieTimeSlot[slot.id] = slot;
    }

    function getMovies() public view returns (MovieStruct[] memory Movies) {
        uint256 available;
        for (uint i = 1; i <= _totalMovies.current(); i++) {
            if(!movies[i].deleted) available++;
        }

        Movies = new MovieStruct[](available);

        uint256 index;
        for (uint i = 1; i <= _totalMovies.current(); i++) {
            if(!movies[i].deleted) Movies[index++] = movies[i];
        }
    }
    
    function getMovie(uint256 _movieId) public view returns (MovieStruct memory) {
        return movies[_movieId];
    }

    function getTimeSlotByDay(uint256 _day) public view returns (TimeSlotStruct[] memory Slots) {
        uint256 available;
        for (uint i = 1; i <= _totalSlots.current(); i++) {
            if(
                movieTimeSlot[i].day == _day &&
                !movieTimeSlot[i].deleted
            ) {
                available++;
            }
        }

        Slots = new TimeSlotStruct[](available);

        uint256 index;
        for (uint i = 1; i <= _totalSlots.current(); i++) {
            if(
                movieTimeSlot[i].day == _day &&
                !movieTimeSlot[i].deleted
            ) {
                Slots[index].startTime = movieTimeSlot[i].startTime;
                Slots[index++].endTime = movieTimeSlot[i].endTime;
            }
        }
    }

    function getTimeSlot(uint256 _slotId) public view returns (TimeSlotStruct memory) {
        return movieTimeSlot[_slotId];
    }

    function getTimeSlots(uint256 _movieId) public view returns (TimeSlotStruct[] memory Slots) {
        uint256 available;
        for (uint i = 1; i <= _totalSlots.current(); i++) {
            if(
                movieTimeSlot[i].movieId == _movieId &&
                !movieTimeSlot[i].deleted
            ) {
                available++;
            }
        }

        Slots = new TimeSlotStruct[](available);

        uint256 index;
        for (uint i = 1; i <= _totalSlots.current(); i++) {
            if(
                movieTimeSlot[i].movieId == _movieId &&
                !movieTimeSlot[i].deleted
            ) {
                Slots[index++] = movieTimeSlot[i];
            }
        }
    }
    
    function getActiveTimeSlots(uint256 _movieId) public view returns (TimeSlotStruct[] memory Slots) {
        uint256 available;
        for (uint i = 1; i <= _totalSlots.current(); i++) {
            if(
                movieTimeSlot[i].movieId == _movieId &&
                !movieTimeSlot[i].deleted &&
                !movieTimeSlot[i].completed
            ) {
                available++;
            }
        }

        Slots = new TimeSlotStruct[](available);

        uint256 index;
        for (uint i = 1; i <= _totalSlots.current(); i++) {
            if(
                movieTimeSlot[i].movieId == _movieId &&
                !movieTimeSlot[i].deleted &&
                !movieTimeSlot[i].completed
            ) {
                Slots[index++] = movieTimeSlot[i];
            }
        }
    }
}
