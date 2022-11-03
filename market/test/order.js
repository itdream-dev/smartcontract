const EIP712 = require("./EIP712");

function AssetType(assetClass, data) {
	return { assetClass, data }
}

function Asset(assetClass, assetData, value) {
	return { assetType: AssetType(assetClass, assetData), value };
}

function Order(maker, makeAsset, taker, takeAsset, data) {
	return { maker, makeAsset, taker, takeAsset, data };
}

const Types = {
	AssetType: [
		{name: 'assetClass', type: 'bytes4'},
		{name: 'data', type: 'bytes'}
	],
	Asset: [
		{name: 'assetType', type: 'AssetType'},
		{name: 'value', type: 'uint256'}
	],
	Order: [
		{name: 'maker', type: 'address'},
		{name: 'makeAsset', type: 'Asset'},
		{name: 'taker', type: 'address'},
		{name: 'takeAsset', type: 'Asset'},
		{name: 'data', type: 'bytes'},
	]
};

async function sign(order, account, verifyingContract) {
	const chainId = Number(await web3.eth.getChainId());
	const data = EIP712.createTypeData({
		name: "MetaSaltMarket",
		version: "1",
		chainId,
		verifyingContract
	}, 'Order', order, Types);
	return (await EIP712.signTypedData(web3, account, data)).sig;
}

module.exports = { AssetType, Asset, Order, sign }