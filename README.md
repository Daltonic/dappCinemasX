# DappCinemas

DappCinemas is a web3 application for managing a cinema. It's built with Next.js and uses Ethereum blockchain for backend operations.

## Features

- Display of featured movies and banners
- Movie management (add, delete, update movies)
- Time slot management for movies
- Ticket booking system
- Contact information display
- Ethereum blockchain integration for secure transactions

## Components

The application is composed of several components including:

- Banner: Displays the banner for the cinema.
- Booking Modal: Handles the booking of tickets.
- Connect Button: Allows users to connect to their Ethereum wallets.
- Contact: Displays the contact information of the cinema.
- Movie Deletion: Handles the deletion of movies.
- Slot Deletion: Handles the deletion of time slots.
- Movie Details: Displays the details of a movie.
- Featured Movie: Displays the featured movie.
- Find Holders: Finds the holders of a particular movie ticket.
- Finish Slots: Handles the finishing of slots.
- Footer: Displays the footer of the application.
- Header: Displays the header of the application.
- Menu: Handles the navigation menu of the application.
- Movie Actions: Handles the actions that can be performed on a movie.
- Movie Cards: Displays the movie cards.
- Movie Table: Displays the table of movies.
- Navigation Button: Handles the navigation buttons of the application.
- Offers: Displays the offers available.
- Spacer: Provides spacing between components.
- Subscribe Button: Handles the subscription to the cinema.
- Theater Player: Handles the theater player for playing movie trailers.
- Timeslot Actions: Handles the actions that can be performed on a time slot.
- Timeslot List: Displays the list of time slots.
- Timeslot Table: Displays the table of time slots.
- Withdrawal: Handles the withdrawal of funds.

## Setup

To get started with the project, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Blockchain Integration

The application uses Ethereum blockchain for backend operations. It interacts with two smart contracts: `cinemaContract` and `ticketContract`. The addresses of these contracts are stored in `contractAddress.json`.

The `blockchain.tsx` file in the `services` directory contains the functions for interacting with the blockchain. It uses ethers.js library for this purpose.

## Store

The application uses Redux for state management. The `store` directory contains the actions and states for global management.

## Utils

The `utils` directory contains fake data, helper functions, and type definitions used across the application.
