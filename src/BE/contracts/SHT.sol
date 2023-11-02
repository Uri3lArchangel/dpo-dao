// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ShareholdersToken is ERC20 {
    address public admin;

    constructor(address _admin) ERC20("ShareHoldersToken","SHT") {
        
        admin = _admin;
        _mint(admin, 100000 * 10**18); 
    }

}
