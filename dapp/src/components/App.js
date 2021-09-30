import {drizzleReactHooks} from '@drizzle/react-plugin'

import AppHeader from './AppHeader';
import AppData from './AppData';
import AppControl from './AppControl';

const {useDrizzleState} = drizzleReactHooks;

function App() {

    const initialized = useDrizzleState(state => state.drizzleStatus.initialized);

    if (!initialized) {
        return (
            <main><h1>⚙️ Cargando dapp...</h1></main>
        );
    }

    return (
        <main className="appCounter">
            <AppHeader />
            <AppData/>
            <AppControl/>
        </main>
    );
}

export default App;
