import './button.css';

const Button = props => {

    return (
        props.onClick ?

        <button onClick={props.onClick} type={props.type || 'button'} className="btn">{props.children}</button>

        :

        <button className="btn" type={props.type ||'button'}>{props.children}</button>
    )

}

export default Button;