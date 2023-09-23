import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  searchControl = new FormControl();
  ngModelValue = 4

  ngOnInit() {
    this.subscription = this.searchControl.valueChanges
    .subscribe(value => console.log(`Form control ${value}`));

    this.searchControl.patchValue(3)
  }

  form = new FormGroup({
    dropdown: new FormControl(5),
  });


  onSubmit(): void {
    console.log(`Form control ${this.form.value.dropdown}`);
  }

  onValueChanged(id: number){
    console.log(`Value changed, id ${id}`)
  }

  onSearchValueChanged(search: string){
    console.log(`Search value changed, search ${search}`)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }



}
