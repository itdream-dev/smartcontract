# MetaSalt SmartContract Protocal

# Global Requirement
- Marketplace Support chain: Polygon, Ethereum, BSC
- Suppport NFT standard: ERC721 only

# Smart Contracts
- Market
  supports selling / buying nfts
- NFT
  supporting MetaSalt NFT standards
- ERC20
  econmic token
- Authentication
  supports verifying nft


# deployment requirements

1. ERC20 deployment
  - owner address, name (MetaSaltToken), symbol(MST), initialSupply 
  - deployment fee (MATIC,  ETH, BNB)
    tx - deploy
    tx - init sc     
    tx - link with nft sc 
  - airdrop addresses list

2. ERC721 NFT deployment
  - owner address, name(MetaSaltNFT), symbol(MSN), erc20CreateRewardValue
  - deployment fee (MATIC,  ETH, BNB)
    tx - deploy
    tx - init sc     

3. ERC1155 NFT deployment
  - owner address, name(MetaSaltNFT), symbol(MSN), erc20CreateRewardValue
  - deployment fee (MATIC,  ETH, BNB)
    tx - deploy
    tx - init sc     

4. Market deployment (MetaSaltMarket)
  - owner address,  market fee receiver address,  market fee percent
  - deployment fee (MATIC,  ETH, BNB)
    tx - deploy
    tx - init sc     
    
5. Authentication deployment (MetaSaltAuth)
  - owner address, RequestPrice for auth nft
  - deployment fee
    tx - deploy
    tx - init sc


# deployment steps

we can deploy all smart contract under market directory.

- cd ./market
- there is ./migration/2_deploy_contracts.js

  Here are deploy codes for each smart contracts.

  const instance = await deployProxy(MetaSaltToken, ["MetaSaltToken", "MST", 1000000000, "0xdc5cd25a44c36e69e9ca3896e833de1e3b9662279222692b7c97594a67dcdec5", 1000000000000000], { deployer,  initializer: 'initialize'});
  console.log("deployed metasalt token", instance.address)

  const instance = await deployProxy(ERC721MetaSalt, ["MetaSaltERC721", "MSN", "https://", "0x638583Eae7197a4D5cb2833B3c5556732eD09E49", 1000000000000000], { deployer,  initializer: '__ERC721MetaSalt_init'});
  console.log("deployed metasalt nft", instance.address)

  const instance = await deployProxy(ERC1155MetaSalt, ["MetaSaltERC1155", "MSN", "https://", "0x638583Eae7197a4D5cb2833B3c5556732eD09E49", 1000000000000000], { deployer,  initializer: '__ERC1155MetaSalt_init'});
  console.log("deployed metasalt nft", instance.address)

  const instance = await deployProxy(MetaSaltMarket, [0, "0xfcC6f84bF615B0A2001B2e73315d285745Fb3821", "0x0b9887B8d5281C457e7EfD492A951Ea0C9Be5ed4", "0xd398A9390C3D35825dA3ACa114e8c387DDef5ecB"], { deployer,  initializer: '__MetaSaltMarket_init'});
  console.log("deployed metasalt market", instance.address)
  
  
  we can deploy in this order:
  MetaSaltToken
  ERC721MetaSalt
  ERC1155MetaSalt
  MetaSaltMarket

  - Deploy command
  truffle migrate --network etc //deployment
  truffle run verify MetaSaltMarket --network eth //verify etherscan

