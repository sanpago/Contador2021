import {useState} from "react";
import {drizzleReactHooks} from '@drizzle/react-plugin';

import Updating from './common/Info';
import Error from './common/Info';
import IncrControl from './common/Button';
import CleanState from './common/Button';

import { newContextComponents } from "@drizzle/react-components";
const { ContractForm } = newContextComponents;

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const AppControl = () => {
    const {drizzle} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const [stackId, setStackID] = useState(null);

    const cleanState = () => {
        setStackID(null);
    };

    const getTxInfo = () => {
        // Si no he pulsado nunca el boton incrementar o se ha limpiado el estado;
        if (stackId === null) return {status: null, error: null};

        // Obtener el estado de las transacciones desde el estado de drizzle
        const {transactions, transactionStack} = drizzleState;

        // Obtener el hash de la transaccion asociada a stackId.
        const txHash = transactionStack[stackId];

        // El hash de la transaccion no existe hasta que se envia a la red.
        if (!txHash || !transactions[txHash]) return {status: "Pendiente de envio", error: null};

        // Si la transaccion existe, devolvemos su status o los errores
        return {
            status: transactions[txHash].status,
            error: transactions[txHash].error
        };
    };

    const {status, error} = getTxInfo();
    const errorMsg = error?.message || error || "";

    return (
        <div className="appCounter-control">
            <ContractForm
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract={"Contador"}
                method={"incr"}
                methodArgs={[
                    { from: drizzleState.accounts[0] }
                ]}
                render={({inputs, inputTypes, state, handleInputChange, handleSubmit}) => (
                    <IncrControl className="appCounter-control-incr"
                                 text="Incrementar"
                                 onClick={(ev) => {
                                     const stackId = handleSubmit(ev);
                                     // Guardar stackId en el estado local
                                     setStackID(stackId);
                                 }}
                                 disabled={status === 'pending'} /> )} />
            <Updating className="appCounter-control-updating"
                      msg={status}
                      visible={true}/>
            <Error className="appCounter-control-error"
                   msg={errorMsg}
                   visible={!!error}/>
            <CleanState className="app-control-clean"
                        text="Limpiar mensajes"
                        onClick={cleanState}
                        disabled={(!status || status === "Pendiente") && !error}/>
        </div>
    );
}

export default AppControl;
