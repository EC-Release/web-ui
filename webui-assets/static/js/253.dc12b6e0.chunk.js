"use strict";(self.webpackChunkec_admin_webui=self.webpackChunkec_admin_webui||[]).push([[253,762],{1905:function(e,s,t){t(2791);s.Z=t.p+"static/media/icon_greensortingdown.31d2161218970ff2041dbc045ec6fafd.svg"},1374:function(e,s,t){t(2791);s.Z=t.p+"static/media/info.fd0d6b5eec47006a284eaaaff6390e46.svg"},994:function(e,s,t){t.d(s,{Z:function(){return p}});var a=t(5671),r=t(3144),i=t(9340),n=t(5716),o=t(2791),l=t(8890),c=t.n(l),d=t(1905),m=t(1374),u=t(184),p=function(e){(0,i.Z)(t,e);var s=(0,n.Z)(t);function t(e){var r;return(0,a.Z)(this,t),(r=s.call(this,e)).state={subscriptionForm:{licenseId:{value:"",dirtyState:!1},emailAddress:{value:"",dirtyState:!1},sso:{value:"",dirtyState:!1},date:{value:"",dirtyState:!1},desc:{value:"",dirtyState:!1},username:{value:"",dirtyState:!1},key:"",parent:"",name:""},errorsSubscriptionForm:{},subscriptionFormIsValid:!1,confidentialities:[{name:"True",id:"true"},{name:"False",id:"false"}],environments:[{name:"DEV",id:"DEV"},{name:"TEST",id:"TEST"},{name:"STAGE",id:"STAGE"},{name:"PROD",id:"PROD"}],optInoptOuts:[{name:"True",id:"true"},{name:"False",id:"false"}],preserves:[{name:"True",id:"true"},{name:"False",id:"false"}]},r}return(0,r.Z)(t,[{key:"enableToolTip",value:function(){setTimeout((function(){c()('[data-toggle="popover"]').popover()}),1e3)}},{key:"componentDidMount",value:function(){var e=Object.assign({},this.props.editItemData),s={date:{value:e.date,dirtyState:!1},licenseId:{value:e.licenseId,dirtyState:!1},emailAddress:{value:e.emailAddress,dirtyState:!1},desc:{value:e.desc,dirtyState:!1},username:{value:e.username,dirtyState:!1},sso:{value:e.sso,dirtyState:!1},key:e.key,parent:e.parent,name:e.name};this.setState({subscriptionForm:s}),this.enableToolTip();var t=this;setTimeout((function(){t.handleFormValidation()}),1e3)}},{key:"editSubscription",value:function(){var e=this;this.props.showGlobalMessage(!0,!0,"Please wait...","custom-success");var s=Object.assign({},this.state.subscriptionForm),t={};t.licenseId=s.licenseId.value,t.emailAddress=s.emailAddress.value,t.username=s.username.value,t.desc=s.desc.value,t.sso=s.sso.value,t.date=s.date.value,t.parent=s.parent,t.name=s.name,console.log(t),fetch(this.props.baseUrl+s.key,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.props.authToken},body:JSON.stringify(t)}).then((function(t){200===t.status?t.json().then((function(t){e.props.showGlobalMessage(!1,!0,"Record saved successfully","custom-success"),e.props.handleDataTable(!0),setTimeout((function(){e.props.hideGlobalMessage()}),2e3);var a=JSON.parse(sessionStorage.getItem("snapshotData")),r=[];Object.keys(a).forEach((function(e){r.push(a[e])})),r.forEach((function(e,t){e.parent&&e.key===s.key&&(e.licenseId=s.licenseId.value,e.emailAddress=s.emailAddress.value,e.username=s.username.value,e.desc=s.desc.value,e.sso=s.sso.value,e.date=s.date.value,e.parent=s.parent,e.name=s.name)})),sessionStorage.setItem("snapshotData",JSON.stringify(r))})):(e.props.showGlobalMessage(!0,!0,"Please try after sometime","custom-danger"),setTimeout((function(){e.props.hideGlobalMessage()}),2e3))})).catch((function(s){console.log(s),e.props.showGlobalMessage(!0,!0,"Please try after sometime","custom-danger"),setTimeout((function(){e.props.hideGlobalMessage()}),2e3)}))}},{key:"handleFormValidation",value:function(){var e=this.state.subscriptionForm,s=e.emailAddress.value,t=e.emailAddress.dirtyState,a=e.username.value,r=e.username.dirtyState,i=e.date.value,n=e.date.dirtyState,o=!0,l={};""===s.trim()&&(t&&(l.emailAddress="Please enter Email Address"),o=!1),""===a.trim()&&(r&&(l.username="Please enter Username"),o=!1),""===i.trim()&&(n&&(l.date="Please enter Expiry Date"),o=!1),this.setState({subscriptionFormIsValid:o,errorsSubscriptionForm:l})}},{key:"handleFormData",value:function(e){var s=e.target.name,t="checkbox"===e.target.type?e.target.checked:e.target.value,a=Object.assign({},this.state.subscriptionForm);"licenseId"===s?(a.licenseId.value=t,a.licenseId.dirtyState=!0):"emailAddress"===s?(a.emailAddress.value=t,a.emailAddress.dirtyState=!0):"sso"===s?(a.sso.value=t,a.sso.dirtyState=!0):"date"===s?(a.date.value=t,a.date.dirtyState=!0):"desc"===s?(a.desc.value=t,a.desc.dirtyState=!0):"username"===s&&(a.username.value=t,a.username.dirtyState=!0),this.setState({subscriptionForm:a}),this.handleFormValidation()}},{key:"showHideField",value:function(e,s,t){var a=Object.assign({},this.state.subscriptionForm);"password"===a[t].type?a[t].type="text":a[t].type="password",this.setState({subscriptionForm:a})}},{key:"render",value:function(){var e=this;return(0,u.jsx)("div",{className:"row Subscriptioncreate",children:(0,u.jsx)("div",{className:"col-md-12 mt-2",children:(0,u.jsx)("div",{className:"centered-div",children:(0,u.jsxs)("div",{className:"centered-div-header",children:[(0,u.jsx)("div",{className:"row maintainagentcreate-header",children:(0,u.jsx)("div",{className:"col-md-12",children:this.props.isViewOnly?(0,u.jsxs)("h6",{id:"maintainsubscriptioncreate-title",children:["View Subscription ",(0,u.jsx)("small",{children:"View parameters."})]}):(0,u.jsxs)("h6",{id:"maintainsubscriptioncreate-title",children:["Edit Subscription ",(0,u.jsx)("small",{children:"Creating parameters."})]})})}),(0,u.jsx)("hr",{}),(0,u.jsxs)("div",{className:"changeable-form subscription-form",children:[(0,u.jsxs)("div",{className:"row",children:[(0,u.jsxs)("div",{className:"col-sm-6",children:[(0,u.jsxs)("div",{className:"col-sm-12 label required",children:["License ID",(0,u.jsx)("img",{alt:"down-arrow",src:d.Z}),(0,u.jsx)("span",{className:"float-right help-text",children:(0,u.jsx)("img",{alt:"info",src:m.Z,"data-toggle":"popover","data-trigger":"hover","data-placement":"top","data-content":this.props.helpText.licenseId})})]}),(0,u.jsxs)("div",{className:"col-sm-12 mb-2",children:[(0,u.jsx)("input",{type:"text",className:"form-control form-control-sm",name:"licenseId",readOnly:!0,value:this.state.subscriptionForm.licenseId.value}),(0,u.jsx)("small",{className:"text-danger",children:this.state.errorsSubscriptionForm.licenseId})]})]}),(0,u.jsxs)("div",{className:"col-sm-6",children:[(0,u.jsxs)("div",{className:"col-sm-12 label required",children:["Expiry Date/Time",(0,u.jsx)("img",{alt:"down-arrow",src:d.Z}),(0,u.jsx)("span",{className:"float-right help-text",children:(0,u.jsx)("img",{alt:"info",src:m.Z,"data-toggle":"popover","data-trigger":"hover","data-placement":"top","data-content":this.props.helpText.expdate})})]}),(0,u.jsxs)("div",{className:"col-sm-12 mb-2",children:[(0,u.jsx)("input",{type:"text",className:"form-control form-control-sm",name:"date",disabled:this.props.isViewOnly,value:this.state.subscriptionForm.date.value,onChange:function(s){e.handleFormData(s)}}),(0,u.jsx)("small",{className:"text-danger",children:this.state.errorsSubscriptionForm.date})]})]})]}),(0,u.jsxs)("div",{className:"row",children:[(0,u.jsxs)("div",{className:"col-sm-6",children:[(0,u.jsxs)("div",{className:"col-sm-12 label required",children:["Email Address",(0,u.jsx)("img",{alt:"down-arrow",src:d.Z}),(0,u.jsx)("span",{className:"float-right help-text",children:(0,u.jsx)("img",{alt:"info",src:m.Z,"data-toggle":"popover","data-trigger":"hover","data-placement":"top","data-content":this.props.helpText.emailAddress})})]}),(0,u.jsxs)("div",{className:"col-sm-12 mb-2",children:[(0,u.jsx)("input",{type:"text",className:"form-control form-control-sm",name:"emailAddress",disabled:this.props.isViewOnly,value:this.state.subscriptionForm.emailAddress.value,onChange:function(s){e.handleFormData(s)}}),(0,u.jsx)("small",{className:"text-danger",children:this.state.errorsSubscriptionForm.emailAddress})]})]}),(0,u.jsxs)("div",{className:"col-sm-6",children:[(0,u.jsxs)("div",{className:"col-sm-12 label required",children:["SSO",(0,u.jsx)("img",{alt:"down-arrow",src:d.Z}),(0,u.jsx)("span",{className:"float-right help-text",children:(0,u.jsx)("img",{alt:"info",src:m.Z,"data-toggle":"popover","data-trigger":"hover","data-placement":"top","data-content":this.props.helpText.sso})})]}),(0,u.jsxs)("div",{className:"col-sm-12 mb-2",children:[(0,u.jsx)("input",{type:"text",className:"form-control form-control-sm",name:"sso",disabled:this.props.isViewOnly,value:this.state.subscriptionForm.sso.value,onChange:function(s){e.handleFormData(s)}}),(0,u.jsx)("small",{className:"text-danger",children:this.state.errorsSubscriptionForm.sso})]})]})]}),(0,u.jsxs)("div",{className:"row",children:[(0,u.jsxs)("div",{className:"col-sm-6",children:[(0,u.jsxs)("div",{className:"col-sm-12 label required",children:["User Fullname",(0,u.jsx)("img",{alt:"down-arrow",src:d.Z}),(0,u.jsx)("span",{className:"float-right help-text",children:(0,u.jsx)("img",{alt:"info",src:m.Z,"data-toggle":"popover","data-trigger":"hover","data-placement":"top","data-content":this.props.helpText.username})})]}),(0,u.jsxs)("div",{className:"col-sm-12 mb-2",children:[(0,u.jsx)("input",{type:"text",className:"form-control form-control-sm",name:"username",disabled:this.props.isViewOnly,value:this.state.subscriptionForm.username.value,onChange:function(s){e.handleFormData(s)}}),(0,u.jsx)("small",{className:"text-danger",children:this.state.errorsSubscriptionForm.username})]})]}),(0,u.jsxs)("div",{className:"col-sm-6",children:[(0,u.jsxs)("div",{className:"col-sm-12 label required",children:["Description",(0,u.jsx)("img",{alt:"down-arrow",src:d.Z}),(0,u.jsx)("span",{className:"float-right help-text",children:(0,u.jsx)("img",{alt:"info",src:m.Z,"data-toggle":"popover","data-trigger":"hover","data-placement":"top","data-content":this.props.helpText.desc})})]}),(0,u.jsxs)("div",{className:"col-sm-12 mb-2",children:[(0,u.jsx)("input",{type:"text",className:"form-control form-control-sm",name:"desc",disabled:this.props.isViewOnly,value:this.state.subscriptionForm.desc.value,onChange:function(s){e.handleFormData(s)}}),(0,u.jsx)("small",{className:"text-danger",children:this.state.errorsSubscriptionForm.desc})]})]})]}),(0,u.jsx)("div",{className:"row",children:(0,u.jsxs)("div",{className:"col-sm-12 mb-2 text-center",children:[this.props.isViewOnly?null:(0,u.jsx)("button",{id:"create-subscription-btn",disabled:!this.state.subscriptionFormIsValid,onClick:this.editSubscription.bind(this),className:"btn btn-sm customize-view-btn",children:"EDIT LICENSE"}),(0,u.jsx)("button",{onClick:this.props.changeView.bind(this),className:"btn btn-sm customize-view-btn ml-2",children:"BACK"})]})})]})]})})})})}}]),t}(o.Component)},907:function(e,s,t){function a(e,s){(null==s||s>e.length)&&(s=e.length);for(var t=0,a=new Array(s);t<s;t++)a[t]=e[t];return a}t.d(s,{Z:function(){return a}})},7762:function(e,s,t){t.d(s,{Z:function(){return r}});var a=t(181);function r(e,s){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=(0,a.Z)(e))||s&&e&&"number"===typeof e.length){t&&(e=t);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,o=!0,l=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return o=e.done,e},e:function(e){l=!0,n=e},f:function(){try{o||null==t.return||t.return()}finally{if(l)throw n}}}}},2982:function(e,s,t){t.d(s,{Z:function(){return i}});var a=t(907);var r=t(181);function i(e){return function(e){if(Array.isArray(e))return(0,a.Z)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,r.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},181:function(e,s,t){t.d(s,{Z:function(){return r}});var a=t(907);function r(e,s){if(e){if("string"===typeof e)return(0,a.Z)(e,s);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?(0,a.Z)(e,s):void 0}}}}]);
//# sourceMappingURL=253.dc12b6e0.chunk.js.map