const MetaSaltToken = artifacts.require("MetaSaltToken.sol");
const ZERO = "0x0000000000000000000000000000000000000000";
const { expectThrow } = require("@daonomic/tests-common");
const { sign } = require("./mint");
const { MerkleTree } = require('merkletreejs');
const {ethers} = require('ethers');
const keccak256 = require('keccak256');

function hashToken(account) {	
	return keccak256(account);
}

contract("ERC20", accounts => {
	let testing;		
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
		testing = await MetaSaltToken.new();
		await testing.initialize("MetaSaltToken", "MST", "10000000000000", _merkleRoot, AIRDROP_AMOUNT);				
	});

	// it("check merkle root proof", async () => {
	// 	const account = accounts[0];
	// 	const proof = merkleTree.getHexProof(keccak256(account));
	// 	console.log('_merkleRoot', _merkleRoot);
	// 	console.log('proof', proof);
	// 	assert.equal(
	// 		await testing.checkValidity(proof),
	// 		true
	// 	);
	// });

	it("airdropping", async () => {
		const account = accounts[1];
		const proof = merkleTree.getHexProof(keccak256(account));
		console.log('_merkleRoot', _merkleRoot);
		console.log('proof', proof);		
		assert.equal(
			await testing.checkValidity(proof, {from: account}),
			true
		);
		const isAirdropped = await testing.isAirdropped(0, account);	
		console.log('isAirdropped', isAirdropped);
		const prev_balance = await testing.balanceOf(account);
		console.log('prev_balance', prev_balance.toString());
		const res = await testing.airdrop(proof,  {from: account})
		console.log('res', res);
		const curr_balance = await testing.balanceOf(account);
		console.log('curr_balance', curr_balance.toString());
		// console.log('curr_balance', await testing.balanceOf(account).toString());
		assert.equal(1, 1);

	});
});
