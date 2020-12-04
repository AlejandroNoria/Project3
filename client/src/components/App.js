// Import React Components
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// Import API
import API from '../API';

// Import Custom Components
import Navbar from './Navbar';
import Shop from './Shop';
import Login from './Login';
import Signup from './Signup';
import Cart from './Cart';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      redirect: false,
      items: [],
      cart: [],
      cartLength: 0,
      recents: [],
      token: '',
      user: {}
    }

  }

  async onLoginSubmit(formData) {
    const result = await API.login(formData);
    if (!result) return alert('Email or password is incorrect');
    else {
      this.setState({ token: result.token, loggedIn: true, user: result.user, redirect: true, cartLength: result.user.cart.length });
    }

    this.setState({ redirect: false });
    
  }

  async onSignupSubmit(formData) {
    const result = await API.signup(formData);

    console.log(result);
  }

  async loadAllItems() {
    const items = await API.search();
    this.setState({ items });
  }

  async onSearchSubmit(query) {
    const items = await API.search(query);
    this.setState({ items });
    this.render();
  }

  async addToCart(item) {
    console.log(item)
    const results = await API.addToCart(item._id, this.state.token);
    if (!results) return alert('Something went wrong. Please log in and try again.');
    let cartLength = 0;
    results.forEach(res => cartLength += res.quantity);
    this.setState({ cart: results, cartLength })
  }

  async deleteFromCart(item) {
    const results = await API.removeFromCart(item);

    if (!results) alert('Somethign went wrong. Please log in and try again');
    let cartLength = 0;
    results.forEach(res => cartLength += res.quantity);
    this.setState({ cart: results, cartLength });
  }

  async getCart() {
    const results = await API.getCart();

    if (!results) return alert('Something went wrong');
    
    this.setState({ cart: results });
  }

  render() {

    if (this.state.redirect) return (
      <Router>
        <Redirect to="/" />
      </Router>
    );

    return (
      <Router>
        <main className="main">

          <Navbar cartItems={this.state.cartLength} firstName={this.state.user.firstName} loggedIn={this.state.loggedIn} />
          

          <Switch>

            <Route path="/login">
              <Login onSubmit={data => this.onLoginSubmit(data)} />
            </Route>

            <Route path="/signup">
              <Signup onSubmit={data => this.onSignupSubmit(data)} />
            </Route>

            <Route path="/cart">
              <Cart items={this.state.cart} onMount={() => this.getCart()} handleDelete={(item) => this.deleteFromCart(item)} />
            </Route>

            <Route path="/">
              <Shop loggedIn={this.state.loggedIn} items={this.state.items} onMount={() => this.loadAllItems()} onSearch={query => this.onSearchSubmit(query)} onAddToCart={(item) => this.addToCart(item)} onViewItem={item => this.viewItem(item)} />
            </Route>

          </Switch>
          
        </main>
      </Router>
    );
  }
}
