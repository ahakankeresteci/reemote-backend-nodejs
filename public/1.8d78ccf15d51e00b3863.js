(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{xn5Q:function(t,e,n){"use strict";n.r(e),n.d(e,"JobadDetailsModule",function(){return k});var i=n("ofXK"),r=n("tyNb"),c=n("I7Am"),a=n("fXoL"),o=n("bOHh"),b=n("flwd");const s=function(t){return["/updateJobad",t]};function u(t,e){if(1&t&&(a.Nb(0,"button",10),a.xc(1,"\u0130lan\u0131 D\xfczenle"),a.Mb()),2&t){const t=a.bc();a.gc("routerLink",a.kc(1,s,t.jobad._id))}}function l(t,e){if(1&t){const t=a.Ob();a.Nb(0,"button",11),a.Xb("click",function(){return a.pc(t),a.bc().deleteJobad()}),a.xc(1,"\u0130lan\u0131 Kald\u0131r"),a.Mb()}}const d=function(t){return["/userdetail",t]};function m(t,e){if(1&t&&(a.Nb(0,"p",5),a.xc(1,"\u0130lan\u0131 Yay\u0131nlayan: "),a.Nb(2,"a",12),a.xc(3),a.Mb(),a.Mb()),2&t){const t=a.bc();a.wb(2),a.gc("routerLink",a.kc(2,d,t.jobad.author_user_name)),a.wb(1),a.yc(t.jobad.author_user_name)}}const g=function(){return["/chat"]};function p(t,e){if(1&t&&(a.Nb(0,"p",13),a.xc(1),a.Nb(2,"a",14),a.xc(3,"Mesaj G\xf6nder"),a.Mb(),a.Mb()),2&t){const t=a.bc();a.wb(1),a.Ac("",t.jobad.author_user_name,"'in istedi\u011fi \xfccret: ",t.jobad.price,"\u20ba "),a.wb(1),a.gc("routerLink",a.jc(3,g))}}const f=[{path:"",component:(()=>{class t{constructor(t,e,n,i){this.jobadService=t,this.route=e,this.auth=n,this.router=i,this.jobad=new c.a,this.isMyPage=!1}ngOnInit(){this.route.paramMap.subscribe(()=>{this.handleJobadDetails()}),this.updateIsmypage()}handleJobadDetails(){const t=this.route.snapshot.paramMap.get("id");this.jobadService.getJobad(t).subscribe(t=>{this.jobad=t,this.updateIsmypage()})}deleteJobad(){this.jobadService.deleteJobad(this.jobad._id).subscribe(t=>{this.router.navigateByUrl("/")})}updateIsmypage(){this.isMyPage=!(!this.auth.isLoggedIn()||localStorage.getItem("username")!=this.jobad.author_user_name)}}return t.\u0275fac=function(e){return new(e||t)(a.Ib(o.a),a.Ib(r.a),a.Ib(b.a),a.Ib(r.b))},t.\u0275cmp=a.Cb({type:t,selectors:[["app-jobad-details"]],decls:13,vars:7,consts:[[1,"jumbotron","my-0"],[1,"display-4","ml-5","mr-auto","d-inline"],["routerLinkActive","router-link-active","class","btn btn-success btn-sm d-inline mr-2 ml-5",3,"routerLink",4,"ngIf"],["routerLinkActive","router-link-active","class","btn btn-danger btn-sm d-inline mr-2 ml-5",3,"click",4,"ngIf"],["class","lead ml-5",4,"ngIf"],[1,"lead","ml-5"],[1,"my-4","ml-5"],["alt","Job-advertisement-picture",1,"img-fluid",3,"src"],[1,"d-inline","row"],["class","d-inline ml-5 mr-2",4,"ngIf"],["routerLinkActive","router-link-active",1,"btn","btn-success","btn-sm","d-inline","mr-2","ml-5",3,"routerLink"],["routerLinkActive","router-link-active",1,"btn","btn-danger","btn-sm","d-inline","mr-2","ml-5",3,"click"],["routerLinkActive","router-link-active",3,"routerLink"],[1,"d-inline","ml-5","mr-2"],["routerLinkActive","router-link-active","role","button",1,"btn","btn-success","btn-lg","d-inline","block","mr-2","ml-auto",3,"routerLink"]],template:function(t,e){1&t&&(a.Nb(0,"div",0),a.Nb(1,"h1",1),a.xc(2),a.Mb(),a.vc(3,u,2,3,"button",2),a.vc(4,l,2,0,"button",3),a.vc(5,m,4,4,"p",4),a.Nb(6,"p",5),a.xc(7),a.Mb(),a.Jb(8,"hr",6),a.Nb(9,"div",5),a.Jb(10,"img",7),a.Nb(11,"div",8),a.vc(12,p,4,4,"p",9),a.Mb(),a.Mb(),a.Mb()),2&t&&(a.wb(2),a.yc(e.jobad.title),a.wb(1),a.gc("ngIf",e.isMyPage),a.wb(1),a.gc("ngIf",e.isMyPage),a.wb(1),a.gc("ngIf",!e.isMyPage),a.wb(2),a.zc("",e.jobad.content," "),a.wb(3),a.hc("src",e.jobad.image_url,a.qc),a.wb(2),a.gc("ngIf",!e.isMyPage))},directives:[i.j,r.d,r.c,r.e],styles:[""]}),t})()}];let h=(()=>{class t{}return t.\u0275mod=a.Gb({type:t}),t.\u0275inj=a.Fb({factory:function(e){return new(e||t)},imports:[[r.f.forChild(f)],r.f]}),t})();var v=n("3nz6");let k=(()=>{class t{}return t.\u0275mod=a.Gb({type:t}),t.\u0275inj=a.Fb({factory:function(e){return new(e||t)},imports:[[i.b,h,v.a]]}),t})()}}]);