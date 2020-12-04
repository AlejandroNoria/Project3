import MdTrash from 'react-ionicons/lib/MdTrash';

const CartItem = props => {

    return (
        <div className="cart-item">
            <h3>{props.name} &times; {props.quantity}</h3>
            <button className="cart-item__delete"><MdTrash fontSize="28px" onClick={props.onDeleteClick} /></button>
        </div>
    )

}

export default CartItem;