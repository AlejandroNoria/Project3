// Import Icons
import MdEye from 'react-ionicons/lib/MdEye';
import MdCart from 'react-ionicons/lib/MdCart';

// Import Style
import './item.css';

// Import Utilities
import fakeImages from '../../utils/fakeImages';
import truncateString from '../../utils/truncateString';



let idx = 0;

const generateImage = () => {
    const img = fakeImages[idx];
    if (idx < fakeImages.length - 1) idx++;
    else idx = 0;
    return img;
}


const Item = props => {

    return (
        <div className="item">
            <div className="item__image">
                <img src={generateImage()} alt="Fake Product" />
            </div>
            <div className="item__details">
                <h3 className="item__name">{props.name}</h3>
                <p className="item__description">{truncateString(props.description)}</p>
            </div>
            {props.showButtons ? (
                <div className="item__actions">
                    <button className="item__button" onClick={props.onViewClick}><MdEye fontSize="28px" color="var(--primary)" /></button>
                    <button className="item__button" onClick={props.onCartClick}><MdCart fontSize="28px" color="var(--primary)" /></button>
                </div>
            ) : ''}
            
        </div>
    )

}

export default Item;