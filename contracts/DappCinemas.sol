// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./Base64.sol";

contract DappCinemas is ERC1155, Ownable, ERC1155Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _totalMovies;
    Counters.Counter private _totalTickets;
    Counters.Counter private _totalSlots;

    uint256 public balance;
    mapping(uint256 => bool) movieExists;
    mapping(uint256 => MovieStruct) movies;
    mapping(uint256 => TimeSlotStruct) movieTimeSlot;
    mapping(uint256 => mapping(uint256 => address[])) ticketHolder;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => TicketBuildStruct) public ticketBuild;

    constructor() ERC1155("") {}

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
        uint256 running;
        uint256 released;
        uint256 timestamp;
        bool deleted;
    }

    struct TicketStruct {
        uint256 id;
        uint256 movieId;
        uint256 slotId;
        address owner;
        uint256 cost;
        uint256 timestamp;
        uint256 day;
        bool used;
        bool refunded;
    }

    struct TicketBuildStruct {
        string name;
        string description;
        string bgHue;
        string textHue;
        string value;
        TicketStruct ticket;
    }

    struct TimeSlotStruct {
        uint256 id;
        uint256 movieId;
        uint256 ticketCost;
        uint256 startTime;
        uint256 endTime;
        uint256 capacity;
        uint256 seats;
        bool deleted;
        bool completed;
        uint256 day;
        uint256 balance;
    }

    event Action(string actionType);

    function setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) public onlyOwner {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return buildMetadata(tokenId);
    }

    function buildImage(uint256 _tid) internal view returns (string memory) {
        TicketBuildStruct memory currentTicket = ticketBuild[_tid];

        return
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">',
                        '<rect height="500" width="500" fill="hsl(',
                        currentTicket.bgHue,
                        ', 50%, 25%)"/>',
                        '<text x="50%" y="50%" dominant-baseline="middle" fill="hsl(',
                        currentTicket.textHue,
                        ', 100%, 80%)" text-anchor="middle" font-size="41">',
                        currentTicket.value,
                        "</text>",
                        "</svg>"
                    )
                )
            );
    }

    function buildMetadata(uint256 _tid) internal view returns (string memory) {
        TicketBuildStruct memory currentTicket = ticketBuild[_tid];
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                currentTicket.name,
                                '", "description":"',
                                currentTicket.description,
                                '", "image": "',
                                "data:image/svg+xml;base64,",
                                buildImage(_tid),
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function addMovie(
        string memory name,
        string memory imageUrl,
        string memory videoUrl,
        string memory banner,
        string memory genre,
        string memory casts,
        string memory caption,
        string memory description,
        uint256 running,
        uint256 released
    ) public onlyOwner {
        require(bytes(name).length > 0, "Movie name required");
        require(bytes(imageUrl).length > 0, "Movie image url required");
        require(bytes(videoUrl).length > 0, "Movie video url required");
        require(bytes(banner).length > 0, "Movie banner url required");
        require(bytes(genre).length > 0, "Movie genre required");
        require(bytes(casts).length > 0, "Movie casts required");
        require(bytes(caption).length > 0, "Movie caption required");
        require(running > 0, "Movie running date required");
        require(released > 0, "Movie released date required");
        require(bytes(description).length > 0, "Movie description required");

        _totalMovies.increment();
        MovieStruct memory movie;

        movie.id = _totalMovies.current();
        movie.name = name;
        movie.imageUrl = imageUrl;
        movie.videoUrl = videoUrl;
        movie.banner = banner;
        movie.genre = genre;
        movie.casts = casts;
        movie.caption = caption;
        movie.description = description;
        movie.released = released;
        movie.running = running;
        movie.timestamp = currentTime();

        movies[movie.id] = movie;
        movieExists[movie.id] = true;

        emit Action("Movie added successfully");
    }

    function updateMovie(
        uint256 movieId,
        string memory name,
        string memory imageUrl,
        string memory videoUrl,
        string memory banner,
        string memory genre,
        string memory casts,
        string memory caption,
        string memory description,
        uint256 running,
        uint256 released
    ) public onlyOwner {
        require(movieExists[movieId], "Movie doesn't exist!");
        require(bytes(name).length > 0, "Movie name required");
        require(bytes(imageUrl).length > 0, "Movie image url required");
        require(bytes(banner).length > 0, "Movie banner url required");
        require(bytes(genre).length > 0, "Movie genre required");
        require(bytes(casts).length > 0, "Movie casts required");
        require(bytes(caption).length > 0, "Movie caption required");
        require(bytes(videoUrl).length > 0, "Movie video url required");
        require(running > 0, "Movie running date required");
        require(released > 0, "Movie released date required");
        require(bytes(description).length > 0, "Movie description required");

        movies[movieId].name = name;
        movies[movieId].imageUrl = imageUrl;
        movies[movieId].videoUrl = videoUrl;
        movies[movieId].banner = banner;
        movies[movieId].genre = genre;
        movies[movieId].casts = casts;
        movies[movieId].caption = caption;
        movies[movieId].description = description;
        movies[movieId].released = released;
        movies[movieId].running = running;

        emit Action("Movie updated successfully");
    }

    function deleteMovie(uint256 movieId) public onlyOwner {
        require(movieExists[movieId], "Movie doesn't exist!");
        movies[movieId].deleted = true;
        movieExists[movieId] = false;
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

    function addTimeslot(
        uint256 movieId,
        uint256[] memory ticketCosts,
        uint256[] memory startTimes,
        uint256[] memory endTimes,
        uint256[] memory capacities,
        uint256[] memory viewingDays
    ) public onlyOwner {
        require(movieExists[movieId], "Movie not found");
        require(ticketCosts.length > 0, "Tickets cost must not be empty");
        require(capacities.length > 0, "Capacities must not be empty");
        require(startTimes.length > 0, "Start times cost must not be empty");
        require(endTimes.length > 0, "End times cost must not be empty");
        require(viewingDays.length > 0, "Viewing days must not be empty");
        require(
            ticketCosts.length == viewingDays.length &&
                viewingDays.length == capacities.length &&
                capacities.length == startTimes.length &&
                startTimes.length == endTimes.length &&
                endTimes.length == viewingDays.length,
            "All parameters must have equal array length"
        );

        for (uint256 i = 0; i < viewingDays.length; i++) {
            _totalSlots.increment();
            TimeSlotStruct memory slot;

            slot.id = _totalSlots.current();
            slot.movieId = movieId;
            slot.ticketCost = ticketCosts[i];
            slot.startTime = startTimes[i];
            slot.endTime = endTimes[i];
            slot.day = viewingDays[i];
            slot.capacity = capacities[i];

            movieTimeSlot[slot.id] = slot;
        }
    }

    function deleteTimeSlot(uint256 movieId, uint256 slotId) public onlyOwner {
        require(
            movieExists[movieId] && movieTimeSlot[slotId].movieId == movieId,
            "Movie not found"
        );
        require(!movieTimeSlot[slotId].deleted, "Timeslot already deleted");

        for (uint256 i = 0; i < ticketHolder[movieId][slotId].length; i++) {
            payTo(
                ticketHolder[movieId][slotId][i],
                movieTimeSlot[slotId].ticketCost
            );
        }

        movieTimeSlot[slotId].deleted = true;

        movieTimeSlot[slotId].balance -=
            movieTimeSlot[slotId].ticketCost *
            ticketHolder[movieId][slotId].length;
    }

    function markTimeSlot(uint256 movieId, uint256 slotId) public onlyOwner {
        require(
            movieExists[movieId] && movieTimeSlot[slotId].movieId == movieId,
            "Movie not found"
        );
        require(!movieTimeSlot[slotId].deleted, "Timeslot already deleted");

        movieTimeSlot[slotId].completed = true;
        balance += movieTimeSlot[slotId].balance;
        movieTimeSlot[slotId].balance = 0;
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

    function buyTicket(
        uint256 movieId,
        uint256 slotId,
        uint256 tickets
    ) public payable {
        require(
            movieExists[movieId] && movieTimeSlot[slotId].movieId == movieId,
            "Movie not found"
        );
        require(
            msg.value >= movieTimeSlot[slotId].ticketCost * tickets,
            "Insufficient amount"
        );
        require(
            movieTimeSlot[slotId].capacity > movieTimeSlot[slotId].seats,
            "Out of capacity"
        );

        for (uint256 i = 0; i < tickets; i++) {
            _totalTickets.increment();
            TicketStruct memory ticket;

            ticket.id = _totalTickets.current();
            ticket.cost = movieTimeSlot[slotId].ticketCost;
            ticket.day = movieTimeSlot[slotId].day;
            ticket.slotId = slotId;
            ticket.owner = msg.sender;
            ticket.timestamp = currentTime();

            ticketBuild[ticket.id].ticket = ticket;
            ticketHolder[movieId][slotId].push(msg.sender);
        }

        movieTimeSlot[slotId].seats += tickets;
        movieTimeSlot[slotId].balance +=
            movieTimeSlot[slotId].ticketCost *
            tickets;

        mintBatch(tickets);
    }

    function mintBatch(uint256 _numOfTickets) internal {
        uint256[] memory ids = new uint256[](_numOfTickets);
        uint256[] memory amounts = new uint256[](_numOfTickets);
        uint256 _tokenId = _totalTickets.current() - _numOfTickets;

        for (uint256 i = 0; i < _numOfTickets; i++) {
            _tokenId++;
            string memory ticketNumber = Strings.toString(_tokenId);
            string memory ticketValue = string(
                abi.encodePacked("DPC #", ticketNumber)
            );
            string
                memory description = "These NFTs are actually tickets for Dapp Cinemas.";

            ticketBuild[_tokenId].name = ticketValue;
            ticketBuild[_tokenId].description = description;
            ticketBuild[_tokenId].bgHue = Strings.toString(
                randomNum(361, currentTime(), _tokenId)
            );
            ticketBuild[_tokenId].textHue = Strings.toString(
                randomNum(361, block.timestamp, _tokenId)
            );
            ticketBuild[_tokenId].value = ticketValue;

            setTokenURI(_tokenId, uri(_tokenId));
            ids[i] = _tokenId;
            amounts[i] = 1;
        }

        bytes memory defaultByteData = abi.encodePacked(ids, amounts);
        _mintBatch(msg.sender, ids, amounts, defaultByteData);
    }

    function useTicket(
        uint256 movieId,
        uint256 slotId,
        uint256[] memory ticketIds
    ) public onlyOwner {
        require(ticketIds.length > 0, "Must have at least one ticket Id");
        require(
            movieExists[movieId] && movieTimeSlot[slotId].movieId == movieId,
            "Movie not found"
        );

        for (uint256 i = 0; i < ticketIds.length; i++) {
            ticketBuild[ticketIds[i]].ticket.used = true;
            _burn(ticketBuild[ticketIds[i]].ticket.owner, ticketIds[i], 1);
        }
    }

    function getMovieTicketHolders(
        uint256 movieId,
        uint256 slotId
    ) public view returns (address[] memory) {
        return ticketHolder[movieId][slotId];
    }

    function withdrawTo(address to, uint256 amount) public onlyOwner {
        require(balance >= amount, "Insufficient fund");
        balance -= amount;
        payTo(to, amount);
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function currentTime() internal view returns (uint256) {
        uint256 newNum = (block.timestamp * 1000) + 1000;
        return newNum;
    }

    function randomNum(
        uint256 _mod,
        uint256 _seed,
        uint256 _salt
    ) internal view returns (uint256) {
        uint256 num = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, _seed, _salt)
            )
        ) % _mod;
        return num;
    }
}
