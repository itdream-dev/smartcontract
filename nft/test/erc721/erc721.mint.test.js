const ERC721MetaSaltTest = artifacts.require("ERC721MetaSalt.sol");
const ERC20TokenTest = artifacts.require("ERC20TokenTest.sol");
const ZERO = "0x0000000000000000000000000000000000000000";
const { expectThrow } = require("@daonomic/tests-common");
const { sign } = require("./mint");
const { MerkleTree } = require('merkletreejs');
const {ethers} = require('ethers');
const keccak256 = require('keccak256');

contract("ERC721MetaSaltTest", accounts => {
	let testing;	
	let erc20Token;

	let airdropList = [
		accounts[0],
		accounts[1],
		accounts[2],
		accounts[3],
		accounts[4],
		accounts[5],
		accounts[6],
		accounts[7],		
	  ]
	  let merkleTree =  new MerkleTree(airdropList.map(acc => keccak256(acc)), keccak256, { sortPairs: true });
	  const _merkleRoot = merkleTree.getHexRoot();

	  
	beforeEach(async () => {
		const AIRDROP_AMOUNT = 2000000000000000;
		erc20Token = await ERC20TokenTest.new();
		await erc20Token.initialize("MetaSaltToken", "MST", 0, _merkleRoot, AIRDROP_AMOUNT);		
		const owner = await erc20Token.owner();
		console.log('owner', owner);
		testing = await ERC721MetaSaltTest.new();		
		console.log('testing address', testing.address);
		await testing.__ERC721MetaSalt_init("MetaSalt", "MS", "TestBaseURL", erc20Token.address, 1000000000000000);				
		console.log('contract is inited');
		await erc20Token.setERC721Creator(testing.address);		
	});

	// it("Run mintAndTransfer by the same minter", async () => {
	// 	const minter = accounts[1];
	// 	//let transferTo = accounts[4];
	// 	const tokenId = minter + "b00000000000000000000001";
	// 	const tokenURI = "https://";
	// 	const royaltyFee = 150;
	// 	console.log('tokenId', tokenId);
	// 	const signature = await sign(minter, tokenId, tokenURI, minter, royaltyFee, testing.address);		
	// 	//minter burn item, in tokenId minter address contains, ok
	// 	//await token.burn(tokenId, {from: minter});
	// 	await testing.mintAndTransfer([tokenId, tokenURI, minter, royaltyFee, signature], minter, {from: minter});
	// 	console.log("await testing.balanceOf(minter)", await testing.balanceOf(minter));
	// 	const reward = await erc20Token.getReward(minter);
	// 	console.log("reward balance", reward.toNumber());
	// 	const _royaltyFee = await testing.getRoyaltyFee(tokenId);
	// 	const _creator = await testing.getCreator(tokenId);
	// 	console.log(_royaltyFee, _creator);
	// 	assert.equal(_royaltyFee, royaltyFee);	
	// 	assert.equal(_creator, minter);
	// 	assert.equal(await testing.balanceOf(minter), 1);
	// });

	it("Test With LazyData", async () => {
		const creator = accounts[0];
		const minter = accounts[1];
		//let transferTo = accounts[4];
		const tokenId = creator + "b00000000000000000000001";
		const tokenURI = "https://";
		const royaltyFee = 150;
		console.log('tokenId', tokenId);
		const signature = await sign(creator, tokenId, tokenURI, creator, royaltyFee, testing.address);		
		//minter burn item, in tokenId minter address contains, ok
		//await token.burn(tokenId, {from: minter});
		await testing.setApprovalForAll(minter, true, {from: creator})
		await testing.mintAndTransfer([tokenId, tokenURI, creator, royaltyFee, signature], minter, {from: minter});
		console.log("await testing.balanceOf(minter)", await testing.balanceOf(minter));
		const reward = await erc20Token.getReward(creator);		
		console.log("reward balance", reward.toNumber());
		const _royaltyFee = await testing.getRoyaltyFee(tokenId);
		const _creator = await testing.getCreator(tokenId);
		assert.equal(_royaltyFee, royaltyFee);	
		assert.equal(_creator, creator);	
		assert.equal(await testing.balanceOf(minter), 1);
	});
});
