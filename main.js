
const axios = require('axios');
require('dotenv').config();
const qs = require('qs');
const ethers = require('ethers');
const provider = ethers.getDefaultProvider();
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const utils = require('./utils.js')

// zeros wallet for testing
const takerAddress = '0x000000026B746917fEfB1cF650ba6860A8Ff8fef'

// TODO: need to create tx from the query, and have it send successfully
const main = async (buy, sell, ammt) => {
  let gas = await utils.gasPrice();
  console.log(gas);
  const params = {
    buyToken: buy,
    sellToken: sell,
    buyAmount: ammt,
    gasPrice: gas
  }

  const response = await axios.get(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
  );

  //console.log(await response.data);
};

//main('WETH', 'DAI', '1000000000000000')



// get swap price
// TODO: figure out which way you want this to work, only sell side? Only buy side?
// TODO: Figure out how to parse which dex to interact with
const getPrice = async (buyToken, sellToken, ammt) => {
  let url = `https://api.0x.org/swap/v1/quote?buyToken=${buyToken}&sellToken=${sellToken}&sellAmount=${ammt}`
  /*
  /swap/v1/quote?buyToken=DAI&sellToken=WETH&sellAmount=100000000000000000
  */
  let quote = await axios.get(url)
  return quote.data.price
  //   console.log(`Price: ${quote.data.price}
  // Buy token to ETH rate: ${quote.data.buyTokenToEthRate}`);
}

getPrice('DAI', 'ETH', '100000000000');


// TODO: Create a watch function - maybe an express server to have it be constant?
const watchPrice = (price, buy, sell, ammt) => {
  // TODO: Figure out how to fire this every 10 seconds?
  let watch = getPrice(buy, sell, ammt);
  // if (watch < price) {
  //   main();
  // }
}


// TODO: Create the CLI portion to make this easier.  Or just a `node buy xxx xxx ammt` script



