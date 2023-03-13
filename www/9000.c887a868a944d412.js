"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9e3],{9e3:(V,p,r)=>{r.r(p),r.d(p,{HomePageModule:()=>F});var g=r(9808),a=r(8779),u=r(3075),d=r(4132),l=r(655),f=r(567),h=r(8305),P=r(7719),n=r(5e3),_=r(263),v=r(1086),M=r(2868),C=r(7221),x=r(2340),O=r(520),b=r(9709);let Z=(()=>{class t{constructor(e,o){this.http=e,this.appconfig=o}getCustomerDashboard(e){return this.http.get(x.N.apiBaseUrl+this.appconfig.config.apiEndPoints.dashboard.getCustomerDashboard,{params:e}).pipe((0,M.b)(o=>this.log("dashboard")),(0,C.K)(this.handleError("dashboard",[])))}handleError(e="operation",o){return s=>(this.log(`${e} failed: ${Array.isArray(s.error.message)?s.error.message[0]:s.error.message}`),(0,v.of)(s.error))}log(e){console.log(e)}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(O.eN),n.LFG(b._))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var A=r(1645),y=r(3746);function T(t,i){if(1&t){const e=n.EpF();n.TgZ(0,"ion-refresher",28),n.NdJ("ionRefresh",function(s){n.CHM(e);const c=n.oxw();return n.KtG(c.doRefresh(s))}),n._UZ(1,"ion-refresher-content"),n.qZA()}}function U(t,i){if(1&t&&(n.TgZ(0,"ion-badge",29),n._uU(1),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Oqu(e.totalApproved)}}const m=function(t,i){return{status:t,reservationId:i}};function I(t,i){if(1&t&&(n.TgZ(0,"ion-item",32)(1,"ion-label")(2,"h3"),n._uU(3,"Requried completion date:"),n.qZA(),n.TgZ(4,"h3")(5,"strong"),n._uU(6),n.ALo(7,"date"),n.qZA()()()()),2&t){const e=n.oxw(2);n.Q6J("queryParams",n.WLB(5,m,e.approvedReservation.reservationStatus.name,e.approvedReservation.reservationId)),n.xp6(6),n.Oqu(n.xi3(7,2,e.approvedReservation.reqCompletionDate,"EEEE, MMM dd, yyyy"))}}function w(t,i){1&t&&(n.TgZ(0,"ion-item",33)(1,"ion-label")(2,"h3"),n._uU(3,"No approved reservations"),n.qZA()()())}function H(t,i){if(1&t&&(n.TgZ(0,"ion-list",18),n.YNc(1,I,8,8,"ion-item",30),n.YNc(2,w,4,0,"ng-template",null,31,n.W1O),n.qZA()),2&t){const e=n.MAs(3),o=n.oxw();n.xp6(1),n.Q6J("ngIf",o.approvedReservation)("ngIfElse",e)}}const E=function(){return{status:"Approved"}};function q(t,i){if(1&t&&(n.TgZ(0,"ion-button",34),n._uU(1,"View all"),n.qZA()),2&t){const e=n.oxw();n.Q6J("disabled",e.isLoading)("queryParams",n.DdM(2,E))}}function N(t,i){if(1&t&&(n.TgZ(0,"ion-badge",35),n._uU(1),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Oqu(e.totalProcessed)}}function J(t,i){if(1&t&&(n.TgZ(0,"ion-item",32)(1,"ion-label")(2,"h3"),n._uU(3,"Estimated completion date:"),n.qZA(),n.TgZ(4,"h3")(5,"strong"),n._uU(6),n.ALo(7,"date"),n.qZA()(),n.TgZ(8,"h3"),n._uU(9,"Assigned Person:"),n.qZA(),n.TgZ(10,"h3")(11,"strong"),n._uU(12),n.qZA()()()()),2&t){const e=n.oxw(2);n.Q6J("queryParams",n.WLB(6,m,e.processedReservation.reservationStatus.name,e.processedReservation.reservationId)),n.xp6(6),n.Oqu(n.xi3(7,3,e.processedReservation.estCompletionDate,"EEEE, MMM dd, yyyy")),n.xp6(6),n.Oqu(e.processedReservation.staff.name)}}function L(t,i){1&t&&(n.TgZ(0,"ion-item",33)(1,"ion-label")(2,"h3"),n._uU(3,"No processed reservations"),n.qZA()()())}function R(t,i){if(1&t&&(n.TgZ(0,"ion-list",18),n.YNc(1,J,13,9,"ion-item",30),n.YNc(2,L,4,0,"ng-template",null,36,n.W1O),n.qZA()),2&t){const e=n.MAs(3),o=n.oxw();n.xp6(1),n.Q6J("ngIf",o.processedReservation)("ngIfElse",e)}}const Y=function(){return{status:"Processed"}};function S(t,i){if(1&t&&(n.TgZ(0,"ion-button",34),n._uU(1,"View all"),n.qZA()),2&t){const e=n.oxw();n.Q6J("disabled",e.isLoading)("queryParams",n.DdM(2,Y))}}function Q(t,i){1&t&&(n.TgZ(0,"ion-list",18)(1,"ion-item",37)(2,"ion-label",38)(3,"h2"),n._UZ(4,"ion-skeleton-text",39),n.qZA(),n.TgZ(5,"h3"),n._UZ(6,"ion-skeleton-text",39),n.qZA(),n.TgZ(7,"h3"),n._UZ(8,"ion-skeleton-text",39),n.qZA(),n.TgZ(9,"h3"),n._UZ(10,"ion-skeleton-text",39),n.qZA(),n.TgZ(11,"h3"),n._UZ(12,"ion-skeleton-text",39),n.qZA()()()()),2&t&&(n.xp6(4),n.Q6J("animated",!0),n.xp6(2),n.Q6J("animated",!0),n.xp6(2),n.Q6J("animated",!0),n.xp6(2),n.Q6J("animated",!0),n.xp6(2),n.Q6J("animated",!0))}function D(t,i){1&t&&n._UZ(0,"ion-skeleton-text",40),2&t&&n.Q6J("animated",!0)}function k(t,i){1&t&&(n.TgZ(0,"ion-list",18)(1,"ion-item",33)(2,"ion-label")(3,"h3"),n._uU(4,"No reminders set"),n.qZA()()()())}const W=[{path:"",component:(()=>{class t{constructor(e,o,s,c,j,z,K){this.router=e,this.authService=o,this.modalCtrl=s,this.dashboardService=c,this.notificationService=j,this.storageService=z,this.alertController=K,this.isLoading=!1,this.totalApproved=0,this.totalProcessed=0,this.totalUnreadNotification=0,this.hasChanges=!1,this.currentUser=this.storageService.getLoginUser(),this.isAuthenticated&&this.initDashboard(this.currentUser.customerId)}get isAuthenticated(){const e=this.storageService.getLoginUser();return e&&e.customerId&&e.userId&&e.accessToken&&""!==e.customerId&&""!==e.userId&&""!==e.accessToken}get user(){return this.storageService.getLoginUser()}initDashboard(e){return(0,l.mG)(this,void 0,void 0,function*(){this.isLoading=!0,(0,f.D)(this.dashboardService.getCustomerDashboard({customerId:e})).subscribe(([o])=>{this.approvedReservation=o&&o.data&&o.data.approved?o.data.approved:null,this.processedReservation=o&&o.data&&o.data.processed?o.data.processed:null,this.totalApproved=o&&o.data&&o.data.totalApproved?o.data.totalApproved:0,this.totalProcessed=o&&o.data&&o.data.totalProcessed?o.data.totalProcessed:0},o=>console.error(o),()=>{this.isLoading=!1,this.hasChanges=!1})})}ngOnInit(){}onOpenDetails(e){return(0,l.mG)(this,void 0,void 0,function*(){const o=yield this.modalCtrl.create({component:h.O,cssClass:"modal-fullscreen",componentProps:{details:e,currentUser:this.user}});o.present(),yield o.onWillDismiss()})}onShowSettings(){return(0,l.mG)(this,void 0,void 0,function*(){this.isAuthenticated||this.authService.logout();let e=null;e=yield this.modalCtrl.create({component:P.N,cssClass:"modal-fullscreen",backdropDismiss:!1,canDismiss:!0,componentProps:{modal:e}}),e.present(),console.log("open settings")})}ionViewWillEnter(){console.log("visited")}doRefresh(e){return(0,l.mG)(this,void 0,void 0,function*(){try{this.refreshEvent=e,yield this.initDashboard(this.currentUser.customerId).finally(()=>{this.refreshEvent&&(this.refreshEvent.target.complete(),this.refreshEvent=null)})}catch(o){yield this.presentAlert({header:"Try again!",message:"Error loading reseravation",buttons:["OK"]})}})}profilePicErrorHandler(e){e.target.src="../../../assets/img/profile-not-found.png"}presentAlert(e){return(0,l.mG)(this,void 0,void 0,function*(){yield(yield this.alertController.create(e)).present()})}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(d.F0),n.Y36(_.e),n.Y36(a.IN),n.Y36(Z),n.Y36(A.g),n.Y36(y.V),n.Y36(a.Br))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-home"]],decls:58,vars:13,consts:[["no-border","","no-shadow",""],["slot","start",2,"width","48px"],[1,"ion-text-center"],["slot","end"],[3,"click"],["slot","icon-only","name","settings-sharp"],[1,"ion-padding"],["slot","fixed","class","refresher-custom",3,"ionRefresh",4,"ngIf"],[1,"content"],[1,"row","profile"],[1,"col","avatar"],[3,"src","error"],[1,"col","welcome"],[1,"row","name"],[1,"row","description"],[1,"row","dashboard"],[1,"col"],["mode","ios"],["lines","none"],[1,"ion-no-padding"],["slot","start","color","success",4,"ngIf","ngIfElse"],["lines","none",4,"ngIf","ngIfElse"],[1,"action"],["fill","clear","routerLink","/booking","replaceUrl","true",3,"disabled","queryParams",4,"ngIf"],["slot","start","color","secondary",4,"ngIf","ngIfElse"],["elseLoadingCards",""],["elseLoadingBadge",""],["elseNoReminders",""],["slot","fixed",1,"refresher-custom",3,"ionRefresh"],["slot","start","color","success"],["button","","detail","false","class","ion-no-padding","routerLink","/booking","replaceUrl","true",3,"queryParams",4,"ngIf","ngIfElse"],["elseNoApprovedReservation",""],["button","","detail","false","routerLink","/booking","replaceUrl","true",1,"ion-no-padding",3,"queryParams"],["button","","detail","false",1,"ion-no-padding"],["fill","clear","routerLink","/booking","replaceUrl","true",3,"disabled","queryParams"],["slot","start","color","secondary"],["elseNoProcessedReservation",""],["detail","false",1,"ion-no-padding"],[2,"display","flex","flex-direction","column","gap","10px"],[2,"height","20px",3,"animated"],[2,"height","20px","width","40px",3,"animated"]],template:function(e,o){if(1&e&&(n.TgZ(0,"ion-header",0)(1,"ion-toolbar"),n._UZ(2,"div",1),n.TgZ(3,"ion-title",2),n._uU(4,"Home"),n.qZA(),n.TgZ(5,"ion-buttons",3)(6,"ion-button",4),n.NdJ("click",function(){return o.onShowSettings()}),n._UZ(7,"ion-icon",5),n.qZA()()()(),n.TgZ(8,"ion-content",6),n.YNc(9,T,2,0,"ion-refresher",7),n.TgZ(10,"div",8)(11,"div",9)(12,"div",10)(13,"ion-avatar")(14,"img",11),n.NdJ("error",function(c){return o.profilePicErrorHandler(c)}),n.qZA()()(),n.TgZ(15,"div",12)(16,"div",13)(17,"h2"),n._uU(18),n.qZA()(),n.TgZ(19,"div",14)(20,"h3"),n._uU(21,"What can we help you with today?"),n.qZA()()()(),n.TgZ(22,"div",15)(23,"div",16)(24,"ion-card",17)(25,"ion-card-header")(26,"ion-list",18)(27,"ion-item",19)(28,"ion-label")(29,"h3")(30,"strong"),n._uU(31,"Approved reservation"),n.qZA()()(),n.YNc(32,U,2,1,"ion-badge",20),n.qZA()()(),n.TgZ(33,"ion-card-content"),n.YNc(34,H,4,2,"ion-list",21),n.qZA(),n.TgZ(35,"div",22),n.YNc(36,q,2,3,"ion-button",23),n.qZA()()()(),n.TgZ(37,"div",15)(38,"div",16)(39,"ion-card",17)(40,"ion-card-header")(41,"ion-list",18)(42,"ion-item",19)(43,"ion-label")(44,"h3")(45,"strong"),n._uU(46,"Ongoing"),n.qZA()()(),n.YNc(47,N,2,1,"ion-badge",24),n.qZA()()(),n.TgZ(48,"ion-card-content"),n.YNc(49,R,4,2,"ion-list",21),n.qZA(),n.TgZ(50,"div",22),n.YNc(51,S,2,3,"ion-button",23),n.qZA()()()()()(),n.YNc(52,Q,13,5,"ng-template",null,25,n.W1O),n.YNc(54,D,1,1,"ng-template",null,26,n.W1O),n.YNc(56,k,5,0,"ng-template",null,27,n.W1O)),2&e){const s=n.MAs(53),c=n.MAs(55);n.xp6(9),n.Q6J("ngIf",!o.isLoading),n.xp6(5),n.Q6J("src",o.user.userProfilePic,n.LSH),n.xp6(4),n.hij("Hi, ",o.user.firstName,"!"),n.xp6(14),n.Q6J("ngIf",!o.isLoading)("ngIfElse",c),n.xp6(2),n.Q6J("ngIf",!o.isLoading)("ngIfElse",s),n.xp6(2),n.Q6J("ngIf",o.totalApproved>0),n.xp6(11),n.Q6J("ngIf",!o.isLoading)("ngIfElse",c),n.xp6(2),n.Q6J("ngIf",!o.isLoading)("ngIfElse",s),n.xp6(2),n.Q6J("ngIf",o.totalProcessed>0)}},dependencies:[g.O5,a.BJ,a.yp,a.YG,a.Sm,a.PM,a.FN,a.Zi,a.W2,a.Gu,a.gu,a.Ie,a.Q$,a.q_,a.nJ,a.Wo,a.CK,a.wd,a.sr,a.YI,d.rH,g.uU],styles:["ion-header[_ngcontent-%COMP%]:after{background-image:none}.content[_ngcontent-%COMP%]{display:flex;flex-direction:column}.content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-grow:1}.content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%]{display:flex;flex-direction:column}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]{margin-top:10px}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]{display:flex;padding:5px;margin-right:14px}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%]{width:103px;height:103px}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{object-position:center;object-fit:contain;box-shadow:0 0 10px #7a7a7a75}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]{flex-grow:1;display:flex;flex-direction:column;row-gap:11px}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-end}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{font-weight:700;color:#000;letter-spacing:0px;line-height:1.2;margin:0}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{margin:0;color:#000;letter-spacing:0px;line-height:1.2}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]{margin-top:20px;display:flex;row-gap:20px;flex-direction:column}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card{margin:0}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card .reminder-list{gap:10px}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-list ion-thumbnail{width:40px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-list ion-thumbnail img{object-fit:contain!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label{text-overflow:unset;white-space:unset;overflow:unset}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h1, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h2, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h3, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h4, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h5, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label span, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label p{display:-webkit-box;max-width:100%;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .title{margin-bottom:5px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .desc{font-size:15px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .title, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .desc{line-height:1;-webkit-line-clamp:2!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .sched{display:flex;flex-direction:row;align-items:center;gap:10px;margin-top:10px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .sched ion-icon{font-size:2em!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .sched .details{display:flex;flex-direction:column}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .sched .details span{font-size:15px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card   ion-card-header ion-item .item-native{padding-left:0!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card   ion-card-header ion-item ion-label *{margin:0!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-card-content ion-item ion-label{margin:8px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-card-content ion-item ion-label *{margin:0!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card .action{display:flex;flex-direction:column;align-items:flex-end}"]}),t})()}];let B=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[d.Bz.forChild(W),d.Bz]}),t})();var G=r(5268);let F=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[g.ez,u.u5,a.Pc,B,G.q]}),t})()}}]);