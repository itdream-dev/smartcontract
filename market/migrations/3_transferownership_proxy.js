const { deployProxy, upgradeProxy, admin } = require('@openzeppelin/truffle-upgrades');
const MetaSaltToken = artifacts.require("MetaSaltToken");
const MetaSaltMarket = artifacts.require("MetaSaltMarket");
const ERC721MetaSalt = artifacts.require("ERC721MetaSalt");
const ERC1155MetaSalt = artifacts.require("ERC1155MetaSalt");

module.exports = async function(deployer) {  
  // const adminInstance = await admin.getInstance();
  // const adminAddress = await adminInstance.getProxyAdmin("0xC914a6870B09b3d5d26b2233087f0D59A2A9fE71");
  // console.log('adminAddress', adminAddress);
  //console.log('deployer', deployer);
  //const current = await admin.owner();
  //console.log('current', current);
  // const newAdmin = '0x23BdEDA81bb62f9B5C2A453dC63e11CBcD64a868';

  // const adminInstance = await admin.getInstance();
  //const adminAddress = await adminInstance.getProxyAdmin("0x0a355d114F94dFC7099333dE6de2ffC329cC366a");
  //await admin.transferProxyAdminOwnership(newAdmin);
  // console.log(adminInstance.address);
};
