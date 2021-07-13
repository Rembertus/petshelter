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
  
  /* TEST FOR CREATE PETS */
  await meta.createPet("Tick", 1, 1, 1);
  await meta.createPet("Marshal", 2, 1, 1);
  await meta.createPet("Pancho", 3, 5, 1);
  await meta.createPet("Ramon", 4, 8, 1);
  await meta.createPet("Zeus", 5, 1, 3);

  // await meta.createPet("", 2, 1, 3);       // Reason given: A valid Name is required!.  
  // await meta.createPet("Zeus", 2, 0, 3);   // Reason given: A valid Age is required!.
  // await meta.createPet("Zeus", 2, 1, 0);   // Reason given: A valid Photo ID is required!.
  // await meta.createPet("Zeus", 3, 1, 3, {from: account2}); // Reason given: Caller is not a Admin.

  let petCount = await meta.getPetCount();
  console.log("Pet Count: " + petCount);
  
  /* TEST FOR GET PETS */
  let pet1 = await meta.getPet(1); // Tick
  console.log(pet1);
  let pet2 = await meta.getPet(2); // Marshal
  console.log(pet2.name);

  callback();
}