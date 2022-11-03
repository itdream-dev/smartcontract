const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const MetaSaltMarket = artifacts.require("MetaSaltMarket.sol");
const LibOrderTest = artifacts.require("LibOrderTest.sol");
const TestERC721 = artifacts.require("TestERC721.sol");
const TestERC1155 = artifacts.require("TestERC1155.sol");
const ERC721MetaSalt = artifacts.require("ERC721MetaSalt.sol");
const truffleAssert = require('truffle-assertions');
const { Order, Asset, sign } = require("./order");
const EIP712 = require("./EIP712");
const ZERO = "0x0000000000000000000000000000000000000000";
const { expectThrow, verifyBalanceChange } = require("@daonomic/tests-common");
const { ETH, ERC721, ERC721_LAZY, ERC1155, ERC1155_LAZY, enc, encode, encLazyMint721Data, encLazyMint1155Data } = require("./assets");
const ERC1155MetaSalt = artifacts.require("ERC1155MetaSalt.sol");
const MetaSaltToken = artifacts.require("MetaSaltToken.sol");
const { MerkleTree } = require('merkletreejs');
const {ethers} = require('ethers');
const keccak256 = require('keccak256');
let testing;	
const { signMint721 } = require("./mint721");
const { signMint1155 } = require("./mint1155");

async function getSignature(order, signer) {
	return sign(order, signer, testing.address);
}

