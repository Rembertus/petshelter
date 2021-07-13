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
  
  /* TEST FOR FRIEND REGISTRY */
  await meta.setFriendPet("0x681d9f07AB388138C0eB5E6F8Fd0e8DFBF01da6c", "Juancho");  
  await meta.setFriendPet("0x381422384F05ebB4FE775779552021aADC2597A6", "Tio Pepe");
  await meta.setFriendPet("0x84b75b3F1E0634502Bb8590b05823069cA275f5c", "Rembrant Crazy");

  // await meta.setFriendPet("0x4276B249f9EF25e4861ac4Dc7dF40bC4A85a6342", "Admin");    // Reason given: Admin cannot to be Friend!.  
  // await meta.setFriendPet("0x681d9f07AB388138C0eB5E6F8Fd0e8DFBF01da6c", "Juancho");  // Reason given: Already Friend!.

  let friendCount = await meta.getFriendCount();
  console.log("Friend Count: " + friendCount);

  callback();
}