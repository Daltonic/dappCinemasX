const { ethers } = require('hardhat')
const fs = require('fs')

async function deployContracts() {
  let cinemaContract, ticketContract
  const token_name = 'Dapp X'
  const token_symbol = 'DPX'

  try {
    // Deploy contract #1
    cinemaContract = await ethers.deployContract('DappCinemas')
    await cinemaContract.waitForDeployment()

    // Deploy contract #2
    ticketContract = await ethers.deployContract('DappTickets', [
      cinemaContract,
      token_name,
      token_symbol,
    ])
    await ticketContract.waitForDeployment()

    // Grant contract #2 access to #1
    const tx = await cinemaContract.grantAccess(ticketContract)
    await tx.wait()

    console.log('Contracts deployed successfully.')
    return { cinemaContract, ticketContract }
  } catch (error) {
    console.error('Error deploying contracts:', error)
    throw error
  }
}

async function saveContractAddresses(cinemaContract, ticketContract) {
  try {
    const addresses = JSON.stringify(
      {
        cinemaContract: cinemaContract.target,
        ticketContract: ticketContract.target,
      },
      null,
      4
    )

    fs.writeFile(
      './contracts/contractAddress.json',
      addresses,
      'utf8',
      (err) => {
        if (err) {
          console.error('Error saving contract addresses:', err)
        } else {
          console.log('Deployed contract addresses:', addresses)
        }
      }
    )
  } catch (error) {
    console.error('Error saving contract addresses:', error)
    throw error
  }
}

async function main() {
  let cinemaContract, ticketContract
  try {
    // Deploy contracts
    const deployedContracts = await deployContracts()
    cinemaContract = deployedContracts.cinemaContract
    ticketContract = deployedContracts.ticketContract

    // Save contract addresses
    await saveContractAddresses(cinemaContract, ticketContract)

    console.log('Contract interaction completed successfully.')
  } catch (error) {
    console.error('Unhandled error:', error)
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error)
  process.exitCode = 1
})