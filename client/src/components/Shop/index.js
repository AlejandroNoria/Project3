// Import React Components
import React from 'react';

// Import CSS
import './style.css'

// Import Other Components
import SearchBar from '../forms/SearchBar';
import Item from '../items/Item';


// Export Shop Component
export default class Shop extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: props.loggedIn,
            items: props.items || []
        }
    }

    componentDidMount() {
        // Load Products From API
        if (this.props.onMount) this.props.onMount();
    }

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    viewItem(item) {
        this.props.onViewItem(item);
    }

    render() {

        return (
            <section className="shop">
                <div className="shop__search">
                    <SearchBar placeholder="Search Products" onSubmit={this.props.onSearch} />
                </div>
                <div className="shop__results">
                    {this.state.items.map(item => (
                        <Item 
                            name={item.name} 
                            description={item.description} 
                            key={item._id} 
                            onCartClick={() => this.addToCart(item)}
                            onViewClick={() => this.viewItem(item)}
                            showButtons={this.state.loggedIn}
                        />
                    ))}
                </div>
                
            </section>
        )

    }

}