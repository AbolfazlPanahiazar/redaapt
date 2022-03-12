require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/HskXgPhCcajHNXC3AqdS_sFvt1GJiyvg",
      accounts: [
        "403f1a6dd0b2abe03cb942bf50181e9193637d0423356371e75f2407fab9a922",
      ],
    },
  },
};
