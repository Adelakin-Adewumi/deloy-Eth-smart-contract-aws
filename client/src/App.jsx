import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];

      let contractAddress = deployedNetwork && deployedNetwork.address;

      // If the network can't be found in the contract JSON call the
      // backend API for the address.
      if (!contractAddress) {
        console.log('Address not found in contract JSON. Calling backup api');
        const text = await (await fetch(`/api/GetContractAddress/?networkId=${networkId}`)).text();
        console.log(`API returned: ${text}`);
        contractAddress = text;
      }

      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        contractAddress,
      );
function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