contract("MetaSaltMarket", accounts => {		
	let t1;
	let t2;
	let libOrder;
	let protocol = accounts[9];	
	const eth = "0x0000000000000000000000000000000000000000";	
	let erc721TokenId1 = 53;

	let erc20Token;
	let erc721Test;
	let erc721;
	let erc1155;
	let erc1155Test;
	let airdropList = [
		"0xfcC6f84bF615B0A2001B2e73315d285745Fb3821",
		"0x23BdEDA81bb62f9B5C2A453dC63e11CBcD64a868",
		"0xb0c6F41AdBCA7b251bf940074b90CF413C018000"
	]
	let merkleTree =  new MerkleTree(airdropList.map(acc => keccak256(acc)), keccak256, { sortPairs: true });
	const _merkleRoot = merkleTree.getHexRoot();
	console.log('_merkleRoot', _merkleRoot);
	beforeEach(async () => {

		const AIRDROP_AMOUNT = 2000000000000000;
		erc20Token = await MetaSaltToken.new();
		await erc20Token.initialize("MetaSaltToken", "MST", 1000000000, "0xdc5cd25a44c36e69e9ca3896e833de1e3b9662279222692b7c97594a67dcdec5", 1000000000000000);	

		/*ERC721 */
		erc721Test = await ERC721MetaSalt.new();
		erc721Test.__ERC721MetaSalt_init("MetaSaltERC721", "MSN", "https://", erc20Token.address, 1000000000000000);	
		await erc20Token.setERC721Creator(erc721Test.address);			


		erc1155Test = await ERC1155MetaSalt.new();
		erc1155Test.__ERC1155MetaSalt_init("MetaSaltERC1155", "MSN", "https://", erc20Token.address, 1000000000000000);	
		await erc20Token.setERC1155Creator(erc1155Test.address);
		
		libOrder = await LibOrderTest.new();
		testing = await MetaSaltMarket.new();
		testing.__MetaSaltMarket_init(10, "0xfcC6f84bF615B0A2001B2e73315d285745Fb3821", erc721Test.address, erc1155Test.address);

		erc721 = await TestERC721.new();
		erc1155 = await TestERC1155.new();
	});

	it("airdropping", async () => {
		const account = "0xfcC6f84bF615B0A2001B2e73315d285745Fb3821";
		const proof = merkleTree.getHexProof(keccak256(account));
		console.log('_merkleRoot', _merkleRoot);
		console.log('proof', proof);		
		// assert.equal(
		// 	await testing.checkValidity(proof, {from: account}),
		// 	true
		// );
		// const isAirdropped = await testing.isAirdropped(0, account);	
		// console.log('isAirdropped', isAirdropped);
		// const prev_balance = await testing.balanceOf(account);
		// console.log('prev_balance', prev_balance.toString());
		// const res = await testing.airdrop(proof,  {from: account})
		// console.log('res', res);
		// const curr_balance = await testing.balanceOf(account);
		// console.log('curr_balance', curr_balance.toString());
		// // console.log('curr_balance', await testing.balanceOf(account).toString());
		// assert.equal(1, 1);

	});

	// it("ERC1155lazy to ETH ", async () => {
	// 	const creator = accounts[1];		
	// 	const royaltyFee = 100;
	// 	const tokenId = creator + "b00000000000000000000001";
	// 	const tokenURI = "https://";
	// 	const supply = 10;
	// 	await erc1155Test.setMetaSaltToken(erc20Token.address, 1000);		
	// 	const signature = await signMint1155(creator, tokenId, tokenURI, supply, creator, royaltyFee, erc1155Test.address);				
	// 	const encodedMintData = await encLazyMint1155Data(erc1155Test.address, tokenId, tokenURI, supply, accounts[1], royaltyFee, signature);
	// 	const left = Order(accounts[1], Asset(ERC1155_LAZY, encodedMintData, 5), ZERO, Asset(ETH, "0x", "10000000000000000"), "0x");		
	// 	const right = Order(accounts[2], Asset(ETH, "0x", "10000000000000000"), ZERO, Asset(ERC1155_LAZY, encodedMintData, 5), "0x");

	// 	let signatureLeft = await getSignature(left, accounts[1]);
	// 	let signatureRight = await getSignature(right, accounts[2]);
	// 	await erc1155Test.setApprovalForAll(testing.address, true, {from: creator});	
	// 	try {
	// 		const res = await testing.matchOrders(left, signatureLeft, right, signatureRight, { from: accounts[2], value: "10000000000000000", gasPrice: 20000000000 });	
	// 		console.log('accounts[1]', accounts[1]);
	// 		console.log('accounts[2]', accounts[2]);		
	// 		// account1_balance = await web3.eth.getBalance(accounts[1]);
	// 		let balance = await erc1155Test.balanceOf(accounts[2], tokenId);
	// 		balance = balance.toString();
	// 		console.log('balance', balance);
	// 		assert.equal(balance, 5);
	// 		let account1_balance = await web3.eth.getBalance(accounts[1]);
	// 		let account2_balance = await web3.eth.getBalance(accounts[2]);
	// 		let account3_balance = await web3.eth.getBalance("0xfcC6f84bF615B0A2001B2e73315d285745Fb3821");
	// 		console.log('account_balance', account1_balance, account2_balance, account3_balance);
	// 	} catch (err){
	// 		console.log('error', err);
	// 	}

	// 	const leftSecond = Order(accounts[2], Asset(ERC1155, enc(erc1155Test.address, tokenId), 2), ZERO, Asset(ETH, "0x", "100000000000000000"), "0x");		
	// 	const rightSecond = Order(accounts[3], Asset(ETH, "0x", "100000000000000000"), ZERO, Asset(ERC1155, enc(erc1155Test.address, tokenId), 2),  "0x");
	// 	let signatureLeftSecond = await getSignature(leftSecond, accounts[2]);
	// 	let signatureRightSecond = await getSignature(rightSecond, accounts[3]);
	// 	await erc1155Test.setApprovalForAll(testing.address, true, {from: accounts[2]});	

	// 	try {
	// 		await testing.matchOrders(leftSecond, signatureLeftSecond, rightSecond, signatureRightSecond, { from: accounts[3], value: "100000000000000000", gasPrice: 20000000000 });			
	// 		balance = await erc1155Test.balanceOf(accounts[3], tokenId);
	// 		balance = balance.toString();
	// 		console.log('balance', balance);
	// 		account1_balance = await web3.eth.getBalance(accounts[1]);
	// 		account2_balance = await web3.eth.getBalance(accounts[2]);
	// 		account3_balance = await web3.eth.getBalance(accounts[3]);
	// 		account4_balance = await web3.eth.getBalance("0xfcC6f84bF615B0A2001B2e73315d285745Fb3821");
	// 		console.log('account1_balance', account1_balance, account2_balance, account3_balance, account4_balance);
	// 	} catch (err){
	// 		console.log('err' ,err);
	// 	}	
	//   })
	  
	it("ERC721Lazy Testing", async () => {
		const creator = accounts[1];
		const royaltyFee = 100;
		const tokenId = creator + "b00000000000000000000001";
		const tokenURI = "https://";
		console.log('accounts', accounts);		
		//const instance = await deployProxy(ERC721MetaSalt, ["MetaSaltERC721", "MSN", "https://", "0x35FE26919a2C3DCD95dF1401146D5a87171A7AD4", 1000000000000000], { deployer,  initializer: '__ERC721MetaSalt_init'});		
		console.log('tokenId', tokenId);
		const signature = await signMint721(creator, tokenId, tokenURI, creator, royaltyFee, erc721Test.address);		

		const encodedMintData = await encLazyMint721Data(erc721Test.address, tokenId, tokenURI, creator, royaltyFee, signature);
		const left = Order(creator, Asset(ERC721_LAZY, encodedMintData, 1), ZERO, Asset(ETH, "0x", "10000000000000000"), "0x");		
		const right = Order(accounts[2], Asset(ETH, "0x", "10000000000000000"), ZERO, Asset(ERC721_LAZY, encodedMintData, 1),  "0x");
		let signatureLeft = await getSignature(left, creator);
		let signatureRight = await getSignature(right, accounts[2]);
		await erc721Test.setApprovalForAll(testing.address, true, {from: creator});	

		await erc721Test.setMetaSaltToken(erc20Token.address, 1000);
		await erc1155Test.setMetaSaltToken(erc20Token.address, 1000);

		
		// let res = await testing.validateFullTest(left, signatureLeft, { from: accounts[1], value: 100, gasPrice: 20000000000});	
		// res = await testing.validateFullTest(right, signatureRight, { from: accounts[2], value: 100, gasPrice: 20000000000});			
		// res = await testing.checkMatchAssetsTest(left,  right);	
		// res = await testing.matchAndTransferTest(left, right, { from: accounts[2], value: 100, gasPrice: 20000000000 });		
		// console.log('res', res);
		// const signer = await testing.getTestSigner();	
		// console.log('signer', signer);		
		//await debug(testing.validateFullTest(left, signatureLeft, right, signatureRight, { from: accounts[7], value: 300, gasPrice: 0 }));	
		// console.log(left.takeAsset.assetType, right.makeAsset.assetType);
		// const res = await testing.matchAssetsTest(left.takeAsset.assetType, right.makeAsset.assetType);	
		// console.log('res', res);
		// const res = await testing.checkMatchAssetsTest(left,  right);	
		// console.log('res', res);
		let account1_balance = await web3.eth.getBalance(accounts[1]);
		let account2_balance = await web3.eth.getBalance(accounts[2]);
		let account3_balance = await web3.eth.getBalance("0xfcC6f84bF615B0A2001B2e73315d285745Fb3821");
		console.log('account_balance', account1_balance, account2_balance, account3_balance);

		try {
			const res = await testing.matchOrders(left, signatureLeft, right, signatureRight, { from: accounts[2], value: "10000000000000000", gasPrice: 20000000000 });
		} catch (err) {
			console.log('err' ,err);
		}
		assert.equal(await erc721Test.ownerOf(tokenId), accounts[2]);

		account1_balance = await web3.eth.getBalance(accounts[1]);
		account2_balance = await web3.eth.getBalance(accounts[2]);
		account3_balance = await web3.eth.getBalance("0xfcC6f84bF615B0A2001B2e73315d285745Fb3821");
		console.log('account1_balance', account1_balance, account2_balance, account3_balance);

		console.log('--- second sale test start ---', accounts[2], accounts[3]);

		const encodedMintDataSecond = await encLazyMint721Data(erc721Test.address, tokenId, tokenURI, creator, royaltyFee, signature);
		const leftSecond = Order(accounts[2], Asset(ERC721_LAZY, encodedMintDataSecond, 1), ZERO, Asset(ETH, "0x", "1000000000000000000"), "0x");		
		const rightSecond = Order(accounts[1], Asset(ETH, "0x", "1000000000000000000"), ZERO, Asset(ERC721_LAZY, encodedMintDataSecond, 1),  "0x");
		let signatureLeftSecond = await getSignature(leftSecond, accounts[2]);
		let signatureRightSecond = await getSignature(rightSecond, accounts[1]);
		await erc721Test.setApprovalForAll(testing.address, true, {from: accounts[2]});	

		try {
			await testing.matchOrders(leftSecond, signatureLeftSecond, rightSecond, signatureRightSecond, { from: accounts[1], value: "1000000000000000000", gasPrice: 20000000000 });
		} catch (err){
			console.log('err' ,err);
		}
		assert.equal(await erc721Test.ownerOf(tokenId), accounts[1]);

		account1_balance = await web3.eth.getBalance(accounts[1]);
		account2_balance = await web3.eth.getBalance(accounts[2]);
		account3_balance = await web3.eth.getBalance(accounts[3]);
		account4_balance = await web3.eth.getBalance("0xfcC6f84bF615B0A2001B2e73315d285745Fb3821");
		console.log('account1_balance', account1_balance, account2_balance, account3_balance, account4_balance);


	}).timeout(1000000); 
	
	// it("normal ERC721 TEST", async () => {
	// 	console.log('erc721', erc721.address);
	// 	await erc721.mint(accounts[1], erc721TokenId1);
	// 	console.log('testing', testing.address);		
	// 	await erc721.setApprovalForAll(testing.address, true, {from: accounts[1]});		
	// 	const left = Order(accounts[1], Asset(ERC721, enc(erc721.address, erc721TokenId1), 1), ZERO, Asset(ETH, "0x", 200), "0x");
	// 	const right = Order(accounts[2], Asset(ETH, "0x", 200), ZERO, Asset(ERC721, enc(erc721.address, erc721TokenId1), 1), "0x");
	// 	console.log('left', left);
	// 	console.log('right', right);		
    // 	let signatureLeft = await getSignature(left, accounts[1]);
	// 	let signatureRight = await getSignature(right, accounts[2]);
	// 	console.log('signatureLeft', signatureLeft);
	// 	console.log('signatureRight', signatureRight);	
	// 	let account1_balance = await web3.eth.getBalance(accounts[1]);
	// 	let account2_balance = await web3.eth.getBalance(accounts[2]);
	// 	console.log('account1_balance', account1_balance);
	// 	console.log('account2_balance', account2_balance);
	// 	// const res = await testing.validateFullTest(left, signatureLeft, { from: accounts[7], value: 300, gasPrice: 20000000000});	
	// 	// console.log('res', res);
	// 	// const signer = await testing.getTestSigner();	
	// 	// console.log('signer', signer);		
	// 	//await debug(testing.validateFullTest(left, signatureLeft, right, signatureRight, { from: accounts[7], value: 300, gasPrice: 0 }));	
	// 	// console.log(left.takeAsset.assetType, right.makeAsset.assetType);
	// 	// const res = await testing.matchAssetsTest(left.takeAsset.assetType, right.makeAsset.assetType);	
	// 	// console.log('res', res);
	// 	// const res = await testing.checkMatchAssetsTest(left,  right);	
	// 	// console.log('res', res);
	// 	// const res = await testing.matchAndTransferTest(left, right, { from: accounts[2], value: 300, gasPrice: 20000000000 });			
	// 	// console.log('res', res);
	// 	const res = await testing.matchOrders(left, signatureLeft, right, signatureRight, { from: accounts[2], value: 200, gasPrice: 20000000000 });	
	// 	console.log('res', res);
	// 	console.log('erc721 balance1', await erc721.balanceOf(accounts[1]));
	// 	console.log('erc721 balance2', await erc721.balanceOf(accounts[2]));
    // 	assert.equal(await erc721.balanceOf(accounts[1]), 0);
    // 	assert.equal(await erc721.balanceOf(accounts[2]), 1);
	// }).timeout(1000000); 
	
	// it("normal ERC1155 TEST", async () => {
	// 	console.log('TestERC1155', erc1155.address);		
	// 	const erc1155TokenId1 = accounts[1] + "b00000000000000000000001";
	// 	await erc1155.mint(accounts[1], erc1155TokenId1, 100, "0x");
	// 	console.log('testing', testing.address);		
	// 	await erc1155.setApprovalForAll(testing.address, true, {from: accounts[1]});		
	// 	const left = Order(accounts[1], Asset(ERC1155, enc(erc1155.address, erc1155TokenId1), 2), ZERO, Asset(ETH, "0x", 200), "0x");
	// 	const right = Order(accounts[2], Asset(ETH, "0x", 200), ZERO, Asset(ERC1155, enc(erc1155.address, erc1155TokenId1), 2), "0x");
	// 	console.log('left', left);
	// 	console.log('right', right);		
    // 	let signatureLeft = await getSignature(left, accounts[1]);
	// 	let signatureRight = await getSignature(right, accounts[2]);
	// 	console.log('signatureLeft', signatureLeft);
	// 	console.log('signatureRight', signatureRight);	
	// 	let account1_balance = await web3.eth.getBalance(accounts[1]);
	// 	let account2_balance = await web3.eth.getBalance(accounts[2]);
	// 	console.log('account1_balance', account1_balance);
	// 	console.log('account2_balance', account2_balance);
	// 	// const res = await testing.validateFullTest(left, signatureLeft, { from: accounts[7], value: 300, gasPrice: 20000000000});	
	// 	// console.log('res', res);
	// 	// const signer = await testing.getTestSigner();	
	// 	// console.log('signer', signer);		
	// 	//await debug(testing.validateFullTest(left, signatureLeft, right, signatureRight, { from: accounts[7], value: 300, gasPrice: 0 }));	
	// 	// console.log(left.takeAsset.assetType, right.makeAsset.assetType);
	// 	// const res = await testing.matchAssetsTest(left.takeAsset.assetType, right.makeAsset.assetType);	
	// 	// console.log('res', res);
	// 	// const res = await testing.checkMatchAssetsTest(left,  right);	
	// 	// console.log('res', res);
	// 	// const res = await testing.matchAndTransferTest(left, right, { from: accounts[2], value: 300, gasPrice: 20000000000 });			
	// 	// console.log('res', res);
	// 	const res = await testing.matchOrders(left, signatureLeft, right, signatureRight, { from: accounts[2], value: 200, gasPrice: 20000000000 });	
	// 	console.log('res', res);
	// 	console.log('erc1155 balance1', await erc1155.balanceOf(accounts[1], erc1155TokenId1));
	// 	console.log('erc1155 balance2', await erc1155.balanceOf(accounts[2], erc1155TokenId1));
		
    // 	assert.equal(await erc1155.balanceOf(accounts[1], erc1155TokenId1), 98);
    // 	assert.equal(await erc1155.balanceOf(accounts[2], erc1155TokenId1), 2);
    // }).timeout(1000000); 
});
