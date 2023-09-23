import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '../model/options.model';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { VISIBLE_ITEMS_COUNT } from '../tokens/select-dropdown.token';

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

  items: Item[] = Array.from({length: 100}).map((_, i) => {
    const count = i+1;
    return {
      name: `Item ${count}`, id: count
    }
  });
  @Input() visibleItemsCount:number;
  @Output() valueChanged = new EventEmitter<number>();
  @Output() searchValueChanged = new EventEmitter<string>();

  selectedItemId: number | null = null;
  selectedItemName = '';
  isDropdownOpen = false;
  filteredItems: Item[] = [];

  searchControl = new FormControl();

  constructor(@Optional() @Inject(VISIBLE_ITEMS_COUNT) defaultVisibleItemsCount: number) {
    this.visibleItemsCount = defaultVisibleItemsCount;
  }

  ngOnInit() {
    this.filteredItems = this.items;

    this.subscription = this.searchControl.valueChanges
    .pipe(
      distinctUntilChanged(),
      debounceTime(300),
    )
    .subscribe(term => this.filterItems(term));
  }



  writeValue(value: number) {
    this.selectedItemId = value;
    this.selectedItemName = this.items.find(({ id }) => id === value)?.name || '';
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


