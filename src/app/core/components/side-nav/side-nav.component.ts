import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Accordion, AccordionTab } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  isSideMenuCollasped: boolean = true;
  userMenu: MenuItem[];
  pharmaciesSelected: boolean = false;
  orderSupplySelected: boolean = false;
  @ViewChild('accordion') private accordionMenu: Accordion;
  private selectedMenuTab: AccordionTab;
  private largePharmaciesURLS = [
    '/pharmacies/مجانى',
    '/pharmacies/تأمين',
    'pharmacies/نفقة',
  ];
  private orderSupplyCommandsURLS = ['operations/'];

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.routeUpdated();
      }
    });
  }
  closeSideMenu() {
    if (!this.isSideMenuCollasped) {
      this.closeAllAccordionTabs();
      this.isSideMenuCollasped = true;
    }
  }
  openSideMenu() {
    if (this.isSideMenuCollasped) {
      this.isSideMenuCollasped = false;
    }
  }
  toggleSideMenu() {
    this.isSideMenuCollasped = !this.isSideMenuCollasped;
    if (this.isSideMenuCollasped) {
      this.closeAllAccordionTabs();
    } else {
      this.openPreviousSelectedTab();
    }
  }

  private closeAllAccordionTabs() {
    let anySelected = false;
    if (this.accordionMenu && this.accordionMenu.tabs) {
      this.accordionMenu.tabs.forEach((tab) => {
        if (tab.selected) {
          this.selectedMenuTab = tab;
          anySelected = true;
        }
        tab.selected = false;
      });
    }
    if (!anySelected) {
      this.selectedMenuTab = null;
    }
  }
  private openPreviousSelectedTab() {
    if (this.accordionMenu) {
      this.accordionMenu.tabs.forEach((tab) => {
        if (this.selectedMenuTab && tab.id === this.selectedMenuTab.id) {
          tab.toggle(new MouseEvent('click'));
        }
      });
    }
  }
  private routeUpdated() {
    const URL = this.router.url.split('?')[0];
    this.pharmaciesSelected = this.largePharmaciesURLS.indexOf(URL) >= 0;
    this.orderSupplySelected = this.orderSupplyCommandsURLS.indexOf(URL) >= 0;
  }


  ngOnInit(): void {
    this.userMenu = [
      {
        label: 'تغيير الباسورد',
        icon: 'pi pi-fw pi-key',
        command: (_) => {
          this.closeSideMenu();
          this.router.navigate(['']);
        },
      },

      {
        label: 'تغيير الباسورد',
        icon: 'fas fa-sign-out-alt',
        command: (_) => {
          this.logout();
          this.router.navigate(['']);
        },
      },
    ];
  }
  get userName(): string {
    return 'user Nameeeee';
  }
  get userAvatarName(): string {
    return 'avaaaaaaatar name';
  }

  logout() {
    this.authService.logout();
  }
}
