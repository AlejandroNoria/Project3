// Import React Components
import React from 'react';
import { Link } from "react-router-dom";

// Import Custom Components
import TextInput from '../forms/TextInput';
import Button from '../forms/Button';


// Initialize Component Class
export default class Signup extends React.Component {

    state = { firstName: '', lastName: '', email: '', password: '' };

    onFormSubmit(event) {
        event.preventDefault();
        
        if (this.props.onSubmit) this.props.onSubmit(Object.assign({}, this.state));
    }

    render() {

        return (
            <section className="auth">
                <h2 className="auth__title">Sign Up</h2>
                <form className="auth__form" onSubmit={e => this.onFormSubmit(e)}>
                    <TextInput 
                        label="First Name"
                        value={this.state.firstName}
                        onChange={e => this.setState({ firstName: e.target.value })}
                        placeholder="John"
                    />
                    <TextInput 
                        label="Last Name"
                        value={this.state.lasttName}
                        onChange={e => this.setState({ lastName: e.target.value })}
                        placeholder="Smith"
                    />
                    <TextInput 
                        type="email" 
                        label="Email Address" 
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        placeholder="john@namazon.com"
                    />
                    <TextInput 
                        type="password"
                        label="Create a password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <Button type="submit">Sign Up</Button>
                    <p className="auth__alt-link">Already have an account? <Link to="/login">Log in instead.</Link></p>

                </form>
            </section>
        )

    }

}