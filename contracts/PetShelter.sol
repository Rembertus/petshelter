// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract PetShelter is AccessControl, VRFConsumerBase {
    // Create roles
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant FRIEND_ROLE = keccak256("FRIEND_ROLE");

    string private nameShelter;
    address private adminShelter;

    uint public petCount;
    uint public friendCount;
    uint public donationCount;
    uint minimunAMount = 1000000000000000; // Ether 0.001                         
    uint private TotalDonation;

    mapping(uint => Pet) public pets;
    mapping(address => Friend) public friends;

    // For API Consumer from ChainLink
    bytes32 internal keyHash;
    uint internal fee;
    uint256 public randomResult;    

    struct Pet {
        uint id;
        string name;
        uint16 idbreed;
        uint16 age;
        uint16 idphoto;
        address owner;
        bool adopted;
    }

    struct Friend {
        uint id;
        string name;
        uint donation;
        address friend;
    }

    event PetCreated(
        uint id,
        string name,
        uint16 idbreed,
        uint16 age,
        uint16 idphoto,
        address owner,
        bool adopted
    );

    event PetAdopted(
        uint id,
        string name,
        uint16 idbreed,
        uint16 age,
        uint16 idphoto,
        address owner,
        bool adopted
    );

    event DonationMade(
        uint id,
        uint timestamp,
        string name,
        uint donation,
        address friend
    );
    
    event winERC20(string message);
    
    constructor() public VRFConsumerBase(
        0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, 0xa36085F69e2889c224210F603D836748e7dC0088) {
        nameShelter = "Patitas Albergue";
        adminShelter = msg.sender;
        _setupRole(ADMIN_ROLE, adminShelter);

        // For Chainlink
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10**18;
    }

    modifier MinimunAMount {
        require(msg.value >= minimunAMount, "Require a Minimun Mount!");
        _;
    }

    /**
     * @dev Register as a Friend.
     */
    function setFriendPet(address _friend, string memory _namefriend) public {        
        require(_friend != adminShelter, "Admin cannot to be Friend!");
        require(friends[_friend].friend != _friend, "Already Friend!");
        _setupRole(FRIEND_ROLE, _friend);
        uint donation = 0;
        friendCount++;
        friends[_friend] = Friend(friendCount, _namefriend, donation, _friend);
    }

    /**
     * @dev Create a Pet, Only Owner=Admin.
     */
    function createPet(string memory _name, uint16 _idbreed, uint16 _age, uint16 _idphoto ) public {
        require(bytes(_name).length > 0, "A valid Name is required!");        
        require(_age > 0, "A valid Age is required!");
        require(_idphoto > 0, "A valid Photo ID is required!");
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not a Admin");

        petCount++;
        pets[petCount] = Pet(petCount, _name, _idbreed, _age, _idphoto, adminShelter, false);

        emit PetCreated(petCount, _name, _idbreed, _age, _idphoto, adminShelter, false);
    }

    /**
     * @dev Adopt a Pet, Only Friend.
     */
    function adoptPet(uint _id) public {        
        require(_id > 0 && _id <= petCount, "Range for pet is wrong!");

        Pet memory _pet = pets[_id];
        require(!_pet.adopted, "Pet already adopted!");
        require(_pet.owner != msg.sender, "You cannot adopt the same Owner!");        
        require(hasRole(FRIEND_ROLE, msg.sender), "Caller is not a Friend");

        _pet.owner = msg.sender;
        _pet.adopted = true;
        pets[_id] = _pet;

        emit PetAdopted(_id, _pet.name, _pet.idbreed, _pet.age, _pet.idphoto, _pet.owner, _pet.adopted);
    }

    /**
     * @dev Make a Donation.
     */
    function processDonation(uint _seed) public payable MinimunAMount {
        address friend = msg.sender;
        uint donation = msg.value;

        Friend memory _friend = friends[friend];

        require(hasRole(FRIEND_ROLE, friend), "Caller is not a Friend");
        require(donation > 0, "Donation value is wrong!");
        require(friend.balance >= donation, "Friend has no balance :( ");
        
        _friend.donation += donation;
        friends[friend] = _friend;
                
        (bool success, ) = adminShelter.call {value: address(this).balance}("");
        require(success, "Transfer failed.");

        TotalDonation += donation;

        bytes32 requestId = getRandomNumber(_seed);        
        bool prime = probablyPrime(randomResult, 2); 
        if (prime) {
            emit winERC20("You WON a NFT!");
        }

        donationCount++;
        emit DonationMade(donationCount, block.timestamp, _friend.name, donation, friend);
    }

    /**
     * @dev Get data Pet.
     */
    function getPet(uint _id) public view returns(Pet memory pet) {
        require(_id > 0 && _id <= petCount, "Range for pet is wrong!");
        return pets[_id];
    }
    
    /**
     * @dev Generate Random from ORACLE Chainlink, nedd LINK.
     */
    function getRandomNumber(uint256 userProvidedSeed) internal returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) > fee, "Not enough LINK - fill contract with faucet");
        requestId = makeRequestId(keyHash, userProvidedSeed);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = uint16(randomness);
    }

    /**
     * @dev Return name Shelter
     * @return name of Contract
     */
    function getNameShelter() external view returns (string memory) {
        return nameShelter;
    }

    /**
     * @dev Return petCount
     * @return petCount
     */
    function getPetCount() external view returns (uint) {
        return petCount;
    }

    /**
     * @dev Return friendCount
     * @return friendCount
     */
    function getFriendCount() external view returns (uint) {
        return friendCount;
    }

    /**
     * @dev Return admin address
     * @return address of admin
     */
    function getAdmin() external view returns (address) {
        return adminShelter;
    }

    /**
     * @dev Return total donation
     * @return uint of total
     */
    function getTotalDonations() external view returns (uint) {
        return TotalDonation;
    }

    /**
     * @dev Return total donators
     * @return total donators
     */
    function getTotalDonators() external view returns (uint) {
        return donationCount;
    }  

    // miller rabin test
    function probablyPrime(uint256 n, uint256 prime) internal pure returns (bool) {
        if (n == 2 || n == 3) {
            return true;
        }

        if (n % 2 == 0 || n < 2) {
            return false;
        }

        uint256[2] memory values = getValues(n);
        uint256 s = values[0];
        uint256 d = values[1];

        uint256 x = fastModularExponentiation(prime, d, n);

        if (x == 1 || x == n - 1) {
            return true;
        }

        for (uint256 i = s - 1; i > 0; i--) {
            x = fastModularExponentiation(x, 2, n);
            if (x == 1) {
                return false;
            }
            if (x == n - 1) {
                return true;
            }
        }
        return false;
    }

    function fastModularExponentiation(uint256 a, uint256 b, uint256 n ) internal pure returns (uint256) {
        a = a % n;
        uint256 result = 1;
        uint256 x = a;

        while (b > 0) {
            uint256 leastSignificantBit = b % 2;
            b = b / 2;

            if (leastSignificantBit == 1) {
                result = result * x;
                result = result % n;
            }
            x = mul(x, x);
            x = x % n;
        }
        return result;
    }

    // Write (n - 1) as 2^s * d
    function getValues(uint256 n) internal pure returns (uint256[2] memory) {
        uint256 s = 0;
        uint256 d = n - 1;
        while (d % 2 == 0) {
            d = d / 2;
            s++;
        }
        uint256[2] memory ret;
        ret[0] = s;
        ret[1] = d;
        return ret;
    }

    // copied from openzeppelin
    // https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }      
}
