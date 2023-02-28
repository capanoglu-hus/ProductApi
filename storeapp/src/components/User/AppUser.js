import Product from "./Product";
import Category from "./Category";
import Stock from "./Stock";
import logo from "";
import { Link, Switch, Route, useParams } from 'react-router-dom'
import AnasayfaUser from './AnasayfaUser';
import React from "react";
import '/storeapp/src/App.css';
import AnasayfaUser from "./AnasayfaUser";

function AppUser() {
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
                <Link className="nav-link active" to="/Product">Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Category">Category</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Stock">Stock</Link>
              </li>


            </ul>

          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/" exact><AnasayfaUser/></Route>
        <Route path="/Product"><Product/></Route>
        <Route path="/Category"><Category/></Route>
        <Route path="/Stock"><Stock/></Route>
      </Switch>
    

      
    </div>
  );
}


export default AppUser;
