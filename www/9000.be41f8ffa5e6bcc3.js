"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9e3],{9e3:(V,h,r)=>{r.r(h),r.d(h,{HomePageModule:()=>f});var u=r(6895),a=r(603),P=r(4006),g=r(9773),l=r(5861),v=r(567),C=r(8305),x=r(1902),n=r(4650),O=r(263),M=r(1086),Z=r(2868),b=r(7221),y=r(2340),A=r(529),T=r(9709);class d{http;appconfig;constructor(e,t){this.http=e,this.appconfig=t}getCustomerDashboard(e){return this.http.get(y.N.apiBaseUrl+this.appconfig.config.apiEndPoints.dashboard.getCustomerDashboard,{params:e}).pipe((0,Z.b)(t=>this.log("dashboard")),(0,b.K)(this.handleError("dashboard",[])))}handleError(e="operation",t){return o=>(this.log(`${e} failed: ${Array.isArray(o.error.message)?o.error.message[0]:o.error.message}`),(0,M.of)(o.error))}log(e){console.log(e)}static \u0275fac=function(t){return new(t||d)(n.LFG(A.eN),n.LFG(T._))};static \u0275prov=n.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"})}var U=r(1645),I=r(3746);function w(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"ion-refresher",28),n.NdJ("ionRefresh",function(s){n.CHM(t);const c=n.oxw();return n.KtG(c.doRefresh(s))}),n._UZ(1,"ion-refresher-content"),n.qZA()}}function E(i,e){if(1&i&&(n.TgZ(0,"ion-badge",29),n._uU(1),n.qZA()),2&i){const t=n.oxw();n.xp6(1),n.Oqu(t.totalApproved)}}const _=function(i,e){return{status:i,reservationId:e}};function q(i,e){if(1&i&&(n.TgZ(0,"ion-item",32)(1,"ion-label")(2,"h3"),n._uU(3,"Requried completion date:"),n.qZA(),n.TgZ(4,"h3")(5,"strong"),n._uU(6),n.ALo(7,"date"),n.qZA()()()()),2&i){const t=n.oxw(2);n.Q6J("queryParams",n.WLB(5,_,t.approvedReservation.reservationStatus.name,t.approvedReservation.reservationId)),n.xp6(6),n.Oqu(n.xi3(7,2,t.approvedReservation.reqCompletionDate,"EEEE, MMM dd, yyyy"))}}function N(i,e){1&i&&(n.TgZ(0,"ion-item",33)(1,"ion-label")(2,"h3"),n._uU(3,"No approved reservations"),n.qZA()()())}function J(i,e){if(1&i&&(n.TgZ(0,"ion-list",18),n.YNc(1,q,8,8,"ion-item",30),n.YNc(2,N,4,0,"ng-template",null,31,n.W1O),n.qZA()),2&i){const t=n.MAs(3),o=n.oxw();n.xp6(1),n.Q6J("ngIf",o.approvedReservation)("ngIfElse",t)}}const H=function(){return{status:"Approved"}};function L(i,e){if(1&i&&(n.TgZ(0,"ion-button",34),n._uU(1,"View all"),n.qZA()),2&i){const t=n.oxw();n.Q6J("disabled",t.isLoading)("queryParams",n.DdM(2,H))}}function Y(i,e){if(1&i&&(n.TgZ(0,"ion-badge",35),n._uU(1),n.qZA()),2&i){const t=n.oxw();n.xp6(1),n.Oqu(t.totalProcessed)}}function R(i,e){if(1&i&&(n.TgZ(0,"ion-item",32)(1,"ion-label")(2,"h3"),n._uU(3,"Estimated completion date:"),n.qZA(),n.TgZ(4,"h3")(5,"strong"),n._uU(6),n.ALo(7,"date"),n.qZA()(),n.TgZ(8,"h3"),n._uU(9,"Assigned Person:"),n.qZA(),n.TgZ(10,"h3")(11,"strong"),n._uU(12),n.qZA()()()()),2&i){const t=n.oxw(2);n.Q6J("queryParams",n.WLB(6,_,t.processedReservation.reservationStatus.name,t.processedReservation.reservationId)),n.xp6(6),n.Oqu(n.xi3(7,3,t.processedReservation.estCompletionDate,"EEEE, MMM dd, yyyy")),n.xp6(6),n.Oqu(t.processedReservation.staff.name)}}function S(i,e){1&i&&(n.TgZ(0,"ion-item",33)(1,"ion-label")(2,"h3"),n._uU(3,"No processed reservations"),n.qZA()()())}function Q(i,e){if(1&i&&(n.TgZ(0,"ion-list",18),n.YNc(1,R,13,9,"ion-item",30),n.YNc(2,S,4,0,"ng-template",null,36,n.W1O),n.qZA()),2&i){const t=n.MAs(3),o=n.oxw();n.xp6(1),n.Q6J("ngIf",o.processedReservation)("ngIfElse",t)}}const D=function(){return{status:"Processed"}};function k(i,e){if(1&i&&(n.TgZ(0,"ion-button",34),n._uU(1,"View all"),n.qZA()),2&i){const t=n.oxw();n.Q6J("disabled",t.isLoading)("queryParams",n.DdM(2,D))}}function W(i,e){1&i&&(n.TgZ(0,"ion-list",18)(1,"ion-item",37)(2,"ion-label",38)(3,"h2"),n._UZ(4,"ion-skeleton-text",39),n.qZA(),n.TgZ(5,"h3"),n._UZ(6,"ion-skeleton-text",39),n.qZA(),n.TgZ(7,"h3"),n._UZ(8,"ion-skeleton-text",39),n.qZA(),n.TgZ(9,"h3"),n._UZ(10,"ion-skeleton-text",39),n.qZA(),n.TgZ(11,"h3"),n._UZ(12,"ion-skeleton-text",39),n.qZA()()()()),2&i&&(n.xp6(4),n.Q6J("animated",!0),n.xp6(2),n.Q6J("animated",!0),n.xp6(2),n.Q6J("animated",!0),n.xp6(2),n.Q6J("animated",!0),n.xp6(2),n.Q6J("animated",!0))}function B(i,e){1&i&&n._UZ(0,"ion-skeleton-text",40),2&i&&n.Q6J("animated",!0)}function F(i,e){1&i&&(n.TgZ(0,"ion-list",18)(1,"ion-item",33)(2,"ion-label")(3,"h3"),n._uU(4,"No reminders set"),n.qZA()()()())}class p{router;authService;modalCtrl;dashboardService;notificationService;storageService;alertController;isLoading=!1;approvedReservation;totalApproved=0;processedReservation;totalProcessed=0;totalUnreadNotification=0;hasChanges=!1;refreshEvent;currentUser;constructor(e,t,o,s,c,G,K){this.router=e,this.authService=t,this.modalCtrl=o,this.dashboardService=s,this.notificationService=c,this.storageService=G,this.alertController=K,this.currentUser=this.storageService.getLoginUser(),this.isAuthenticated&&this.initDashboard(this.currentUser.customerId)}get isAuthenticated(){const e=this.storageService.getLoginUser();return e&&e.customerId&&e.userId&&e.accessToken&&""!==e.customerId&&""!==e.userId&&""!==e.accessToken}get user(){return this.storageService.getLoginUser()}initDashboard(e){var t=this;return(0,l.Z)(function*(){t.isLoading=!0,(0,v.D)(t.dashboardService.getCustomerDashboard({customerId:e})).subscribe(([o])=>{t.approvedReservation=o&&o.data&&o.data.approved?o.data.approved:null,t.processedReservation=o&&o.data&&o.data.processed?o.data.processed:null,t.totalApproved=o&&o.data&&o.data.totalApproved?o.data.totalApproved:0,t.totalProcessed=o&&o.data&&o.data.totalProcessed?o.data.totalProcessed:0},o=>console.error(o),()=>{t.isLoading=!1,t.hasChanges=!1})})()}ngOnInit(){}onOpenDetails(e){var t=this;return(0,l.Z)(function*(){const o=yield t.modalCtrl.create({component:C.O,cssClass:"modal-fullscreen",componentProps:{details:e,currentUser:t.user}});o.present(),yield o.onWillDismiss()})()}onShowSettings(){var e=this;return(0,l.Z)(function*(){e.isAuthenticated||e.authService.logout();let t=null;t=yield e.modalCtrl.create({component:x.N,cssClass:"modal-fullscreen",backdropDismiss:!1,canDismiss:!0,componentProps:{modal:t}}),t.present(),console.log("open settings")})()}ionViewWillEnter(){console.log("visited")}doRefresh(e){var t=this;return(0,l.Z)(function*(){try{t.refreshEvent=e,yield t.initDashboard(t.currentUser.customerId).finally(()=>{t.refreshEvent&&(t.refreshEvent.target.complete(),t.refreshEvent=null)})}catch{yield t.presentAlert({header:"Try again!",message:"Error loading reseravation",buttons:["OK"]})}})()}profilePicErrorHandler(e){e.target.src="../../../assets/img/profile-not-found.png"}presentAlert(e){var t=this;return(0,l.Z)(function*(){yield(yield t.alertController.create(e)).present()})()}static \u0275fac=function(t){return new(t||p)(n.Y36(g.F0),n.Y36(O.e),n.Y36(a.IN),n.Y36(d),n.Y36(U.g),n.Y36(I.V),n.Y36(a.Br))};static \u0275cmp=n.Xpm({type:p,selectors:[["app-home"]],decls:58,vars:13,consts:[["no-border","","no-shadow",""],["slot","start",2,"width","48px"],[1,"ion-text-center"],["slot","end"],[3,"click"],["slot","icon-only","name","settings-sharp"],[1,"ion-padding"],["slot","fixed","class","refresher-custom",3,"ionRefresh",4,"ngIf"],[1,"content"],[1,"row","profile"],[1,"col","avatar"],[3,"src","error"],[1,"col","welcome"],[1,"row","name"],[1,"row","description"],[1,"row","dashboard"],[1,"col"],["mode","ios"],["lines","none"],[1,"ion-no-padding"],["slot","start","color","success",4,"ngIf","ngIfElse"],["lines","none",4,"ngIf","ngIfElse"],[1,"action"],["fill","clear","routerLink","/booking","replaceUrl","true",3,"disabled","queryParams",4,"ngIf"],["slot","start","color","secondary",4,"ngIf","ngIfElse"],["elseLoadingCards",""],["elseLoadingBadge",""],["elseNoReminders",""],["slot","fixed",1,"refresher-custom",3,"ionRefresh"],["slot","start","color","success"],["button","","detail","false","class","ion-no-padding","routerLink","/booking","replaceUrl","true",3,"queryParams",4,"ngIf","ngIfElse"],["elseNoApprovedReservation",""],["button","","detail","false","routerLink","/booking","replaceUrl","true",1,"ion-no-padding",3,"queryParams"],["button","","detail","false",1,"ion-no-padding"],["fill","clear","routerLink","/booking","replaceUrl","true",3,"disabled","queryParams"],["slot","start","color","secondary"],["elseNoProcessedReservation",""],["detail","false",1,"ion-no-padding"],[2,"display","flex","flex-direction","column","gap","10px"],[2,"height","20px",3,"animated"],[2,"height","20px","width","40px",3,"animated"]],template:function(t,o){if(1&t&&(n.TgZ(0,"ion-header",0)(1,"ion-toolbar"),n._UZ(2,"div",1),n.TgZ(3,"ion-title",2),n._uU(4,"Home"),n.qZA(),n.TgZ(5,"ion-buttons",3)(6,"ion-button",4),n.NdJ("click",function(){return o.onShowSettings()}),n._UZ(7,"ion-icon",5),n.qZA()()()(),n.TgZ(8,"ion-content",6),n.YNc(9,w,2,0,"ion-refresher",7),n.TgZ(10,"div",8)(11,"div",9)(12,"div",10)(13,"ion-avatar")(14,"img",11),n.NdJ("error",function(c){return o.profilePicErrorHandler(c)}),n.qZA()()(),n.TgZ(15,"div",12)(16,"div",13)(17,"h2"),n._uU(18),n.qZA()(),n.TgZ(19,"div",14)(20,"h3"),n._uU(21,"What can we help you with today?"),n.qZA()()()(),n.TgZ(22,"div",15)(23,"div",16)(24,"ion-card",17)(25,"ion-card-header")(26,"ion-list",18)(27,"ion-item",19)(28,"ion-label")(29,"h3")(30,"strong"),n._uU(31,"Approved reservation"),n.qZA()()(),n.YNc(32,E,2,1,"ion-badge",20),n.qZA()()(),n.TgZ(33,"ion-card-content"),n.YNc(34,J,4,2,"ion-list",21),n.qZA(),n.TgZ(35,"div",22),n.YNc(36,L,2,3,"ion-button",23),n.qZA()()()(),n.TgZ(37,"div",15)(38,"div",16)(39,"ion-card",17)(40,"ion-card-header")(41,"ion-list",18)(42,"ion-item",19)(43,"ion-label")(44,"h3")(45,"strong"),n._uU(46,"Ongoing"),n.qZA()()(),n.YNc(47,Y,2,1,"ion-badge",24),n.qZA()()(),n.TgZ(48,"ion-card-content"),n.YNc(49,Q,4,2,"ion-list",21),n.qZA(),n.TgZ(50,"div",22),n.YNc(51,k,2,3,"ion-button",23),n.qZA()()()()()(),n.YNc(52,W,13,5,"ng-template",null,25,n.W1O),n.YNc(54,B,1,1,"ng-template",null,26,n.W1O),n.YNc(56,F,5,0,"ng-template",null,27,n.W1O)),2&t){const s=n.MAs(53),c=n.MAs(55);n.xp6(9),n.Q6J("ngIf",!o.isLoading),n.xp6(5),n.Q6J("src",o.user.userProfilePic,n.LSH),n.xp6(4),n.hij("Hi, ",o.user.firstName,"!"),n.xp6(14),n.Q6J("ngIf",!o.isLoading)("ngIfElse",c),n.xp6(2),n.Q6J("ngIf",!o.isLoading)("ngIfElse",s),n.xp6(2),n.Q6J("ngIf",o.totalApproved>0),n.xp6(11),n.Q6J("ngIf",!o.isLoading)("ngIfElse",c),n.xp6(2),n.Q6J("ngIf",!o.isLoading)("ngIfElse",s),n.xp6(2),n.Q6J("ngIf",o.totalProcessed>0)}},dependencies:[u.O5,a.BJ,a.yp,a.YG,a.Sm,a.PM,a.FN,a.Zi,a.W2,a.Gu,a.gu,a.Ie,a.Q$,a.q_,a.nJ,a.Wo,a.CK,a.wd,a.sr,a.YI,g.rH,u.uU],styles:["ion-header[_ngcontent-%COMP%]:after{background-image:none}.content[_ngcontent-%COMP%]{display:flex;flex-direction:column}.content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-grow:1}.content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%]{display:flex;flex-direction:column}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]{margin-top:10px}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]{display:flex;padding:5px;margin-right:14px}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%]{width:103px;height:103px}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{object-position:center;object-fit:contain;box-shadow:0 0 10px #7a7a7a75}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]{flex-grow:1;display:flex;flex-direction:column;row-gap:11px}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-end}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{font-weight:700;color:#000;letter-spacing:0px;line-height:1.2;margin:0}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start}.content[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{margin:0;color:#000;letter-spacing:0px;line-height:1.2}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]{margin-top:20px;display:flex;row-gap:20px;flex-direction:column}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card{margin:0}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card .reminder-list{gap:10px}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-list ion-thumbnail{width:40px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-list ion-thumbnail img{object-fit:contain!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label{text-overflow:unset;white-space:unset;overflow:unset}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h1, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h2, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h3, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h4, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label h5, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label span, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label p{display:-webkit-box;max-width:100%;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .title{margin-bottom:5px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .desc{font-size:15px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .title, .content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .desc{line-height:1;-webkit-line-clamp:2!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .sched{display:flex;flex-direction:row;align-items:center;gap:10px;margin-top:10px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .sched ion-icon{font-size:2em!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .sched .details{display:flex;flex-direction:column}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-label .sched .details span{font-size:15px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card   ion-card-header ion-item .item-native{padding-left:0!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card   ion-card-header ion-item ion-label *{margin:0!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-card-content ion-item ion-label{margin:8px!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card ion-card-content ion-item ion-label *{margin:0!important}.content[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%]     ion-card .action{display:flex;flex-direction:column;align-items:flex-end}"]})}const j=[{path:"",component:p}];class m{static \u0275fac=function(t){return new(t||m)};static \u0275mod=n.oAB({type:m});static \u0275inj=n.cJS({imports:[g.Bz.forChild(j),g.Bz]})}var z=r(5457);class f{static \u0275fac=function(t){return new(t||f)};static \u0275mod=n.oAB({type:f});static \u0275inj=n.cJS({imports:[u.ez,P.u5,a.Pc,m,z.q]})}}}]);