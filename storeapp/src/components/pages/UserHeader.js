import React, { Fragment, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import logo from './logo.png';
import './UserHeader.css';
import { BigNumber, ethers } from "ethers";
export default function UserHeader() {
    
    const [userName, setUserName] = useState("");
    const history = useHistory();
    useEffect(() => {
        setUserName(sessionStorage.getItem("username"));
    }, []);

    //console.log(userName);

    const logout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("userName");
        history.push("/");
    };
    
    const [account, setaccount] = useState(null);
    const [balance, setbalance] = useState(BigNumber.from(0));
    const [chainId , setChainId] = useState(Number);
    const [transacCount , setTransacCount] = useState(Number);
    const [provider, setprovider] = useState(null);

    function connectWallet() {
        if (!window.ethereum) {
            alert("Install Metamask");
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setprovider(provider);
        provider
            .send("eth_requestAccounts", [])
            .then((accounts) => setaccount(accounts[0]))
            .catch((err) => console.log(err));
        const signer = provider.getSigner();
        signer.getAddress().then((address) => console.log(address));
        console.log(signer);

        signer.getBalance().then((balance) => setbalance(balance));
        console.log(ethers.utils.formatEther(balance));

        signer.getChainId().then((chainId) => setChainId(chainId) );
        console.log(chainId);
       
        signer.getTransactionCount().then((transacCount) => setTransacCount(transacCount) );
        console.log(transacCount);

    }

    return (

        <>


            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img className="logo" src={logo} alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a class="navbar-brand" href="#">STORE</a>

                            </li>
                            <li className="nav-item" >
                                <a class="navbar-brand" href="#">welcome {userName}

                                

                                </a>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/ProductCRUD">ProductCRUD</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/CategoryCRUD">CategoryCRUD</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/StockCRUD">StockCRUD</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active" to="/Product">Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Category">Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Stock">Stock</Link>
                            </li>
                            



                        </ul>

                         <button class="btn btn-warning" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                            onClick={connectWallet}>

                            <div class="dropdown">
                                <span>  Wallet {account ? "Connected" : "connect"}{""}</span>
                                <div class="dropdown-content">
                                    <a> Address : {account} </a> <br></br>
                                    <a> ChainId : {chainId} </a> <br></br>
                                    <a> Transaction Count  : {transacCount} </a> <br></br>
                                    <a> balance : {ethers.utils.formatEther(balance)} ETH </a>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-dark" onClick={logout}>
                            <Link className="nav-link active" to="/Login">LOGOUT</Link>

                        </button>

                    </div>
                </div>
            </nav>
            <div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div class="alert alert-primary" role="alert">
                                ..ANASAYFAYA HOŞGELDİNİZ...

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
