import { Component, OnInit } from '@angular/core';
import { Organization } from '../../../pojo/sys/Organization';
import { OrganizationService } from '../../../services/sys/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  
  tbConfig = {
    frontPagination: false, //是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
    total: 1, //当前总数据，在服务器渲染时需要传入
    pageIndex: 1, //当前页码
    pageSize: 20, //每页展示多少数据
    loading: false,   //页面是否加载中
  };

  entity: Organization = new Organization();;

  orgs: Organization[];
  

  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
    //this.getOrgs();
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.tbConfig.pageIndex = 1;
    }
    this.tbConfig.loading = true;
    this.orgService.search(this.entity, this.tbConfig.pageIndex, this.tbConfig.pageSize, null, null).subscribe(
      pageResult => {
        this.orgs=pageResult.rows;
        this.tbConfig.total = pageResult.total;
        this.tbConfig.loading = false;

    });
  }

  getOrgs(): void {
    this.orgService.getOrganizations().subscribe(organizations => this.orgs = organizations);
  }

  reveice(options: any): void{
    debugger
    if (options.type == "new") {
      //this.orgs.push(options.data);
      this.orgs = [... this.orgs, options.data];
    }
  }

  addOgn() {
    this.orgService.openEvent.emit({type: "new", data: {
      parent: "0",
      parentName: "",
      orgKindId: "ogn",
      orgKindName: "机构"
    }});
  }

  editOrg(editEntity : any): void {
    editEntity.parentName = "没有父节点";
    this.orgService.openEvent.emit({type: "edit", data: editEntity});
  }


}
