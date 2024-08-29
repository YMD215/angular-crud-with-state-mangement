import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    RouterLink,
    RouterLinkActive,
    BadgeModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> {
  @ContentChild('header', { static: true }) headers!: TemplateRef<any>
  @ContentChild('body', { static: true }) body!: TemplateRef<any>
  @Input({required: true , alias: 'values'}) list!: T[]
  // list = input.required<T[]>({alias: 'values'});
  
  @Input('rows') row!: number;
  @Input() totalRecords: number = 120;
  @Input() currentPageReportTemplate: string = "Showing {first} to {last} of {totalRecords} entries";
  @Input() showCurrentPageReport: boolean = true;
  @Input() lazy: boolean = true;
  @Input() paginator!: boolean;
  @Input() rowsPerPageOptions!: number[];
  @Input() tableStyle: { [key: string]: string } = { 'min-width': '50rem' }
  @Output() lazyLoaded = new EventEmitter();
  @Output() pageChanged = new EventEmitter<TablePageEvent>();

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        console.log(`${propName} changed from`, change.previousValue, 'to', change.currentValue);
      }
    }
  }
  
  getUsers() {
    console.log('getUsers called');
    this.lazyLoaded.emit();
  }
  ChangePage(event: TablePageEvent) {
    console.log('ChangePage called');
    this.pageChanged.emit(event);
  }
  trackById(index: number, item: any): number | string {
    return item.id; 
  }
}
