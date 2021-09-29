// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Contador.sol";

contract TestContador {

    Contador contador = Contador(DeployedAddresses.Contador());

    // Testing valor inicial es 0
    function testZero() public {

        uint8 c =  contador.valor();

        uint expected = 0;

        Assert.equal(c, expected, "El contador deberia ser 0 inicialmente.");
    }

    // Testing the incr() function
    function testIncr() public {

        uint8 c1 =  contador.valor();

        contador.incr();
        contador.incr();
        contador.incr();
        contador.incr();
    
        uint8 c2 =  contador.valor();
    
        uint res = c2 - c1;
        uint expected = 4;

        Assert.equal(res, expected, "El contador deberia haberse incrementado en 4.");
    }

}

