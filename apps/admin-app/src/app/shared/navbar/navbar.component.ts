import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { ROUTES } from '../../sidebar/sidebar.component';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
})
// tslint:disable: no-var-keyword
export class NavbarComponent implements OnInit {
  pageTitle: String;
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  currentUser: User;

  public isCollapsed = true;
  @ViewChild('app-navbar-cmp', { static: false }) button;

  constructor(
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.currentUser = this.authenticationService.currentUserValue;

    // comment/delete this line after service is live - RAJA BABU IS FAKE USER
    this.currentUser = {
      id: 1,
      username: 'Raja Babu',
      password: 'password',
      email: 'raja@babu.com',
      mobile: '9820098200',
      role: 'ADMIN',
      token: '432432',
    };
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }
  getTitle() {
    this.pageTitle = this.location.prepareExternalUrl(this.location.path());
    if (this.pageTitle.charAt(0) === '#') {
      this.pageTitle = this.pageTitle.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === this.pageTitle) {
        return this.listTitles[item].title;
      }
    }
    return '';
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      if (mainPanel) {
        mainPanel.style.position = 'fixed';
      }
    }
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        if (mainPanel) {
          mainPanel.style.position = '';
        }
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];

    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  async logout() {
    await this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
