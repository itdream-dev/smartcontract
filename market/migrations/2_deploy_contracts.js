const upgrades  = require('@openzeppelin/truffle-upgrades');
const MetaSaltToken = artifacts.require("MetaSaltToken");
const MetaSaltMarket = artifacts.require("MetaSaltMarket");
const ERC721MetaSalt = artifacts.require("ERC721MetaSalt");
const ERC1155MetaSalt = artifacts.require("ERC1155MetaSalt");

module.exports = async function(deployer) {  
  // const erc20Token = await upgrades.deployProxy(MetaSaltToken, ["MetaSaltToken", "MST", 1000000000000000, "0xe7ab49cc6ec0a367ca94cb206aca2b36c47da3ce40c4f8638b0cf974dd610ab6", 1000000000000000], { deployer,  initializer: 'initialize'});
  // console.log("deployed MetaSaltToken token", erc20Token.address)
  // const adminInstance = await upgrades.admin.getInstance();
  // const adminAddress = await adminInstance.getProxyAdmin(erc20Token.address);
  // console.log('getInstance adminAddress', adminAddress);
  // console.log('adminInstance address', adminInstance.address);

  // const instance = await upgrades.deployProxy(ERC721MetaSalt, ["MetaSaltERC721", "MSN", "https://", "0xA56ac1B7972c38e277eF3bac5f94aA60B2Ec467e", 1000000000000000], { deployer,  initializer: '__ERC721MetaSalt_init'});
  // console.log("deployed ERC721MetaSalt nft", instance.address)
  // const adminInstance = await upgrades.admin.getInstance();
  // const adminAddress = await adminInstance.getProxyAdmin(instance.address);
  // console.log('getInstance adminAddress', adminAddress);
  // console.log('adminInstance address', adminInstance.address);

  // const instance = await upgrades.deployProxy(ERC1155MetaSalt, ["MetaSaltERC1155", "MSN", "https://", "0xA56ac1B7972c38e277eF3bac5f94aA60B2Ec467e", 1000000000000000], { deployer,  initializer: '__ERC1155MetaSalt_init'});
  // console.log("deployed ERC1155MetaSalt nft", instance.address)
  // const adminInstance = await upgrades.admin.getInstance();
  // const adminAddress = await adminInstance.getProxyAdmin(instance.address);
  // console.log('getInstance adminAddress', adminAddress);
  // console.log('adminInstance address', adminInstance.address);

  const instance = await upgrades.deployProxy(MetaSaltMarket, [10, "0x23BdEDA81bb62f9B5C2A453dC63e11CBcD64a868", "0xf5c502A8c31A210EAB6b7837E7C56d65d3Af2F83", "0xa8abA6bB110745e079Ad90cbbAF62102c8bA80Fe"], { deployer,  initializer: '__MetaSaltMarket_init'});
  console.log("deployed MetaSaltMarket market", instance.address)
  const adminInstance = await upgrades.admin.getInstance();
  const adminAddress = await adminInstance.getProxyAdmin(instance.address);
  console.log('getInstance adminAddress', adminAddress);
  console.log('adminInstance address', adminInstance.address);
};
