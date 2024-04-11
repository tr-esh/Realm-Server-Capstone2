"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[638],{50919:function(e,t,n){n.r(t),n.d(t,{default:function(){return U}});var r=n(1413),i=n(74165),o=n(15861),a=n(70885),s=n(72791),c=n(57689),l=n(89164),d=n(61889),u=n(35527),h=n(79836),g=n(56890),p=n(35855),f=n(53994),m=n(53382),x=n(93044),b=n(20890),v=n(94294),Z=n(45987),w=n(57621),y=n(36314),S=n(80184),k=["suggestionImageSrc","suggestionSubheader","sx"];function j(e){var t=e.suggestionImageSrc,n=e.suggestionSubheader,i=e.sx,o=(0,Z.Z)(e,k);return(0,S.jsx)(w.Z,(0,r.Z)((0,r.Z)({spacing:3,sx:(0,r.Z)({px:4,py:4,borderRadius:10},i)},o),{},{children:(0,S.jsxs)(y.Z,{direction:{xs:"row",md:"column"},alignItems:"center",justifyContent:"center",spacing:2,children:[(0,S.jsx)("img",{src:t,alt:"Suggestion Image",style:{width:"33%",maxWidth:"100%",marginBottom:"2rem"}}),(0,S.jsx)(y.Z,{direction:"column",alignItems:"center",children:(0,S.jsx)(b.Z,{variant:"subtitle1",sx:{color:"#8cacff",fontSize:13,fontFamily:"Poppins",fontWeight:"400",lineHeight:.9,textAlign:"center"},children:n})})]})}))}var F=n(50533),P=["title","dateCreated","publisher","link","sx"];function I(e){var t=e.title,n=e.dateCreated,i=e.publisher,o=e.link,c=e.sx,l=(0,Z.Z)(e,P),d=s.useState(""),u=(0,a.Z)(d,2),h=u[0],g=u[1];return s.useEffect((function(){(function(){var e="https://api.unsplash.com/photos/random?query=abstract water&orientation=landscape&client_id=".concat("3TIZ7fotd0nPXcEnFCKNxqa6zgTfzJ-67RuDeJXMOYM");return fetch(e).then((function(e){return e.json()})).then((function(e){return e.urls.regular})).catch((function(e){return console.error("Error fetching image from Unsplash:",e),"https://images.unsplash.com/photo-1532423622396-10a3f979251a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}))})().then((function(e){return g(e)}))}),[]),(0,S.jsx)(F.Z,{href:o,target:"_blank",rel:"noopener noreferrer",underline:"none",color:"inherit",children:(0,S.jsx)(w.Z,(0,r.Z)((0,r.Z)({spacing:3,sx:(0,r.Z)({px:4,py:4,borderRadius:10,backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)), url(".concat(h,")"),backgroundSize:"cover",backgroundPosition:"center",height:"250px",transition:"background-color 0.3s"},c)},l),{},{children:(0,S.jsx)(y.Z,{direction:"column",children:(0,S.jsxs)(b.Z,{variant:"subtitle2",sx:{color:"white",fontFamily:"Archivo, 'sans-serif'",fontWeight:"300",lineHeight:.9,margin:"1rem"},children:[(0,S.jsx)("div",{style:{marginBottom:"1rem"},children:n}),(0,S.jsx)("div",{style:{color:"rgba(140, 172, 255, 1)",fontSize:20,fontFamily:"Poppins",fontWeight:"700",textTransform:"uppercase",textDecoration:"none","&:hover":{textDecoration:"underline"}},children:t}),(0,S.jsx)("div",{style:{color:"white",fontFamily:"rgba(140, 172, 255, 1)",fontSize:14,marginTop:"0.7rem"},children:i})]})})}))})}var C=[{title:"Three Main Types of Water Quality Parameters Explained",dateCreated:"September 20, 2021",publisher:"Sensorex",link:"https://sensorex.com/three-main-types-of-water-quality-parameters-explained/"},{title:"Water Quality: Information, Importance and Testing",dateCreated:"November 17, 2023",publisher:"Polar Iceberg Water",link:"https://svalbardi.com/blogs/water/quality"},{title:"What are the Five Basic Water Quality parameters in water?",dateCreated:"",publisher:"NetSol Water",link:"https://www.france24.com/en/tv-shows/focus/20231117-the-philippines-plastic-problem-waterways-polluted-by-single-use-packaging"},{title:"Water and Sanitation Issues in the Philippines",dateCreated:"",publisher:"Planet Water Foundation",link:"https://planet-water.org/where-we-operate/philippines/"},{title:"Drinking-water",dateCreated:"September 13, 2023",publisher:"World Health Organization",link:"https://www.who.int/news-room/fact-sheets/detail/drinking-water"},{title:"The Philippines plastic problem: waterways polluted by single-use packaging",dateCreated:"November 17, 2023",publisher:"Focus",link:"https://www.france24.com/en/tv-shows/focus/20231117-the-philippines-plastic-problem-waterways-polluted-by-single-use-packaging"}],R=[{title:"The importance of testing water quality in Philippine communities",dateCreated:"August 25, 2023",publisher:"Aboitiz InfraCapital",link:"https://aboitizinfracapital.com/the-importance-of-testing-water-quality-in-philippine-communities/"}],W=n(13239),T=n(64554),B=["title","subtitle","color","sx"];function z(e){var t=e.title,n=(e.subtitle,e.color,e.sx),c=(0,Z.Z)(e,B),l=(0,s.useState)(!0),d=(0,a.Z)(l,2),u=d[0],h=d[1],g=(0,s.useState)(null),p=(0,a.Z)(g,2),f=p[0],m=p[1];(0,s.useEffect)((function(){function e(){return(e=(0,o.Z)((0,i.Z)().mark((function e(){var t,n,r,o,a,s;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/realm/lowWQI");case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,r=n.maxLowWQIStation,o=n.wqiValuesOfIdentifiedStation,a=o[o.length-1],s={stationId:r,wqi:a,status:function(e){return e>=0&&e<=25?"Excellent":e>25&&e<=50?"Good":e>50&&e<=75?"Fair":e>75&&e<=100?"Poor":e>100&&e<=150?"Very Poor":"Unknown"}(a),color:x(a)},m(s),h(!1),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(0),console.error("Error fetching data:",e.t0),h(!1);case 19:case"end":return e.stop()}}),e,null,[[0,15]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var x=function(e){return e>=0&&e<=25?"#A1E6A6":e>25&&e<=50?"#FFFF80":e>50&&e<=75?"#EEFF51":e>75&&e<=100?"#F5B748":e>100&&e<=150?"#FF6551":"#8CACFF"};return(0,S.jsx)(w.Z,(0,r.Z)((0,r.Z)({component:y.Z,spacing:0,direction:"column",sx:(0,r.Z)({px:4,py:4,borderRadius:10,backgroundColor:"#0d2135",boxShadow:"none"},n)},c),{},{children:u?(0,S.jsx)(W.Z,{}):f?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(w.Z,{sx:{bgcolor:"#03182f",borderTopLeftRadius:15,borderTopRightRadius:15,borderBottomLeftRadius:0,borderBottomRightRadius:0,boxShadow:"none"},children:(0,S.jsxs)(T.Z,{sx:{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingTop:"4rem",paddingBottom:"4rem"},children:[(0,S.jsx)(W.Z,{variant:"determinate",value:f.wqi,size:200,thickness:5,sx:{width:"100%",height:"100%",borderRadius:"80%",position:"relative",color:f.color,zIndex:2}}),(0,S.jsx)(W.Z,{variant:"determinate",value:100,size:200,thickness:5,sx:{color:"rgba(255, 255, 255, 0.1)",borderRadius:"50%",position:"absolute",zIndex:1}}),(0,S.jsxs)(b.Z,{variant:"h4",sx:{fontSize:24,fontFamily:"Archivo, 'sans-serif'",fontWeight:"700",color:f.color,position:"absolute",zIndex:3},children:[f.wqi.toFixed(2),"% ",(0,S.jsx)(b.Z,{variant:"body2",sx:{fontSize:13,fontFamily:"Archivo, 'sans-serif'",fontWeight:"300",color:f.color,textAlign:"center"},children:"WQI"})]})]})}),(0,S.jsx)(w.Z,{sx:{bgcolor:"#001227",borderBottomLeftRadius:15,borderBottomRightRadius:15,borderTopLeftRadius:0,borderTopRightRadius:0,boxShadow:"none"},children:(0,S.jsxs)(y.Z,{sx:{padding:"20px",display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,S.jsx)(b.Z,{variant:"h4",sx:{fontSize:13,fontFamily:"Archivo, 'sans-serif'",fontWeight:"700",color:"#1a56bb",textTransform:"uppercase",backgroundColor:"#051e68",width:"14rem",height:"1.7rem",display:"flex",borderRadius:"2rem",textAlign:"center",alignItems:"center",justifyContent:"center",marginTop:"2rem"},children:t}),(0,S.jsxs)(b.Z,{variant:"h4",sx:{fontSize:25,fontFamily:"Poppins",fontWeight:"700",color:f.color,textTransform:"uppercase",marginTop:"1rem"},children:[f.stationId," "]}),(0,S.jsxs)(b.Z,{variant:"body2",sx:{fontSize:13,fontFamily:"Poppins",fontWeight:"300",color:"white",textAlign:"center",paddingTop:"2rem",paddingBottom:"2.5rem"},children:["Based on the gathered station data, the optimal water source is the ",(0,S.jsxs)("strong",{children:[" ",f.stationId," "]})," with a value of ",(0,S.jsxs)("strong",{children:[f.wqi.toFixed(2)," "]}),"interpreted as ",(0,S.jsxs)("strong",{children:[f.status,"."]})]})]})})]}):(0,S.jsx)(b.Z,{variant:"body1",children:"No data available"})}))}var A=n.p+"static/media/excellent.36735a99399e30994023.png",D=n.p+"static/media/veryPoor.d3f6221339737296c6f4.png",E=n.p+"static/media/badWater.61489389da604925da42.png",q=n.p+"static/media/fair.e60ba1a8ffec2160fb23.png",M=n.p+"static/media/glass-of-water.2064bfe7f7ce2981b41b.png",N=n.p+"static/media/monitorWater.4d19b5d8c30e50ff7ccc.png",L=n.p+"static/media/minorPurification.9070194f2b419e4dd8ee.png",H=n.p+"static/media/waterTreatment.a7bdbed1da80fac9dc20.png",O=n.p+"static/media/professional.f6c1db0d7617af5b5f86.png",G=n.p+"static/media/Poor.f11737bcacb51c8f23f1.png",Q=n.p+"static/media/water.96fba0cefcb0d98cb2bc.png";function V(){(0,c.TH)().state.title;var e="Optimal Water Source",t="Station HO2",n={Excellent:"#A1E6A6",Good:"#FFFF80",Fair:"#EEFF51",Poor:"#F5B748","Very Poor":"#FF6551"},Z={Excellent:{suggestionImages:[M,q,A],suggestionSubheader:["Suitable for drinking.","No further treatment or action is necessary.","The water is safe to consume."]},Good:{suggestionImages:[M,N],suggestionSubheader:["Water that is suitable for drinking.","Continue monitoring the water quality.",""]},Fair:{suggestionImages:[D,L,G],suggestionSubheader:["Water in this range is modestly suitable for drinking.","It may not meet the highest standards of cleanliness, so it's advisable to take some precautions.","You can consider using a water filter or purifier to further enhance the quality before consumption."]},Poor:{suggestionImages:[Q,L,H],suggestionSubheader:["Water in this range is unsuitable for drinking without treatment.","Minor purification is required before usage.","It is recommended to use a water treatment method like boiling, chlorination, or filtration to eliminate any potential contaminants."]},"Very Poor":{suggestionImages:[D,E,O],suggestionSubheader:["Water in this range is unsuitable for drinking without appropriate treatment.","It is crucial to seek alternative sources of water supply or implement a comprehensive water treatment system.","Consulting with water quality professionals or local authorities can help determine the best course of action."]},Unknown:{suggestionImages:[],suggestionSubheader:["Unknown status","",""]}},w=((0,c.s0)(),(0,s.useState)("Station HO1")),y=(0,a.Z)(w,2),k=(y[0],y[1],(0,s.useState)(null)),F=(0,a.Z)(k,2),P=(F[0],F[1],(0,s.useState)(null)),W=(0,a.Z)(P,2),T=(W[0],W[1],(0,s.useState)([])),B=(0,a.Z)(T,2),V=(B[0],B[1],(0,s.useState)([])),U=(0,a.Z)(V,2),Y=U[0],J=U[1],X=(0,s.useState)(null),_=(0,a.Z)(X,2),K=_[0],$=_[1],ee=(0,s.useState)(Z.Excellent),te=(0,a.Z)(ee,2),ne=te[0],re=te[1];return(0,s.useEffect)((function(){var e=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(){var t,n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/realm/provideStation");case 3:if(!(t=e.sent).ok){e.next=12;break}return e.next=7,t.json();case 7:n=e.sent,console.log("Fetched stations:",n),J(n),e.next=13;break;case 12:console.error("Failed to fetch station data");case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.error("Error fetching station data",e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,S.jsx)(l.Z,{maxWidth:"lg",children:(0,S.jsxs)(d.ZP,{container:!0,spacing:4,mt:1,children:[(0,S.jsx)(d.ZP,{item:!0,xs:12,sm:12,md:12,lg:4,children:(0,S.jsx)(z,{title:e,info:t})}),(0,S.jsx)(d.ZP,{item:!0,xs:12,sm:12,md:12,lg:8,children:(0,S.jsx)(u.Z,{sx:{borderRadius:"15px",overflow:"hidden",backgroundColor:"transparent",boxShadow:"none"},children:(0,S.jsx)("div",{children:(0,S.jsxs)(h.Z,{children:[(0,S.jsx)(g.Z,{sx:{backgroundColor:"#001227",borderBottom:"none"},children:(0,S.jsxs)(p.Z,{children:[(0,S.jsx)(f.Z,{align:"left",sx:{color:"#8cacff",fontWeight:600,fontFamily:"Poppins",borderBottom:"none"},children:"Station Image"}),(0,S.jsx)(f.Z,{align:"left",sx:{color:"#8cacff",fontWeight:600,fontFamily:"Poppins",borderBottom:"none"},children:"Station Details"}),(0,S.jsx)(f.Z,{align:"center",sx:{color:"#8cacff",fontWeight:600,fontFamily:"Poppins",borderBottom:"none"},children:"Station Status"})]})}),(0,S.jsx)(m.Z,{children:Y.filter((function(e){return e.status})).map((function(e,t){return(0,S.jsxs)(p.Z,{children:[(0,S.jsx)(f.Z,{align:"left",sx:{borderBottom:"1px solid #03324e"},children:(0,S.jsx)(x.Z,{alt:"Station Image",src:e.stationImage&&e.stationImage.url,sx:{width:80,height:80,borderRadius:"15px"}})}),(0,S.jsxs)(f.Z,{align:"left",sx:{borderBottom:"1px solid #03324e",color:"#8cacff",fontFamily:"Poppins",paddingTop:"2.5rem"},children:[(0,S.jsx)(b.Z,{variant:"body2",sx:{fontWeight:"700",color:"#8cacff",fontFamily:"Poppins"},children:e.stationName}),(0,S.jsx)(b.Z,{variant:"body2",sx:{fontWeight:"500",fontFamily:"Poppins"},children:e.siteLocation}),(0,S.jsx)(b.Z,{variant:"subtitle2",sx:{fontFamily:"Poppins",fontWeight:300,fontSize:"0.9rem",marginBottom:"1.5rem"},children:e.address})]}),(0,S.jsx)(f.Z,{align:"center",sx:{borderBottom:"1px solid #03324e"},children:(0,S.jsx)(v.Z,{variant:"contained",sx:{fontFamily:"Poppins",fontWeight:600,fontSize:"0.7rem",borderRadius:"2rem",textTransform:"none",backgroundColor:n[e.status],color:"#000000",width:"100%",height:"2rem",boxShadow:"none",lineHeight:1},onClick:function(){return function(e){console.log("Clicked station:",e),$(e);var t=e.status;Z.hasOwnProperty(t)?re({suggestionImages:Z[t].suggestionImages,suggestionSubheader:Z[t].suggestionSubheader}):re({suggestionImages:[],suggestionSubheader:["Status suggestions not available"]}),console.log("Optimal station:",K)}(e)},children:e.status})})]},t)}))})]})})})}),(0,S.jsxs)(d.ZP,{container:!0,spacing:4,mt:5,sx:{borderRadius:"15px",overflow:"hidden",boxShadow:"none",marginLeft:5},children:[(0,S.jsx)(d.ZP,{item:!0,xs:12,sm:12,md:12,lg:12,sx:{backgroundColor:"#001227",borderTopLeftRadius:"30px",borderTopRightRadius:"30px",borderBottomLeftRadius:"0",borderBottomRightRadius:"0",padding:"1rem"},children:(0,S.jsx)(b.Z,{variant:"h7",sx:{color:"#8cacff",fontFamily:"Poppins",fontWeight:700,textTransform:"uppercase"},children:"Recommended for you today!"})}),(0,S.jsx)(d.ZP,{container:!0,spacing:4,sx:{backgroundColor:"#03182f",borderBottomLeftRadius:"30px",borderBottomRightRadius:"30px",borderTopLeftRadius:"0",borderTopRightRadius:"0",padding:"1rem",marginTop:"3px",fontFamily:"Poppins"},children:ne.suggestionSubheader&&ne.suggestionSubheader.map((function(e,t){return(0,S.jsx)(d.ZP,{item:!0,xs:12,sm:4,md:4,lg:4,children:(0,S.jsx)(j,{suggestionImageSrc:ne.suggestionImages[t],sx:{backgroundColor:"transparent",boxShadow:"none"},suggestionSubheader:e})},t)}))})]}),(0,S.jsx)(d.ZP,{item:!0,xs:12,sm:12,md:12,mt:6,sx:{marginLeft:4},children:(0,S.jsx)(b.Z,{variant:"h7",sx:{color:"#8cacff",fontFamily:"Poppins",fontWeight:700,textTransform:"uppercase"},children:"Gain Insights \ud83d\udcad"})}),(0,S.jsxs)(d.ZP,{container:!0,spacing:4,margin:1,children:[R.map((function(e,t){return(0,S.jsx)(d.ZP,{item:!0,xs:12,sm:6,md:6,lg:6,children:(0,S.jsx)(I,(0,r.Z)((0,r.Z)({},e),{},{sx:{backgroundColor:"#0A1929"}}),t)},t)})),C.map((function(e,t){return(0,S.jsx)(d.ZP,{item:!0,xs:12,sm:6,md:3,lg:3,children:(0,S.jsx)(I,(0,r.Z)((0,r.Z)({},e),{},{sx:{backgroundColor:"#0A1929"}}),t)},t)}))]})]})})}function U(){return(0,S.jsx)("div",{className:"user-home",children:(0,S.jsx)(V,{})})}},13239:function(e,t,n){n.d(t,{Z:function(){return T}});var r=n(30168),i=n(63366),o=n(87462),a=n(72791),s=n(63733),c=n(94419),l=n(52554),d=n(14036),u=n(31402),h=n(66934),g=n(75878),p=n(21217);function f(e){return(0,p.Z)("MuiCircularProgress",e)}(0,g.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m,x,b,v,Z,w,y,S,k=n(80184),j=["className","color","disableShrink","size","style","thickness","value","variant"],F=44,P=(0,l.F4)(Z||(Z=m||(m=(0,r.Z)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),I=(0,l.F4)(w||(w=x||(x=(0,r.Z)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),C=(0,h.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.variant],t["color".concat((0,d.Z)(n.color))]]}})((function(e){var t=e.ownerState,n=e.theme;return(0,o.Z)({display:"inline-block"},"determinate"===t.variant&&{transition:n.transitions.create("transform")},"inherit"!==t.color&&{color:(n.vars||n).palette[t.color].main})}),(function(e){return"indeterminate"===e.ownerState.variant&&(0,l.iv)(y||(y=b||(b=(0,r.Z)(["\n      animation: "," 1.4s linear infinite;\n    "]))),P)})),R=(0,h.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:function(e,t){return t.svg}})({display:"block"}),W=(0,h.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:function(e,t){var n=e.ownerState;return[t.circle,t["circle".concat((0,d.Z)(n.variant))],n.disableShrink&&t.circleDisableShrink]}})((function(e){var t=e.ownerState,n=e.theme;return(0,o.Z)({stroke:"currentColor"},"determinate"===t.variant&&{transition:n.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(function(e){var t=e.ownerState;return"indeterminate"===t.variant&&!t.disableShrink&&(0,l.iv)(S||(S=v||(v=(0,r.Z)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),I)})),T=a.forwardRef((function(e,t){var n=(0,u.Z)({props:e,name:"MuiCircularProgress"}),r=n.className,a=n.color,l=void 0===a?"primary":a,h=n.disableShrink,g=void 0!==h&&h,p=n.size,m=void 0===p?40:p,x=n.style,b=n.thickness,v=void 0===b?3.6:b,Z=n.value,w=void 0===Z?0:Z,y=n.variant,S=void 0===y?"indeterminate":y,P=(0,i.Z)(n,j),I=(0,o.Z)({},n,{color:l,disableShrink:g,size:m,thickness:v,value:w,variant:S}),T=function(e){var t=e.classes,n=e.variant,r=e.color,i=e.disableShrink,o={root:["root",n,"color".concat((0,d.Z)(r))],svg:["svg"],circle:["circle","circle".concat((0,d.Z)(n)),i&&"circleDisableShrink"]};return(0,c.Z)(o,f,t)}(I),B={},z={},A={};if("determinate"===S){var D=2*Math.PI*((F-v)/2);B.strokeDasharray=D.toFixed(3),A["aria-valuenow"]=Math.round(w),B.strokeDashoffset="".concat(((100-w)/100*D).toFixed(3),"px"),z.transform="rotate(-90deg)"}return(0,k.jsx)(C,(0,o.Z)({className:(0,s.Z)(T.root,r),style:(0,o.Z)({width:m,height:m},z,x),ownerState:I,ref:t,role:"progressbar"},A,P,{children:(0,k.jsx)(R,{className:T.svg,ownerState:I,viewBox:"".concat(22," ").concat(22," ").concat(F," ").concat(F),children:(0,k.jsx)(W,{className:T.circle,style:B,ownerState:I,cx:F,cy:F,r:(F-v)/2,fill:"none",strokeWidth:v})})}))}))}}]);
//# sourceMappingURL=638.dc9ff94c.chunk.js.map