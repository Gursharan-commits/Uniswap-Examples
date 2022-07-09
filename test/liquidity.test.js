const { expect } = require("chai")
const { ethers, network } = require("hardhat")

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
const DAI_WHALE = "0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2"
const USDC_WHALE = "0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2"

describe("LiquidityExamples", () => {
  let liquidityExamples
  let accounts
  let dai
  let usdc

  before(async () => {
    accounts = await ethers.getSigners()

    const LiquidityExamples = await ethers.getContractFactory(
      "LiquidityExamples"
    )
    liquidityExamples = await LiquidityExamples.deploy()
    await liquidityExamples.deployed()

    dai = await ethers.getContractAt("IERC20", DAI)
    usdc = await ethers.getContractAt("IERC20", USDC)

    // Unlock DAI and USDC whales
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [DAI_WHALE],
    })
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [USDC_WHALE],
    })

    const daiWhale = await ethers.getSigner(DAI_WHALE)
    const usdcWhale = await ethers.getSigner(USDC_WHALE)

    // Send DAI and USDC to accounts[0]
    const daiAmount = 100n * 10n ** 18n
    const usdcAmount = 100n * 10n ** 6n
    //check if whales has balances GTE (greater than Eaqual to) the transfer amount
    expect(await dai.balanceOf(daiWhale.address)).to.gte(daiAmount)
    expect(await usdc.balanceOf(usdcWhale.address)).to.gte(usdcAmount)

    await dai.connect(daiWhale).transfer(accounts[1].address, daiAmount)
    await usdc.connect(usdcWhale).transfer(accounts[1].address, usdcAmount)
  })

  // it("receive ERC20 tokens", async () => {
  //   const daiAmount = 100n * 10n ** 18n
  //   const usdcAmount = 100n * 10n ** 6n

  //   console.log(
  //     "DAI balance before add liquidity",
  //     await dai.balanceOf(accounts[1].address)
  //   )
  //   console.log(
  //     "USDC balance before add liquidity",
  //     await usdc.balanceOf(accounts[1].address))

  //   console.log(
  //     "DAI balance of liquidity example before add liquidity",
  //     await dai.balanceOf(liquidityExamples.address))

  //   console.log(
  //     "USDC balance of liquidity example before add liquidity",
  //     await usdc.balanceOf(liquidityExamples.address))

  //   //connect to account and transfer tokens to the liquidity examples contract, for DAI as well as USDC
  //   await dai.connect(accounts[1]).transfer(liquidityExamples.address, daiAmount)
  //   await usdc.connect(accounts[1]).transfer(liquidityExamples.address, usdcAmount)


  //   // a wait liquidityExamples.mintNewPosition()

  //   console.log(
  //     "DAI balance after add liquidity",
  //     await dai.balanceOf(accounts[1].address))
  //   console.log(
  //     "USDC balance after add liquidity",
  //     await usdc.balanceOf(accounts[1].address))
  //   console.log(
  //     "DAI balance of liquidity example after add liquidity",
  //     await dai.balanceOf(liquidityExamples.address))
  //   console.log(
  //     "USDC balance of liquidity example after add liquidity",
  //     await usdc.balanceOf(liquidityExamples.address))
  // })


  // it("mintNewTokens", async () => {
  //   const daiAmount = 100n * 10n ** 18n
  //   const usdcAmount = 100n * 10n ** 6n

  //   //connect to account and transfer tokens to the liquidity examples contract, for DAI as well as USDC
  //   //we are  transferring 
  //   await dai.connect(accounts[1]).transfer(liquidityExamples.address, daiAmount)
  //   await usdc.connect(accounts[1]).transfer(liquidityExamples.address, usdcAmount)


  //   await liquidityExamples.mintNewPosition()

  //   console.log(
  //     "DAI balance after add liquidity",
  //     await dai.balanceOf(accounts[1].address)
  //   )
  //   console.log(
  //     "USDC balance after add liquidity",
  //     await usdc.balanceOf(accounts[1].address))
  // })

  ///@TO-DO finish the test script for fee collection
  it("collectsFees", async () => {
    const daiAmount = 100n * 10n ** 18n
    const usdcAmount = 100n * 10n ** 6n


    //connect to account and transfer tokens to the liquidity examples contract, for DAI as well as USDC
    //we are  transferring 
    await dai.connect(accounts[1]).transfer(liquidityExamples.address, daiAmount)
    await usdc.connect(accounts[1]).transfer(liquidityExamples.address, usdcAmount)

    // liquidityExamples.mintNewPosition().then(function (res) {
    //   var tokenID = res[0];
    // })
    const result = await liquidityExamples.mintNewPosition();
    const { 0: tokenId, 1: liquidity, 2: amount0, 3: amount1 } = result;
    console.log("tokenID of the minted NFT", result[0])


    // let tokenId = liquidityExamples.mintNewPosition.tokenId;
    //const tokenId = await liquidityExamples.tokenId

    // console.log("tokenID of the minted NFT", await liquidityExamples.tokenId)

    // await liquidityExamples.collectAllFees(result[1])
    // console.log(
    //   "USDC balance of liquidity example after add liquidity",
    //   await usdc.balanceOf(liquidityExamples.address))


    // console.log(
    //   "DAI balance of liquidity example after fee collected",
    //   await dai.balanceOf(liquidityExamples.address))

    // console.log(
    //   "USDC balance of liquidity example after fee collected",
    //   await usdc.balanceOf(liquidityExamples.address))
  })
})

