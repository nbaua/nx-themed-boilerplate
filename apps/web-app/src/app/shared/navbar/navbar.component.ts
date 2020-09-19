import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
})
// tslint:disable: no-var-keyword
export class NavbarComponent implements OnInit {
  pageTitle: String = '';
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  @ViewChild('app-navbar-cmp', { static: false }) button;

  constructor(
    location: Location,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.pageTitle = this.getTitle();
  }

  getTitle() {
    this.pageTitle = this.location.prepareExternalUrl(this.location.path());

    if (this.pageTitle.includes('#')) {
      this.pageTitle = this.pageTitle.slice(this.pageTitle.indexOf('/') + 1);
      return this.pageTitle;
    }

    return '';
  }

  async logout() {
    await this.authenticationService.logout();
    // this.router.navigate(['/login']);
  }
}
