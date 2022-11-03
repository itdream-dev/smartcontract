const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const ERC721MetaSalt = artifacts.require("ERC721MetaSalt");
const ERC721MetaSaltV2 = artifacts.require("ERC721MetaSaltV2");

module.exports = async function(deployer) {  
  // const erc721Proxy = await ERC721MetaSalt.deployed();
  // console.log('erc721Proxy.address', erc721Proxy.address);
  // const instance = await upgradeProxy(erc721Proxy.address, ERC721MetaSaltV2, { deployer });
  // console.log("upgraded metasalt nft", instance.address)

  // const instance = await deployProxy(ERC721MetaSalt, ["MetaSaltToken", "MST", 100000000, "0xdc5cd25a44c36e69e9ca3896e833de1e3b9662279222692b7c97594a67dcdec5", 200000000000000], { deployer,  initializer: 'initialize'});
  // console.log("deployed metasalt token", instance.address)
};
