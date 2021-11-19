import {useState, useEffect} from "react";
import {drizzleReactHooks} from '@drizzle/react-plugin';

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const AppData = () => {
    const {drizzle} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

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