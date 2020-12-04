import React from 'react';

// Import Style
import './search-bar.css';

export default class SearchBar extends React.Component {

    state = { term: '' }

    onSearchSubmit(e) {
        e.preventDefault();

        this.props.onSubmit(this.state.term);
    }

    render() {

        return (
            <form className="search" onSubmit={e => this.onSearchSubmit(e)}>
                <input 
                    className="search__input"
                    type="text" 
                    value={this.state.term} 
                    placeholder={this.props.placeholder || ''} 
                    onChange={e => this.setState({ term: e.target.value })} 
                />
            </form>
        )

    }

}