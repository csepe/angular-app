import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.pug',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() data: any = [];
  @Input() columns: any = [];
  displayedColumns: any = [];
  dataSource: any = [];
  col
  element
  index

  constructor() { }

  ngOnInit() {
    if (this.columns.length < 1) this.columns = Object.keys(this.data[0])
    this.displayedColumns = Object.keys(this.data[0]);
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }
}