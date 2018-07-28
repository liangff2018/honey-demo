import { Injectable } from '@angular/core';
import { Organization } from '../../pojo/sys/Organization';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>("/organization/findAll.do");
  }
}
