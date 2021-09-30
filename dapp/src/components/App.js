
import AppLoading from './AppLoading';
import AppHeader from './AppHeader';
import AppData from './AppData';
import AppControl from './AppControl';

function App() {
    return (
        <AppLoading>
            <main className="appCounter">
                <AppHeader/>
                <AppData/>
                <AppControl/>
            </main>
        </AppLoading>
    );
}

export default App;
