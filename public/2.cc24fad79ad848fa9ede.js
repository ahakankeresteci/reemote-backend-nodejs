(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"/tMX":function(e,t,i){"use strict";i.r(t),i.d(t,"JobadListModule",function(){return h});var a=i("ofXK"),r=i("tyNb"),s=i("fXoL"),n=i("bOHh"),o=i("1kSV");const c=function(e){return["/userdetail",e]};function b(e,t){if(1&e&&(s.Nb(0,"div",13),s.Nb(1,"a",14),s.Jb(2,"img",15),s.Mb(),s.Nb(3,"div",16),s.Nb(4,"h5",17),s.xc(5),s.Mb(),s.Nb(6,"div",18),s.xc(7),s.Mb(),s.Nb(8,"a",19),s.xc(9),s.Mb(),s.Nb(10,"a",20),s.xc(11,"A\xe7\u0131klamaya Git"),s.Mb(),s.Mb(),s.Mb()),2&e){const e=t.$implicit;s.wb(1),s.ic("routerLink","jobads/",e._id,""),s.wb(4),s.yc(e.title),s.wb(2),s.zc("",e.price,"\u20ba"),s.wb(1),s.gc("routerLink",s.kc(6,c,e.author_user_name)),s.wb(1),s.yc(e.author_user_name),s.wb(1),s.ic("routerLink","jobads/",e._id,"")}}function u(e,t){1&e&&(s.Nb(0,"div",21),s.xc(1," \u0130lan Bulunamad\u0131... :( "),s.Mb())}const g=[{path:"",component:(()=>{class e{constructor(e,t,i){this.jobadListService=e,this.route=t,this.jobads=[],this.isSearching=!1,this.pageNumber=1,this.pageSize=10,this.totalElements=0}ngOnInit(){this.route.paramMap.subscribe(()=>{this.listJobads()})}listJobads(){this.isSearching=this.route.snapshot.paramMap.has("keyword"),console.log("isSearching: "+this.isSearching),this.isSearching?this.handleSearchJobads():this.handleListJobads()}handleListJobads(){var e=this.route.snapshot.paramMap.has("name");console.log("hasCategory: "+e),this.currenCategoryId=e?this.route.snapshot.paramMap.get("name"):"",this.prevCategoryId!=this.currenCategoryId&&(this.pageNumber=1),this.prevCategoryId=this.currenCategoryId,console.log(`currentCategory=${this.currenCategoryId}, pageNum=${this.pageNumber}`),this.jobadListService.getJobadListPagination(this.currenCategoryId,this.pageNumber-1,this.pageSize).subscribe(this.processResult())}processResult(){return e=>{this.jobads=e.jobads,this.pageNumber=e.page.number+1,this.pageSize=e.page.size,this.totalElements=e.page.totalElements}}updatePageSize(e){console.log(e),this.pageSize=e,this.pageNumber=1,this.listJobads()}handleSearchJobads(){const e=this.route.snapshot.paramMap.get("keyword");console.log("keyword: "+e),this.previousKeyword!=e&&(this.pageNumber=1),this.previousKeyword=e,console.log(`keyword=> ${e} pageNum=> ${this.pageNumber}`),this.jobadListService.searchJobadsPagination(e,this.pageNumber-1,this.pageSize).subscribe(this.processResult())}}return e.\u0275fac=function(t){return new(t||e)(s.Ib(n.a),s.Ib(r.a),s.Ib(a.c))},e.\u0275cmp=s.Cb({type:e,selectors:[["app-jobad-list"]],decls:19,vars:7,consts:[[1,"main-content","mx-auto","w-75","my-0","d-flex","align-items-stretch"],[1,"section-content","section-content-p30"],[1,"container-fluid"],[1,"row","ml-5","mr-5","mt-5","mb-2"],["class","card border-light","style","width: 18rem;",4,"ngFor","ngForOf"],["class","alert alert-warning",4,"ngIf"],[1,"footer-pagination"],[1,"d-inline","mr-0","pr-0",3,"page","pageSize","collectionSize","maxSize","boundaryLinks","pageChange","pageSizeChange","collectionSizeChange"],["id","pageSize",1,"d-inline","custom-select","ml-0","pl-0","w-50",3,"change"],["value","5"],["value","10"],["value","20"],["value","30"],[1,"card","border-light",2,"width","18rem"],[3,"routerLink"],["src","assets/images/jobads/placeholder.png","alt","Card image cap",1,"card-img-top"],[1,"card-body"],[1,"card-title"],[1,"price"],["routerLinkActive","router-link-active",3,"routerLink"],[1,"btn","btn-primary",3,"routerLink"],[1,"alert","alert-warning"]],template:function(e,t){1&e&&(s.Nb(0,"div",0),s.Nb(1,"div",1),s.Nb(2,"div",2),s.Nb(3,"div",3),s.vc(4,b,12,8,"div",4),s.vc(5,u,2,0,"div",5),s.Mb(),s.Nb(6,"div",6),s.Nb(7,"ngb-pagination",7),s.Xb("pageChange",function(e){return t.pageNumber=e})("pageSizeChange",function(e){return t.pageSize=e})("collectionSizeChange",function(e){return t.totalElements=e})("pageChange",function(){return t.listJobads()}),s.Mb(),s.Nb(8,"select",8),s.Xb("change",function(e){return t.updatePageSize(e.target.value)}),s.Nb(9,"option",9),s.xc(10,"Sayfa Boyutu"),s.Mb(),s.Nb(11,"option",9),s.xc(12,"5"),s.Mb(),s.Nb(13,"option",10),s.xc(14,"10"),s.Mb(),s.Nb(15,"option",11),s.xc(16,"20"),s.Mb(),s.Nb(17,"option",12),s.xc(18,"30"),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb()),2&e&&(s.wb(4),s.gc("ngForOf",t.jobads),s.wb(1),s.gc("ngIf",0==(null==t.jobads?null:t.jobads.length)),s.wb(2),s.gc("page",t.pageNumber)("pageSize",t.pageSize)("collectionSize",t.totalElements)("maxSize",5)("boundaryLinks",!0))},directives:[a.i,a.j,o.b,r.e,r.d],styles:[""]}),e})()}];let l=(()=>{class e{}return e.\u0275mod=s.Gb({type:e}),e.\u0275inj=s.Fb({factory:function(t){return new(t||e)},imports:[[r.f.forChild(g)],r.f]}),e})();var p=i("3nz6");let h=(()=>{class e{}return e.\u0275mod=s.Gb({type:e}),e.\u0275inj=s.Fb({factory:function(t){return new(t||e)},imports:[[a.b,l,p.a]]}),e})()}}]);