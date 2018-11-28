import { Injectable, EventEmitter } from '@angular/core';
import { Organization } from '../../pojo/sys/Organization';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  openEvent: EventEmitter<{openMode: string, orgKindId?: string, parentId?: number, orgId?: number}> = new EventEmitter();

  orgKind = {
    ogn: "机构",
    dpt: "部门",
    pos: "岗位",
    psm: "岗位成员"
  }

  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>("/organization/findAll.do");
  }

  search(entity, pageIndex, pageSize, sortKey, sortValue): Observable<any> {
    return this.http.post<Organization[]>("/organization/search.do?pageIndex="+pageIndex+"&pageSize="+pageSize+"&sortKey="+sortKey+"&sortValue="+sortKey, entity);
  }

  addOrganization(organization: Organization): Observable<Organization>{
    return this.http.post<Organization>("/organization/add.do", organization);
  }

  updateOrganization(organization: Organization): Observable<Organization>{
    return this.http.post<Organization>("/organization/update.do", organization);
  }

  delete(id: number): Observable<Organization>{
    return this.http.delete<Organization>("/organization/delete.do?id="+id);
  }

  findOne(id: number): Observable<Organization>{
    return this.http.get<Organization>("/organization/findById.do?id="+id);
  }

  findChildren(parent: string): Observable<Organization[]> {
    return this.http.get<Organization[]>("/organization/findChildren.do?parent="+parent);
  }

  checkNameRepeat(parent: number, id: number, name: string): Observable<boolean> {
    return this.http.get<boolean>("/organization/checkNameRepeat.do?parent="+parent+"&id="+id+"+&name="+name);
  }

  checkCodeRepeat(parent: number, id: number, code: string): Observable<boolean> {
    return this.http.get<boolean>("/organization/checkCodeRepeat.do?parent="+parent+"&id="+id+"&code="+code);
  }
}
