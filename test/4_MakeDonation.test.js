const PetShelter = artifacts.require("PetShelter");

module.exports = async function(callback) {
  let accounts = await web3.eth.getAccounts()

  let account1 = accounts[0];
  let account2 = accounts[2];
  let account8 = accounts[7];
  let account9 = accounts[8];
  let account10 = accounts[9];
  
  let meta = await PetShelter.deployed();
  console.log("Dirección del contrato: " + meta.address);
      
  /* TEST FOR DONATIONS */  
  const amount = "0.001"; 
  const amountToSend = web3.utils.toWei(amount, "ether");                       // Convert to wei value
  await meta.processDonation(134728, {from: account8, value: amountToSend});

  // await meta.processDonation(13472);                                         // Reason given: Require a Minimun Mount!.
  // await meta.processDonation(13472, {from: account2, value: amountToSend});  // Reason given: Caller is not a Friend. 
  
  let totalDonators = await meta.getTotalDonators();
  console.log("Total Donators: " +totalDonators);

  let totalDonations = await meta.getTotalDonations();
  console.log("Total Donations: " +totalDonations);

  callback();
}