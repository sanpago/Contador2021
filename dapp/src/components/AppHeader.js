import {drizzleReactHooks} from '@drizzle/react-plugin'

import { newContextComponents } from "@drizzle/react-components";
const { AccountData } = newContextComponents;

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const AppHeader = () => {
    const {drizzle} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    return <div className="appCounter-header">
        <div className="appCounter-header-account">
            <AccountData
                drizzle={drizzle}
                drizzleState={drizzleState}
                accountIndex={0}
                units="ether"
                precision={3}
                render={({address, balance, units}) => (
                    <>
                        <div>Mi dirección: {address}</div>
                        <div>Mi Balance: {balance} {units}</div>
                    </>
                )}
            />
        </div>

        <h1 className="appCounter-header-title">
            Contador
        </h1>
        <p className="appCounter-header-version">
            Versión: 5
        </p>
    </div>
};

export default AppHeader;
