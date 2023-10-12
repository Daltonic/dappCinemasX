// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./DappShared.sol";
import "./DappCinemas.sol";
import "./Base64.sol";

contract DappTickets is DappShared, ERC1155, ERC1155Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _totalTickets;
    DappCinemas private dappCinemas;

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

    uint256 public balance;
    string public name;
    string public symbol;

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => TicketBuildStruct) public ticketBuild;
    mapping(uint256 => address[]) ticketHolder;

    constructor(
        address _dappCinemas,
        string memory _name,
        string memory _symbol
    ) ERC1155("") {
        dappCinemas = DappCinemas(_dappCinemas);
        name = _name;
        symbol = _symbol;
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
                abi.encodePacked(symbol, " #", ticketNumber)
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

            _tokenURIs[_tokenId] = uri(_tokenId);
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
                                '", "attributes": [{"trait_type": "Background Hue", "value": "',
                                currentTicket.bgHue,
                                '"}, {"trait_type": "Text Hue", "value": "',
                                currentTicket.textHue,
                                '"}]}'
                            )
                        )
                    )
                )
            );
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
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
