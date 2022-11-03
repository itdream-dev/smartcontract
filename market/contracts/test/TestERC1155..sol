// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;

import "./nfts/erc-1155/ERC1155Upgradeable.sol";

contract TestERC1155 is ERC1155Upgradeable {
    function mint(address account, uint256 id, uint256 amount, bytes memory data) external {
        _mint(account, id, amount, data);
    }
}
