// https://eth-ropsten.alchemyapi.io/v2/9_joBZyX8vb1Yn8h1jkVOB3rU8IJoDeM

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/9_joBZyX8vb1Yn8h1jkVOB3rU8IJoDeM",
      accounts: [
        "403f1a6dd0b2abe03cb942bf50181e9193637d0423356371e75f2407fab9a922",
      ],
    },
  },
};
