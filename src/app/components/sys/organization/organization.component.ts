import { Component, OnInit, ViewChild } from '@angular/core';
import { Organization } from '../../../pojo/sys/Organization';
import { OrganizationService } from '../../../services/sys/organization.service';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  @ViewChild("nzTreeOrg") nzTreeOrg: NzTreeComponent;

  tbConfig = {
    frontPagination: false, //是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
    total: 1, //当前总数据，在服务器渲染时需要传入
    pageIndex: 1, //当前页码
    pageSize: 20, //每页展示多少数据
    loading: false,   //页面是否加载中
  };

  entity: Organization = new Organization();
  parentEntity: Organization;

  treeOrgs: NzTreeNode[] = [];
  orgs: Organization[];


  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
    this.loadTreeOrgs();
    //this.getOrgs();
    //this.searchData();
  }

  loadTreeOrgs(parent: number = 0): void {
    this.orgService.findChildren(parent+"").subscribe(orgs => {
      for (let i = 0; i < orgs.length; i++) {
        let temp = { title: orgs[i].name, key: orgs[i].id + "", org: orgs[i] };
        if (i == 0) {
          temp["selected"] = true;
          //添加列表的数据
          this.entity.parent = orgs[i].id;
          this.parentEntity = orgs[i];
          this.searchData();
        }
        if (orgs[i].nodeKind == null) {
          temp["chidren"] = [];
        }

        this.treeOrgs.push(new NzTreeNode(temp));
      }

    });
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.tbConfig.pageIndex = 1;
    }
    this.tbConfig.loading = true;
    this.orgService.search(this.entity, this.tbConfig.pageIndex, this.tbConfig.pageSize, null, null).subscribe(
      pageResult => {
        this.orgs = pageResult.rows;
        this.tbConfig.total = pageResult.total;
        this.tbConfig.loading = false;
      });
  }

  getOrgs(): void {
    this.orgService.getOrganizations().subscribe(organizations => this.orgs = organizations);
  }

  reveice(options: any): void {
    if (options.openMode == "new") {
      this.orgs = [... this.orgs, options.data];
    }
  }

  addOrg(orgKindId: string) {
    if (!this.checkOrgEnable(orgKindId)) {
      return;
    }
    let parent = this.nzTreeOrg.nzTreeService.getSelectedNodeList()[0].origin.org.id;
    this.orgService.openEvent.emit({ openMode: "new", orgKindId: orgKindId, parentId: parent == undefined ? 0 : parent });
  }

  editOrg(id: number): void {
    this.orgService.openEvent.emit({ openMode: "edit", orgId: id });
  }

  explandAction(e: NzFormatEmitEvent): void {
    if (!e.node.isExpanded || e.node.children.length > 0) {
      return;
    }
    this.orgService.findChildren(e.node.key).subscribe(orgs => {
      let temps = [];
      for (let i = 0; i < orgs.length; i++) {
        let temp = { title: orgs[i].name, key: orgs[i].id + "", org: orgs[i] };
        if (orgs[i].nodeKind == null) {
          temp["chidren"] = [];
        }
        temps.push(new NzTreeNode(temp));
      }
      e.node.addChildren(temps);
    });
  }

  clickAction(e: NzFormatEmitEvent) : void {
    e.node.isSelected = true;
    this.parentEntity = e.node.origin.org;
    this.entity.parent = e.node.origin.org.id;
    this.searchData();
  }

  checkOrgEnable(orgKingId: string) : boolean {
    if (this.parentEntity == null) {
      return orgKingId == "ogn" ? true : false;
    } else if (this.parentEntity.orgKindId == "ogn") {
      return true;
    } else if (this.parentEntity.orgKindId == "dpt") {
      return orgKingId == "ogn" ? false : true;
    } else if (this.parentEntity.orgKindId == "pos") {
      return orgKingId == "psn" ? true : false;
    } else {
      return false;
    }
  }


}
