const { createTypeData, signTypedData } = require("./EIP712");

const Types = {
	Mint1155: [
		{name: 'tokenId', type: 'uint256'},
		{name: 'supply', type: 'uint256'},
		{name: 'tokenURI', type: 'string'},
		{name: 'creator', type: 'address'},
		{name: 'royaltyFee', type: 'uint256'}
	]
};

async function signMint1155(account, tokenId, tokenURI, supply, creator, royaltyFee, verifyingContract) {
	const chainId = Number(await web3.eth.getChainId());
	const data = createTypeData({
		name: "Mint1155",
		chainId,
		version: "1",
		verifyingContract
	}, 'Mint1155', { tokenId, supply, tokenURI, creator, royaltyFee }, Types);
	return (await signTypedData(web3, account, data)).sig;
}

module.exports = { signMint1155 }