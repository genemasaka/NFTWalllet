// Import necessary dependencies
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ethers} from 'ethers';
import { useState, useEffect } from 'react'

// Define App component
function App() {
  // Set initial state for wallet address to null
  const[address, setAddress] = useState(null);

  // Handle login button click
  const handleLogin = async (event) => {
    event.preventDefault();
    
    // Check if Metamask is installed and available
    if (window.ethereum !== 'null') {
      // Connect to Metamask provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      // Get user accounts from Metamask
      const accounts = await provider.send("eth_requestAccounts", []);
      // Update state with first account
      setAddress(accounts[0]);
      // Hide connect button
      document.getElementById('connect').style.visibility = "hidden"
    } else {
     // Alert user to install Metamask
     alert("Please install Metamask")
    }
  }

  // Function to get user's NFTs from OpenSea API
  const getNFTs = async () => {
    // Check if wallet address is available
    if(address === null) {
      return
    } else {
      // Get container element to display NFTs
      const nftContainer = document.getElementById('nftItems');
      // Set options for fetch request
      const options = {
        method: 'GET', 
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      };

      // Fetch NFTs from OpenSea API
      let items = fetch(`https://api.opensea.io/v2/orders/ethereum/seaport/listings?maker=${address}&order_by=created_date&order_direction=desc`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

      // If no NFTs are found, exit the function
      if (items.length === null) { return }

      // Loop through NFTs and create new HTML element for each one
      items.forEach((nft) => {
        const { name, image_url, description, permalink } = nft

        const newElement = document.createElement('div')
        newElement.innerHTML = `
         
         <a href='${permalink}' target="_blank">
            <div class='d-flex flex-column'>
              <img
                src='${image_url}'
                class='w-100 rounded-lg' />
              <div class='flex-column w-100 my-1'>
                <p class='text-gray-800 fs-5'>${name}</p>
                <p class='text-gray-500 fs-6 text-wrap'>${description ?? ''}</p>
              </div>
            </div>
          </a>
         
        `

        // Append new NFT element to container
        nftContainer.appendChild(newElement)
      })
    }
  }
      
  // Render app UI
  return (
      <>
      {/* Navigation bar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="ml-2">NFT Wallet</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Address: <p>{address}</p>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Connect wallet prompt */}
       <div id='connect'>
        <p className="text-center mt-5">Connect your Metamask Wallet to view your NFT collectibles</p>

        <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-dark mt-3" onClick={handleLogin} >Connect Wallet</button>

        </div>
        </div>

        {/* Get NFTs button */}
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-dark mt-3 " onClick={getNFTs} >Get NFTs</button>
          </div>
        {/* Display NFTs */}
          <div className="container-fluid d-flex justify-content-center">
            <div id="nftItems" className="container-fluid col-lg-6 col-md-6 col-sm-6 col-xs-6 d-grid gap-2 grid-cols-4">
        
            </div>
          </div>
        </>  
  );
}

export default App;