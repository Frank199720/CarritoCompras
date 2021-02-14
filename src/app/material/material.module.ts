import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  exports: [MatCardModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule,MatIconModule,MatButtonModule],
})
export class MaterialModule {}
