"use strict";(self.webpackChunkec_admin_webui=self.webpackChunkec_admin_webui||[]).push([[371],{3371:function(e,a,s){s.r(a),s.d(a,{default:function(){return h}});var i=s(5671),l=s(3144),t=s(9340),c=s(5716),n=s(2791),o=s(8890),r=s.n(o),d=s(184),h=function(e){(0,t.Z)(s,e);var a=(0,c.Z)(s);function s(e){var l;return(0,i.Z)(this,s),(l=a.call(this,e)).state={basicProfile:{firstName:{change:!1,value:""},lastName:{change:!1,value:""},geId:{change:!1,value:""},mobile:{change:!1,value:""},city:{change:!1,value:""},country:{change:!1,value:""}},validBasicProfile:!0,copyBasicProfile:{firstName:"",lastName:"",geId:"",mobile:"",city:"",country:""},notifications:{notifications_email:!1,notifications_text:!1,notifications_phone:!1,messages_email:!1,messages_text:!1}},l}return(0,l.Z)(s,[{key:"componentDidMount",value:function(){r()((function(){r()(".field-wrapper .field-placeholder").on("click",(function(){r()(this).closest(".field-wrapper").find("input").focus(),r()(this).closest(".field-wrapper").find("input").val()?r()(this).closest(".field-wrapper").addClass("hasValue"):r()(this).closest(".field-wrapper").removeClass("hasValue")})),r()(".field-wrapper input").on("keyup",(function(){r().trim(r()(this).val())?r()(this).closest(".field-wrapper").addClass("hasValue"):r()(this).closest(".field-wrapper").removeClass("hasValue")}))}));var e="Bryan",a="Shaw",s="bryan.shaw@ge.com",i="+113120312",l="Nevada",t="US",c=Object.assign({},this.state.basicProfile),n=Object.assign({},this.state.copyBasicProfile);n.firstName=e,c.firstName.value=e,c.firstName.change=!1,n.lastName=a,c.lastName.value=a,c.lastName.change=!1,n.geId=s,c.geId.value=s,c.geId.change=!1,n.mobile=i,c.mobile.value=i,c.mobile.change=!1,n.city=l,c.city.value=l,c.city.change=!1,n.country=t,c.country.value=t,c.country.change=!1,this.setState({basicProfile:c,copyBasicProfile:n});var o=!1,d=!0,h=!0,m=!1,u=!1,f=Object.assign({},this.state.notifications);f.notifications_email=o,f.notifications_text=d,f.notifications_phone=h,f.messages_email=m,f.messages_text=u,this.setState({notifications:f})}},{key:"handlePlaceholder",value:function(e){var a=e.target.id,s=Object.assign({},this.state.basicProfile),i=this.state.basicProfile,l=e.target.value;"firstName"===a?(s.firstName.change=!0,s.firstName.value="undefined"!==typeof l?e.target.value:i.firstName.value):s.firstName.value=i.firstName.value,"lastName"===a?(s.lastName.change=!0,s.lastName.value="undefined"!==typeof l?e.target.value:i.lastName.value):s.lastName.value=i.lastName.value,"geId"===a?(s.geId.change=!0,s.geId.value="undefined"!==typeof l?e.target.value:i.geId.value):s.geId.value=i.geId.value,"mobile"===a?(s.mobile.change=!0,s.mobile.value="undefined"!==typeof l?e.target.value:i.mobile.value):s.mobile.value=i.mobile.value,"city"===a?(s.city.change=!0,s.city.value="undefined"!==typeof l?e.target.value:i.city.value):s.city.value=i.city.value,"country"===a?(s.country.change=!0,s.country.value="undefined"!==typeof l?e.target.value:i.country.value):s.country.value=i.country.value,this.setState({basicProfile:s}),this.validationBasicProfile()}},{key:"validationBasicProfile",value:function(){var e=!0,a=this.state.basicProfile;""!==a.firstName.value&&""!==a.lastName.value&&""!==a.mobile.value&&""!==a.geId.value&&""!==a.city.value&&""!==a.country.value||(e=!1),this.setState({validBasicProfile:e})}},{key:"SaveSetting",value:function(e){console.log(this.state.basicProfile),console.log(e.target)}},{key:"handleNotification",value:function(e){var a="checkbox"===e.target.type?e.target.checked:e.target.value,s=e.target.name,i=Object.assign({},this.state.notifications);"notifications_email"===s&&(i.notifications_email=a),"notifications_text"===s&&(i.notifications_text=a),"notifications_phone"===s&&(i.notifications_phone=a),"messages_email"===s&&(i.messages_email=a),"messages_text"===s&&(i.messages_text=a),this.setState({notifications:i}),console.log(this.state.notifications)}},{key:"saveNotifications",value:function(e){console.log(this.state.notifications)}},{key:"render",value:function(){var e=this;return(0,d.jsx)("div",{className:"UserManagement",children:(0,d.jsxs)("div",{className:"row mt-1",children:[(0,d.jsx)("div",{className:"col-sm-4",children:(0,d.jsx)("div",{className:"card",children:(0,d.jsx)("ul",{className:"list-group list-group-flush",children:(0,d.jsx)("li",{className:"list-group-item",children:(0,d.jsxs)("div",{className:"row executeModal",children:[(0,d.jsxs)("div",{className:"col-sm-6",children:[(0,d.jsx)("h5",{children:this.state.copyBasicProfile.firstName+" "+this.state.copyBasicProfile.lastName}),(0,d.jsx)("label",{className:"control-label ml-2",children:this.state.copyBasicProfile.city+","+this.state.copyBasicProfile.country}),(0,d.jsx)("label",{className:"control-label ml-2",children:"4:32PM (GMT-4)"})]}),(0,d.jsx)("div",{className:"col-sm-6",children:(0,d.jsx)("img",{src:"https://avatars.dicebear.com/v2/identicon/"+this.state.copyBasicProfile.firstName+".svg",className:"rounded-circle",alt:"Profile",width:"130",height:"130"})})]})})})})}),(0,d.jsxs)("div",{className:"col-sm-8",children:[(0,d.jsx)("div",{className:"row",children:(0,d.jsx)("div",{className:"card",children:(0,d.jsx)("form",{children:(0,d.jsxs)("ul",{className:"list-group list-group-flush",children:[(0,d.jsx)("li",{className:"list-group-item",children:(0,d.jsx)("div",{className:"row ",children:(0,d.jsx)("div",{className:"col-sm-12",children:(0,d.jsxs)("h6",{className:"font-weight-bold mt-1 text-left",children:["Basic Profile",(0,d.jsx)("small",{children:"\xa0\xa0\xa0\xa0The information can be edited from your profile page."})]})})})}),(0,d.jsxs)("li",{className:"list-group-item",children:[(0,d.jsxs)("div",{className:"row ",children:[(0,d.jsxs)("div",{className:"col-sm-4",children:[(0,d.jsxs)("div",{className:"field-wrapper",children:[(0,d.jsx)("input",{type:"text",name:"firstName",id:"firstName",value:this.state.basicProfile.firstName.value,className:"form-control form-control-sm",onChange:function(a){e.handlePlaceholder(a)}}),(0,d.jsx)("div",{className:"field-placeholder",id:"firstName",onClick:function(a){e.handlePlaceholder(a)},children:(0,d.jsx)("span",{id:"firstName",onClick:function(a){e.handlePlaceholder(a)},children:!0===this.state.basicProfile.firstName.change?"First Name":this.state.basicProfile.firstName.value})})]}),""===this.state.basicProfile.firstName.value?(0,d.jsx)("small",{className:"text-default",children:"Please specify the first name"}):null]}),(0,d.jsxs)("div",{className:"col-sm-4",children:[(0,d.jsxs)("div",{className:"field-wrapper",children:[(0,d.jsx)("input",{type:"text",name:"lastName",id:"lastName",value:this.state.basicProfile.lastName.value,className:"form-control form-control-sm",onChange:function(a){e.handlePlaceholder(a)}}),(0,d.jsx)("div",{className:"field-placeholder",id:"lastName",onClick:function(a){e.handlePlaceholder(a)},children:(0,d.jsx)("span",{id:"lastName",onClick:function(a){e.handlePlaceholder(a)},children:!0===this.state.basicProfile.lastName.change?"Last Name":this.state.basicProfile.lastName.value})})]}),""===this.state.basicProfile.lastName.value?(0,d.jsx)("small",{className:"text-default",children:"Please specify the last name"}):null]})]}),(0,d.jsxs)("div",{className:"row",children:[(0,d.jsxs)("div",{className:"col-sm-4",children:[(0,d.jsxs)("div",{className:"field-wrapper",children:[(0,d.jsx)("input",{type:"text",name:"geId",id:"geId",value:this.state.basicProfile.geId.value,className:"form-control form-control-sm",onChange:function(a){e.handlePlaceholder(a)}}),(0,d.jsx)("div",{className:"field-placeholder",id:"geId",onClick:function(a){e.handlePlaceholder(a)},children:(0,d.jsx)("span",{id:"geId",onClick:function(a){e.handlePlaceholder(a)},children:!0===this.state.basicProfile.geId.change?"GE Id":this.state.basicProfile.geId.value})})]}),""===this.state.basicProfile.geId.value?(0,d.jsx)("small",{children:"Please specify the GE Id"}):null]}),(0,d.jsxs)("div",{className:"col-sm-4",children:[(0,d.jsxs)("div",{className:"field-wrapper",children:[(0,d.jsx)("input",{type:"text",name:"mobile",id:"mobile",value:this.state.basicProfile.mobile.value,className:"form-control form-control-sm",onChange:function(a){e.handlePlaceholder(a)}}),(0,d.jsx)("div",{className:"field-placeholder",id:"mobile",onClick:function(a){e.handlePlaceholder(a)},children:(0,d.jsx)("span",{id:"mobile",onClick:function(a){e.handlePlaceholder(a)},children:!0===this.state.basicProfile.mobile.change?" Mobile No.":this.state.basicProfile.mobile.value})})]}),""===this.state.basicProfile.mobile.value?(0,d.jsx)("small",{children:"Please specify the Mobile No."}):null]})]}),(0,d.jsxs)("div",{className:"row",children:[(0,d.jsxs)("div",{className:"col-sm-4",children:[(0,d.jsxs)("div",{className:"field-wrapper",children:[(0,d.jsx)("input",{type:"text",name:"city",id:"city",value:this.state.basicProfile.city.value,className:"form-control form-control-sm",onChange:function(a){e.handlePlaceholder(a)}}),(0,d.jsx)("div",{className:"field-placeholder",id:"city",onClick:function(a){e.handlePlaceholder(a)},children:(0,d.jsx)("span",{id:"city",onClick:function(a){e.handlePlaceholder(a)},children:!0===this.state.basicProfile.city.change?"City":this.state.basicProfile.city.value})})]}),""===this.state.basicProfile.city.value?(0,d.jsx)("small",{children:"Please specify the City"}):null]}),(0,d.jsxs)("div",{className:"col-sm-4",children:[(0,d.jsxs)("div",{className:"field-wrapper",children:[(0,d.jsx)("input",{type:"text",name:"country",id:"country",value:this.state.basicProfile.country.value,className:"form-control form-control-sm",onChange:function(a){e.handlePlaceholder(a)}}),(0,d.jsx)("div",{className:"field-placeholder",id:"country",onClick:function(a){e.handlePlaceholder(a)},children:(0,d.jsx)("span",{id:"country",onClick:function(a){e.handlePlaceholder(a)},children:!0===this.state.basicProfile.country.change?"Country":this.state.basicProfile.country.value})})]}),""===this.state.basicProfile.country.value?(0,d.jsx)("small",{children:"Please specify the Contry"}):null]}),(0,d.jsx)("div",{className:"col-sm-4",children:(0,d.jsx)("button",{type:"button",className:"btn customize-user-btn btn-sm",disabled:!this.state.validBasicProfile,onClick:function(a){e.SaveSetting(a)},children:"Save Setting"})})]})]})]})})})}),(0,d.jsx)("div",{className:"row my-2",children:(0,d.jsx)("div",{className:"card",children:(0,d.jsx)("form",{children:(0,d.jsxs)("ul",{className:"list-group list-group-flush",children:[(0,d.jsx)("li",{className:"list-group-item",children:(0,d.jsx)("div",{className:"row",children:(0,d.jsx)("div",{className:"col-sm-12",children:(0,d.jsxs)("h6",{className:"font-weight-bold ml-2 text-left",children:["Licensing",(0,d.jsx)("small",{children:"\xa0\xa0\xa0\xa0Manage the Licenses and subscriptions"})]})})})}),(0,d.jsxs)("li",{className:"list-group-item",children:[(0,d.jsxs)("div",{className:"row",children:[(0,d.jsx)("div",{className:"col-sm-4",children:(0,d.jsx)("h6",{className:"font-weight-bold ml-2 float-left",children:"Licenses"})}),(0,d.jsx)("div",{className:"col-sm-4 checkbox text-left",children:"You have 3 Licenses"})]}),(0,d.jsxs)("div",{className:"row",children:[(0,d.jsx)("div",{className:"col-sm-4",children:(0,d.jsx)("h6",{className:"font-weight-bold ml-2 float-left",children:"Subsciptions"})}),(0,d.jsx)("div",{className:"col-sm-4 checkbox text-left",children:"You have 5 Subsciptions"})]})]})]})})})})]})]})})}}]),s}(n.Component)}}]);
//# sourceMappingURL=371.2706f8c9.chunk.js.map