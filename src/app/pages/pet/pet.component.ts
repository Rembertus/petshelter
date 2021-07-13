import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material'
import { Pet } from 'src/app/models/pet.model';
import { Common } from 'src/app/services/common.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css', "../../shared/style.shared.css"]
})
export class PetComponent implements OnInit {

  pet: Pet = { id: -1,  name: "", idbreed: -1, age: 0, idphoto: 0, owner: "", adopted: false};
  data: any;
  breed: any;
  photos: any;

  form: FormGroup;
  loading = false;

  constructor(private common: Common,
              private frm: FormBuilder, 
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<PetComponent>,
              @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.data = _data;
  }

  ngOnInit() {
    this.breed = this.common.getBreeds();
    this.photos = this.common.getPhotos();
    this.form = this.frm.group({      
      name: ['', Validators.required],
      idbreed: [1, Validators.required],
      age: [1, Validators.required],
      idphoto: [1, Validators.required]
    })
  }

  registerPet() {
    this.pet.name = this.form.value.name;
    this.pet.idbreed = this.form.value.idbreed;
    this.pet.age = this.form.value.age;
    this.pet.idphoto = this.form.value.idphoto;
    this.pet.owner = "";
    this.pet.adopted = false;

    if (this.pet.name.length < 2) {
      this._snackBar.open('A valid Name is required!', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      return;
    }

    if (this.pet.age < 1) {
      this._snackBar.open('A valid Age is required!', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      return;
    }      

    this.dialogRef.close(this.pet);
  }
}

