// import { LoginComponent } from './layouts/profile/login/login.component';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './layouts/profile/login/login.component';
// PrimeNG Components
import { PrimeNGConfig } from 'primeng/api';
import { LayoutComponent } from './layouts/layout.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from './components/service/app.layout.service';
import { TopbarComponent } from './components/navigation/topbar/topbar.component';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
// import { TestService } from './test.service';
import { httpInterceptProviders } from './http-interceptor';
import {SpinnerComponent} from './spinner/spinner.component'
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './TriNnovatorApp.component.html',
  styleUrl: './TriNnovatorApp.component.scss',
  standalone: true,
  imports: [
    LayoutComponent,
    LoginComponent,
    RouterOutlet,
    CommonModule,
    TopbarComponent,
    SidebarComponent,
    SpinnerComponent,
    NgIf
    
  ],
})
export class AppComponent implements OnInit {
  title = 'etl-ui';
  constructor(
    private primengConfig: PrimeNGConfig,
    public layoutService: LayoutService,
    // private testService : TestService
  ) {}

  // fetch(){
  //   this.testService.fetch()
  //   .subscribe(data => console.log(data));
  // }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
