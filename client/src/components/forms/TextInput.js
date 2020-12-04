import './text-input.css';


const TextInput = props => {

    return (
        <div className="text-input">
            <label className="text-input__label">{props.label || ''}</label>
            <input className="text-input__input" value={props.value} type={props.type || 'text'} onChange={props.onChange} placeholder={props.placeholder || ''} />
        </div>
    )

}

export default TextInput;