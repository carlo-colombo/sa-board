!function(){"use strict";function n(n,r){for(var t=[],e=[],o=arguments.length;o-- >2;)t.push(arguments[o]);for(;t.length;){var i=t.pop();if(i&&i.pop)for(o=i.length;o--;)t.push(i[o]);else null!=i&&!0!==i&&!1!==i&&e.push(i)}return"function"==typeof n?n(r||{},e):{nodeName:n,attributes:r||{},children:e,key:r&&r.key}}function r(n,r,t,e){function o(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:k.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:o(n)})}}function i(n){return"function"==typeof n?i(n(O,j)):null!=n?n:""}function a(){w=!w;var n=i(t);for(e&&!w&&(N=b(e,N,T,T=n)),S=!1;A.length;)A.pop()()}function u(){w||(w=!0,setTimeout(a))}function l(n,r){var t={};for(var e in n)t[e]=n[e];for(var e in r)t[e]=r[e];return t}function c(n,r,t){var e={};return n.length?(e[n[0]]=n.length>1?c(n.slice(1),r,t[n[0]]):r,l(t,e)):r}function f(n,r){for(var t=0;t<n.length;)r=r[n[t++]];return r}function s(n,r,t){for(var e in t)"function"==typeof t[e]?function(e,o){t[e]=function(e){var i=o(e);return"function"==typeof i&&(i=i(f(n,O),t)),i&&i!==(r=f(n,O))&&!i.then&&u(O=c(n,l(r,i),O)),i}}(e,t[e]):s(n.concat(e),r[e]=l(r[e]),t[e]=l(t[e]));return t}function d(n){return n?n.key:null}function v(n){return n.currentTarget.events[n.type](n)}function p(n,r,t,e,o){if("key"===r);else if("style"===r)for(var i in l(e,t)){var a=null==t||null==t[i]?"":t[i];"-"===i[0]?n[r].setProperty(i,a):n[r][i]=a}else"o"===r[0]&&"n"===r[1]?(r=r.slice(2),n.events?e||(e=n.events[r]):n.events={},n.events[r]=t,t?e||n.addEventListener(r,v):n.removeEventListener(r,v)):r in n&&"list"!==r&&!o?n[r]=null==t?"":t:null!=t&&!1!==t&&n.setAttribute(r,t),null!=t&&!1!==t||n.removeAttribute(r)}function g(n,r){var t="string"==typeof n||"number"==typeof n?document.createTextNode(n):(r=r||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName),e=n.attributes;if(e){e.oncreate&&A.push(function(){e.oncreate(t)});for(var o=0;o<n.children.length;o++)t.appendChild(g(n.children[o]=i(n.children[o]),r));for(var a in e)p(t,a,e[a],null,r)}return t}function h(n,r,t,e){for(var o in l(r,t))t[o]!==("value"===o||"checked"===o?n[o]:r[o])&&p(n,o,t[o],r[o],e);var i=S?t.oncreate:t.onupdate;i&&A.push(function(){i(n,r)})}function m(n,r){var t=r.attributes;if(t){for(var e=0;e<r.children.length;e++)m(n.childNodes[e],r.children[e]);t.ondestroy&&t.ondestroy(n)}return n}function y(n,r,t){function e(){n.removeChild(m(r,t))}var o=t.attributes&&t.attributes.onremove;o?o(r,e):e()}function b(n,r,t,e,o){if(e===t);else if(null==t||t.nodeName!==e.nodeName){var a=g(e,o);n.insertBefore(a,r),null!=t&&y(n,r,t),r=a}else if(null==t.nodeName)r.nodeValue=e;else{h(r,t.attributes,e.attributes,o=o||"svg"===e.nodeName);for(var u={},l={},c=[],f=t.children,s=e.children,v=0;v<f.length;v++){c[v]=r.childNodes[v];var p=d(f[v]);null!=p&&(u[p]=[c[v],f[v]])}for(var v=0,m=0;m<s.length;){var p=d(f[v]),w=d(s[m]=i(s[m]));if(l[p])v++;else if(null==w||S)null==p&&(b(r,c[v],f[v],s[m],o),m++),v++;else{var k=u[w]||[];p===w?(b(r,k[0],k[1],s[m],o),v++):k[0]?b(r,r.insertBefore(k[0],c[v]),k[1],s[m],o):b(r,c[v],null,s[m],o),l[w]=s[m],m++}}for(;v<f.length;)null==d(f[v])&&y(r,c[v],f[v]),v++;for(var v in u)l[v]||y(r,u[v][0],u[v][1])}return r}var w,k=[].map,N=e&&e.children[0]||null,T=N&&o(N),A=[],S=!0,O=l(n),j=s([],O,l(r));return u(),j}function t(r){var t=r.name,e=r.renderer,o=r.limit;return function(r,i){var a=r.board,u=a.dragging,l=a.src,f=a.dst,s=r.pools,d=i.board,v=d.over,p=d.reset,g=d.startDrag,h=i.dropToken,m=s[t],y=function(n){return function(r){r.preventDefault();var t=c(event.changedTouches,1),e=t[0],o=document.elementFromPoint(e.clientX,e.clientY);return n(o.closest(".pool"))}},b=y(function(n){return u?v(n.dataset.name):null}),w=y(function(n){return parseInt(n.dataset.value)<(n.dataset.limit||1/0)?h(n.dataset.name):p()}),k=function(){return 0!=m?g(t):p()},N=t.replace(/(Top|Bottom)$/,""),T=["pool","pool-"+t,"pool-"+N,0==m?"empty":"",l==t&&0==m?"invalid-src":"",f==t&&m==o?"invalid-dst":""].join(" "),A=n("div",{class:"default-renderer pool-content"},N,": ",m,"/",o||"∞");return n("div",{class:T,"data-name":t,"data-limit":o,"data-value":m,onmousedown:k,onmouseup:function(n){return function(){return m<(o||1/0)?h(n):p()}}(t),onmouseover:function(){return u?v(t):null},ontouchstart:k,ontouchend:w,ontouchmove:b},e?e({value:m,label:N,limit:o}):A)}}function e(r){var e=r.player;return n("div",{class:"player-area "+("Top"==e?"flip":"")},n(t,{name:"aura"+e,limit:5}),n(t,{name:"flare"+e}),n(g,{player:e.toLowerCase()}),n(t,{name:"life"+e}),n(p,{player:e.toLowerCase()}))}function o(n,r){return function(t,e,o,i){function a(r,t){var e=t?t+".":"";return Object.keys(r||{}).reduce(function(t,o){var i=e+o,u=r[o];return t[o]="function"==typeof u?function(r){return function(t,e){var o=u(r);return o="function"==typeof o?o(t,e):o,n(t,{name:i,data:r},o),o}}:a(u,i),t},{})}var u=a(e);return r(t,u,o,i)}}function i(n){if(w(n))return o(b,n);var r=w(n.log)?n.log:b;return function(n){return o(r,n)}}function a(n,r,t){return l({},n,u({},r,function(){for(var e=arguments.length,o=Array(e),i=0;i<e;i++)o[i]=arguments[i];return function(e){return T(n[r].apply(null,o),function(n){return l({},e,n)},t)(e)}}))}"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("service-worker-190594d5b0.js",{scope:window.location.pathname}).then(function(n){n.onupdatefound=function(){var r=n.installing;r.onstatechange=function(){switch(r.state){case"installed":navigator.serviceWorker.controller}}}}).catch(function(n){})});var u=function(n,r,t){return r in n?Object.defineProperty(n,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[r]=t,n},l=Object.assign||function(n){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])}return n},c=function(){function n(n,r){var t=[],e=!0,o=!1,i=void 0;try{for(var a,u=n[Symbol.iterator]();!(e=(a=u.next()).done)&&(t.push(a.value),!r||t.length!==r);e=!0);}catch(n){o=!0,i=n}finally{try{!e&&u.return&&u.return()}finally{if(o)throw i}}return t}return function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return n(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),f=function(n){if(Array.isArray(n)){for(var r=0,t=Array(n.length);r<n.length;r++)t[r]=n[r];return t}return Array.from(n)},s={board:{startDrag:function(n){return function(){return{src:n,dragging:!0}}},over:function(n){return function(r){var t=r.dragging,e=r.src;return{dst:t&&n!=e?n:null}}},reset:function(){return function(){return{src:null,dst:null,dragging:!1}}}},dropToken:function(n){return function(r){var t=r.board.src,e=r.ledger;return n==t||null==t||null==n?{board:s.board.reset()()}:{board:s.board.reset()(),ledger:[].concat(f(e),[[t,n]])}}},tapVigor:function(n){return function(r){return l({},r,{vigor:l({},r.vigor,u({},n,(r.vigor[n]+1)%3))})}}},d={initialPools:{distance:10,shadow:0,lifeTop:8,lifeBottom:8,auraTop:3,auraBottom:3,flareTop:0,flareBottom:0},pools:{},board:{dragging:!1,src:null,dst:null},ledger:[],vigor:{top:0,bottom:1}},v=function(r){var t=r.visible;return n("svg",{width:"79.578mm",height:"158.75mm",version:"1.1",viewBox:"0 0 79.578 158.75",style:{position:"absolute",top:0,bottom:0,width:"100%",height:"100%"}},n("g",{transform:"translate(-13.128 -80.042)"},n("path",{d:"m92.226 164.71c3.9811-28.587-18.143-84.667-18.143-84.667l-21.167 21.167-21.167-21.167s-22.124 56.08-18.143 84.667c3.8559 27.688 39.31 74.083 39.31 74.083s35.454-46.395 39.31-74.083z",fill:t?"#f5a5ad":"white",stroke:t?"":"#f5a5ad","image-rendering":"auto"})))},p=function(r){var t=r.player;return function(r,e){var o=r.vigor,i=e.tapVigor;return n("div",{class:"vigor bottom-side",onclick:function(){return i(t)}},n("div",{class:"vigor-title"},"vigor"),n("div",{class:"vigor-content"},o[t]))}},g=function(r){return r.player,function(r,t){var e=t.resetState;return n("div",{class:"actions bottom-side"},n("div",{class:"action",onclick:function(n){return e()}},"C"),n("div",{class:"action"},"H"))}},h=function(r){var t=r.value;return n("div",{class:"distance pool-content"},new Array(10).fill().map(function(r,e){var o=(10-t)/2,i=e+1<=t+o&&e+1>o;return n("div",{class:["step","step"+e,e%2==0?"flip":""].join(" "),key:e+1},n(v,{visible:i}))}))},m=function(r){var t=r.value,e=r.label,o=r.limit,i=e+": "+t+"/"+(o||"∞");return n("div",{class:"pool-content shadow-renderer"},n("div",null,i),n("div",{class:"flip"},i))},y=function(r){return n("div",{class:"board "+(r.board.dragging?"dragging":"")},n(e,{player:"Top"}),n("div",{class:"common-area"},n(t,{name:"shadow",renderer:m}),n(t,{name:"distance",limit:10,renderer:h})),n(e,{player:"Bottom"}))},b=function(n,r,t){},w=function(n){return"function"==typeof n},k=function(n,r){return n.reduce(function(n,r){var t,e=c(r,2),o=e[0],i=e[1];return l({},n,(t={},u(t,o,n[o]-1),u(t,i,n[i]+1),t))},r)},N=function(){for(var n=arguments.length,r=Array(n),t=0;t<n;t++)r[t]=arguments[t];return r.reduce(function(n,r){return function(){return n(r.apply(void 0,arguments))}})},T=function(){for(var n=arguments.length,r=Array(n),t=0;t<n;t++)r[t]=arguments[t];return N.apply(void 0,f(r.reverse()))},A=function(n,r,t){return function(e){return function(o,i,c,f){var s=function(t){return n.setItem(r,JSON.stringify(t[r])),t};return e(l({},o,u({},r,JSON.parse(n.getItem(r))||o[r])),a(i,t,s),c,f)}}},S=function(n){return function(r,t,e,o){var i=function(n){var r=n.pools,t=n.vigor;return window.location.hash=btoa(JSON.stringify({pools:r,vigor:t})),n},u=""!=window.location.hash&&JSON.parse(atob(window.location.hash.match(/#(.*)/)[1]));return n(u?l({},r,u,{initialPools:u.pools,ledger:[]}):r,a(a(t,"tapVigor",i),"dropToken",i),e,o)}},O=function(n){return function(r,t,e,o){return n(l({},r,{pools:k(r.ledger,r.initialPools)}),l({},t,{dropToken:function(n){return function(r){return T(t.dropToken(n),function(n){return l({},r,n)},function(n){return l({},n,{pools:k(n.ledger,n.initialPools)})},function(n){return n})(r)}}}),e,o)}};N(A(sessionStorage,"ledger","dropToken"),A(sessionStorage,"vigor","tapVigor"),function(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];return function(r){return function(e,o,i,a){return r(e,l({},o,{resetState:function(){return function(){confirm("Do you want to reset state?")&&(t.forEach(function(r){return n.removeItem(r)}),window.location.hash="",window.location.reload())}}}),i,a)}}}(sessionStorage,"ledger","vigor"),O,S,i)(r)(d,s,y,document.body)}();