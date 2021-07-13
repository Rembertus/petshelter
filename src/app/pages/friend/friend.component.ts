import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Friend } from 'src/app/models/friend.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css', "../../shared/style.shared.css"]
})
export class FriendComponent implements OnInit {

  friend: Friend = { id: -1,  name: "", donation: 0, friend: ""};

  form: FormGroup;
  loading = false;
  data: any;

  constructor(private frm: FormBuilder, 
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FriendComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.data = _data;
  }

  ngOnInit() {
    this.form = this.frm.group({      
      name: ['', Validators.required],      
    })
  }

  registerFriend() {
    this.friend.name = this.form.value.name;

    if (this.friend.name.length < 3) {
      this._snackBar.open('A valid Name is required!', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      return;
    }

    this.dialogRef.close(this.friend);
  }
}
