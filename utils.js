
const ethers = require('ethers');
const axios = require('axios');
require('dotenv').config();
// get gas price from GasNow
const etherscan = process.env.ETHERSCAN;
const gasPriceOracle = 'https://www.gasnow.org/api/v3/gas/price'
const gasPrice = async () => {
  let price = await axios.get(gasPriceOracle)
  return price.data.data.fast
}

module.exports = { gasPrice };
