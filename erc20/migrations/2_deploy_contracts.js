const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const MetaSaltToken = artifacts.require("MetaSaltToken");

module.exports = async function(deployer) {
  const instance = await deployProxy(MetaSaltToken, ["MetaSaltToken", "MST", 100000000, "0xdc5cd25a44c36e69e9ca3896e833de1e3b9662279222692b7c97594a67dcdec5", 200000000000000], { deployer,  initializer: 'initialize'});
  console.log("deployed metasalt token", instance.address)
};
