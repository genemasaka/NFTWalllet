## NFT Wallet React App
This React application allows users to connect their Metamask wallet to view their NFT collectibles, and to display random NFTs from the OpenSea API. Users can also click on NFTs to view a modal that displays a larger version of the NFT and a "Purchase NFT" button that, when clicked, redirects the user to the asset's page.

## Dependencies
react-bootstrap
bootstrap
ethers
react
react-dom
react-scripts
web-vitals

## How to run the application
Clone the repository and navigate to the project directory in the terminal.
Install dependencies by running npm install.
Start the development server by running npm start.
Open a web browser and navigate to http://localhost:3000/ to view the application.

## How to use the application
Click on the "Connect Wallet" button to connect your Metamask wallet.
Click on the "Get NFTs" button to display random NFTs from the OpenSea API.
Click on an NFT to view a modal that displays a larger version of the NFT and a "Purchase NFT" button.
Click on the "Purchase NFT" button to be redirected to the asset's page.

##Notes
You will need to obtain your own API key from Unsplash developer's portal to use this functionality.
The application is currently set to display 3 random images from the Unsplash API, rather than actual NFTs from OpenSea, as the API at the moment of writing thus does not aloow Cross Origin Resource Sharing(CORS). This can be easily modified by replacing the API URL in the getNFTs function with a different API URL that returns actual NFTs.
