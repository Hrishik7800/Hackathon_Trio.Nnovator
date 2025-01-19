import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { configdata } from '../../data-definition/importdata';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgIfContext } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'TriNnovatorApp-table',
  standalone: true,
  imports: [
    TableModule,
    MultiSelectModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    CheckboxModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() value: any[] | undefined;
  @Input() fieldList: any;
  @Input() importdata: any;
  @Input() dataKey: any;
  @Input() cols!: any[];
  @Input() showSearch: boolean = false;
  @Input() defaultRowsPerPage: number | undefined;
  @Input() showCheckboxColumn: boolean = false; // Ensure this is set
  @Input() showExtractStructure = false;
  @Output() rowSelected: EventEmitter<any[]> = new EventEmitter();
  @Output() refreshData: EventEmitter<void> = new EventEmitter();
  @Output() clearTableEvent: EventEmitter<void> = new EventEmitter();
  @Output() rowDoubleClicked: EventEmitter<any> = new EventEmitter(); // New output for double-click event


  searchTerm: string = '';
  loading: boolean = false;
  selectedRows: any[] = [];
  product!: configdata;
  productDialog: boolean = false;
  elseBlock: TemplateRef<NgIfContext<boolean>> | null | undefined;
  dragIndex: number | null = null; // Track the column being dragged
  // router: any;

    constructor(
      // private webserviceutils: WebServiceUtilities,
      // private dialogService: DialogService,
      // private messageService: MessageService,
      private route: ActivatedRoute ,
      private router: Router // Inject Angular Router
    ) {}

  onSelectionChange(event: any[]) {
    this.rowSelected.emit(event);
  }

  clear(table: Table) {
    table.clear();
    this.searchTerm = '';
    this.clearTableEvent.emit(); // Emit event when clear is clicked
  }
  edit(importdata: any) {
    // console.log('editing', importdata);
  }

  refreshDataInParent() {
    this.refreshData.emit();
  }

  getCellStyle(value: string) {
    // console.log("Value passed to getCellStyle: ", value);
    const lightGreen = { 'background-color': 'lightgreen', 'color': 'black' };
    const lightRed = { 'background-color': 'lightcoral', 'color': 'black' };
    const lightBlue = { 'background-color':'lightblue', 'color':'black'};
    switch(value) {
      case 'Released':
      case 'IMPORTED':
      case 'TRANSFERRED':
      case 'THUMBNAIL_GENERATED':
      case 'VERIFIED':
        return lightGreen;
      case 'Superseded':
      case 'IMPORT_FAILED':
      case 'TRANSFER_FAILED':
      case 'THUMBNAIL_FAILED':
      case 'VERIFIED_FAILED':
        return lightRed;

      case 'Preliminary':
        return lightBlue;

      default:
        return {};
    }
  }
  
  onDragStart(event: DragEvent, index: number) {
    this.dragIndex = index;
    event.dataTransfer?.setData('text/plain', index.toString());
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
    // Triggered when a column is dropped
    onDrop(event: DragEvent, dropIndex: number) {
      event.preventDefault();
      if (this.dragIndex === null || this.dragIndex === dropIndex) return;
  
      // Rearrange the columns
      const draggedCol = this.cols[this.dragIndex];
      this.cols.splice(this.dragIndex, 1); // Remove dragged column
      this.cols.splice(dropIndex, 0, draggedCol); // Insert at the drop position
  
      // Reset drag index
      this.dragIndex = null;
    }

    onRowDoubleClick(rowData: any) {
      // Emit the row data when a row is double-clicked
      console.log("Double Clicked");
      
      this.rowDoubleClicked.emit(rowData);

      if(rowData.id && rowData.itemtype){
        this.router.navigate(['nodes',rowData.id,rowData.itemtype]);
      }

    }
}
