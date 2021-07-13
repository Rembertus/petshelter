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
   
  /* TEST FOR ADOPTIONS */
  await meta.adoptPet(1, {from: account8});          // account8 before is a register as a Friend
  await meta.adoptPet(2, {from: account9});          // account9 before is a register as a Friend

  // await meta.adoptPet(21);                        // Reason given: Range for adopt is wrong!.
  // await meta.adoptPet(1);                         // Reason given: You cannot adopt the same Owner!.
  // await meta.adoptPet(1, {from: account2});       // Reason given: Caller is not a Friend.  
  // await meta.adoptPet(1, {from: account9});       // Reason given: Pet already adopted!.  

  callback();
}