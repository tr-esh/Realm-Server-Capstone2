"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[287],{31687:function(t,e,r){r.r(e),r.d(e,{default:function(){return ot}});var n=r(74165),o=r(42982),i=r(15861),a=r(70885),s=r(72791),c=r(89164),l=r(61889),d=r(20890),u=r(96849),f=r(80184),h=function(){var t=(0,s.useState)(""),e=(0,a.Z)(t,2),r=e[0],n=e[1];return(0,s.useEffect)((function(){var t=(new Date).getHours();n(t<12?"Morning,":t>=12&&t<17?"Afternoon,":"Evening,")}),[]),(0,f.jsx)("span",{className:"greeting-mood",children:r})},x=function(){var t=(0,u.E)().user;return(0,f.jsxs)("div",{children:[(0,f.jsxs)(d.Z,{variant:"h4",children:[(0,f.jsx)("span",{className:"subject-greet",children:"Good"})," ",(0,f.jsx)(h,{})," "]}),(0,f.jsx)(d.Z,{variant:"h4",children:t&&(0,f.jsx)("span",{className:"user-greet",children:t.username})}),(0,f.jsx)(d.Z,{variant:"h7",children:(0,f.jsx)("span",{className:"sub-greet",children:"Uncover water insights in your local"})})]})},p=r(1413),m=r(45987),g=r(64554),v=r(57621),Z=r(36314),b=r(95193),j=["title","imageSource","icon","color","sx","imageSize","stationHolder"];var y=function(t){var e=t.title,r=t.imageSource,n=t.icon,o=(t.color,t.sx),i=t.imageSize,a=t.stationHolder,s=(0,m.Z)(t,j),c=(0,b.Z)("(max-width:600px)");return(0,f.jsxs)(v.Z,(0,p.Z)((0,p.Z)({component:Z.Z,spacing:2,direction:"row",sx:(0,p.Z)({borderRadius:10,m:1,backgroundColor:"#10273d",boxShadow:"none"},o)},s),{},{children:[n&&(0,f.jsx)(g.Z,{sx:{width:64,height:64},children:n}),(0,f.jsxs)(Z.Z,{children:[(0,f.jsx)(d.Z,{variant:"subtitle2",sx:{color:"text.disabled"},children:e}),a&&(0,f.jsxs)(Z.Z,{children:[a," "]})]}),!c&&(0,f.jsx)("img",{src:r,alt:"Widget Image",style:{width:i,height:"auto",display:"block",marginLeft:"3rem"},className:"responsive-image"})]}))},w=r(20601),F=r(38725),S=r(82839),k=r(90466),C=r(17684),z=r(12891),A=r(35667),P=r(57702),W=r(9585),E=r(94294),I=["title","subheader","chart","sx"];function M(t){var e=t.title,r=t.subheader,o=(t.chart,t.sx),c=(0,m.Z)(t,I),u=(0,s.useState)([]),h=(0,a.Z)(u,2),x=h[0],Z=h[1],b=(0,s.useState)(null),j=(0,a.Z)(b,2),y=j[0],M=j[1],D=(0,s.useState)(null),R=(0,a.Z)(D,2),L=R[0],B=R[1];(0,s.useEffect)((function(){function t(){return(t=(0,i.Z)((0,n.Z)().mark((function t(){var e,r,o,i,a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/api/realm/calculateWQI");case 3:if((e=t.sent).ok){t.next=6;break}throw new Error("Failed to fetch data");case 6:return t.next=8,e.json();case 8:r=t.sent,o=[],Object.keys(r).forEach((function(t){var e=Object.keys(r[t]).reduce((function(t,e){return new Date(e)>new Date(t)?e:t})),n=r[t][e];o.push((0,p.Z)({stationId:t},n))})),Z(o),i=o.reduce((function(t,e){return t.wqi<e.wqi?t:e})),a=o.reduce((function(t,e){return t.wqi>e.wqi?t:e})),M(i),B(a),t.next=21;break;case 18:t.prev=18,t.t0=t.catch(0),console.error("Error fetching station data:",t.t0);case 21:case"end":return t.stop()}}),t,null,[[0,18]])})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]);var q=x.map((function(t){return{label:t.stationId,value:parseFloat(t.wqi.toFixed(2)),fill:(e=t.wqi,e>=0&&e<=25?"#A1E6A6":e>25&&e<=50?"#FFFF80":e>50&&e<=75?"#EEFF51":e>75&&e<=100?"#F5B748":e>100&&e<=150?"#FF6551":"#8CACFF")};var e}));return(0,f.jsxs)(v.Z,(0,p.Z)((0,p.Z)({spacing:3,sx:(0,p.Z)({px:4,py:4,borderRadius:10},o)},c),{},{children:[(0,f.jsx)(W.Z,{title:(0,f.jsx)(d.Z,{variant:"h6",style:{color:"white",fontFamily:"Archivo, 'sans-serif'",fontWeight:500,fontSize:25,textTransform:"uppercase"},children:e}),subheader:(0,f.jsxs)(d.Z,{variant:"subtitle1",style:{color:"#8cacff",fontFamily:"Poppins",fontWeight:100,fontSize:13,lineHeight:.9},children:[r,y&&L&&"Based on the latest readings of the stations the optimal water source is ".concat(y.stationId,", and the station with less desirable quality is ").concat(L.stationId)]})}),(0,f.jsx)(g.Z,{mt:2,sx:{mx:1},children:(0,f.jsx)(w.h,{width:"100%",height:200,children:(0,f.jsxs)(F.v,{data:q,margin:{top:0,right:0,left:0,bottom:0},children:[(0,f.jsx)(S.q,{strokeDasharray:"1 0",horizontal:!0,vertical:!1,stroke:"rgba(100, 100, 100, 0.7)"}),(0,f.jsx)(k.K,{dataKey:"label",type:"category",tick:{fontSize:10,fontFamily:"Poppins",fill:"#ffff",fontWeight:"300"},axisLine:!1,tickLine:!1,width:30,children:(0,f.jsx)(C._,{value:"Recorded Stations",offset:-8,position:"bottom",style:{fontSize:12,fontFamily:"Poppins",fill:"#8cacff",fontWeight:"700"}})}),(0,f.jsx)(z.B,{dataKey:"value",tick:{fontSize:10,fontFamily:"Poppins",fill:"#ffff",fontWeight:"300"},axisLine:!1,tickLine:!1,interval:0,children:(0,f.jsx)(C._,{value:"WQI Values",angle:-90,position:"insideLeft",style:{fontSize:12,fontFamily:"Poppins",fill:"#8cacff",fontWeight:"700"}})}),(0,f.jsx)(A.u,{cursor:{fill:"transparent"},contentStyle:{backgroundColor:"rgba(13, 33, 53, 0.32)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",backdropFilter:"blur(15px)",WebkitBackdropFilter:"blur(15px)",color:"white",fontSize:"1rem",fontFamily:"'Archivo', sans-serif",borderRadius:"0.5rem",border:"none"}}),(0,f.jsx)(P.$,{barSize:30,radius:10,dataKey:"value",fill:"#A1E6A6"})]})})}),(0,f.jsx)(g.Z,{mt:5,children:(0,f.jsx)(l.ZP,{container:!0,justifyContent:"center",spacing:.8,children:[{label:"Excellent",color:"#A1E6A6"},{label:"Good",color:"#FFFF80"},{label:"Fair",color:"#EEFF51"},{label:"Poor",color:"#F5B748"},{label:"Very Poor",color:"#FF6551"}].map((function(t,e){return(0,f.jsx)(l.ZP,{item:!0,xs:2.5,sm:2.5,md:2.5,lg:1.9,children:(0,f.jsxs)(E.Z,{variant:"contained",sx:{borderRadius:20,fontSize:3,padding:"5px 8px",backgroundColor:"#0d2135",boxShadow:"none"},children:[(0,f.jsx)("div",{style:{width:8,height:8,backgroundColor:t.color,borderRadius:"50%",marginRight:5}}),(0,f.jsx)(d.Z,{variant:"body2",style:{fontSize:10,fontFamily:"Poppins"},children:t.label})]})},e)}))})})]}))}var D=r.p+"static/media/dashboard-illustration.d08d855fcfc9d4d113fd.png",R=r(4942),L=r(28265),B=r(18602),q=["title","subheader","sx"];function H(t){var e,r=t.title,c=(t.subheader,t.sx),l=(0,m.Z)(t,q),u=(0,s.useState)([]),h=(0,a.Z)(u,2),x=h[0],Z=h[1],b=(0,s.useState)(!0),j=(0,a.Z)(b,2),y=j[0],F=j[1],k=(0,s.useState)(null),C=(0,a.Z)(k,2),P=C[0],E=C[1];(0,s.useEffect)((function(){I()}),[]);var I=function(){var t=(0,i.Z)((0,n.Z)().mark((function t(){var e,i,a,s;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/api/realm/lowWQI");case 3:return e=t.sent,t.next=6,e.json();case 6:i=t.sent,a=i.maxLowWQIStation,E({stationId:a,wqi:Math.min.apply(Math,(0,o.Z)(i.wqiValuesOfIdentifiedStation))}),s=i.wqiValuesOfIdentifiedStation.map((function(t,e){return(0,R.Z)({label:"Station ".concat(String.fromCharCode(65+e))},r,parseFloat(t.toFixed(2)))})),Z(s),F(!1),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(0),console.error("Error fetching data:",t.t0),F(!1);case 18:case"end":return t.stop()}}),t,null,[[0,14]])})));return function(){return t.apply(this,arguments)}}();if(P){var M=P.wqi;M>=0&&M<=25?"Excellent":M>25&&M<=50?"Good":M>50&&M<=75?"Fair":M>75&&M<=100?"Poor":M>100&&M<=150&&"Very Poor"}var D=P?"".concat(P.stationId," has the lowest WQI"):"";return(0,f.jsxs)(v.Z,(0,p.Z)((0,p.Z)({spacing:3,sx:(0,p.Z)({px:4,py:2,borderRadius:10},c)},l),{},{children:[(0,f.jsx)(W.Z,{title:(0,f.jsx)(d.Z,{variant:"h6",style:{color:"white",fontFamily:"Archivo, 'sans-serif'",fontWeight:500,fontSize:23,textTransform:"uppercase",lineHeight:1},children:r}),subheader:(0,f.jsx)(d.Z,{variant:"subtitle1",style:(e={color:"white",fontFamily:"Poppins",fontWeight:100,fontSize:13,lineHeight:1},(0,R.Z)(e,"color","#8cacff"),(0,R.Z)(e,"marginTop","1.5px"),e),children:D})}),(0,f.jsxs)(g.Z,{mt:2,sx:{mx:3},children:[y?(0,f.jsx)(d.Z,{children:"Loading..."}):(0,f.jsx)(w.h,{width:"100%",height:200,children:(0,f.jsxs)(L.T,{data:x,width:80,height:100,children:[(0,f.jsx)("defs",{children:(0,f.jsxs)("linearGradient",{id:"colorUv",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,f.jsx)("stop",{offset:"5%",stopColor:"#8CACFF",stopOpacity:.8}),(0,f.jsx)("stop",{offset:"95%",stopColor:"#8CACFF",stopOpacity:0})]})}),(0,f.jsx)(z.B,{orientation:"right",tick:{fontSize:10,fontFamily:"Poppins",fill:"#ffff",fontWeight:"300"},axisLine:!1,tickLine:!1,width:20,ticks:[0,20,40,60,80],interval:"preserveStartEnd"}),(0,f.jsx)(S.q,{strokeDasharray:"1 0",horizontal:!0,vertical:!1,stroke:"rgba(100, 100, 100, 0.7)"}),(0,f.jsx)(A.u,{cursor:{fill:"transparent"},contentStyle:{backgroundColor:"rgba(13, 33, 53, 0.32)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",backdropFilter:"blur(15px)",WebkitBackdropFilter:"blur(15px)",color:"white",fontSize:13,fontFamily:"'Archivo', sans-serif",borderRadius:"0.5rem",border:"none"}}),(0,f.jsx)(B.u,{type:"monotone",dataKey:r,stroke:"#8CACFF",fill:"url(#colorUv)",strokeWidth:4,dot:!1,activeDot:{r:6}})]})}),(0,f.jsx)(g.Z,{mt:3,mb:2,sx:{mx:1},children:P&&(0,f.jsxs)(d.Z,{variant:"subheader",style:{marginTop:"1rem",color:"white",fontSize:13,fontWeight:"300",fontFamily:"Poppins"},children:['According to the collected water quality data, the "',(0,f.jsx)("strong",{children:P.stationId}),'" exhibits the lowest WQI readings compared to all other stations, indicating a better water quality at this specific location.']})})]})]}))}var T=r(35527),N=r(79836),O=r(56890),Q=r(35855),V=r(53994),K=r(53382),G=r(15522),J=["title","subheader","list","sx"];function U(t){t.title,t.subheader;var e=t.list,r=t.sx,n=(0,m.Z)(t,J),o={pointerEvents:"none","&:hover":{backgroundColor:"inherit"}};return(0,f.jsx)(v.Z,(0,p.Z)((0,p.Z)({spacing:1,sx:(0,p.Z)({px:1,py:1,overflowX:"auto"},r)},n),{},{children:(0,f.jsx)(T.Z,{sx:{borderRadius:"15px",overflow:"auto",backgroundColor:"transparent",boxShadow:"none"},children:(0,f.jsxs)(N.Z,{children:[(0,f.jsx)(O.Z,{style:{backgroundColor:"#001227",color:"white",fontWeight:600},children:(0,f.jsxs)(Q.Z,{children:[(0,f.jsx)(V.Z,{sx:{color:"#8cacff",fontWeight:600,fontFamily:"Poppins",borderBottom:"none",position:"sticky",top:0,zIndex:1},children:"Stations"}),(0,f.jsx)(V.Z,{sx:{color:"#8cacff",fontWeight:600,fontFamily:"Poppins",borderBottom:"none",position:"sticky",top:0,zIndex:1},children:"Tester"}),(0,f.jsx)(V.Z,{sx:{color:"#8cacff",fontWeight:600,fontFamily:"Poppins",borderBottom:"none",position:"sticky",top:0,zIndex:1},children:"Date"}),(0,f.jsx)(V.Z,{sx:{color:"#8cacff",fontWeight:600,fontFamily:"Poppins",borderBottom:"none",position:"sticky",top:0,zIndex:1},children:"Status"})]})}),(0,f.jsx)(K.Z,{children:e.map((function(t,e){return(0,f.jsxs)(Q.Z,{children:[(0,f.jsx)(V.Z,{variant:"subtitle2",sx:{borderBottom:"1px solid #03324e",color:"#8cacff",fontFamily:"Poppins",fontWeight:"700"},children:t.stationName}),(0,f.jsx)(V.Z,{variant:"subtitle2",sx:{borderBottom:"1px solid #03324e",color:"#8cacff",fontFamily:"Poppins"},children:t.tester}),(0,f.jsx)(V.Z,{variant:"subtitle2",sx:{borderBottom:"1px solid #03324e",color:"#8cacff",fontFamily:"Poppins"},children:(0,G.zM)(t.dateAdded)}),(0,f.jsx)(V.Z,{variant:"subtitle2",sx:{borderBottom:"1px solid #03324e",color:"#8cacff",fontFamily:"Poppins"},children:(0,f.jsx)(E.Z,{style:o,variant:"contained",sx:{backgroundColor:Y(t.status),color:_(t.status),padding:"0.5rem",fontWeight:"600",borderRadius:"3rem",fontFamily:"Poppins",lineHeight:1,boxShadow:"none",fontSize:"0.7rem"},children:t.status})})]},t.id||e)}))})]})})}))}function Y(t){switch(t){case"Added":return"#74a7f7";case"Monitored":return"#ffff80";case"Recently Monitored":return"#a1e6a6";case"Not Monitored":return"#FAD5A5";default:return"transparent"}}function _(t){switch(t){case"Added":return"#093887";case"Monitored":return"#616106";case"Recently Monitored":return"#043608";case"Not Monitored":return"#CC5500";default:return"black"}}var X=r(13400),$=r(61912),tt=r(35457),et=["sx"];function rt(t){var e=t.sx,r=(0,m.Z)(t,et),n=(0,s.useState)(""),o=(0,a.Z)(n,2),i=o[0],c=o[1],l=(0,s.useState)(""),u=(0,a.Z)(l,2),h=u[0],x=u[1],g=(0,s.useState)((0,f.jsx)($.Z,{style:{fontSize:"35px"}})),b=(0,a.Z)(g,2),j=b[0],y=b[1],w=(0,s.useState)("#10273d"),F=(0,a.Z)(w,2),S=F[0],k=F[1];return(0,s.useEffect)((function(){var t=setInterval((function(){var t=new Date,e=t.getHours();e>=5&&e<18?(y((0,f.jsx)($.Z,{style:{fontSize:"35px"}})),k("#8CACFF")):(y((0,f.jsx)(tt.Z,{style:{fontSize:"35px"}})),k("#8CACFF"));var r=e>=12?"PM":"AM",n="".concat(e%12||12,":").concat(String(t.getMinutes()).padStart(2,"0"),":").concat(String(t.getSeconds()).padStart(2,"0")," ").concat(r);c(n);var o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()],i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],a=t.getDate(),s="".concat(o,", ").concat(i," ").concat(a);x(s)}),1e3);return function(){return clearInterval(t)}}),[]),(0,f.jsxs)(v.Z,(0,p.Z)((0,p.Z)({component:Z.Z,spacing:3,direction:"row",sx:(0,p.Z)({borderRadius:10,m:1,backgroundColor:S,boxShadow:"none",position:"relative"},e)},r),{},{children:[(0,f.jsx)(Z.Z,{children:(0,f.jsxs)(Z.Z,{marginTop:16,marginBottom:8,children:[(0,f.jsx)(d.Z,{variant:"h6",sx:{fontFamily:"Poppins",fontWeight:"600",color:"#8CACFF",marginLeft:"30px",lineHeight:.2},children:"TODAY"}),(0,f.jsx)(d.Z,{variant:"h2",sx:{fontFamily:"'Archivo', sans-serif",fontWeight:"600",color:"white",marginLeft:"25px"},children:i}),(0,f.jsx)(d.Z,{variant:"subtitle",sx:{fontFamily:"Poppins",fontWeight:"200",color:"#8CACFF",marginLeft:"30px",lineHeight:.2},children:h})]})}),(0,f.jsx)(X.Z,{sx:{color:"white",position:"absolute",top:20,right:20,backgroundColor:S,cursor:"auto","&:hover, &:active":{backgroundColor:S}},disableTouchRipple:!0,disableFocusRipple:!0,children:j})]}))}function nt(){var t=(0,s.useState)([]),e=(0,a.Z)(t,2),r=e[0],d=e[1];(0,s.useEffect)((function(){u();var t=setInterval(u,5e3);return function(){return clearInterval(t)}}),[]);var u=function(){var t=(0,i.Z)((0,n.Z)().mark((function t(){var e,i,s,c,l;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Promise.all([h(),p()]);case 3:e=t.sent,i=(0,a.Z)(e,2),s=i[0],c=i[1],l=m([].concat((0,o.Z)(r),(0,o.Z)(s),(0,o.Z)(c))),d(l),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.error("Error fetching and updating data:",t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(){return t.apply(this,arguments)}}(),h=function(){var t=(0,i.Z)((0,n.Z)().mark((function t(){var e,r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/api/realm/activityLog");case 3:return e=t.sent,t.next=6,e.json();case 6:return r=t.sent,t.abrupt("return",r);case 10:throw t.prev=10,t.t0=t.catch(0),console.error("Error fetching activity logs:",t.t0),t.t0;case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}}(),p=function(){var t=(0,i.Z)((0,n.Z)().mark((function t(){var e,r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/api/realm/stationActivity");case 3:return e=t.sent,t.next=6,e.json();case 6:return r=t.sent,t.abrupt("return",r);case 10:throw t.prev=10,t.t0=t.catch(0),console.error("Error fetching other data:",t.t0),t.t0;case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}}(),m=function(t){return t.sort((function(t,e){return new Date(e.dateAdded)-new Date(t.dateAdded)}))};return(0,f.jsx)("div",{children:(0,f.jsx)(c.Z,{maxWidth:"lg",children:(0,f.jsxs)(l.ZP,{container:!0,spacing:3,mt:2,children:[(0,f.jsx)(l.ZP,{item:!0,xs:12,sm:12,md:6,lg:7,children:(0,f.jsx)(y,{sx:{backgroundColor:"#8CACFF",px:4,py:4},title:(0,f.jsx)(x,{}),imageSource:D,imageSize:"35%"})}),(0,f.jsx)(l.ZP,{item:!0,xs:12,sm:12,md:6,lg:5,children:(0,f.jsx)(rt,{sx:{backgroundColor:"#0A1929"}})}),(0,f.jsx)(l.ZP,{item:!0,xs:12,sm:12,md:6,lg:7,children:(0,f.jsx)(M,{title:"Latest WQI Records per Station",subheader:!0,sx:{backgroundColor:"#10273d"}})}),(0,f.jsx)(l.ZP,{item:!0,xs:12,sm:12,md:6,lg:5,children:(0,f.jsx)(H,{title:"Optimal Water Source",sx:{backgroundColor:"#10273d"}})}),(0,f.jsxs)(l.ZP,{item:!0,xs:12,sm:12,md:12,mt:2,style:{display:"flex",flexDirection:"column"},children:[(0,f.jsx)("span",{style:{color:"white",fontFamily:"Archivo, 'sans-serif'",fontWeight:500,fontSize:25,textTransform:"uppercase"},children:"Station Activity Logs"}),(0,f.jsx)("span",{style:{color:"#8CACFF",fontFamily:"Poppins",fontWeight:300,fontSize:13},children:"Catch up on the activities from the last two weeks"})]}),(0,f.jsx)(l.ZP,{item:!0,xs:12,sm:12,md:12,children:(0,f.jsx)(U,{sx:{backgroundColor:"#0d2135",boxShadow:"none",margin:0,padding:0,maxHeight:"300px",overflowY:"hidden","&:hover":{overflowY:"auto"}},list:function(t){var e=new Date;return e.setDate(e.getDate()-14),t.filter((function(t){return new Date(t.dateAdded)>e}))}(r)})})]})})})}function ot(){return(0,f.jsx)("div",{className:"home",children:(0,f.jsx)(nt,{})})}},35457:function(t,e,r){var n=r(64836);e.Z=void 0;var o=n(r(45649)),i=r(80184),a=(0,o.default)((0,i.jsx)("path",{d:"M11.65 3.46c.27-.71-.36-1.45-1.12-1.34-5.52.8-9.47 6.07-8.34 11.88.78 4.02 4.09 7.21 8.14 7.87 3.74.61 7.16-.87 9.32-3.44.48-.57.19-1.48-.55-1.62-6.02-1.15-9.68-7.54-7.45-13.35z"}),"BedtimeRounded");e.Z=a},61912:function(t,e,r){var n=r(64836);e.Z=void 0;var o=n(r(45649)),i=r(80184),a=(0,o.default)((0,i.jsx)("path",{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"}),"LightModeRounded");e.Z=a}}]);
//# sourceMappingURL=287.612644ae.chunk.js.map