import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { CommonModule, DOCUMENT } from '@angular/common';
import { TopbarComponent } from '../components/navigation/topbar/topbar.component';
import { SidebarComponent } from '../components/navigation/sidebar/sidebar.component';
import { FooterComponent } from '../components/navigation/footer/footer.component';
// import { Subscription, filter } from 'rxjs';
import { LayoutService } from '../components/service/app.layout.service';
import { HomepageComponent } from './homepage/homepage.component';
// import { TransformationComponent } from './dashboard/transformation/transformation.component';

@Component({
  selector: 'TriNnovatorApp-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    HomepageComponent,
    // TransformationComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  // overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  profileMenuOutsideClickListener: any;

  // @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

  // @ViewChild(TopbarComponent) appTopbar!: TopbarComponent;

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router,
    // private authService: AuthService,
    // @Inject(DOCUMENT) private document: Document
  ) {
    // this.isAuthenticated = this.authService.authenticateUser('username', 'password');
    // debugger;
    // this.overlayMenuOpenSubscription =
    //   this.layoutService.overlayOpen$.subscribe(() => {
    //     if (!this.menuOutsideClickListener) {
    //       this.menuOutsideClickListener = this.renderer.listen(
    //         'document',
    //         'click',
    //         (event) => {
    //           const isOutsideClicked = !(
    //             this.appSidebar.el.nativeElement.isSameNode(event.target) ||
    //             this.appSidebar.el.nativeElement.contains(event.target) ||
    //             this.appTopbar.menuButton.nativeElement.isSameNode(
    //               event.target
    //             ) ||
    //             this.appTopbar.menuButton.nativeElement.contains(event.target)
    //           );
    //           if (isOutsideClicked) {
    //             this.hideMenu();
    //           }
    //         }
    //       );
    //     }
    //     if (!this.profileMenuOutsideClickListener) {
    //       this.profileMenuOutsideClickListener = this.renderer.listen(
    //         'document',
    //         'click',
    //         (event) => {
    //           const isOutsideClicked = !(
    //             this.appTopbar.menu.nativeElement.isSameNode(event.target) ||
    //             this.appTopbar.menu.nativeElement.contains(event.target) ||
    //             this.appTopbar.topbarMenuButton.nativeElement.isSameNode(
    //               event.target
    //             ) ||
    //             this.appTopbar.topbarMenuButton.nativeElement.contains(
    //               event.target
    //             )
    //           );
    //           if (isOutsideClicked) {
    //             this.hideProfileMenu();
    //           }
    //         }
    //       );
    //     }
    //     if (this.layoutService.state.staticMenuMobileActive) {
    //       this.blockBodyScroll();
    //     }
    //   });
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.hideMenu();
    //     this.hideProfileMenu();
    //   });
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    // this.unblockBodyScroll();
  }

  hideProfileMenu() {
    this.layoutService.state.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }

  // blockBodyScroll(): void {
  //   if (this.document.body.classList) {
  //     this.document.body.classList.add('blocked-scroll');
  //   } else {
  //     this.document.body.className += ' blocked-scroll';
  //   }
  // }

  // unblockBodyScroll(): void {
  //   if (this.document.body.classList) {
  //     this.document.body.classList.remove('blocked-scroll');
  //   } else {
  //     this.document.body.className = this.document.body.className.replace(
  //       new RegExp(
  //         '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
  //         'gi'
  //       ),
  //       ' '
  //     );
  //   }
  // }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config().colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple,
    };
  }

  ngOnDestroy() {
    // if (this.overlayMenuOpenSubscription) {
    //   this.overlayMenuOpenSubscription.unsubscribe();
    // }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
