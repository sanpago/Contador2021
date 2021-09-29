import { useState, useEffect } from "react"

const AppData = props => {
    const { drizzle, drizzleState } = props;

    const [valorKey, setValorKey] = useState(null);

    useEffect(() => {
        // Decirle a drizzle que queremos observar el metodo valor().
        const valorKey = drizzle.contracts.Contador.methods.valor.cacheCall();

        // Guardar `valorKey` en el estado.
        setValorKey(valorKey)
    }, [valorKey, drizzle.contracts.Contador]);

    // Usando la clave valorKey para obtener el resultado de la llamada a valor().
    const valor = drizzleState.contracts.Contador.valor[valorKey];

    return (
        <div className="appCounter-data">
            Valor = <span className="appCounter-data-value">{valor?.value}</span>
        </div>
    );
};

export default AppData;