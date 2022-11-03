// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "../lib/LibOrder.sol";

contract LibOrderTest {
    function hashKey(LibOrder.Order calldata order) external pure returns (bytes32) {
        return LibOrder.hashKey(order);
    }
}
