import ProductCRUD from "./ProductCRUD";
import CategoryCRUD from "./CategoryCRUD";
import StockCRUD from "./StockCRUD";
import logo from "./components/images/logo.png";
import { Link, Switch, Route } from 'react-router-dom'

import React from "react";
import '/storeapp/src/App.css';
import AnasayfaAdmin from "../User/AnasayfaAdmin";

function AppAdmin() {
  return (
    <div className="App">
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
                <Link className="nav-link active" to="/">STORE</Link>
              </li>e
              <li className="nav-item">
                <Link className="nav-link active" to="/ProductCRUD">ProductCRUD</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/CategoryCRUD">CategoryCRUD</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/StockCRUD">StockCRUD</Link>
              </li>


            </ul>

          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/" exact><AnasayfaAdmin/></Route>
        <Route path="/ProductCRUD"><ProductCRUD/></Route>
        <Route path="/CategoryCRUD"><CategoryCRUD/></Route>
        <Route path="/StockCRUD"><StockCRUD/></Route>
      </Switch>
    

      
    </div>
  );
}


export default AppAdmin;
