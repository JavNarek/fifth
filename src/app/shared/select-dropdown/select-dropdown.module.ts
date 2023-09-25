import { NgModule } from "@angular/core";
import { SelectDropdownComponent } from "./select-dropdown.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { VISIBLE_ITEMS_COUNT } from "../tokens/select-dropdown.token";

@NgModule({
  declarations: [SelectDropdownComponent],
  exports: [SelectDropdownComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ScrollingModule],
  providers: [{ provide: VISIBLE_ITEMS_COUNT, useValue: 5 }],
})
export class SelectDropdownModule {}
