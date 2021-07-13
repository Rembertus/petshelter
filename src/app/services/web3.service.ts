import { Injectable } from '@angular/core';

const petShelterArtifacts = require('../../../build/contracts/PetShelter.json');

declare var require;
const Web3 = require('web3');
declare let window: any;
const testnetKovan = "https://kovan.infura.io/v3/INFURA_API_KEY";

@Injectable({
  providedIn: 'root'
})
export class Web3Service {    
  
  private messageResult: any;

  constructor() {
  }

  public checkAndInstantiateWeb3(): Promise<string> {    
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        this.messageResult = 'connected';
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        resolve(this.messageResult);
      } else if (window.web3) {
        this.messageResult = 'connected';        
        window.web3 = new Web3(new Web3.providers.HttpProvider(testnetKovan));        
        resolve(this.messageResult);
      } else {
        this.messageResult = 'No Ethereum browser detected. you should consider trying MetaMask';
        reject(this.messageResult);
      }
     });
  }

  public loadBlockChainData(): Promise<string> {
    return new Promise((resolve, reject) => {
      const web3 = window.web3;
      const account = web3.eth.getAccounts();
      if (account !== undefined) {
        resolve(account);
      } else {
        this.messageResult = 'There is no account';
        reject(this.messageResult);
      }
    });
  }

  public getContract() {
    return new Promise((resolve) => {
      const web3 = window.web3;
      let networkId;
      web3.eth.net.getId()
        .then((netId: any) => {
          networkId = netId;
          const abi = petShelterArtifacts.abi;
          const networkAddress = "CONTRACT_ADDRESS"; // petShelterArtifacts.networks[networkId].address;
          const petShelter = new web3.eth.Contract(abi, networkAddress);
          resolve(petShelter);
        });
    });
  }

  public convertPriceToEther(price: any) {
    const web3 = window.web3;
    return web3.utils.toWei(price.toString(), 'Ether');
  }

  public convertEtherToPrice(price: any) {
    const web3 = window.web3;
    return web3.utils.fromWei(price.toString(), 'Ether');
  }

  async getEtherBalance(account: string) {      
      const web3 = window.web3;
      const initialvalue = await web3.eth.getBalance(account);
      const balance = web3.utils.fromWei(initialvalue , 'ether');
      return balance;
  }

  async getEtherBalanceWei(account: string) {      
    const web3 = window.web3;
    const initialvalue = await web3.eth.getBalance(account);    
    return initialvalue;
}
}
