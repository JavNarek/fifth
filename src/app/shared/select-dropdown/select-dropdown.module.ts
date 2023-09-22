import { NgModule } from "@angular/core";
import { SelectDropdownComponent } from "./select-dropdown.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    SelectDropdownComponent
  ],
  exports:[SelectDropdownComponent],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  providers: []
})
export class SelectDropdownModule { }