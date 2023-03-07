import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ethers} from 'ethers';
import { useState } from 'react'

function App() {
  const[address, setAddress] = useState(null);

  const handleLogin = async (event) => {
        event.preventDefault();
        
        if (window.ethereum !== 'null') {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          setAddress(accounts[0]);
          document.getElementById('connect').style.visibility = "hidden"
        } else {
         alert("Please install Metamask")
        }
        }
  const getNFTs = async () => {
    if(address === null) {
      return
    } else {
      const nftContainer = document.getElementById('nftItems');

      const options = {method: 'GET', headers: {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin': '*',
      }};

      let items = fetch(`https://api.opensea.io/v2/orders/ethereum/seaport/listings?maker=${address}&order_by=created_date&order_direction=desc`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
      
      if (items.length === null) { return }

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

        nftContainer.appendChild(newElement)
      })
    }
  }
      

  return (
      <>
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
        <div id='connect'>
        <p className="text-center mt-5">Connect your Metamask Wallet to view your NFT collectibles</p>

        <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-dark mt-3" onClick={handleLogin} >Connect Wallet</button>

        </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-dark mt-3 " onClick={getNFTs} >Get NFTs</button>
        </div>
        <div className="container-fluid d-flex justify-content-center">
        <div id="nftItems" className="container-fluid col-lg-6 col-md-6 col-sm-6 col-xs-6 d-grid gap-2 grid-cols-4">
        
        </div>
        </div>
        </>  
  );
}

export default App;
