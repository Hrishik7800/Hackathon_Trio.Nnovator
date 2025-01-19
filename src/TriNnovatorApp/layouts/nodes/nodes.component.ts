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
import xml2js from 'xml2js';
import * as d3 from 'd3';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { NODES_TABLE_HEADER } from '../../components/table/headers';
// import { NodeData } from '../../components/service/detail.interface';
import { API_NODE_INFO,  API_BASE_ODATA_URL_ARAS, API_BASE_URL_ARAS} from '../../../api.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

interface Column {
  field: string;
  header: string;
}

interface Property {
  name: string;
  value: any; // You can specify a more specific type if you know what values to expect
}

interface Type {
  label: string;
  value: string;
}
interface LifeCycleState {
  id: string;
  keyedName: string;
  type: string;
  x: string;
  y: string;
  name: string;
}

interface LifeCycleTransition {
  id: string;
  keyedName: string;
  type: string;
  fromState: { id: string; keyedName: string; type: string };
  toState: { id: string; keyedName: string; type: string };
}

interface StructuredData {
  lifeCycleStates: LifeCycleState[];
  lifeCycleTransitions: LifeCycleTransition[];
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
    ButtonModule,
    MatIconModule,
    MatExpansionModule
  ],
  providers: [DialogService, MessageService],
})
export class NodesComponent implements OnInit {
  lifeCycleStates: any[] = [];
  lifeCycleTransitions: any[] = [];
  data: any;
  properties: Property[] = [];
  isEditMode: boolean = false;
  tabs: MenuItem[] | undefined;
  activeTab: MenuItem; // Change this to MenuItem type
  selectedType: Type | undefined;
  tableOptions: Type[] | undefined;
  FIELDLIST_IMPORT_DATA!: string[];
  COLS_SELECTIVEDATA: Column[] = NODES_TABLE_HEADER;

  visible: boolean = false;
  visible1: boolean = false;
  submitted: boolean = false;

  ref: DynamicDialogRef | undefined;
  testData!: string;
  fetchNodeData: any;
  itemData: any;
  itemId!: string | null;
  itemtypeId!: string | null;
  dataName: any;

  panelOpenState: boolean = false;

  constructor(
    private webserviceutils: WebServiceUtilities,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private messageService: MessageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, // Inject Angular Router
    private dataService: DataService,
  ) {
    debugger;
    this.activeTab = { label: 'Form', icon: 'pi pi-fw pi-pencil' };
  }

  //Rushikesh Modification

  async ngOnInit() {
    // debugger;
    this.itemId = this.route.snapshot.params['itemid'] || '';
    this.itemtypeId = this.route.snapshot.params['itemtypeid'] || '';

    this.tabs =
      [{ label: 'Form', icon: 'pi pi-fw pi-pencil' },
      { label: 'Lifecycle', icon: 'pi pi-fw pi-calendar' },
      { label: 'History', icon: 'pi pi-fw pi-clock' },
      { label: 'Workflow', icon: 'pi pi-fw pi-list' }];

    this.activeTab = this.tabs[0];

    const responseName = await this.fetchData_Type(this.itemtypeId);
    this.dataName = responseName.name;
    debugger;
    this.data = await this.fetchData();
    console.log('Property', this.data);
    this.properties = this.transformDataToProperties(this.data)
    this.loadLifecycleData(this.dataName);
    // this.loadNodeTable();
    // this.loadNodeStates(); // Load node states from local storage
  }
  // Tab change handler function
  structureData(input: any): StructuredData {
    const relationships = input.Item.Relationships.Item;
  
    const lifeCycleStates: LifeCycleState[] = relationships
      .filter((item: any) => item.type === "Life Cycle State")
      .map((state: any) => ({
        id: state.id[0],
        keyedName: state.id[1]?.keyed_name,
        type: state.id[1]?.type,
        x: state.x,
        y: state.y,
        name: state.name,
      }));
  
    const lifeCycleTransitions: LifeCycleTransition[] = relationships
      .filter((item: any) => item.type === "Life Cycle Transition")
      .map((transition: any) => ({
        id: transition.id[0],
        keyedName: transition.id[1]?.keyed_name,
        type: transition.id[1]?.type,
        fromState: {
          id: transition.from_state._,
          keyedName: transition.from_state.keyed_name,
          type: transition.from_state.type,
        },
        toState: {
          id: transition.to_state._,
          keyedName: transition.to_state.keyed_name,
          type: transition.to_state.type,
        },
      }));
  
    return { lifeCycleStates, lifeCycleTransitions };
  }
  
