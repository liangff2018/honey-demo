import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Organization } from '../../../../pojo/sys/Organization';
import { stringify } from 'querystring';
import { FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from '../../../../services/sys/organization.service';
import { ok } from 'assert';
import { orgNameRepeat } from '../../../../shared/honey-validators.directive';

@Component({
  selector: 'app-dlg-organization-detail',
  templateUrl: './dlg-organization-detail.component.html',
  styleUrls: ['./dlg-organization-detail.component.css']
})
export class DlgOrganizationDetailComponent implements OnInit {

  /*当前页面的org对象*/
  org: Organization;
  /*操作类型*/
  openMode: string = "view";  //允许三种类型new、edit、view
  /*当前dialog是否显示 */
  isVisible = false;
  /*父组件使用该方法接收结果 */
  @Output() onReceiveResult = new EventEmitter<any>();

  levelOptions: Array<{}> = [{id: 1, name: "一级"},{id: 2, name: "二级"}, {id: 3, name: "三级"}];

  formModel = this.fb.group({
    id: [""],
    parent: [""],//[{value:"", disabled:true}],
    parentName: [""],
    name: ["", [Validators.required], [orgNameRepeat(this.orgService)]],
    code: ["", [Validators.required]],
    longName: [""],
    orgKindId: [""],
    orgKindName: [""],
    level: [""],
    phone: [""],
    fax: [""],
    address: [""],
    zip: [""]
  });

  
  constructor(private fb: FormBuilder, private orgService: OrganizationService) { }

  ngOnInit() {

    this.orgService.openEvent.subscribe(opts => {
      this.formModel.reset();
      this.isVisible = true;
      this.openMode = opts.openMode;
      if (this.openMode == "new") {
        this.formModel.get("parent").setValue(opts.parentId);
        if (opts.parentId != 0) {
          this.orgService.findOne(opts.parentId).subscribe(org => this.formModel.get("parentName").setValue(org.fullName));
        }
        this.formModel.get("orgKindId").setValue(opts.orgKindId);
        this.formModel.get("orgKindName").setValue(this.orgService.orgKind[opts.orgKindId]);

      } else if (this.openMode == "edit") {
        this.orgService.findOne(opts.orgId).subscribe(org => {
          this.org = org;
          for(let name in this.formModel.value) {
            this.formModel.get(name).setValue(org[name]);
          }
          this.formModel.get("orgKindName").setValue(this.orgService.orgKind[this.org.orgKindId]);
          
          if (this.org.parent != 0) {
            this.orgService.findOne(org.parent).subscribe(org => {
              this.formModel.get("parentName").setValue(org.fullName);
            });
          }
        });
        
      } else {

      }
      
      
    });
    this.formModel.get("parentName").disable({onlySelf:true});
    this.formModel.get("orgKindName").disable({onlySelf:true});
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.submitForm()) {
      this.isVisible = false;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  submitForm(): boolean {
    if (!this.formModel.valid) {
      for (const i in this.formModel.controls) {
        this.formModel.controls[i].markAsDirty();
        this.formModel.controls[i].updateValueAndValidity();
      }
      return false;
    }

    let formValue =  this.formModel.value;
    if (this.openMode === "new") {
      this.org = new Organization();
      for (let name in formValue) {
        this.org[name] = formValue[name];
      }
      this.orgService.addOrganization(this.org).subscribe(
        org => this.onReceiveResult.emit({openMode: this.openMode, data: org}),
        err => alert(err)
      );
    } else if (this.openMode == "edit") {
      for (let name in formValue) {
        this.org[name] = formValue[name];
      }
      this.orgService.updateOrganization(this.org).subscribe(
        org => this.onReceiveResult.emit({openMode: this.openMode, data: org}),
        err => alert(err)
      );
    }
    return true;
  }

  addOrganization(): void {}

}
