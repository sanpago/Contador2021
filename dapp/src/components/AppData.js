import {drizzleReactHooks} from '@drizzle/react-plugin';

const { useDrizzle } = drizzleReactHooks;

const AppData = () => {
    const { useCacheCall } = useDrizzle();

    const valor = useCacheCall("Contador", "valor");

    return (
        <div className="appCounter-data">
            Valor = <span className="appCounter-data-value">{valor}</span>
        </div>
    );
};

export default AppData;