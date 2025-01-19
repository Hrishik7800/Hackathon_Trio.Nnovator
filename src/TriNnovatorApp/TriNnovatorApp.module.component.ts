import { NgModule } from '@angular/core';
import { AppComponent } from './TriNnovatorApp.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { TopbarComponent } from './components/navigation/topbar/topbar.component';
import { RouterModule } from '@angular/router';

import { LocalstorageService } from './services/localstorage.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Import this module

import { TreeViewComponent } from './layouts/tree-structure-view/tree-view.component';

//modifications
import { NgxSpinnerModule } from 'ngx-spinner';
import { httpInterceptProviders } from './http-interceptor';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
 imports: [SidebarComponent, MatExpansionModule, MatProgressBarModule, TopbarComponent, RouterModule , BrowserModule, BrowserAnimationsModule,MatTreeModule,TreeViewComponent, MatIconModule, MatButtonModule,NgxSpinnerModule,httpInterceptProviders],
 providers: [LocalstorageService,httpInterceptProviders],
  bootstrap: [],
})
export class AppModule {}

// Need to fix this module page to manages all NGModule imports
