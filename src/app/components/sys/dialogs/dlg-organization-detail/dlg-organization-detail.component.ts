import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Organization } from '../../../../pojo/sys/Organization';
import { stringify } from 'querystring';

@Component({
  selector: 'app-dlg-organization-detail',
  templateUrl: './dlg-organization-detail.component.html',
  styleUrls: ['./dlg-organization-detail.component.css']
})
export class DlgOrganizationDetailComponent implements OnInit {
  
  /*当前dialog是否显示 */
  isVisible = false;
  /*父组件使用该方法接收结果 */
  @Output() onReceiveResult = new EventEmitter<any>();


  flag: boolean = true;
  org: Organization = new Organization();
  levelOptions: Array<any> = [{id: 1, name: "一级"},{id: 2, name: "二级"}, {id: 3, name: "三级"}];

  constructor() { }

  ngOnInit() {
  }

  open(options: any): void{
    this.isVisible = true;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.onReceiveResult.emit({type: "new", data: "aaaaaaa"});
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  submitForm(): void {
    
  }

  addOrganization(): void {}

}