  fetchItemTypeData(url: string, headers: HttpHeaders, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
        next: (data) => resolve(data),
        error: (error) => reject(error),
      });
    });
  }
  //structure data
  //structure data
  renderLifecycleGraph() {
    debugger;
  
    // Select the SVG element by checkname attribute
    const svgElement = document.querySelector('[checkname="lifeCycleState"]') as SVGSVGElement | null;
    
    // Ensure the SVG element exists before proceeding
    if (!svgElement) {
      console.error('SVG element not found!');
      return;
    }
  
    // Convert the plain SVG element to a D3 selection
    const svg = d3.select(svgElement);
    
    // Get the width and height of the SVG element
    const width = +svg.attr("width");
    const height = +svg.attr("height");
  
    // Create links (transitions)
    const links = this.lifeCycleTransitions.map(transition => ({
      source: this.lifeCycleStates.find(state => state.id === transition.fromState.id),
      target: this.lifeCycleStates.find(state => state.id === transition.toState.id)
    }));
  
    // Create nodes (states)
    const nodes = this.lifeCycleStates;
  
    // Set up the link lines
    svg.selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  
    // Create node circles
    svg.selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", d => Math.min(Math.max(d.x, 20), width - 20))  // Ensures circles stay within the frame
      .attr("cy", d => Math.min(Math.max(d.y, 20), height - 20))  // Ensures circles stay within the frame
      .attr("r", 20);
  
    // Add state names to nodes
    svg.selectAll(".text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "text")
      .attr("x", d => d.x)
      .attr("y", d => d.y - 25) // Position the text slightly above the circle
      .attr("text-anchor", "middle")
      .text(d => d.name);
  }
  
  // Function to convert XML to JSON
  async loadLifecycleData(itemTypeName: any): Promise<void> {
    const formData = { itemTypeName, name: 'lifecycle' }; // Assuming 'lifecycle' is the name you want to fetch
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Soapaction': 'applyAML',
      'Content-Type': 'text/xml'
    });

    const body = "<AML><Item type='Life Cycle Map' action='get' select='name'><name>Part</name><Relationships><Item type='Life Cycle State' action='get' select='name,x,y'></Item><Item type='Life Cycle Transition' action='get' select='from_state,to_state'></Item></Relationships></Item></AML>";

    try {
      const data = await this.fetchItemTypeData(`${API_BASE_URL_ARAS}Server/InnovatorServer.aspx`, headers, body);
      debugger;
      const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
      try {
        const result = await parser.parseStringPromise(data);
        const jsonObject = result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["Result"];
        const structuredData = this.structureData(jsonObject);
        this.lifeCycleStates = structuredData.lifeCycleStates;
        this.lifeCycleTransitions = structuredData.lifeCycleTransitions;
        this.renderLifecycleGraph();
      } catch (err) {
        console.error("Error parsing XML:", err);
      }
      this.lifecycleStages = data.value;
      console.log(`Fetched ${formData.itemTypeName} lifecycle data:`, data);
    } catch (error) {
      console.error(`Error fetching ${formData.itemTypeName} lifecycle data:`, error);
    }
  }
  // Transform the data into the desired format for properties
  transformDataToProperties(data: any): { name: string; value: any }[] {
      const removeProperties: string[] = ['current_state', 'has', 'keyed_name', 'Created By', 'Modified On', 'Created On', 'Modified By', 'State'];
      const properties: { name: string; value: any }[] = []; // Initialize properties array

      // Assuming data is an object with key-value pairs
      for (const key in data) {
        if (data.hasOwnProperty(key) && 
            !key.startsWith('@') && 
            !removeProperties.some(removeKey => key.startsWith(removeKey))) {
          properties.push({ name: key, value: data[key] });
        }
      }
    return properties;
  }


  async fetchData() {

    const apiUrl = `${API_BASE_ODATA_URL_ARAS}${this.dataName}('${this.itemId}')/method.kr_getFormPropertiesWithData`;
    const token = localStorage['access_token'];

    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const data = await response.json();
      let data: any = {};
      let dataString = await response.json();
      let dataArray = dataString.split('||');
      for (let i = 0; i < dataArray.length; i++) {
        let field = dataArray[i].split('&&');
        if (field[0] == "") { continue }
        data[field[0]] = field[1];
      }

      console.log("Received Data:", data);

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async fetchData_Type(itemtypeId: string | null) {

    const apiUrl = `${API_BASE_ODATA_URL_ARAS}ItemType('${itemtypeId}')?$select=name`;
    const token = localStorage['access_token'];

    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received Data:", data);

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  loadStaticData(selectedValue: DropdownChangeEvent): void {
    console.log(this.selectedType);

    if (!this.selectedType) {
      return;
    }
    console.log('Selected value:', this.selectedType.value);
  }


  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    console.log('Edit action triggered');
  }

  onDone() {
    console.log('Done clicked');
    this.toggleEditMode();
  }

  onDiscard() {
    console.log('Discard action triggered');
  }

  onDelete() {
    console.log('Delete action triggered');
  }

  onRelationship(){
    console.log('Relationship action triggered');
  }
  
  onTabChange(tab: MenuItem) {
    this.activeTab = tab;
    if (tab.label === 'Lifecycle') {
      debugger;
      this.loadLifecycleData(this.dataName);  // Load lifecycle data
    }
  }

  
  // Rushikesh Modification (lifecycle)
  lifecycleStages = [
    { title: 'Created', description: 'The part item has been created and is ready for production.', class: 'created', completed: false },
    { title: 'In Production', description: 'The part item is currently being manufactured.', class: 'in-production', completed: false },
    { title: 'Quality Check', description: 'The part item is undergoing quality assurance checks.', class: 'quality-check', completed: false },
    { title: 'Completed', description: 'The part item has been completed and is ready for delivery.', class: 'completed', completed: true },
    { title: 'Archived', description: 'The part item has been archived for future reference.', class: 'archived', completed: false }
  ];

}




