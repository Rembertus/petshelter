const PetShelter = artifacts.require("PetShelter");

module.exports = function(deployer) {
  deployer.deploy(PetShelter);
};
