const AppData = props => {
    const valor = "???";
    return (
        <div className="appCounter-data">
            Valor = <span className="appCounter-data-value">
                      {valor}
                    </span>
        </div>
    );
};

export default AppData;