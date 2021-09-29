// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.7 <0.9.0;

contract Contador {
    
    uint8 public valor = 0;
    
    event Tic(string msg, uint8 out);
        
    function incr() public {
        valor++;
        emit Tic("Actualizado", valor);
    }
    
    receive() external payable { 
        revert(); 
    }
}
