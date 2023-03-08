// Import necessary dependencies
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ethers} from 'ethers';
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// Define App component

function App() {
  // Set initial state for wallet address to null
  const[address, setAddress] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [urls, setURL] = useState([]);

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
      const url = 'https://api.unsplash.com/photos/random?client_id=C2AtOgSxPXZ_8gZi1Fdtl00bAMwx_AYVI5ZGXP4W60o&count=3'
      //fetch assets and display them
      fetch(url).then((response) => response.json())
                  .then((data) => 
                    {
                    if (data.length === 0)
                    {
                      console.log('Could not retreive NFTs')
                    } 
                    data.forEach((nft) => {
                      const {urls, alt_description} = nft;
                      const newElement = document.createElement('div');
                      setURL(urls.regular);
                      console.log(urls.regular)
                      
                      newElement.innerHTML = `
                        <div class='nft-card' style=" border-radius: 7px; width: 250px; margin-top: 20px;">
                        <img src='${urls.small}' class="img" style="border-radius: 7px" height='250px' width='250px'/>
                        <div style="padding-bottom: 15px; background-color: whitesmoke">
                        <p style="padding:4px; text-align: center;">${alt_description}</p>
                        </div>
                        </div>
                      `
                      //render modal when asset is clicked
                      nftContainer.appendChild(newElement);
                      let nft_card = document.querySelectorAll('.nft-card');
                      [...nft_card].forEach((item) => {
                        item.addEventListener("click", (e) =>{
                          setShow(true);
                        })
                      });

                      const modal_body = document.querySelector('modal_body');

                      for(let i = 0; i < urls.length; i++) {
                        let image = document.createElement('img');
                        image.setAttribute("src", urls[i]);
                        modal_body.appendChild(image);
                      }
                    })
                    })

    }
  }
      //redirects to asset page
      const purchaseNFT = () => {
        document.getElementById('purchase-btn').addEventListener("click", (e) =>{
        for(let i = 0; i < urls.length; i++) {
          window.location.href = i;
        }
        })
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
            
            <div id="nftItems" className="d-flex flex-lg-wrap justify-content-lg-around" >
        
            </div>
            
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal_body">
        
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="dark" onClick={purchaseNFT} id="purchase-btn">
            Purchase NFT
          </Button>
        </Modal.Footer>
      </Modal>
        </>  
  );
}

export default App;