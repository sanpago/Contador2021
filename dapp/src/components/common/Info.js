
const Info = ({className, msg, visible}) => visible && (
    <span className={ `${className} info-common` }>
        { msg }
    </span>
);

export default Info;
