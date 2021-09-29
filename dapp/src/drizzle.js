
import { Drizzle } from '@drizzle/store';

import Contador from './contracts/Contador.json'

// Opciones:
const options = {
    contracts: [ Contador ],
    polls: {
        accounts: 3000,
    },
    web3: {
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:7545"
        }
    }
}

// Crear y exportar el objeto drizzle:
export default new Drizzle(options);


