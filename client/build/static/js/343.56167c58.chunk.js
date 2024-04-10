"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[343],{1343:function(e,t,i){i.r(t),i.d(t,{default:function(){return j}});var n=i(2791),r=i(9164),a=i(1889),s=i(890),o=i(4294),d=i(1413),c=i(5987),u=i(7621),l=i(6314),m=i(184),x=["title","imageSource","icon","subheader","sx","imageSize"];function h(e){var t=e.title,i=e.imageSource,n=e.icon,r=e.subheader,a=e.sx,o=e.imageSize,h=(0,c.Z)(e,x);return(0,m.jsxs)(u.Z,(0,d.Z)((0,d.Z)({component:l.Z,spacing:2,direction:"row",sx:(0,d.Z)({borderRadius:10,m:1,backgroundColor:"#10273d",boxShadow:"none"},a)},h),{},{children:[n&&(0,m.jsx)(l.Z,{children:n}),(0,m.jsxs)(l.Z,{children:[(0,m.jsx)(s.Z,{variant:"subtitle2",sx:{color:"text.disabled"},children:t}),i&&(0,m.jsx)("img",{src:i,alt:"Widget Image",style:{width:o,height:"auto"}}),r&&(0,m.jsx)(s.Z,{variant:"h5",sx:{color:"white",textAlign:"center",marginBottom:"2rem",fontWeight:"600"},children:r})]})]}))}var f=i(6849),p=i(7689),g=new URL(i(5986),i.b),v=new URL(i(3098),i.b),b=new URL(i(4647),i.b);function Z(){var e=(0,f.E)().dispatch,t=(0,p.s0)(),i=function(i){if(e({type:"SET_ROLE",payload:i}),localStorage.setItem("selectedRole",JSON.stringify(i)),"Guest"===i||localStorage.getItem("user")){var n="/dashboard";"Monitoring-Officer"===i?n="/mo-home":"Guest"===i&&(n="/guest"),t(n,{state:{role:i}})}else t("/login",{state:{role:i}})};return(0,n.useEffect)((function(){var e=function(){localStorage.removeItem("selectedRole")};return window.addEventListener("popstate",e),function(){window.removeEventListener("popstate",e)}}),[]),(0,m.jsx)("div",{className:"user-main",children:(0,m.jsx)(r.Z,{maxWidth:"lg",children:(0,m.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,m.jsx)(a.ZP,{item:!0,xs:12,sm:12,md:12,children:(0,m.jsxs)(s.Z,{variant:"h6",mt:3,sx:{marginLeft:"2rem",fontFamily:'"Archivo", Sans-serif',fontWeight:"700"},children:["SELECT ",(0,m.jsx)("span",{style:{color:"#8cacff"},children:"USER"})," TYPE"]})}),(0,m.jsx)(a.ZP,{item:!0,xs:12,sm:12,md:4,lg:4,children:(0,m.jsx)(o.Z,{sx:{borderRadius:"40px",width:{xs:"100%",sm:350,lg:350}},onClick:function(){return i("Guest")},children:(0,m.jsx)(h,{imageSource:b,imageSize:"100%",subheader:"GUEST"})})}),(0,m.jsx)(a.ZP,{item:!0,xs:12,sm:12,md:4,lg:4,children:(0,m.jsx)(o.Z,{sx:{borderRadius:"40px",width:{xs:"100%",sm:350,lg:350}},onClick:function(){return i("Admin")},children:(0,m.jsx)(h,{imageSource:g,imageSize:"100%",subheader:"ADMIN"})})}),(0,m.jsx)(a.ZP,{item:!0,xs:12,sm:12,md:4,lg:4,children:(0,m.jsx)(o.Z,{sx:{borderRadius:"40px",width:{xs:"100%",sm:350,lg:350}},onClick:function(){return i("Monitoring-Officer")},children:(0,m.jsx)(h,{imageSource:v,imageSize:"100%",subheader:"MONITORING OFFICER"})})})]})})})}var S=i(3861);function j(){var e=(0,S.F)("down","sm");return(0,m.jsx)("div",{className:"userpage ".concat(e?"small-screen":""),children:(0,m.jsx)(Z,{})})}},9164:function(e,t,i){i.d(t,{Z:function(){return R}});var n=i(4942),r=i(3366),a=i(7462),s=i(2791),o=i(3733),d=i(1122),c=i(1217),u=i(4419),l=i(6083),m=i(3457),x=i(5080),h=i(184),f=["className","component","disableGutters","fixed","maxWidth","classes"],p=(0,x.Z)(),g=(0,m.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var i=e.ownerState;return[t.root,t["maxWidth".concat((0,d.Z)(String(i.maxWidth)))],i.fixed&&t.fixed,i.disableGutters&&t.disableGutters]}}),v=function(e){return(0,l.Z)({props:e,name:"MuiContainer",defaultTheme:p})},b=function(e,t){var i=e.classes,n=e.fixed,r=e.disableGutters,a=e.maxWidth,s={root:["root",a&&"maxWidth".concat((0,d.Z)(String(a))),n&&"fixed",r&&"disableGutters"]};return(0,u.Z)(s,(function(e){return(0,c.Z)(t,e)}),i)};var Z=i(4036),S=i(6934),j=i(1402),w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,i=void 0===t?g:t,d=e.useThemeProps,c=void 0===d?v:d,u=e.componentName,l=void 0===u?"MuiContainer":u,m=i((function(e){var t=e.theme,i=e.ownerState;return(0,a.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!i.disableGutters&&(0,n.Z)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}))}),(function(e){var t=e.theme;return e.ownerState.fixed&&Object.keys(t.breakpoints.values).reduce((function(e,i){var n=i,r=t.breakpoints.values[n];return 0!==r&&(e[t.breakpoints.up(n)]={maxWidth:"".concat(r).concat(t.breakpoints.unit)}),e}),{})}),(function(e){var t=e.theme,i=e.ownerState;return(0,a.Z)({},"xs"===i.maxWidth&&(0,n.Z)({},t.breakpoints.up("xs"),{maxWidth:Math.max(t.breakpoints.values.xs,444)}),i.maxWidth&&"xs"!==i.maxWidth&&(0,n.Z)({},t.breakpoints.up(i.maxWidth),{maxWidth:"".concat(t.breakpoints.values[i.maxWidth]).concat(t.breakpoints.unit)}))})),x=s.forwardRef((function(e,t){var i=c(e),n=i.className,s=i.component,d=void 0===s?"div":s,u=i.disableGutters,x=void 0!==u&&u,p=i.fixed,g=void 0!==p&&p,v=i.maxWidth,Z=void 0===v?"lg":v,S=(0,r.Z)(i,f),j=(0,a.Z)({},i,{component:d,disableGutters:x,fixed:g,maxWidth:Z}),w=b(j,l);return(0,h.jsx)(m,(0,a.Z)({as:d,ownerState:j,className:(0,o.Z)(w.root,n),ref:t},S))}));return x}({createStyledComponent:(0,S.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var i=e.ownerState;return[t.root,t["maxWidth".concat((0,Z.Z)(String(i.maxWidth)))],i.fixed&&t.fixed,i.disableGutters&&t.disableGutters]}}),useThemeProps:function(e){return(0,j.Z)({props:e,name:"MuiContainer"})}}),R=w},5986:function(e,t,i){e.exports=i.p+"static/media/Admin_illustration.fd51712cb6ee0fc3e325.png"},3098:function(e,t,i){e.exports=i.p+"static/media/MO_illustration.7994388780a36ace27a8.png"},4647:function(e,t,i){e.exports=i.p+"static/media/client_illustration.397e4fd74c9abd2f482b.png"}}]);
//# sourceMappingURL=343.56167c58.chunk.js.map