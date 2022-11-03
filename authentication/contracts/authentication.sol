// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;
pragma abicoder v2;
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";


contract MetaSaltAuth is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable, PausableUpgradeable {

    IERC20Upgradeable private token;
    uint256 private price;

    function __MetaSaltAuth_init(address MetaSaltERC20, uint256 RequestPrice) external initializer {
        __Ownable_init();
        token = IERC20Upgradeable(MetaSaltERC20);
        price = RequestPrice;
    }

    function WithdrawBalance(address to) external onlyOwner{
        token.transferFrom(address(this), to, token.balanceOf(address(this)));
    }

    function SetPaymentToken(address _tokenAddress) external onlyOwner{
        token = IERC20Upgradeable(_tokenAddress);
    }

    function SetRequestPrice(uint256 _price) external onlyOwner{
       price = _price;
    }

    uint256[50] private __gap;
}