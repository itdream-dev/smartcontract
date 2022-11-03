const ERC721Test = artifacts.require("ERC721Test.sol");
const ZERO = "0x0000000000000000000000000000000000000000";
const { expectThrow } = require("@daonomic/tests-common");
const { sign } = require("./mint");

contract("ERC721Test", accounts => {
	let testing;	
	let creator;

	beforeEach(async () => {
		testing = await ERC721Test.new();
		await testing.__ERC721Test_init();		
		creator = accounts[1];
	});

	// it("should recover signer in error case", async () => {
	// 	const signature = await sign(accounts[2], 1, "testURI", creator, testing.address);
	// 	console.log('accounts', accounts);
	// 	console.log('signature', signature);
	// 	console.log('accounts[1]', accounts[1]);
	// 	console.log('testing.recover([1, "testURI", creator, signature], signature)', await testing.recover([1, "testURI", creator, signature], signature));
	// 	assert.equal(
	// 		await testing.recover([1, "testURI", creator, signature], signature),
	// 		accounts[1]
	// 	);
	// });

	it("should recover signer", async () => {
		const signature = await sign(accounts[1], 1, "testURI", creator, 150, testing.address);
		console.log('accounts', accounts);
		console.log('signature', signature);
		console.log('accounts[1]', accounts[1]);
		console.log('testing.recover([1, "testURI", creator, 150, signature], signature)', await testing.recover([1, "testURI", creator, 150, signature], signature));
		assert.equal(
			await testing.recover([1, "testURI", creator, 150, signature], signature),
			accounts[1]
		);
	});
});
