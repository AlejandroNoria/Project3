// Import Router
import { Link } from "react-router-dom";

// Import Icon
import MdCart from 'react-ionicons/lib/MdCart'


// Import Style
import './style.css';

const Navbar = props => {


    return (
        <nav className="navbar">
            <h4 className="navbar__brand"><Link to="/">Namazon</Link></h4>
            <div className="navbar__user">
                {props.loggedIn ? <p>Hello {props.firstName}</p> : <p><Link to="/login">Log In</Link></p>}
                <div className="navbar__cart"><Link to="/cart"><MdCart fontSize="28px" color="white" /> <span>{props.cartItems || 0}</span></Link></div>
            </div>
        </nav>
    )

}


export default Navbar;