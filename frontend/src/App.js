import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

export function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              // onClick="{() => setSidebarIsOpen(true)}"
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">Amazona</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart
            {
              cartItems.length > 0 && 
              <span className="badge">{cartItems.length}</span>
            }</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <aside className="sidebar"></aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" exact={true} component={HomeScreen} />  
        </main>
        <footer className="row center">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

