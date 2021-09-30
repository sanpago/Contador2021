import {drizzleReactHooks} from '@drizzle/react-plugin';

import {newContextComponents} from "@drizzle/react-components";
const { ContractData } = newContextComponents;

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const AppData = () => {
    const {drizzle} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    return <ContractData
        drizzle={drizzle}
        drizzleState={drizzleState}
        contract={"Contador"}
        method={"valor"}
        render={data => (
            <>
                Valor = <span className="appCounter-data-value">{data}</span>
            </>
        )}
    />
};

export default AppData;
