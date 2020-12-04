import React from 'react';

import CartItem from '../items/CartItem';


import './style.css';


export default class Cart extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            items: props.items || []
        }

    }

    componentDidMount() {
        this.props.onMount();
    }

    deleteItem(item) {
        this.props.handleDelete(item);
    }

    render() {

        console.log(this.state);

        return (
            <section className="cart">
                <h2 className="cart__title">Your Cart</h2>
                {
                    this.state.items.length ? 
                    this.state.items.map(item => (
                    <CartItem key={item._id} name={item.item.name} quantity={item.quantity} onDeleteClick={() => this.deleteItem(item.item._id)}/>
                    )) 
                    : 
                    <h4 className="cart__none">There are no items in your cart.</h4>
                    }
            </section>
        )

    }

}