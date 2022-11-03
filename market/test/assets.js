const ethUtil = require('ethereumjs-util');

function id(str) {
	return `0x${ethUtil.keccak256(str).toString("hex").substring(0, 8)}`;
}

function enc(token, tokenId) {
	if (tokenId) {
		return web3.eth.abi.encodeParameters(["address", "uint256"], [token, tokenId]);
	} else {
		return web3.eth.abi.encodeParameter("address", token);
	}
}

function encLazyMint721Data(token, tokenId, tokenUri, creator, royaltyFee, signature="0x") {
	return web3.eth.abi.encodeParameters(["address", "tuple(uint256, string, address, uint, bytes)"], [token, [tokenId, tokenUri, creator, royaltyFee, signature]]);
}

function encLazyMint1155Data(token, tokenId, tokenUri, supply, creator, royaltyFee, signature="0x") {
	return web3.eth.abi.encodeParameters(["address", "tuple(uint256, string, uint256, address, uint, bytes)"], [token, [tokenId, tokenUri, supply, creator, royaltyFee, signature]]);
}

const ETH = id(Buffer.from("ETH", "utf-8"));
const ERC721 = id(Buffer.from("ERC721", "utf-8")); 
const ERC721_LAZY = id(Buffer.from("ERC721_LAZY", "utf-8"));
const ERC1155 = id(Buffer.from("ERC1155", "utf-8"));
const ERC1155_LAZY = id(Buffer.from("ERC1155_LAZY", "utf-8"));

module.exports = { ETH, ERC721, ERC721_LAZY, ERC1155, ERC1155_LAZY, enc, encLazyMint721Data, encLazyMint1155Data }