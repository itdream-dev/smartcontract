const { createTypeData, signTypedData } = require("../EIP712");

const Types = {
	Mint721: [
		{name: 'tokenId', type: 'uint256'},
		{name: 'tokenURI', type: 'string'},
		{name: 'creator', type: 'address'},
		{name: 'royaltyFee', type: 'uint'}		
	]
};

async function sign(account, tokenId, tokenURI, creator, royaltyFee, verifyingContract) {
	const chainId = Number(await web3.eth.getChainId());
	console.log('chainId', chainId);
	const data = createTypeData({
		name: "Mint721",
		chainId,
		version: "1",
		verifyingContract
	}, 'Mint721', { tokenId, tokenURI, creator, royaltyFee}, Types);	
	return (await signTypedData(web3, account, data)).sig;
}

module.exports = { sign }