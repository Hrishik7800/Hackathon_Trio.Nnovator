import { WebServiceUtilities } from './../../services/webservice.utilities';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import {
  SELECTIVE_DATA_TABLE_HEADERS,
  SELECTIVE_DATA_TABLE_LOAD,
  SELECTIVE_DATA_TABLE_SECOND_HEADERS,
} from '../../components/table/headers';
// import {
//   Detail,
//   // selectivedataDetail,
//   // selectivedataDetailload,
//   // selectivedataDetailtable,
// } from '../../components/service/detail.interface';
// import { ButtonModule } from 'primeng/button';
import {
  API_BASE_SELECTIVE_GET,
  API_SELECTIVEDATALOAD_GET_TYPEDATA,
  API_SELECTIVEDATALOAD_POST_DELETESELECTEDDATA,
  API_SELECTIVE_ADD,
  API_SELECTIVE_GET_TYPE,
} from '../../../api.constants';
import { DialogModule } from 'primeng/dialog';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NodeSelectionDialogComponent } from './nodeselectiondialog/nodeselectiondialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface Column {
  field: string;
  header: string;
}

interface Type {
  label: string;
  value: string;
}

@Component({
  selector: 'TriNnovatorApp-selectivedataload',
  templateUrl: './selectivedataload.component.html',
  styleUrls: ['./selectivedataload.component.scss'],
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    TableComponent,
    // ButtonModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule
  ],
  providers: [DialogService, MessageService]
})
export class SelectivedataloadComponent implements OnInit {

  ref: DynamicDialogRef | undefined
  selectedType: any;
  tableOptions: Type[] | undefined;

  COLS_SELECTIVEDATA: Column[] = SELECTIVE_DATA_TABLE_HEADERS;
  DATA_CONFIG_DATA: any;
  FIELDLIST_IMPORT_DATA!: string[];

  COLS_SELECTIVEDATATABLE: Column[] = SELECTIVE_DATA_TABLE_SECOND_HEADERS;
  DATA_SECOND_DATA: any;

  COLS_SELECTIVEDATALOAD: Column[] = SELECTIVE_DATA_TABLE_LOAD;
  // DATA_LOAD_DATA!: selectivedataDetailload[];

  // SELECTED_ROWS_SELECTIVE_DATA_TABLE1!: selectivedataDetail[];
  // SELECTED_ROWS_SELECTIVE_DATA_TABLE2!: selectivedataDetail[];

  constructor(
    private webserviceutils: WebServiceUtilities,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTypeData();
    this.loadSecondTable();
  }

  getTypeData() {
    this.webserviceutils.getData(API_SELECTIVEDATALOAD_GET_TYPEDATA).subscribe({
      next: (data: any) => {
        this.tableOptions = data;
      },
      error: (error) => {
        console.error('Error fetching Types', error);
      },
    });
  }

  loadDataBasedOnSelection(selectedValue: DropdownChangeEvent): void {
    debugger
    console.log("selected type : "+selectedValue.value);
    this.selectedType = selectedValue.value;
    const iteration = this.webserviceutils.getIteration();
    const table = selectedValue.value;
    const type = '';
    const name = '';
    const revision = '';
    const body = {
      iteration,
      table,
      type,
      name,
      revision,
    };
    this.webserviceutils.postData(API_BASE_SELECTIVE_GET, body).subscribe({
      next: (data: any) => {
        this.DATA_CONFIG_DATA = data.filteredData;
        this.DATA_SECOND_DATA = [];
        this.loadSecondTable();
      },
      error: (error) => {
        console.error('Error fetching Required Data1:', error);
      },
    });
  }

  showNodeSelectionDialog() {

    // if (this.SELECTED_ROWS_SELECTIVE_DATA_TABLE2.length > 0){
    //   this.ref = this.dialogService.open(NodeSelectionDialogComponent, {
    //     header: 'Select Node For Loading',
    //     contentStyle: {
    //       overflow: 'auto'
    //     },
    //     baseZIndex: 10000,
    //     data: {
    //       selectedRows: this.SELECTED_ROWS_SELECTIVE_DATA_TABLE2
    //     }
    //   });
    //  this.ref.onClose.subscribe((selectedValues: { root?: boolean; maturityState?: string; revision?: string; }) => {
    //   this.messageService.add({
    //     key: 'tst',
    //     severity: 'success',
    //     summary: 'Loading Job Created Successfully.',
    //     detail: 'Navigate to Loader to Start Loading.',
    //   });
    //   });
    // }
    // else{
    //   this.messageService.add({
    //     key: 'tst',
    //     severity: 'info',
    //     summary: 'No Records Selected For Loading.',
    //   });
    // }
  }

  // addToSecondTable(): void {

  //   const iteration = this.webserviceutils.getIteration();
  //   const userName = this.webserviceutils.getUserName();
  //   const tableName = this.selectedType;
  //   const selectedIds = this.SELECTED_ROWS_SELECTIVE_DATA_TABLE1.map(
  //     (baseid) => String(baseid.basId)
  //   );

  //   const body = {
  //     iteration,
  //     userName,
  //     tableName,
  //     selectedIds,
  //   };

  //   this.webserviceutils.postData(API_SELECTIVE_ADD, body).subscribe({
  //     next: (data: any) => {
  //       this.loadSecondTable();
  //     },
  //     error: (error) => {
  //       console.error('Error fetching Required Data2:', error);
  //     },
  //   });
  // }
  
  loadSecondTable() {
    debugger
    const emptyHeaders = new HttpHeaders();
    const params = new HttpParams().set('tableName', this.selectedType);
    this.webserviceutils.getData(API_SELECTIVE_GET_TYPE, emptyHeaders, params).subscribe({
      next: (data: any) => {
        this.DATA_SECOND_DATA = data;
      },
      error: (error) => {
        console.error('Error fetching Required Data3:', error);
      },
    });

  }

}
