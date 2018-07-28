import { Component, OnInit } from '@angular/core';
import { Organization } from '../../../pojo/sys/Organization';
import { OrganizationService } from '../../../services/sys/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  
  orgs: Organization[];
  

  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
    this.getOrgs();
  }

  getOrgs(): void {
    this.orgService.getOrganizations().subscribe(organizations => this.orgs = organizations);
  }

  reveice(options: any): void{
    alert(JSON.stringify(options));
  }



}
