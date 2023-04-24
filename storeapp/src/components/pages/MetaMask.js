import React, { useState } from 'react';
import { ethers } from "ethers";

function MetaMask(){

    
    const [account , setaccount] = useState(null);
    const [provider , setprovider] = useState(null);

    function connectWallet () {
        if(!window.ethereum) {
            alert("Install Metamask");
            return;
        }      
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setprovider(provider);
        provider
            .send("eth_requestAccounts" , [])
            .then((accounts) => setaccount(accounts[0]))
            .catch((err) => console.log(err));
        const signer = provider.getSigner();
        signer.getAddress().then((address) => console.log(address));
        console.log(signer);
    }
    return (
        <div> 
            <h1>Wallet Connection </h1>

            <button onClick={() => {
                if (account) return ; 
                connectWallet();
            }}>
           
            {account ? "Connected" : "connect"}{""}
            </button>

            <h3>Address : {account} </h3>
        </div>

    );

}

export default MetaMask;