const Testing = artifacts.require("ERC1155Metasalt.sol");
const truffleAssert = require('truffle-assertions');
const { expectThrow } = require("@daonomic/tests-common");
const { sign } = require("./mint");
const ERC20TokenTest = artifacts.require("ERC20TokenTest.sol");
const { MerkleTree } = require('merkletreejs');
const {ethers} = require('ethers');
const keccak256 = require('keccak256');

contract("ERC1155MetaSalt", accounts => {
  let token;  
  let erc20Token;
  const name = 'FreeMintable';
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

  async function getSignature(tokenId, tokenURI, supply, creator, royaltyFee, account) {
	return sign(account, tokenId, tokenURI, supply, creator, royaltyFee, token.address);	
  }

  beforeEach(async () => {
	const AIRDROP_AMOUNT = 2000000000000000;
	erc20Token = await ERC20TokenTest.new();
	await erc20Token.initialize("MetaSaltToken", "MST", 0, _merkleRoot, AIRDROP_AMOUNT);		
	
	const owner = await erc20Token.owner();
	console.log('owner', owner);
    token = await Testing.new();
	await token.__ERC1155MetaSalt_init(name, "ERC1155MetaSalt", "https://", erc20Token.address, 1000000000000000);
	
	await erc20Token.setERC1155Creator(token.address);
  });

//   it("approve for all", async () => {    
// 	await token.setApprovalForAll(accounts[3], true, {from: accounts[1]})
// 	console.log('approved', accounts[1], accounts[3], await token.isApprovedForAll(accounts[1], accounts[3]));
//     assert.equal(await token.isApprovedForAll(accounts[1], accounts[3]), true);
//   });

  it("mint and transfer", async () => {
    let minter = accounts[1];
    let transferTo = accounts[3];
    const tokenId = minter + "b00000000000000000000001";
    const tokenURI = "abc";
    let supply = 5;
    let mint = 2;
	let royaltyFee = 1;
	const signature = await getSignature(tokenId, tokenURI, supply, minter, royaltyFee, minter);
	await token.setApprovalForAll(accounts[3], true, {from: accounts[1]})
	// const res = await token.mintAndTransferTest([tokenId, tokenURI, supply, minter, royaltyFee, signature], transferTo, mint, {from: transferTo});
	// console.log('res', res);
	
	await token.mintAndTransfer([tokenId, tokenURI, supply, minter, royaltyFee, signature], transferTo, mint, {from: accounts[3]});
	console.log('uri', await token.uri(tokenId));
	assert.equal(await token.uri(tokenId), "https://" + tokenURI);
    assert.equal(await token.balanceOf(transferTo, tokenId), mint);
  });
});