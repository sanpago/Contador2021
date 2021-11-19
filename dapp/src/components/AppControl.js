import {drizzleReactHooks} from '@drizzle/react-plugin'

import Updating from './common/Info';
import IncrControl from './common/Button';

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const AppControl = props => {
    const { useCacheSend }  = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const {send, status} = useCacheSend('Contador', 'incr');

    const increment = () => {
        send({ from: drizzleState.accounts[0] });
    };

    return (
        <div className="appCounter-control">
            <IncrControl className="appCounter-control-incr"
                         text="Incrementar"
                         onClick={increment} />
            <Updating className="appCounter-control-updating"
                      msg={status}
                      visible={true}/>
        </div>
    );
}

export default AppControl;
