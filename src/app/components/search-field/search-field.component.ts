import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.pug',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  @Input() searchInput: any;
  @Input() searchData: any;
  @Input() selectData: any;
  @Input() selectInput: any;
  @Input() apiUrlError: any;
  @Output() searchInputChange = new EventEmitter<any>();
  @Output() searchCallback = new EventEmitter<any>();
  @Output() selectInputChange = new EventEmitter<any>();
  @Output() selectCallback = new EventEmitter<any>();
  searchInputText: string = '';
  selectInputText: string = '';

  constructor() { }

  ngOnInit(): void {
    this.searchInputText = this.searchInput;
  }

  search() {
    this.searchInput = this.searchInputText;
    this.searchInputChange.emit(this.searchInput);
    this.searchCallback.emit();
  }

  select() {
    this.selectInputChange.emit(this.selectInput);
    this.selectCallback.emit();
  }

}
