// eslint-disable-next-line no-undef
const NFT = artifacts.require("NFT")

module.exports = function (deployer) {
  // deployer.deploy(NFT, "_tokenName", "_tokenSymbol", _cost, _maxSupply, _maxMintAmountPerTx, "_hiddenMetadataUri")
  deployer.deploy(NFT, "_tokenName", "_tokenSymbol", 1, 10000, 5, "")
}
