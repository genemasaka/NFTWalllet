import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ethers} from 'ethers';
import { useState } from 'react'
function App() {
  const[address, setAddress] = useState('');

  const handleLogin = async (event) => {
        event.preventDefault();
        
        if (window.ethereum !== 'null') {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          setAddress(accounts[0]);
          document.getElementById('connect').style.visibility = "hidden"
        } else {
          console.log("Please install Metamask")
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
        </>  
  );
}

export default App;
