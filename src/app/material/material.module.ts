import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule, MatCardModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatStepperModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,    
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule,    
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule, 
    MatStepperModule, MatTableModule,    
    MatToolbarModule, MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,    
  ],
  exports: [    
    MatInputModule,
    MatSelectModule,    
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,    
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,    
    MatTableModule,
    MatPaginatorModule,    
    MatAutocompleteModule,
    MatExpansionModule,
    MatButtonToggleModule,    
    MatFormFieldModule,
    MatSidenavModule,
    MatSliderModule,
    MatStepperModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule       
  ]
})
export class MaterialModule { }