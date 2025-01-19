import { WebServiceUtilities } from '../../services/webservice.utilities';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { TagModule } from 'primeng/tag';
import { MenubarModule } from 'primeng/menubar';
import * as XLS from 'xlsx';
import { Router } from '@angular/router';


import {
  SELECTIVE_DATA_TABLE_HEADERS,
  SELECTIVE_DATA_TABLE_LOAD,
  SELECTIVE_DATA_TABLE_SECOND_HEADERS,
} from '../../components/table/headers';
import {
  Detail,
  ConfigDetail,
  // selectivedataDetail,
  // selectivedataDetailload,
  // selectivedataDetailtable,
} from '../../components/service/detail.interface';
import { ButtonModule } from 'primeng/button';
import {
  API_BASE_ODATA_URL_ARAS,
  API_BASE_SELECTIVE_GET_ARAS,
  API_BASE_SELECTIVE_GET,
  API_SELECTIVEDATALOAD_GET_TYPEDATA,
  API_SELECTIVEDATALOAD_POST_DELETESELECTEDDATA,
  API_SELECTIVE_ADD,
  API_SELECTIVE_GET_TYPE,
  API_LOAD_MASTER_VALIDATE_UPS,
  API_LOAD_MASTER_START_UPS,
} from '../../../api.constants';
import { DialogModule } from 'primeng/dialog';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NodeSelectionDialogComponent } from '../selectivedataload/nodeselectiondialog/nodeselectiondialog.component';

import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


interface Column {
  field: string;
  header: string;
}

interface ColumnDefinition {
  field: string;
  header: string;
}

type DynamicColumns = {
  [typeID: string]: ColumnDefinition[];
};

interface Type {
  label: string;
  value: string;
}

@Component({
  selector: 'sgs-etl-app-selectivedataloader1',
  templateUrl: './selectivedataloader1.component.html',
  standalone: true,
  imports: [
    MenubarModule,
    DropdownModule,
    FormsModule,
    TableComponent,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule,
    TagModule,

  ],
  providers: [DialogService, MessageService],
})
export class SelectivedataloadER1Component implements OnInit {
  ref: DynamicDialogRef | undefined;
  selectedType: any;
  selectedType_Default: string = '';
  tableOptions: Type[] | undefined;

  COLS_SELECTIVEDATA: Column[] = SELECTIVE_DATA_TABLE_HEADERS;
  // DATA_CONFIG_DATA: any;
  FIELDLIST_IMPORT_DATA!: string[];

  COLS_SELECTIVEDATATABLE: Column[] = SELECTIVE_DATA_TABLE_SECOND_HEADERS;
  DATA_SECOND_DATA: any;

  COLS_SELECTIVEDATALOAD: Column[] = SELECTIVE_DATA_TABLE_LOAD;
  // DATA_LOAD_DATA!: selectivedataDetailload[];

  // SELECTED_ROWS_SELECTIVE_DATA_TABLE1!: selectivedataDetail[];
  // SELECTED_ROWS_SELECTIVE_DATA_TABLE2!: selectivedataDetail[];

  //exporting the type name in search grid
  tagValue: string = 'Part'; // Can be dynamically set
  // dynamicColumns: DynamicColumns = {};
  dynamicColumns: { [key: string]: { field: string; header: string }[] } = {}; // Updated to store typeID based data
  ARAS_COLS_ITEMTYPE: Column[] = [];

  itemID : string ='';
  confgurationMenu: MenuItem[] | undefined;
  ARAS_COLS_ITEMTYPE_EXPORT: ConfigDetail[] = [];
  itemTypeName: any;

  constructor(
    private webserviceutils: WebServiceUtilities,
    private dialogService: DialogService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router // Inject Angular Router

  ) {}

  ngOnInit(): void {
    // this.itemID='4F1AC04A2B484F3ABA4E20DB63808A88';
    // this.route.params.subscribe(params => {
    //   this.itemID = params.get('id') || ''; // Get the route parameter
    // });
    this.itemID=this.route.snapshot.params['typeID'] || '';

    this.getTypeDataAndColumns(this.itemID);

    this.confgurationMenu = [
      {
      label: 'Export to Excel',
      icon: 'pi pi-fw pi-table',
      command: () => {
      this.exportToExcel();
      }
      }
    ];
  }


  // selectedRows($event: any) {
  //   this.SELECTED_ROWS_SELECTIVE_DATA_TABLE1 = $event;
  // }

