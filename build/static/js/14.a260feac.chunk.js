(this["webpackJsonpec-admin-webui"]=this["webpackJsonpec-admin-webui"]||[]).push([[14,21],{33:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"a",(function(){return n}))},34:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(33);function s(e,t){if(e){if("string"===typeof e)return Object(n.a)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(n.a)(e,t):void 0}}},35:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(34);function s(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=Object(n.a)(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,i,r=!0,o=!1;return{s:function(){s=e[Symbol.iterator]()},n:function(){var e=s.next();return r=e.done,e},e:function(e){o=!0,i=e},f:function(){try{r||null==s.return||s.return()}finally{if(o)throw i}}}}},36:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(33);var s=a(34);function i(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(s.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},38:function(e,t,a){e.exports=a.p+"static/media/icondelete_tablemaintainmonitor.ba23f6b1.svg"},75:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return v}));var n=a(36),s=a(35),i=a(2),r=a(3),o=a(5),l=a(4),c=a(0),u=a.n(c),d=a(1),b=a.n(d),m=a(38),p=a.n(m),f=a(6),h=a.n(f),v=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={tableData:[],newTableData:[],viewTable:!0,editItemData:{},searchString:"",showTableInit:!1},n}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.handleDataTable(!1)}},{key:"handleDataTable",value:function(e){var t=this,a=[];fetch("https://reqres.in/api/users/2",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.props.authToken}}).then((function(n){if(200===n.status){var i=[{timestamp:"12/19/2020 T19:00:00",noOfGateway:"2",status:"pending"},{timestamp:"02/20/2021 T10:00:00",noOfGateway:"2",status:"Success"}];if(null===i&&(i=[]),i.length>0){var r,o=Object(s.a)(i);try{for(o.s();!(r=o.n()).done;){var l=r.value;a.push(l)}}catch(c){o.e(c)}finally{o.f()}}t.generateTableStructure(a,e),t.setState({tableData:a})}else t.props.showGlobalMessage(!0,!0,"Please try after sometime","custom-danger"),setTimeout((function(){t.props.hideGlobalMessage()}),2e3)})).catch((function(e){console.log(e),t.props.showGlobalMessage(!0,!0,"Please try after sometime","custom-danger"),setTimeout((function(){t.props.hideGlobalMessage()}),2e3)}))}},{key:"initTable",value:function(e,t){var a;a=b()("#subscriptionupgradeTableDiv")[0].offsetWidth-200,b()("#"+e).DataTable({dom:'rt<"bottom"lp>',bSort:!0,scrollX:!0,language:{paginate:{previous:"<",next:">"}},createdRow:function(e,t,n){for(var s=0;s<t.length;s++)b()("td:eq("+s+")",e).css("min-width",a/t.length+"px")},pageLength:5,stateSave:t,destroy:!0,fnDrawCallback:function(e){e.aiDisplay.length<=5?b()(".dataTables_paginate").hide():b()(".dataTables_paginate").show()}}),b()(".bottom").addClass("row"),b()(".dataTables_length").addClass("col-sm-6"),b()(".dataTables_paginate").addClass("col-sm-6")}},{key:"generateTableStructure",value:function(e,t){var a,n=this,i=e,r=[],o=Object(s.a)(i);try{for(o.s();!(a=o.n()).done;){var l=a.value,c={};c.timestamp=l.timestamp,c.noOfGateway=l.noOfGateway,c.status=l.status,r.push(c)}}catch(u){o.e(u)}finally{o.f()}this.setState({newTableData:r,showTableInit:!0}),setTimeout((function(){n.initTable("subscriptionupgradeTable",t)}),100)}},{key:"showHideTableTdData",value:function(e,t){var a=Object(n.a)(this.state.newTableData),s=Object.assign({},a[e]);if("subscriptionId"===t){var i=s.subscriptionId;s.subscriptionId=s.subscriptionIdHidden,s.subscriptionIdHidden=i,s.subscriptionIdHiddenFlag=!s.subscriptionIdHiddenFlag,a[e]=s}else if("serviceUri"===t){var r=s.serviceUri;s.serviceUri=s.serviceUriHidden,s.serviceUriHidden=r,s.serviceUriHiddenFlag=!s.serviceUriHiddenFlag,a[e]=s}else if("subscriptionName"===t){var o=s.subscriptionName;s.subscriptionName=s.subscriptionNameHidden,s.subscriptionNameHidden=o,s.subscriptionNameHiddenFlag=!s.subscriptionNameHiddenFlag,a[e]=s}else if("uaaUrl"===t){var l=s.uaaUrl;s.uaaUrl=s.uaaUrlHidden,s.uaaUrlHidden=l,s.uaaUrlHiddenFlag=!s.uaaUrlHiddenFlag,a[e]=s}this.setState({newTableData:a})}},{key:"filterByValue",value:function(e,t){for(var a=[],n=0;n<e.length;n++)(e[n].timestamp.includes(t.toLowerCase())||e[n].noOfGateway.includes(t.toLowerCase())||e[n].status.toLowerCase().includes(t.toLowerCase()))&&a.push(e[n]);return a}},{key:"destroyDataTable",value:function(e){b()("#"+e).DataTable().destroy()}},{key:"filterData",value:function(e){var t=this;this.destroyDataTable("subscriptionupgradeTable");var a=e.target.value.trim(),i=e.target.value,r=Object(n.a)(this.state.tableData),o=[],l=[];o=""!==a?this.filterByValue(r,a):r;var c,u=Object(s.a)(o);try{for(u.s();!(c=u.n()).done;){var d=c.value,b={};b.timestamp=d.timestamp,b.noOfGateway=d.noOfGateway,b.status=d.status,l.push(b)}}catch(m){u.e(m)}finally{u.f()}this.setState({newTableData:l,searchString:i}),setTimeout((function(){t.initTable("subscriptionupgradeTable",!1)}),0)}},{key:"edit",value:function(e){var t=Object.assign({},e);t.subscriptionIdHiddenFlag&&(t.subscriptionId=t.subscriptionIdHidden),t.serviceUriHiddenFlag&&(t.serviceUri=t.serviceUriHidden),t.subscriptionNameHiddenFlag&&(t.subscriptionName=t.subscriptionNameHidden),t.uaaUrlHiddenFlag&&(t.uaaUrl=t.uaaUrlHidden),this.destroyDataTable("subscriptionupgradeTable"),this.setState({editItemData:t,viewTable:!1})}},{key:"removeDataTableRow",value:function(e,t){b()("#"+e).DataTable().row("#"+e+"TbodyTr_"+t).remove().draw(!1)}},{key:"deleteData",value:function(e,t){var a=this;if(window.confirm("Are you sure you want to delete")){var n=e.subscriptionId;e.subscriptionIdHiddenFlag&&(n=e.subscriptionIdHidden),this.props.showGlobalMessage(!0,!0,"Please Wait....","custom-success"),fetch(this.props.baseUrl+"/deleteSubscription?subscriptionID="+n,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.props.authToken}}).then((function(e){if(200===e.status)e.json().then((function(e){if("ok"===e.errorStatus.status){a.props.showGlobalMessage(!1,!0,"Record deleted successfuly","custom-success"),a.removeDataTableRow("subscriptionupgradeTable",t);var n=a;setTimeout((function(){n.props.hideGlobalMessage()}),2e3)}else a.props.showGlobalMessage(!0,!0,e.errorStatus.statusMsg,"custom-danger"),setTimeout((function(){a.props.hideGlobalMessage()}),2e3)}));else{a.props.showGlobalMessage(!0,!0,"Please try after sometime","custom-danger");var n=a;setTimeout((function(){n.props.hideGlobalMessage()}),2e3)}})).catch((function(e){console.log(e),a.props.showGlobalMessage(!0,!0,"Please try after sometime","custom-danger"),setTimeout((function(){a.props.hideGlobalMessage()}),2e3)}))}}},{key:"changeView",value:function(){var e=this;this.setState({viewTable:!0}),setTimeout((function(){e.initTable("subscriptionupgradeTable",!0)}),0)}},{key:"render",value:function(){var e=this;return u.a.createElement("div",null,u.a.createElement("div",{className:"row Subscriptionupgrade"},u.a.createElement("div",{className:"col-md-12"},u.a.createElement("div",{className:"row mt-2"},u.a.createElement("div",{className:"col-sm-6 text-left"},u.a.createElement("div",{className:"d-inline"},u.a.createElement("button",{type:"button",className:"btn btn-sm btn-outline-secondary disabled"},u.a.createElement("i",{className:"fa fa-filter"}),"FILTER")),u.a.createElement("div",{className:"d-inline p-2"},u.a.createElement("input",{type:"text",value:this.state.searchString,className:"d-inline form-control form-control-sm search-field",onChange:function(t){e.filterData(t)}})))),u.a.createElement("div",{className:"centered-div"},u.a.createElement("div",{id:"subscriptionupgradeTableDiv"},this.state.showTableInit?this.state.newTableData.length>0?u.a.createElement("table",{id:"subscriptionupgradeTable",className:"table text-center"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Timestamp"),u.a.createElement("th",null,"No. Of Gateways"),u.a.createElement("th",null,"Status"),u.a.createElement("th",null,"Actions"))),u.a.createElement("tbody",null,this.state.newTableData.map((function(t,a){return u.a.createElement("tr",{id:"subscriptionupgradeTableTbodyTr_"+a,key:"subscriptionupgradeTableTbodyTr_"+a},u.a.createElement("td",null,t.timestamp),u.a.createElement("td",null,t.noOfGateway),u.a.createElement("td",null,t.status),u.a.createElement("td",null,u.a.createElement("span",{className:"action-img"},e.props.permissions.accesses.maintain.subMenus.watchers.delete?u.a.createElement("img",{alt:"delete-icon",onClick:e.deleteData.bind(e,t,a),title:"Delete",src:p.a}):null)))})))):u.a.createElement("div",{className:"row mt-2"},u.a.createElement("div",{className:"col-md-12"},u.a.createElement("div",{className:"alert alert-success",role:"alert"},"No record found!"))):u.a.createElement("p",{className:"text-center loader-icon"},u.a.createElement("img",{alt:"loading",src:h.a})))))))}}]),a}(u.a.Component)}}]);
//# sourceMappingURL=14.a260feac.chunk.js.map