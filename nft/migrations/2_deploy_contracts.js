const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const ERC721MetaSalt = artifacts.require("ERC721MetaSalt");
const ERC1155MetaSalt = artifacts.require("ERC1155MetaSalt");

module.exports = async function(deployer) {
  const instance = await deployProxy(ERC721MetaSalt, ["MetaSaltERC721", "MSN", "https://", "0x35FE26919a2C3DCD95dF1401146D5a87171A7AD4", 1000000000000000], { deployer,  initializer: '__ERC721MetaSalt_init'});
  console.log("deployed metasalt nft", instance.address)

  // const instance = await deployProxy(ERC1155MetaSalt, ["MetaSaltERC1155", "MSN", "https://", "0x35FE26919a2C3DCD95dF1401146D5a87171A7AD4", 1000000000000000], { deployer,  initializer: '__ERC1155MetaSalt_init'});
  // console.log("deployed metasalt nft", instance.address)
};
