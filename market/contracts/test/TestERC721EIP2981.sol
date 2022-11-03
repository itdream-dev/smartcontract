// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;

import "./nfts/ERC721Upgradeable.sol";

contract TestERC721EIP2981 is ERC721Upgradeable {
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
    address public receiver = 0xfcC6f84bF615B0A2001B2e73315d285745Fb3821;

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Upgradeable) returns (bool) {
        return interfaceId == _INTERFACE_ID_ERC2981
            || interfaceId == _INTERFACE_ID_ERC721;
    }

    function mint(address to, uint tokenId) external {
        _mint(to, tokenId);
    }

    function royaltyInfo(
        uint256 _tokenId,
        uint256 _salePrice
    ) view returns (
        address _receiver,
        uint256 _royaltyAmount
    ){
        _royaltyAmount = _salePrice * 1 / 100;
        return (receiver, _royaltyAmount)
    };
}
