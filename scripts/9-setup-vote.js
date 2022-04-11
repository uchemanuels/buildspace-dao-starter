import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0x303b32f749a7E29448A9064EC63540318ac79F76");

// This is our ERC-20 contract.
const token = sdk.getToken("0xfE91398db8CF2d25367440A02139dAb49cDa73A3");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 50% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent50 = Number(ownedAmount) / 100 * 50;

    // Transfer 50% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent50
    ); 

    console.log("✅ Successfully transferred " + percent50 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();