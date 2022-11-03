const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const MetaSaltAuth = artifacts.require("MetaSaltAuth");

module.exports = async function(deployer) {
  const instance = await deployProxy(MetaSaltAuth, ["0x711fF5E5843efB406FDb1fd8fe0F01beEb254ee8", 1000000000000000], { deployer,  initializer: '__MetaSaltAuth_init'});
  console.log("deployed metasalt auth", instance.address)
};