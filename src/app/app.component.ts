import { Component, OnInit} from '@angular/core';
import { Web3Service } from './services/web3.service';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { PetComponent } from './pages/pet/pet.component';
import { DonateComponent } from './pages/donate/donate.component';
import { Pet } from 'src/app/models/pet.model';
import { FriendComponent } from './pages/friend/friend.component';
import { Friend } from 'src/app/models/friend.model';
import { AdoptComponent } from './pages/adopt/adopt.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', "./shared/style.shared.css"]
})

export class AppComponent implements OnInit {

  loading = false;
  accountNumber: any;
  private petShelter: any;

  nameShelter: string;
  totalDonations: number;
  countFriend: number;
  countPet: number;

  pets: Pet[] = [];

  donateDialogRef: MatDialogRef<DonateComponent>;
  petDialogRef: MatDialogRef<PetComponent>;
  friendDialogRef: MatDialogRef<FriendComponent>;
  adoptDialogRef: MatDialogRef<AdoptComponent>;
  
  constructor(private web3: Web3Service,
    private _snackBar: MatSnackBar,              
    private dialog: MatDialog) {

      this.web3.checkAndInstantiateWeb3()
      .then((checkConn: any) => {
        if (checkConn === 'connected') {
          this.web3.loadBlockChainData()
            .then((accountData: any) => {
              this.accountNumber = accountData[0];
              this.web3.getContract()
                .then((contractRes: any) => {
                  if (contractRes) {
                    this.petShelter = contractRes;
                    this.updateDataToolbar();
                    this.loading = false;
                  }
                });
            }, err => {
              console.log('Account Error: ', err);
            });
        }
      }, err => {
        alert(err);
      });
  }

  ngOnInit() {
  }

  refresAccounts() {
    this.web3.checkAndInstantiateWeb3()
      .then((checkConn: any) => {
        if (checkConn === 'connected') {
          this.web3.loadBlockChainData()
            .then((accountData: any) => {
              this.accountNumber = accountData[0];
            }, err => {
              console.log('Account Error: ', err);
            });
        }
      }, err => {
        alert(err);
      });
  }

  async updateTotalDonations() {
    this.petShelter.methods.getTotalDonations().call().then(value => {      
      this.totalDonations = this.web3.convertEtherToPrice(value);
    });
  }

  async updateFriendCount() {
    this.petShelter.methods.getFriendCount().call().then(value => {
      this.countFriend = value;
    });
  }

  async updatePetCount() {
    this.petShelter.methods.getPetCount().call().then(value => {
      this.countPet = value;
    });
  }

  async getNameShelter() {
    this.petShelter.methods.getNameShelter().call().then(name => {
      this.nameShelter = name;
    });
  }

  updateDataToolbar() {
    this.loading = true;

    this.getNameShelter();
    this.updateTotalDonations();
    this.updateFriendCount();
    this.updatePetCount();

    this.loading = false;
  }

  adopt() {    
    this.petShelter.methods.getPetCount()
      .call()
      .then(value => {
        this.countPet = value;
        this.loading = false;
        console.log('countPet: ', this.countPet);
      });    
  }

  createPetDialog() {
    this.refresAccounts();
    this.petDialogRef = this.dialog.open(PetComponent, {
      hasBackdrop: false,
      id: "modal-component1",
      height: "770px",
      width: "700px",
      data: { account: this.accountNumber }
    });

    this.petDialogRef.afterClosed().subscribe((pet: Pet) => {
      console.log('The dialog was closed createPetDialog');
      if (pet != undefined) {
        this.registerPet(pet);
      }
    });
  }

  registerPet(pet: Pet) {
    console.log(pet);
    this.loading = true;

    this.petShelter.methods.createPet(pet.name, pet.idbreed, pet.age, pet.idphoto)
      .send({ from: this.accountNumber })
      .once('receipt', (receipt) => {
        console.log('Create Pet: ', receipt);
      });

    this.updatePetCount();
    this.loading = false;
  }

  createFriendDialog() {
    this.refresAccounts();
    this.friendDialogRef = this.dialog.open(FriendComponent, {
      hasBackdrop: false,
      id: "modal-component1",
      height: "600px",
      width: "600px",
      data: { account: this.accountNumber }
    });

    this.friendDialogRef.afterClosed().subscribe((friend: Friend) => {
      console.log('The dialog was closed createFriendDialog');
      if (friend != undefined) {
        this.registerFriend(friend);
      }
    });
  }

  registerFriend(friend: Friend) {
    console.log(friend);
    this.loading = true;
    console.log(this.accountNumber);
    this.petShelter.methods.setFriendPet(this.accountNumber, friend.name)
      .send({ from: this.accountNumber })
      .once('receipt', (receipt) => {
        console.log('Create Friend: ', receipt);
      });

    this.updateFriendCount();
    this.loading = false;
  }

  getPets() {
    this.petShelter.methods.getPetCount().call().then(value => {
      this.countPet = value;
    });

    for (let i = 1; i <= this.countPet; i++) {
      this.petShelter.methods.getPet(i).call().then(pet => {
        console.log(pet);
        this.pets.push(pet);
      });
    }
  }

  adoptPetDialog() {
    this.pets = [];
    this.getPets();
    console.log(this.pets.length);
    this.refresAccounts();
    this.adoptDialogRef = this.dialog.open(AdoptComponent, {
      hasBackdrop: false,
      id: "modal-component",
      height: "60%",
      width: "60%",
      data: { pets: this.pets }
    });

    this.adoptDialogRef.afterClosed().subscribe((idPet: any) => {
      console.log('The dialog was closed adoptPetDialog');
      if (idPet != undefined) {
        this.adoptPet(idPet);
      }
    });
  }

  adoptPet(idPet: number) {    
    this.loading = true;
    console.log(this.accountNumber);
    this.petShelter.methods.adoptPet(idPet)
      .send({ from: this.accountNumber })
      .once('receipt', (receipt) => {
        console.log('Adopt pet :) ', receipt);
      });    
    this.loading = false;
  }

  donateDialog(): void {
    this.refresAccounts();
    this.donateDialogRef = this.dialog.open(DonateComponent, {
      hasBackdrop: false,
      id: "modal-component",
      height: "600px",
      width: "600px",
      data: { account: this.accountNumber }
    });

    this.donateDialogRef.afterClosed().subscribe(amount => {
      console.log('The dialog was closed donateDialog ');
      if (amount != undefined) {
        this.makeDonation(amount);
      }
    });
  }

  async makeDonation(amount: number) {    
    let accountBalance = await this.web3.getEtherBalance(this.accountNumber);    

    if (amount > accountBalance) {
      this._snackBar.open('Friend has no balance :(', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }

    let amountWei = await this.web3.convertPriceToEther(amount);    

    this.loading = true;
    let numberRandom = this.getRandomInt(1, 99999);
    await this.petShelter.methods.processDonation(numberRandom) // numberRandom va como SEMILLA (seed) al contrato 
      .send({ from: this.accountNumber, value: amountWei})
      .once('receipt', (result) => {
        console.log('Make Donation: ', result);
      });

    this.updateTotalDonations();
    this.loading = false;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
