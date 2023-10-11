// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./DappShared.sol";
import "./DappCinemas.sol";

contract DappTickets is DappShared {
    using Counters for Counters.Counter;
    Counters.Counter private _totalTickets;
    DappCinemas private dappCinemas;

    uint256 public balance;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => TicketBuildStruct) public ticketBuild;
    mapping(uint256 => address[]) ticketHolder;

    constructor(address _dappCinemas) {
        dappCinemas = DappCinemas(_dappCinemas);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        string memory _tokenURI = _tokenURIs[tokenId];
        return bytes(_tokenURI).length > 0 ? _tokenURI : super.uri(tokenId);
    }

    function deleteTickets(uint256 _slotId) public onlyOwner {
        dappCinemas.deleteTimeSlot(_slotId);
        refundTickets(_slotId);
        emit Action("Tickets refunded");
    }

    function completeTickets(uint256 _slotId) public onlyOwner {
        dappCinemas.completeTimeSlot(_slotId);
        invalidateTickets(_slotId);
        emit Action("Tickets burnt");
    }

    function buyTickets(uint256 slotId, uint256 tickets) public payable {
        require(
            msg.value >= dappCinemas.hasSlot(slotId).ticketCost * tickets,
            "Insufficient amount"
        );
        require(
            dappCinemas.hasSlot(slotId).capacity >
                dappCinemas.hasSlot(slotId).seats,
            "Out of capacity"
        );

        for (uint256 i = 0; i < tickets; i++) {
            _totalTickets.increment();
            TicketStruct memory ticket;

            ticket.id = _totalTickets.current();
            ticket.cost = dappCinemas.hasSlot(slotId).ticketCost;
            ticket.day = dappCinemas.hasSlot(slotId).day;
            ticket.slotId = slotId;
            ticket.owner = msg.sender;
            ticket.timestamp = currentTime();

            ticketBuild[ticket.id].ticket = ticket;
            ticketHolder[slotId].push(msg.sender);
        }

        dappCinemas.hasSlot(slotId).seats += tickets;
        dappCinemas.hasSlot(slotId).balance +=
            dappCinemas.hasSlot(slotId).ticketCost *
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

    function invalidateTickets(uint256 slotId) internal onlyOwner {
        require(dappCinemas.hasSlot(slotId).id == slotId, "Slot not found");

        for (uint256 i = 1; i <= _totalTickets.current(); i++) {
            if (ticketBuild[i].ticket.id == i && !ticketBuild[i].ticket.used) {
                ticketBuild[i].ticket.used = true;
                balance += ticketBuild[i].ticket.cost;
            }
        }
    }

    function refundTickets(uint256 slotId) internal onlyOwner {
        require(dappCinemas.hasSlot(slotId).id == slotId, "Slot not found");

        for (uint256 i = 1; i <= _totalTickets.current(); i++) {
            uint256 _tokenId = ticketBuild[i].ticket.id;
            uint256 amount = ticketBuild[i].ticket.cost;
            address owner = ticketBuild[i].ticket.owner;

            if (_tokenId == i && !ticketBuild[i].ticket.used) {
                ticketBuild[i].ticket.refunded = true;
                payTo(owner, amount);
                _burn(owner, _tokenId, 1);
            }
        }
    }

    function getTicketHolders(
        uint256 slotId
    ) public view returns (address[] memory Holders) {
        uint256 available;
        for (uint256 i = 1; i <= _totalTickets.current(); i++) {
            if (
                ticketBuild[i].ticket.slotId == slotId &&
                !ticketBuild[i].ticket.refunded
            ) available++;
        }

        Holders = new address[](available);

        uint256 index;
        for (uint256 i = 1; i <= _totalTickets.current(); i++) {
            if (
                ticketBuild[i].ticket.slotId == slotId &&
                !ticketBuild[i].ticket.refunded
            ) {
                Holders[index++] = ticketBuild[i].ticket.owner;
            }
        }
    }

    function withdrawTo(address to, uint256 amount) public onlyOwner {
        require(balance >= amount, "Insufficient fund");
        balance -= amount;
        payTo(to, amount);
    }
}