  selectedRowsSecondTable($event: any) {
    // this.SELECTED_ROWS_SELECTIVE_DATA_TABLE2 = $event;
  }
 

getTypeDataAndColumns(typeID : string ) {
  let cachedColumns = localStorage['columnDefinitions'];
  let sessioncachedColumns = localStorage['columnDefinitions'];


  if (cachedColumns && cachedColumns[this.itemID] != null) {

    // this.tableOptions = JSON.parse(cachedColumns);
    this.loadSecondTable(this.itemTypeName);
    localStorage.setItem(this.itemID, this.itemTypeName);


  } else {
    // If no cached columns, fetch column definitions via API
    const access_token = localStorage['access_token'];
    const headers = new HttpHeaders({ Authorization: `Bearer ${access_token}` }); // Set the Authorization header
    var propertyAPIPrefix = `ItemType('${this.itemID}')/Property?$filter=is_hidden eq false`;
    const url = `${API_BASE_ODATA_URL_ARAS}${propertyAPIPrefix}`;
  
    this.fetchColumnDefinitions(typeID,url,headers)
      .then((data) => {
        this.tableOptions = data;
        this.itemTypeName = data.value[0]['source_id@aras.name'];
        // After loading the columns, proceed to load the data
        this.loadSecondTable(this.itemTypeName);
      })
      .catch((error) => {
        console.error('Error fetching ItemType Data:', error);
      });
  }
}

private processColumnDefinitions(typeID: string, responseData: any): { field: string; header: string }[] {
  // Extract and sort data based on sort_order
  const sortedColumns = responseData.value.sort((a: any, b: any) => a.sort_order - b.sort_order);

  // Create column definitions
  const columnDefinitions = sortedColumns.map((column: any) => ({
    field: column.name,
    header: column.label || column.name
  }));

  if (!this.dynamicColumns[typeID]) {
    this.dynamicColumns[typeID] = [];
  }

  this.dynamicColumns[typeID]= columnDefinitions;
  this.ARAS_COLS_ITEMTYPE= this.dynamicColumns[typeID];
  return columnDefinitions;
}

fetchColumnDefinitions(typeID:string, url: string, headers: HttpHeaders): Promise<any> {
  return new Promise((resolve, reject) => {
    this.webserviceutils.getData_ARAS(url,headers).subscribe({
      next: (data) => {
        // Cache the fetched column definitions in local storage for future use
        const processedColumns = this.processColumnDefinitions(typeID, data);
        debugger;
        localStorage.setItem('columnDefinitions',JSON.stringify(processedColumns));
        sessionStorage.setItem('columnDefinitions', JSON.stringify(processedColumns));
        resolve(data);
      },
      error: (error) => reject(error),
    });
  });
}


fetchItemTypeData(url: string, headers: HttpHeaders): Promise<any> {
  return new Promise((resolve, reject) => {
    this.webserviceutils.getData_ARAS(url, headers).subscribe({
      next: (data) => resolve(data),
      error: (error) => reject(error),
    });
  });
}

loadSecondTable(itemTypeName: any): void {
  const tableName = itemTypeName;
  const access_token = localStorage['access_token'];

  const headers = new HttpHeaders({ Authorization: `Bearer ${access_token}` }); // Set the Authorization header
  const url = `${API_BASE_ODATA_URL_ARAS}${tableName}`;

  // Use fetchItemTypeData to fetch the data
  this.fetchItemTypeData(url, headers).then((data: any) => {
    this.DATA_SECOND_DATA = data.value;
  }).catch((error) => {
    // Error: Log and handle the error
    console.error(`Error fetching ${tableName} table data:`, error);
  });
}



exportToExcel() {
  // Prepare the data in the format suitable for Excel export.
  const exportData = this.DATA_SECOND_DATA.map((rowData: any) => {
    // Create a row object with headers as column names and their respective data as values
    const row = this.ARAS_COLS_ITEMTYPE.reduce((acc: any, col: Column) => {
      // Map each column field to the corresponding data field
      acc[col.header] = rowData[col.field] || ''; // Use the field name to access the row data
      return acc;
    }, {});

    return row;
  });

  // Convert the data to a worksheet
  const ws: XLS.WorkSheet = XLS.utils.json_to_sheet(exportData);
  // Create a new workbook and append the worksheet
  const wb: XLS.WorkBook = XLS.utils.book_new();
  XLS.utils.book_append_sheet(wb, ws, 'Item');

  // Save the Excel file with the name 'exported_data.xlsx'
  XLS.writeFile(wb, 'exported_item_data.xlsx');
}

onRowDoubleClick(rowData: any): void {
  // Assuming 'basId' is the unique identifier for the row
  console.log("Clicked in Parent Component");
  const itemId = rowData.basId;

  if (itemId) {
    // Navigate to the desired route with itemId as a parameter
    this.router.navigate(['']);
  }

}
}


