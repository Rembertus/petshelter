import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pet } from 'src/app/models/pet.model';
import { Common } from 'src/app/services/common.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css', "../../shared/style.shared.css"]
})
export class AdoptComponent implements OnInit {

  pets: Pet[];
  breed: any;
  photos: any;
  loading = false;
  data: any;

  constructor(private common: Common,
              private dialogRef: MatDialogRef<AdoptComponent>,           
              @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.data = _data;
  }

  ngOnInit() {    
    this.breed = this.common.getBreeds();
    this.photos = this.common.getPhotos();
  }

  getNameBreed(id: number) {    
    let tmpBreed = this.breed.find(x => x.id == id);    
    return tmpBreed.name;
  };
  
  getPhoto(id: number) {
    let tmpPhoto = this.photos.find(x => x.id == id);    
    return tmpPhoto.image;
  };

  adoptPet(id: number) {    
    this.dialogRef.close(id);    
  }
}
