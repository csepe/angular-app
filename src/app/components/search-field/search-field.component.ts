import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.pug',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  @Input() input: string = '';
  @Input() data: any;
  @Input() inputTypes: string[] = [];
  @Output() inputChange = new EventEmitter<any>();
  @Output() callback = new EventEmitter<any>();
  inputText: string = '';


  @Input() searchInput: any;
  @Input() searchData: any;
  @Input() selectData: any;
  @Input() selectInput: any;
  @Input() autoCompleteData: any;
  @Input() autoCompleteInput: any;
  @Input() apiUrlError: any;
  @Input() errorMessage: any = '';
  @Output() searchInputChange = new EventEmitter<any>();
  @Output() searchCallback = new EventEmitter<any>();
  @Output() selectInputChange = new EventEmitter<any>();
  @Output() selectCallback = new EventEmitter<any>();
  @Output() autoCompleteInputChange = new EventEmitter<any>();
  @Output() autoCompleteCallback = new EventEmitter<any>();
  searchInputText: string = '';
  selectInputText: string = '';
  autoCompleteInputText: string = '';
  autoCompleteControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.searchInputText = this.searchInput;
  }

  onChange(value: string): void {
    this.input = value;
    this.inputChange.emit(this.input);
    this.callback.emit(this.input);
  }

  search(): void {
    this.searchInput = this.searchInputText;
    this.searchInputChange.emit(this.searchInput);
    this.searchCallback.emit();
  }

  select(): void {
    this.selectInputChange.emit(this.selectInput);
    this.selectCallback.emit();
  }

}
