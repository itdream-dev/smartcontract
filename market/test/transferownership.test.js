const assert = require('assert');
const { getAdminAddress } = require('@openzeppelin/upgrades-core');
const upgrades = require('@openzeppelin/truffle-upgrades');
const { getManifestAdmin } = require('@openzeppelin/truffle-upgrades/dist/admin.js');
const { wrapProvider } = require('@openzeppelin/truffle-upgrades/dist/utils/wrap-provider.js');
const { withDefaults } = require('@openzeppelin/truffle-upgrades/dist/utils/options.js');

const MetaSaltToken = artifacts.require("MetaSaltToken.sol");

contract('Admin', function (accounts) {
  const { deployer } = withDefaults({});
  const provider = wrapProvider(deployer.provider);
  const testAddress = '0x1E6876a6C2757de611c9F12B23211dBaBd1C9028';

  it('getInstance', async function () {
    const erc20Token = await upgrades.deployProxy(MetaSaltToken, ["MetaSaltToken", "MST", 1000000000, "0xdc5cd25a44c36e69e9ca3896e833de1e3b9662279222692b7c97594a67dcdec5", 1000000000000000], { deployer,  initializer: 'initialize'});
    console.log("erc20Token", erc20Token.address);
    console.log('accounts', accounts[0]);
    const adminInstance = await upgrades.admin.getInstance();
    const adminAddress = await adminInstance.getProxyAdmin(erc20Token.address);
    console.log('getInstance adminAddress', adminAddress);
    console.log('adminInstance address', adminInstance.address);
    assert.strictEqual(adminInstance.address, adminAddress);
  });

  it('transferProxyAdminOwnership', async function () {
    await upgrades.admin.transferProxyAdminOwnership(testAddress);
    const admin = await getManifestAdmin(provider);
    const newOwner = await admin.owner();
    assert.strictEqual(newOwner, testAddress);
  });
});