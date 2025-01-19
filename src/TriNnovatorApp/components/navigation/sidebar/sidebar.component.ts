import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//Prime
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Router,
} from '@angular/router';
import { SidebaritemComponent } from './sidebaritem.component';
import { LayoutService } from '../../service/app.layout.service';
import { WebServiceUtilities } from '../../../services/webservice.utilities';
import { API_BASE_EXTRACT_FROM_SERVER,API_BASE_CHECK_DASH_TABLE, API_BASE_EXTR_DATA_COUNT,API_BASE_CHECK_EXTR_TABLE ,API_BASE_URL_ARAS} from '../../../../api.constants';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
// import { UpdateExtractionService } from '../../../services/updateextraction.service';
import { catchError, throwError } from 'rxjs';
// import { API_BASE_EXTRACT_FROM_SERVER,API_BASE_CHECK_DASH_TABLE, API_BASE_EXTR_DATA_COUNT,API_BASE_CHECK_EXTR_TABLE, API_BASE_URL_ARAS } from '../../../../api.constants';


@Component({
  selector: 'TriNnovatorApp-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    StyleClassModule,
    RouterModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    SidebaritemComponent,
    ToastModule,
  ],
  providers: [
    // UpdateExtractionService,
    WebServiceUtilities,
    MessageService,
  ],
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: SidebarModule;
  @Input() sidebarVisible: boolean = false;
  @Output() toggleSliderMenu = new EventEmitter<boolean>();

  isExtractServerDataVisible: boolean = false; // Flag to control menu visibility
  overlayVisible: boolean = false; // Flag to control overlay visibility

  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private http: HttpClient,
    private webserviceutils: WebServiceUtilities,
    // private updateExtractionService: UpdateExtractionService,
    private messageService: MessageService,
    private router: Router
  ) {}

  closeSliderBar(toggle: boolean) {
    this.toggleSliderMenu.emit(!toggle);
  }

  onSubmit(operation: string) {
    const iteration = this.webserviceutils.getIteration();
    const body = { operation, iteration };
    let startMessage = '';
    let successMessage = '';

    switch (operation) {
      case 'dashTable':
        startMessage = 'DASH TABLE STARTED';
        successMessage = 'DASH TABLES CREATED SUCCESSFULLY';
        break;
      case 'extrTable':
        startMessage = 'EXTRACTION TABLE STARTED';
        successMessage = 'EXTRACTION TABLE CREATED SUCCESSFULLY';
        break;
      case 'masterType':
        startMessage = 'MASTER TYPE STARTED';
        successMessage = 'MASTER TABLES CREATED SUCCESSFULLY';
        break;
      case 'masterRel':
        startMessage = 'MASTER RELATIONSHIP STARTED';
        successMessage = 'MASTER TABLES CREATED SUCCESSFULLY';
        break;
      case 'masterSlaveT1':
        startMessage = 'SLAVE 1 STARTED';
        successMessage = 'SLAVE DATA FETCHING STARTED SUCCESSFULLY';
        break;
      case 'masterSlaveT2':
        startMessage = 'SLAVE 2 STARTED';
        successMessage = 'SLAVE DATA FETCHING STARTED SUCCESSFULLY';
        break;
      case 'configCheck':
        startMessage = 'CONFIGURATION CHECK STARTED';
        successMessage = 'CONFIGURATION CHECK COMPLETED';
        break;
      default:
        startMessage = 'OPERATION STARTED';
        successMessage = 'OPERATION COMPLETED SUCCESSFULLY';
        break;
    }

    this.messageService.add({
      key: 'tst',
      severity: 'info',
      summary: 'Info Message',
      detail: startMessage,
    });

    this.webserviceutils
      .postData(API_BASE_EXTRACT_FROM_SERVER, body)
      .subscribe({
        next: (response) => {
          console.log('Response from web service:', response);
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Success Message',
            detail: successMessage,
          });
        },
        error: (error) => {
          console.error('Error calling web service:', error);
          this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'An error occurred while performing the operation' });
          if (error.error instanceof ErrorEvent) {
            console.error('Client-side error:', error.error.message);
          } else {
            console.error('Server-side error:', error);
            console.error('Response body:', error.error);
          }
        },
      });

    // Check extraction allowance again after operation
    // this.updateExtractionService.checkExtractionAllowance().subscribe({
    //   next: (response: boolean) => {
    //     this.isExtractServerDataVisible = response;
    //     this.updateMenuItems(); // Update menu items based on the response
    //   },
    //   error: (error) => {
    //     console.error('Error checking extraction allowance:', error);
    //     alert('An error occurred while checking extraction allowance');
    //     this.isExtractServerDataVisible = false;
    //     this.updateMenuItems(); // Update menu items based on the response
    //   },
    // });
  }

  model: any[] = [];

  ngOnInit(): void {
    // this.updateExtractionService.checkExtractionAllowance().subscribe({
    //   next: (response: boolean) => {
    //     this.isExtractServerDataVisible = response;
    //     this.updateMenuItems(); // Update menu items based on the response
    //   },
    //   error: (error) => {
    //     console.error('Error checking extraction allowance on init:', error);
    //     this.isExtractServerDataVisible = false;
    //     this.updateMenuItems(); // Update menu items based on the response
    //   },
    // });

    const token=localStorage['access_token'];
    const apiUrl = `${API_BASE_URL_ARAS}Server/MetaData.asmx/GetConfigurableUi?location_name=TOC&user=admin`;
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    async function fetchData() {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received Data:', data); // Log or use the parsed data
        console.log(data.someKey); // Access the key from the response object

        return data; // Return the data if needed
      } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error if needed
      }
    }

    const moveObjectByName = (sourceArray: any[], nameToMove: any) => {
      const objectToMove = sourceArray.find(obj => obj.name === nameToMove);
      if (objectToMove) {
        sourceArray = sourceArray.filter(obj => obj.name !== nameToMove);
        // targetArray.push(objectToMove);
        return objectToMove;
      }
      // return sourceArray;
    };

    // Kishor modify
    interface MenuItem {
      label: string;
      icon?: string;
      routerLink?: string[];
      command?: () => void;
      items?: MenuItem[]; // Nested items
    }
    function getSubMenu(inputResult: {data: any;children: any;}, dataResult: any[]) : MenuItem[]{
      let tocItemsArray : MenuItem[] = [];
      let currentItems = inputResult.children || inputResult.data || [];

      for(let j =0; j<currentItems.length; j++){
          let currentItemObject = currentItems[j];

          let currentItem: MenuItem;

          //Disable Admin folder as user is not from Technical background
          // if(currentItemObject.label == "Administration"){
          //   return [];
          // }

          if(!currentItemObject.id && inputResult.children){
            currentItemObject = moveObjectByName(dataResult, currentItemObject);
          }

          if(currentItemObject.data && currentItemObject.data.length > 0){
            let nestedTocItemsArray = getSubMenu(currentItemObject, currentItemObject.data);
            currentItem = {
              label : currentItemObject.label,
              items: nestedTocItemsArray,
              icon : "p-menuitem-icon pi pi-fw pi-folder-open text-blue-600",
            } 
          }else if((currentItemObject.children && currentItemObject.children.length > 0) ){
            let nestedTocItemsArray = getSubMenu(currentItemObject, dataResult);
            currentItem = {
              label : currentItemObject.label,
              items: nestedTocItemsArray,
              icon : "p-menuitem-icon pi pi-fw pi-folder-open text-blue-600",
            } 
          }else{
            currentItem = {
              label : currentItemObject.label,
              icon: 'pi pi-fw pi-file-import text-red-600',
              routerLink: ['/selectivedataload', currentItemObject?.additional_data?.itemTypeId],
            } 
          }          
          tocItemsArray[j] = currentItem;
      }
      return tocItemsArray;
    }

    fetchData().then(result => {

      result = [{data : result}]
      let tocArray: { label: string; items: MenuItem[] }[] = [];      for(let i =0; i<result.length; i++){
        let currentToc;
        let currentCategory = result[i];
        let tocItemsArray = getSubMenu(result[i], []);
        currentToc = {
          label: currentCategory.label,
          items: tocItemsArray
        }
        tocArray[i] = currentToc;
      }
      this.model = tocArray;
    });
  }
  
