import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebServiceUtilities } from '../../services/webservice.utilities';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from 'primeng/table';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { NODES_TABLE_HEADER } from '../../components/table/headers';
import { NodeData } from '../../components/service/detail.interface';
import { API_NODE_INFO } from '../../../api.constants';
declare var Tabular: any; // Declare the Tabular variable

interface Column {
  field: string;
  header: string;
}

interface Type {
  label: string;
  value: string;
}

@Component({
  selector: 'TriNnovatorApp-nodes',
  templateUrl: './nodes.component.html',
  styleUrl: './nodes.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    TableComponent,
    ButtonModule,
    DialogModule,
    MenubarModule,
    TabMenuModule,
    CommonModule,
    MatTableModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatInputModule,
    TableModule,
    DynamicDialogModule,
    ButtonModule
  ],
  providers: [DialogService, MessageService],
})
export class NodesComponent implements OnInit {
  tabs: MenuItem[] | undefined;
  activeTab: MenuItem | undefined;
  menu1Items: MenuItem[] | undefined;
  menu2Items: MenuItem[] | undefined;

  selectedType: Type | undefined;
  tableOptions: Type[] | undefined;

  NODE_DATA!: NodeData[];
  DATA_TYPMAP_DATA: NodeData[] = [];
  FIELDLIST_IMPORT_DATA!: string[];

  COLS_SELECTIVEDATA: Column[] = NODES_TABLE_HEADER;
  DATA_CONFIG_DATA: NodeData[] = [];

  Nodedata: NodeData[] = [];

  visible: boolean = false;
  visible1: boolean = false;
  submitted: boolean = false;
  SELECTED_ROWS_FIELDMAPPING_DATA!: NodeData[];
  ref: DynamicDialogRef | undefined;
  testData!: string;
  fetchNodeData: any;
  //webServiceUtils: any;

  constructor(
    private webserviceutils: WebServiceUtilities,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.tabs = [{ label: 'Strcuture', icon: 'pi pi-fw pi-file-import' }];
    this.activeTab = this.tabs[0];
    // this.loadNodeTable();
    // this.loadNodeStates(); // Load node states from local storage
    this.initializeTabulatorTable();
  }

  onTabChange(event: any) {
    this.activeTab = event;
    if (this.activeTab?.label === 'Structure') {
      this.initializeTabulatorTable();
    }
  }
 

  loadStaticData(selectedValue: DropdownChangeEvent): void {
    console.log(this.selectedType);

    if (!this.selectedType) {
      return;
    }
    console.log('Selected value:', this.selectedType.value);
  }

  loadNodeStates() {
    const nodeState = JSON.parse(localStorage.getItem('nodeState') || '{}');
    this.DATA_CONFIG_DATA.forEach(node => {
      node.stopped = nodeState[node.threadId] || false;
    });
  }

  loadNodeTable() {
    this.NODE_DATA = [];
    this.webserviceutils.getData<any>(API_NODE_INFO).subscribe(
      (data: NodeData[] | any) => {
        console.log('Node Data-----', data);
        this.DATA_CONFIG_DATA = data;
      },
      (error) => {
        console.error('getImportFromTBLData:', error);
      }
    );
    this.FIELDLIST_IMPORT_DATA = NODES_TABLE_HEADER.map(
      (header) => header.field
    );
  }

  selectedRowsForselection(event: any) {
    this.SELECTED_ROWS_FIELDMAPPING_DATA = event;
  }

  hideDialog() {
    this.visible = false;
    this.submitted = false;
  }

  // onTabChange(event: any) {
  //   this.activeTab = event;
  // }

  private initializeTabulatorTable() {
    const tableData = [
      {
        id: 1,
        name: 'Parent 1',
        age: 'N/A',
        children: [
          {
            id: 11,
            name: 'Child 1.1',
            age: 15,
            children: [
              { id: 111, name: 'Grandchild 1.1.1', age: 5 },
              { id: 112, name: 'Grandchild 1.1.2', age: 7 },
            ],
          },
          { id: 12, name: 'Child 1.2', age: 17 },
        ],
      },
      {
        id: 2,
        name: 'Parent 2',
        age: 'N/A',
        children: [
          { id: 21, name: 'Child 2.1', age: 20 },
          { id: 22, name: 'Child 2.2', age: 25 },
        ],
      },
    ];


    // cons table =new Tabulator('#table', {
    //   height: '400px',
    //   data: tableData,
    //   layout: 'fitColumns',
    //   columns: [
    //     { title: 'ID', field: 'id', width: 100 },
    //     { title: 'Name', field: 'name', width: 200 },
    //     { title: 'Age', field: 'age', width: 100 },
    //   ],
    //   dataTree: true,
    //   dataTreeChildField: 'children',
    //   dataTreeStartExpanded: false,
    // });
  
  }

  handleClick() {
    // Your button logic here
    alert("Button clicked!");
  }

  onActionClick(rowData: NodeData) {
    // console.log("rowData:", rowData); // Log the entire rowData object
  
    const nodeId = rowData.threadId; // Use the correct property for ID
    // console.log("nodeId:", nodeId);
  
    if (!nodeId) {
      // console.error("Node ID is undefined!");
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Node ID is undefined' });
      return;
    }
  
    const url = `/node/stop/${nodeId}`;
    console.log("url_node:", url);
  
    const requestPayload = { iteration: this.webserviceutils.getIteration() };
    console.log("node_requestPayload:", requestPayload);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    this.http.post(url, requestPayload, { headers, observe: 'response', responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          switch (response.status) {
            case 200:
              console.log('Node stopped successfully');
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Node stopped successfully' });
              rowData.stopped = true;
              this.saveNodeState(rowData.threadId, true); // Save state to local storage
              break;
            case 423:
              console.error('System is busy');
              this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'System is busy' });
              break;
            case 226:
              console.error('Node is already in use');
              this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Node is already in use' });
              break;
            default:
              console.error('Failed to stop node', response.statusText);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to stop node' });
              break;
          }
        },
        error: (error) => {
          console.error('Error stopping node', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to stop node' });
        }
      });
  }
  
  
  private saveNodeState(nodeId: number, stopped: boolean) {
    const nodeState = JSON.parse(localStorage.getItem('nodeState') || '{}');
    nodeState[nodeId] = stopped;
    localStorage.setItem('nodeState', JSON.stringify(nodeState));
  }
  
  
  
  
  
}
