import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

export function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick="{() => setSidebarIsOpen(true)}"
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">Amazona</Link>
          </div>
          <div className="header-links">
            <a href="/cart">Cart</a>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <aside className="sidebar"></aside>
        <main>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" exact={true} component={HomeScreen} />  
        </main>
        <footer className="row center">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

