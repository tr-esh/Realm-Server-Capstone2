"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[424],{9424:function(e,t,n){n.r(t),n.d(t,{default:function(){return S}});var a=n(4942),o=n(1413),i=n(74165),r=n(15861),s=n(70885),l=n(64280),d=n(91440),u=n(68096),p=n(61889),c=n(85523),m=n(4708),h=n(94294),f=n(72791),x=n(66934),g=n(96849),v=n(57689),y=n(11087),Z=n(156),b=n(80184),j=(0,x.ZP)(l.Z)({"& .MuiFilledInput-root":{borderBottom:"none",borderRadius:"10px"},"& .MuiFilledInput-input":{paddingLeft:"20px",paddingBottom:"10px",paddingTop:"30px"},"& .MuiFilledInput-root:before":{borderBottom:"none"},"& .MuiFilledInput-root:after":{borderBottom:"none"},"& .MuiFilledInput-root:hover:not(.Mui-disabled):before":{borderBottom:"none"}}),F=(0,x.ZP)(d.Z)((function(e){var t=e.theme;return{padding:8,"& .MuiSwitch-track":{borderRadius:11,"&:before, &:after":{content:'""',position:"absolute",top:"50%",transform:"translateY(-50%)",width:16,height:16},"&:before":{backgroundImage:'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="'.concat(encodeURIComponent(t.palette.getContrastText(t.palette.primary.main)),'" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>\')'),left:12},"&:after":{backgroundImage:'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="'.concat(encodeURIComponent(t.palette.getContrastText(t.palette.primary.main)),'" d="M19,13H5V11H19V13Z" /></svg>\')'),right:12}},"& .MuiSwitch-thumb":{boxShadow:"none",width:16,height:16,margin:2}}})),w={"& .MuiFormControlLabel-label":{fontFamily:"Archivo",fontSize:"1rem",color:"#808080"}},P=function(){var e=(0,Z.q)().role,t=(0,f.useState)(""),n=(0,s.Z)(t,2),l=n[0],d=n[1],x=(0,f.useState)(""),P=(0,s.Z)(x,2),S=P[0],A=P[1],I=(0,f.useState)(""),L=(0,s.Z)(I,2),C=L[0],k=L[1],B=(0,f.useState)(""),N=(0,s.Z)(B,2),T=N[0],W=N[1],z=(0,f.useState)(""),M=(0,s.Z)(z,2),R=M[0],E=M[1],O=(0,f.useState)(""),U=(0,s.Z)(O,2),G=U[0],H=U[1],J=(0,f.useState)(""),D=(0,s.Z)(J,2),V=D[0],q=D[1],K=(0,f.useState)(""),Y=(0,s.Z)(K,2),Q=Y[0],X=Y[1],$=function(){var e=(0,f.useState)(null),t=(0,s.Z)(e,2),n=t[0],a=t[1],o=(0,f.useState)(null),l=(0,s.Z)(o,2),d=l[0],u=l[1],p=(0,g.E)().dispatch,c=(0,v.s0)(),m=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(t,n,o,r,s,l,d,m,h){var f,x;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(!0),a(null),e.next=4,fetch("/api/realm/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:t,firstname:n,middlename:o,lastname:r,email:s,phone:l,username:d,accesskey:m,password:h})});case 4:return f=e.sent,e.next=7,f.json();case 7:x=e.sent,f.ok||(u(!1),a(x.error)),f.ok&&(localStorage.setItem("user",JSON.stringify(x)),p({type:"LOGIN",payload:x}),u(!1),c("/login"));case 10:case"end":return e.stop()}}),e)})));return function(t,n,a,o,i,r,s,l,d){return e.apply(this,arguments)}}();return{signup:m,isLoading:d,error:n,navigate:c}}(),_=$.signup,ee=$.error,te=$.isLoading,ne=(0,f.useState)(e),ae=(0,s.Z)(ne,2),oe=ae[0],ie=ae[1];(0,f.useEffect)((function(){var e=localStorage.getItem("selectedRole");e&&ie(JSON.parse(e))}),[]);var re=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,_(oe,l,S,C,T,R,G,V,Q);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),se=f.useState({password:"",showPassword:!1}),le=(0,s.Z)(se,2),de=le[0],ue=le[1],pe=f.useState(!1),ce=(0,s.Z)(pe,2),me=ce[0],he=ce[1];return(0,b.jsx)("div",{className:"admin-signup",children:(0,b.jsxs)("div",{className:"container",children:[(0,b.jsxs)("div",{className:"hero",children:[(0,b.jsxs)("h1",{children:["CREATE",(0,b.jsx)("span",{children:" NEW "}),"ACCOUNT",(0,b.jsx)("span",{children:"."})]}),(0,b.jsx)("p",{className:"sub-caps",children:" Register your credentials to start journey "})," "]}),(0,b.jsxs)("form",{className:"signup",onSubmit:re,children:[ee&&(0,b.jsx)("div",{className:"error",children:ee}),(0,b.jsx)(u.Z,{sx:{mt:0},children:(0,b.jsxs)(p.ZP,{container:!0,spacing:1,children:[(0,b.jsx)(p.ZP,{item:!0,xs:12,md:12,children:(0,b.jsx)(u.Z,{fullWidth:!0,children:(0,b.jsx)(j,{variant:"filled",label:"Role",sx:{fontFamily:"Archivo"},InputLabelProps:{style:{fontFamily:"Archivo",paddingLeft:"13px",paddingTop:"4px",paddingBottom:"15px"}},InputProps:{style:{fontFamily:"Archivo",fontSize:"0.9rem"},readOnly:!0},value:oe,autoFocus:!0})})}),(0,b.jsx)(p.ZP,{item:!0,xs:12,md:12,children:(0,b.jsx)(u.Z,{fullWidth:!0,children:(0,b.jsx)(j,{variant:"filled",label:"Firstname",sx:{fontFamily:"Archivo"},InputLabelProps:{style:{fontFamily:"Archivo",paddingLeft:"13px",paddingTop:"4px",paddingBottom:"15px"}},InputProps:{style:{fontFamily:"Archivo",fontSize:"0.9rem"}},value:l,onChange:function(e){return d(e.target.value)},autoFocus:!0})})}),(0,b.jsx)(p.ZP,{item:!0,xs:12,md:5,children:(0,b.jsx)(u.Z,{fullWidth:!0,children:(0,b.jsx)(j,{variant:"filled",label:"Middlename",sx:{fontFamily:"Archivo"},InputLabelProps:{style:{fontFamily:"Archivo",paddingLeft:"13px",paddingTop:"4px",paddingBottom:"15px"}},InputProps:{style:{fontFamily:"Archivo",fontSize:"0.9rem"}},value:S,onChange:function(e){return A(e.target.value)},autoFocus:!0})})}),(0,b.jsx)(p.ZP,{item:!0,xs:12,md:7,children:(0,b.jsx)(u.Z,{fullWidth:!0,children:(0,b.jsx)(j,{variant:"filled",label:"Lastname",sx:{fontFamily:"Archivo"},InputLabelProps:{style:{fontFamily:"Archivo",paddingLeft:"13px",paddingTop:"4px",paddingBottom:"15px"}},InputProps:{style:{fontFamily:"Archivo",fontSize:"0.9rem"}},value:C,onChange:function(e){return k(e.target.value)},autoFocus:!0})})}),(0,b.jsx)(p.ZP,{item:!0,xs:12,md:7,children:(0,b.jsx)(u.Z,{fullWidth:!0,children:(0,b.jsx)(j,{variant:"filled",label:"Email",name:"email",autoComplete:"email",sx:{fontFamily:"Archivo"},InputLabelProps:{style:{fontFamily:"Archivo",paddingLeft:"13px",paddingTop:"4px",paddingBottom:"15px"}},InputProps:{style:{fontFamily:"Archivo",fontSize:"0.9rem"}},value:T,onChange:function(e){return W(e.target.value)},autoFocus:!0})})}),(0,b.jsx)(p.ZP,{item:!0,xs:12,md:5,children:(0,b.jsx)(u.Z,{fullWidth:!0,children:(0,b.jsx)(j,{variant:"filled",label:"Phone number",name:"number",autoComplete:"number",sx:{fontFamily:"Archivo"},InputLabelProps:{style:{fontFamily:"Archivo",paddingLeft:"13px",paddingTop:"4px",paddingBottom:"15px"}},InputProps:{style:{fontFamily:"Archivo",fontSize:"0.9rem"}},value:R,onChange:function(e){return E(e.target.value)},autoFocus:!0})})}),(0,b.jsx)(p.ZP,{item:!0,xs:12,md:5,children:(0,b.jsx)(u.Z,{fullWidth:!0,children:(0,b.jsx)(j,{variant:"filled",label:"Username",name:"username",autoComplete:"name",sx:{fontFamily:"Archivo"},InputLabelProps:{style:{fontFamily:"Archivo",paddingLeft:"13px",paddingTop:"4px",paddingBottom:"15px"}},InputProps:{style:{fontFamily:"Archivo",fontSize:"0.9rem"}},value:G,onChange:function(e){return H(e.target.value)},autoFocus:!0})})}),(0,b.jsx)(p.ZP,{item:!0,xs:12,md:7,children:(0,b.jsx)(u.Z,{fullWidth:!0,children:(0,b.jsx)(j,{variant:"filled",label:"Access Key",sx:{fontFamily:"Archivo"},InputLabelProps:{style:{fontFamily:"Archivo",paddingLeft:"13px",paddingTop:"4px",paddingBottom:"15px"}},InputProps:{style:{fontFamily:"Archivo",fontSize:"0.9rem"}},value:V,onChange:function(e){return q(e.target.value)},autoFocus:!0})})}),(0,b.jsx)(p.ZP,{item:!0,xs:12,children:(0,b.jsxs)(u.Z,{fullWidth:!0,children:[(0,b.jsx)(j,{variant:"filled",InputLabelProps:{style:{fontFamily:"Archivo",paddingLeft:"13px",paddingTop:"2px",paddingBottom:"15px"}},inputProps:{style:{fontFamily:"Archivo",fontSize:"0.9rem"}},id:"password",name:"password",type:de.showPassword?"text":"password",value:"".concat(de.password).concat(Q),onChange:function(e){return X(e.target.value)&&(t="password",function(e){ue((0,o.Z)((0,o.Z)({},de),{},(0,a.Z)({},t,e.target.value)))});var t},sx:{borderRadius:"10px"},label:"Password"}),(0,b.jsx)(u.Z,{sx:{mt:1},children:(0,b.jsx)(c.Z,{control:(0,b.jsx)(F,{checked:me,onChange:function(e){he(e.target.checked),ue((0,o.Z)((0,o.Z)({},de),{},{showPassword:!de.showPassword}))}}),label:"Show Password",sx:(0,o.Z)({},w)})})]})}),(0,b.jsx)(p.ZP,{item:!0,xs:12,children:(0,b.jsxs)(u.Z,{fullWidth:!0,margin:"normal",children:[(0,b.jsx)(m.ZP,{}),(0,b.jsx)(h.Z,{disableElevation:!0,type:"submit",disabled:te,sx:{fontFamily:"Archivo",fontSize:"0.9rem",borderRadius:4,height:"6ch",fontWeight:"500",hover:"#004d40",backgroundColor:"#8cacff","&:hover":{backgroundColor:"#0d2135"}},margin:"normal",variant:"contained",size:"large",color:"secondary",children:"SIGN UP"})]})}),(0,b.jsxs)("p",{className:"sub",children:[" Already have an account?",(0,b.jsx)("span",{children:(0,b.jsx)(y.rU,{style:{textDecoration:"none",color:"#8cacff",fontWeight:"500"},to:{pathname:"/login",state:{role:oe}},children:"LOGIN HERE"})})]})]})})]})]})})};function S(){return(0,b.jsx)("div",{className:"signup",children:(0,b.jsx)(P,{})})}}}]);
//# sourceMappingURL=424.524958b1.chunk.js.map