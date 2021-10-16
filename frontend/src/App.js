import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";

export function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }


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
            {
              userInfo ?
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.user.name} <i className="fa fa-caret-down"></i>{' '}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/orderhistory">Order History</Link>

                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                    </li>
                  </ul>
                </div>
                : <Link to="/signin">Sign In</Link>
            }
          </div>
        </header>
        <aside className="sidebar"></aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/" exact={true} component={HomeScreen} />
        </main>
        <footer className="row center">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

