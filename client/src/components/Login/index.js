// Import React Components
import React from 'react';
import { Link } from "react-router-dom";

// Import Custom Components
import TextInput from '../forms/TextInput';
import Button from '../forms/Button';

// Import Login Style
import './style.css';


// Initialize Component Class
export default class Login extends React.Component {

    state = { email: '', password: '' };

    onFormSubmit(event) {
        event.preventDefault();
        
        if (this.props.onSubmit) this.props.onSubmit({
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {

        return (
            <section className="auth">
                <h2 className="auth__title">Log In</h2>
                <form className="auth__form" onSubmit={e => this.onFormSubmit(e)}>
                    <TextInput 
                        type="email" 
                        label="Email Address" 
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        placeholder="john@namazon.com"
                    />
                    <TextInput 
                        type="password"
                        label="Password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <Button type="submit">Log In</Button>
                    <p className="auth__alt-link">Don't have an account? <Link to="/signup">Sign up instead.</Link></p>

                </form>
            </section>
        )

    }

}