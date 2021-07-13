import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css', "../../shared/style.shared.css"]
})

export class DonateComponent implements OnInit {

  form: FormGroup;
  data: any;
  loading = false;

  constructor(private frm: FormBuilder, 
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<DonateComponent>,
              @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.data = _data;
  }

  ngOnInit() {
    this.form = this.frm.group({
      amount: ['0.001', Validators.required]
    })
  }

  processDonation() {    
    const amount = this.form.value.amount;
    if (amount < 0.001) {
      this._snackBar.open('Require a minimun amount of 0.001 ether', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      return;
    }

    this.dialogRef.close(amount);
  }
}