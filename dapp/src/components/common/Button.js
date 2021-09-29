
const Button = ({className, text, disabled, onClick }) => (
    <button disabled={disabled}
            className={`button-common ${className}`}
            onClick={onClick} >
        {text}
    </button>
);

export default Button;