updateMenuItems() {
        this.model.forEach((section) => {
    
          section.data = this.filterMenuItems(section.data);
        });
      }

//  updateMenuItems() {
//     this.model.forEach((section) => {
//       section.items = this.filterMenuItems(section.items);
//     });
//   }

  checkDashboardTableAndNavigate(route: string) {
    this.http
      .get<{ tablesExist: boolean }>(API_BASE_CHECK_DASH_TABLE)
      .subscribe({
        next: (response) => {
          console.log("Response is:", response);
          if (response) {
            if (route === '/viewextrTableData') {
              const iteration = this.webserviceutils.getIteration();
              // Additional check for data count when navigating to /viewextrTableData
              this.http
                .get<{ dataCount: boolean }>(API_BASE_EXTR_DATA_COUNT + "?iteration="+iteration)
                .subscribe({
                  next: (countResponse) => {
                    if (countResponse) {
                      // Both checks passed, proceed with navigation
                      this.router.navigate([route]);
                    } else {
                      this.messageService.add({
                        key: 'tst',
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No data in Extraction Table.',
                      });
                    }
                  },
                  error: (error) => {
                    console.error('Error checking data count:', error);
                    this.messageService.add({
                      key: 'tst',
                      severity: 'error',
                      summary: 'Error',
                      detail: 'An error occurred while checking the data count.',
                    });
                  }
                });
            }  
            else if (route === '/extrTable') 
              {
                this.onSubmit('extrTable')
              }
            else
            {
                this.router.navigate([route]);
            }
          } else {
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Error',
              detail: 'Please create the Dashboard Table first!',
            });
          }
        },
        error: (error) => {
          if (error.status === 404) {
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Error',
              detail: 'Please create the Dashboard Table first.',
            });
          } else {
            console.error('Error checking Dashboard table:', error);
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while checking the Dashboard table.',
            });
          }
        },
      });
  }

  checkExtractionTableAndNavigate(route: string) {
    console.log("Initiating table existence check..."); // Debugging log
   
    this.webserviceutils
      .getData<{ tablesExist: boolean }>(
        API_BASE_CHECK_EXTR_TABLE
      )
      .subscribe({
        next: (response) => {
          console.log("API Response:", response); // Log the API response
   
          if (response.tablesExist) {
            console.log("Table exists. Navigating to:", route); // Log the navigation intent
            // Table exists, proceed with navigation
            this.router.navigate([route]).then((navigated: boolean) => {
              if (navigated) {
                console.log("Successfully navigated to", route); // Confirm navigation
              } else {
                console.warn("Failed to navigate to", route); // Warn if navigation fails
              }
            });
          } else {
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Error',
              detail: 'Please create the Extraction Table first!',
            });
          }
        },
        error: (error) => {
          if (error.status === 404) {
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Error',
              detail: 'Please create the Extraction Table first.',
            });
          } else {
            console.error('Error checking extraction table:', error);
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while checking the extraction table.',
            });
          }
        },
      });
  }
  filterMenuItems(items: any[]): any[] {
    return items
      .map((item) => {
        if (item.items) {
          item.items = this.filterMenuItems(item.items);
        }
        
        // if (item.label === 'Design Central Extraction') {
        //   item.disabled = !this.isExtractServerDataVisible;
        //   item.styleClass = item.disabled ? 'disabled-menu-item' : 'highlightBtn';
        //   if (item.disabled) {
        //     this.messageService.add({
        //       key: 'tst',
        //       severity: 'warn',
        //       summary: 'Access Restricted',
        //       detail: `${item.label} is currently not available (Please edit "dse.extraction.enable.commands" to "True" in Configuration if required.)`,
        //     });
        //   } 
        
        // }
  
        // Filter out items that are disabled
        return !item.disabled ? item : null;
      })
      .filter((item) => item !== null); // Remove null values
  }



  showEnablePopupOnce() {
    const popupShown = localStorage.getItem('designCentralExtractionPopupShown');
    if (popupShown === 'true') {
      this.messageService.add({
        key: 'tst',
        severity: 'success',
        summary: 'Feature Enabled',
        detail: 'Design Central Extraction has been enabled.',
      });
    } else {
      localStorage.setItem('designCentralExtractionPopupShown', 'true');
    }
  }
  
  
  checkMenuItemAvailability() {
    // Check if the "Design Central Extraction" item is disabled
    const extractionItem = this.model.flatMap(section => section.items).find(item => item.label === 'Design Central Extraction');
  
    if (extractionItem && extractionItem.disabled) {
      this.messageService.add({
        key: 'tst',
        severity: 'warn',
        summary: 'Access Restricted',
        detail: `${extractionItem.label} is currently not available`,
      });
    }
  }
}
