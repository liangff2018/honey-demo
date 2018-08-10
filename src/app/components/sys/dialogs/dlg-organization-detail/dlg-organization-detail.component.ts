import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Organization } from '../../../../pojo/sys/Organization';
import { stringify } from 'querystring';
import { FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from '../../../../services/sys/organization.service';

@Component({
  selector: 'app-dlg-organization-detail',
  templateUrl: './dlg-organization-detail.component.html',
  styleUrls: ['./dlg-organization-detail.component.css']
})
export class DlgOrganizationDetailComponent implements OnInit {
  
  /*操作类型*/
  type: string = "view";
  /*当前dialog是否显示 */
  isVisible = false;
  /*父组件使用该方法接收结果 */
  @Output() onReceiveResult = new EventEmitter<any>();

  levelOptions: Array<any> = [{id: 1, name: "一级"},{id: 2, name: "二级"}, {id: 3, name: "三级"}];

  formModel = this.fb.group({
    parent: [""],//[{value:"", disabled:true}],
    parentName: [""],
    name: ["", [Validators.required]],
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
      this.type = opts.type;
      this.formModel.get("parent").setValue(opts.data.parent);
      this.formModel.get("parentName").setValue(opts.data.parentName);
      this.formModel.get("orgKindId").setValue(opts.data.orgKindId);
      this.formModel.get("orgKindName").setValue(this.orgService.orgKind[opts.data.orgKindId]);
      
    });
    this.formModel.get("parentName").disable({onlySelf:true});
    this.formModel.get("orgKindName").disable({onlySelf:true});
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.submitForm();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  submitForm(): void {
    if (!this.formModel.valid) {
      for (const i in this.formModel.controls) {
        this.formModel.controls[i].markAsDirty();
        this.formModel.controls[i].updateValueAndValidity();
      }
      return;
    }

    let formValue =  this.formModel.value;
    if (this.type === "new") {
      let org = new Organization();
      org.name = formValue.name;
      org.code = formValue.code;
      org.parent = formValue.parent;
      org.orgKindId = formValue.orgKindId;
      org.level = formValue.level;
      org.longName = formValue.longName;
      org.phone = formValue.phone;
      org.fax = formValue.fax;
      org.zip = formValue.zip;
      org.address = formValue.address;
      console.log("org="+ JSON.stringify(org));
      console.log("VLA="+ JSON.stringify(formValue));
      this.orgService.addOrganization(org).subscribe(
        org => this.onReceiveResult.emit({type: this.type, data: org}),
        err => alert(err)
      );
    }
  
    console.log(this.formModel.get("parent"));
  
  }

  addOrganization(): void {}

}
