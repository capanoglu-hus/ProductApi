import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import UserHeader from "./UserHeader";
import ProductCRUD from "./ProductCRUD";
import CategoryCRUD from "./CategoryCRUD";
import StockCRUD from "./StockCRUD";
import Product from "./Product";
import Category from "./Category";
import Stock from "./Stock";
import MetaMask from "./MetaMask";

export default function RouterPage() {
    return (
        <Router>
             <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/Register" component={Register} />
                <Route path="/UserHeader" component={UserHeader} />
                <Route path="/Product"><Product /></Route>
                <Route path="/Category"><Category /></Route>
                <Route path="/Stock"><Stock /></Route>
                <Route path="/ProductCRUD"><ProductCRUD /></Route>
                <Route path="/CategoryCRUD"><CategoryCRUD /></Route>
                <Route path="/StockCRUD"><StockCRUD /></Route>
                <Route path="/MetaMask" component={MetaMask} />
                </Switch>
        </Router>
    )
}
