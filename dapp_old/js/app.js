App = {

    chainId: "0x539", // Ganache: es donde he desplegado el contrato

    web3: null,  // Creare mi propio objeto web3, de la version 1.3.0

    contador: null,   // Instancia desplegada del contrato.

    // Inicializar App.
    init: async () => { 
        console.log("Inicializando...");

        // Comprobar que el navegador soporta Ethereum
        if (typeof window.ethereum === "undefined") {
            alert("Instale MetaMask para usar esta aplicación.");
            return;
        } 

        try {
            console.log("Configurando el manejo de cambio de red");
            ethereum.on('chainChanged', chainId => {
                // Recargar la pagina
                console.log("Seleccionada otra red.");
                window.location.reload();
            });
            

            console.log("Configurar manejo de cambio de cuenta selecionada");
            ethereum.on('accountsChanged', accounts => {
                // Recargar el UI con accounts[0]
                console.log("Seleccionada otra cuenta =", accounts[0]);
                document.getElementById('cuenta').innerHTML = accounts[0];
            });

            // Comprobar que MetaMask está conectado a la red que quiero:
            const chainId = await ethereum.request({method: 'eth_chainId'});
            if (chainId !== App.chainId) {
               alert('Configure MetaMask para que se conecte con Ganache.');
               return;
            }

            // Crear una instancia nueva de web3. Usando proveedor de MetaMask.
            App.web3 = new Web3(ethereum);
            console.log("App.web3 =", App.web3.version);


            // Cargar el artefacto del contrato Contador (json)
            console.log("Inicializando abstracción del contrato.");
            const response = await fetch('contracts/Contador.json');
            const json = await response.json();

            // Crear la abstraccion del contrato Contador
            const Contador = TruffleContract(json);

            // Provisionar la abstraccion del contrato Contador con el proveedor web3
            Contador.setProvider(ethereum);

            console.log("Obtener instancia desplegada del contador.");
            App.contador = await Contador.deployed();

            console.log("Configurar Vigilancia de los eventos del contador.");
            App.contador.Tic((error, event) => {
                if (error) {
                    console.log("Se ha producido un ERROR en evento Tic:", error);
                } else {
                    console.log("Se ha producido un evento Tic:");
                    const msg = event.args.msg;
                    const out = event.args.out;
                    console.log(" * Msg =", msg);
                    console.log(" * Out =", out.toNumber());
                    document.getElementById('valor').innerHTML = out;
                }
            });

            // ROUTER de eventos
            console.log("Configurando manejadores de eventos.");
            const matchEvent = (ev, sel) => ev.target.matches(sel);
            document.addEventListener('click', ev => {
              if (matchEvent(ev, '#cincr')) App.handleIncr(ev);
              else if (matchEvent(ev, '#login')) App.handleLogin(ev);
            });

            App.refreshContador();

        } catch(error) {
            console.log(error.message || error);
            alert('Se ha producido un error inesperado: ' + (error.message || error));
        }
    },


    // Manejador boton de login.
    handleLogin: async event => {
        // Hacer login em MetaMask para acceder a las cuentas

        console.log("Se ha hecho Click en el botón de Login.");

        event.preventDefault();

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            console.log("Logueado con la cuenta =", account);
            document.getElementById('cuenta').innerHTML = account;

        } catch(error) {
            console.log(error);
        }
    },


    // Manejador del botón de incremento.
    handleIncr: async event => { 
        console.log("Se ha hecho Click en el botón.");

        event.preventDefault();

        try {
            const accounts = await App.web3.eth.getAccounts();
            const account = accounts[0];

            if (!account) {
               alert('No se puede acceder a las cuentas de usuario.');
               return;
            }
            console.log("Cuenta =", account);

            // Ejecutar incr como una transacción desde la cuenta account.
            await App.contador.incr({from: account, gas: 200000});
        } catch(error) {
            console.log(error.message || error);
        }
    },


    // Refrescar el valor mostrado.
    refreshContador: async () => {  
        console.log("Refrescando el valor mostrado del contador.");

        try {
            const valor = await App.contador.valor();

            console.log("Valor =", valor.toNumber());

            document.getElementById('valor').innerHTML = valor;

        } catch(error) {
            console.log(error.message || message);
        }
    }

};


// Inicialización: Ejecutar cuando se ha terminado de cargar la pagina.
window.addEventListener('load', App.init);

