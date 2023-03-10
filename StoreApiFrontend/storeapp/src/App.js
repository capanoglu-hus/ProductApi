import ProductCRUD from "./components/pages/ProductCRUD";
import CategoryCRUD from "./components/pages/CategoryCRUD";
import StockCRUD from "./components/pages/StockCRUD";
import Product from "./components/pages/Product";
import Category from "./components/pages/Category";
import Stock from "./components/pages/Stock";
import logo from "./components/logo/logo.png";
import { Link, Switch, Route } from 'react-router-dom'
import React from "react";
import './App.css';
import Anasayfa from "./components/pages/Anasayfa";


function App() {


  
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
  
            </div>
          </div>
        </nav>
  
        <Switch>
          <Route path="/" exact><Anasayfa/></Route>
          <Route path="/Product"><Product/></Route>
          <Route path="/Category"><Category/></Route>
          <Route path="/Stock"><Stock/></Route>
          <Route path="/ProductCRUD"><ProductCRUD/></Route>
          <Route path="/CategoryCRUD"><CategoryCRUD/></Route>
          <Route path="/StockCRUD"><StockCRUD/></Route>
          
        </Switch>
      
  
        
      </div>
    );
  }
  


export default App;