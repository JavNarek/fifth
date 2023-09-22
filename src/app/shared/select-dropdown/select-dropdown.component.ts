import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '../model/options.model';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDropdownComponent),
      multi: true,
    },
  ],
})
export class SelectDropdownComponent implements OnInit, OnDestroy,  ControlValueAccessor {
  subscription!: Subscription;
  onChange: any = () => {};
  onTouched: any = () => {};

  // @Input() items: Item[] = [
  //   { name: 'Item 1', id: 1 },
  //   { name: 'Item 2', id: 2 },
  //   { name: 'Item 3', id: 3 },
  //   { name: 'Item 4', id: 4 },
  //   { name: 'Item 5', id: 5 },
  //   { name: 'Item 6', id: 6 },
  // ];
  items = Array.from({length: 100000}).map((_, i) => {
    return {
      name: 'Item '+i, id: i
    }
  });
  @Input() visibleItemsCount: number = 5;
  @Output() valueChanged = new EventEmitter<number>();
  @Output() searchValueChanged = new EventEmitter<string>();

  selectedItemId: number | null = null;
  selectedItemName: string = '';
  isDropdownOpen: boolean = false;
  filteredItems: Item[] = [];

  // constructor(@Inject('VISIBLE_ITEMS_COUNT') private defaultVisibleItemsCount: number) {
  //   this.visibleItemsCount = this.defaultVisibleItemsCount;
  // }

  ngOnInit() {
    this.filteredItems = this.items;

    this.subscription = this.searchControl.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(term => this.filterItems(term));
  }

  searchControl = new FormControl();


  writeValue(value: any) {
    this.selectedItemId = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.filteredItems = this.items;
    }
    this.searchControl.patchValue('');
  }

  selectItem(item: Item) {
    const { name, id } = item;
    this.selectedItemName = name;
    this.selectedItemId = id;
    this.onChange(id);
    this.onTouched();
    this.valueChanged.emit(id);
    this.isDropdownOpen = false;
  }

  filterItems(term: string) {
    this.searchValueChanged.emit(term);
    this.filteredItems = this.items.filter(({name}) =>
      name.toLowerCase().includes(term.toLowerCase())
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}


