import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableComponent } from '../../../components/table/table.component';
import { NODE_DATA_TABLE } from '../../../components/table/headers';
import { WebServiceUtilities } from '../../../services/webservice.utilities';
import { API_GET_NODEDATA,
  API_POST_DATA_LOAD,
 } from '../../../../api.constants';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'TriNnovatorApp-nodeselectiondialog',
  imports: [CommonModule, TableComponent, ButtonModule ],
  templateUrl: './nodeselectiondialog.component.html',
  styleUrl: './nodeselectiondialog.component.css'
})
export class NodeSelectionDialogComponent implements OnInit {

  COLS_NODEDATA: any = NODE_DATA_TABLE;
  NODE_DATA: any;
  SELECTED_ROWS_NODE_DATA: any;
  PRODUCT_SELECTED_ROWS: any[];
  messageService: any;

  constructor(@Inject(DynamicDialogConfig) public config: DynamicDialogConfig, private dialogService: DialogService, private ref: DynamicDialogRef, private webserviceutils: WebServiceUtilities ) {
    this.PRODUCT_SELECTED_ROWS = this.config.data.PRODUCT_SELECTED_ROWS;
  }
  
  ngOnInit() {
    this.loadNodeData();
  }

  loadNodeData(){
    this.webserviceutils.getData(API_GET_NODEDATA).subscribe({
      next: (data: any) => {
        this.NODE_DATA = data;
      },
      error: (error) => {
        console.error('Error fetching Node Data:', error);
      },
    });
  }

  onSubmit(e: MouseEvent) {
    this.sendForLoading();
    this.ref.close('Success'); //For ARAS TESTING Commentimng
  }

  sendForLoading(){
    if (
      !this.SELECTED_ROWS_NODE_DATA ||
      this.SELECTED_ROWS_NODE_DATA.length === 0
    ) {
      console.warn('Please select a row to edit');
      return;
    }

    const id = this.PRODUCT_SELECTED_ROWS.map((baseid) => String(baseid.basId));

    const iteration = this.webserviceutils.getIteration();
    const userName = this.webserviceutils.getUserName();
    const nodeName = this.SELECTED_ROWS_NODE_DATA[0].name;
    const selectedTable = this.PRODUCT_SELECTED_ROWS[0].type;
    const body = {
      id,
      iteration,
      userName,
      nodeName,
      selectedTable,
    };

    this.webserviceutils.postData(API_POST_DATA_LOAD, body).subscribe({
      next: (data: any) => {
        this.messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Loading Job Created Successfully.',
          detail: 'Navigate to Loader to Start Loading.',
        });
      },
      error: (error) => {},
    });
  }

  selectedRows($event: any) {
    this.SELECTED_ROWS_NODE_DATA = $event;
  }
}
