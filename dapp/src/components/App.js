import { DrizzleContext } from "@drizzle/react-plugin";

import AppHeader from './AppHeader';
import AppData from './AppData';
import AppControl from './AppControl';

function App() {
    return (
        <DrizzleContext.Consumer>
            {drizzleContext => {
                const {drizzle, drizzleState, initialized} = drizzleContext;

                if (!initialized) {
                    return (
                        <main><h1>⚙️ Cargando dapp...</h1></main>
                    );
                }

                return (
                    <main className="appCounter">
                        <AppHeader/>
                        <AppData    drizzle={drizzle} drizzleState={drizzleState}/>
                        <AppControl drizzle={drizzle} drizzleState={drizzleState}/>
                    </main>
                );
            }}
        </DrizzleContext.Consumer>
    );
}

export default App;
