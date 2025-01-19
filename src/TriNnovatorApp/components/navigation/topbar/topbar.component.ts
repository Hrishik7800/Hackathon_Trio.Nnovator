import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from '../../service/app.layout.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { WebServiceUtilities } from '../../../services/webservice.utilities';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResetPasswordDialogComponent } from './resetpassworddialog/resetpassworddialog.component';

@Component({
  selector: 'TriNnovatorApp-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  imports: [
    SidebarComponent,
    ToolbarModule,
    AvatarModule,
    CommonModule,
    DropdownModule,
    MenuModule,
    MatMenuModule,
    MenubarModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, DialogService, MessageService],
})
export class TopbarComponent implements OnInit {
  showProfileMenu: boolean = false;
  tieredItems: MenuItem[] = [];

  @Input() imgPath: string = 'TriNnovatorApp/assets/images/';
  imgFileName: string = 'steepgraph.png';
  openSliderBar: boolean = false;
  items!: MenuItem[];
  userName: string = '';
  iteration: string = '';
  ref: DynamicDialogRef | undefined;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private webServiceUtils: WebServiceUtilities,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {
    this.userName = this.webServiceUtils.getUserName();
    //this.iteration = this.webServiceUtils.getIteration();
  }
  ngOnInit(): void {
    this.iteration = this.authService.getTopbarIteration(); //Option: we can use  one method and call this method in ngOnInit
    this.tieredItems = [
      {
        label: this.userName,
        items: [
          {
            label: 'Reset Password',
            icon: 'pi pi-question',
            command: () => {
              this.addResetPassword();
            },
          },
        ],
      },
    ];
  }

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  changeTheme(event: any) {
    const isChecked = event.target?.checked;
    // const themeType = isChecked ? 'lara-light-blue' : 'lara-dark-blue';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const themeLinkHref = themeLink.getAttribute('href')!;
    const newHref = themeLinkHref
      .split('/')
      .map((el) =>
        el == 'lara-light-blue'
          ? (el = `lara-dark-blue`)
          : el == 'lara-dark-blue'
          ? (el = `lara-light-blue`)
          : el
      )
      .join('/');
    this.replaceThemeLink(newHref);
  }

  replaceThemeLink(href: string) {
    const id = 'theme-css';
    let themeLink = <HTMLLinkElement>document.getElementById(id);
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);
    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
    });
  }

  onLogout(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        // this.authService.logout().subscribe(
        //   () => {
        //     localStorage.removeItem('userName');
        //     localStorage.removeItem('iteration');
        //     this.router.navigate(['/login']);
        //   },
        //   (error) => {
        //     console.error('Logout error:', error);
        //     alert(
        //       'An error occurred while logging out. Please try again later.'
        //     );
        //   }
        // );
        localStorage.removeItem('userName');
        localStorage.removeItem('iteration');
        this.router.navigate(['/login']);


      },
      reject: () => {},
    });
  }

  onProfileFocus() {
    if (this.showProfileMenu) {
      this.showProfileMenu = false;
    } else {
      this.showProfileMenu = true;
    }
  }
  iterationpage() {
    this.router.navigate(['/iterationpage']);
  }

  addResetPassword() {
    this.ref = this.dialogService.open(ResetPasswordDialogComponent, {
      header: 'Reset Password',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data === 'Success') {
        this.messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Password Reset Successfully',
        });
      }
    });
  }
}
