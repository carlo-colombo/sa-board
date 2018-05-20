!function(){"use strict";function n(n,r){for(var e=[],t=[],o=arguments.length;o-- >2;)e.push(arguments[o]);for(;e.length;){var i=e.pop();if(i&&i.pop)for(o=i.length;o--;)e.push(i[o]);else null!=i&&!0!==i&&!1!==i&&t.push(i)}return"function"==typeof n?n(r||{},t):{nodeName:n,attributes:r||{},children:t,key:r&&r.key}}function r(n,r,e,t){function o(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:k.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:o(n)})}}function i(n){return"function"==typeof n?i(n(S,j)):null!=n?n:""}function u(){w=!w;var n=i(e);for(t&&!w&&(N=b(t,N,T,T=n)),O=!1;A.length;)A.pop()()}function a(){w||(w=!0,setTimeout(u))}function l(n,r){var e={};for(var t in n)e[t]=n[t];for(var t in r)e[t]=r[t];return e}function c(n,r,e){var t={};return n.length?(t[n[0]]=n.length>1?c(n.slice(1),r,e[n[0]]):r,l(e,t)):r}function f(n,r){for(var e=0;e<n.length;)r=r[n[e++]];return r}function s(n,r,e){for(var t in e)"function"==typeof e[t]?function(t,o){e[t]=function(t){var i=o(t);return"function"==typeof i&&(i=i(f(n,S),e)),i&&i!==(r=f(n,S))&&!i.then&&a(S=c(n,l(r,i),S)),i}}(t,e[t]):s(n.concat(t),r[t]=l(r[t]),e[t]=l(e[t]));return e}function d(n){return n?n.key:null}function v(n){return n.currentTarget.events[n.type](n)}function p(n,r,e,t,o){if("key"===r);else if("style"===r)for(var i in l(t,e)){var u=null==e||null==e[i]?"":e[i];"-"===i[0]?n[r].setProperty(i,u):n[r][i]=u}else"o"===r[0]&&"n"===r[1]?(r=r.slice(2),n.events?t||(t=n.events[r]):n.events={},n.events[r]=e,e?t||n.addEventListener(r,v):n.removeEventListener(r,v)):r in n&&"list"!==r&&!o?n[r]=null==e?"":e:null!=e&&!1!==e&&n.setAttribute(r,e),null!=e&&!1!==e||n.removeAttribute(r)}function g(n,r){var e="string"==typeof n||"number"==typeof n?document.createTextNode(n):(r=r||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName),t=n.attributes;if(t){t.oncreate&&A.push(function(){t.oncreate(e)});for(var o=0;o<n.children.length;o++)e.appendChild(g(n.children[o]=i(n.children[o]),r));for(var u in t)p(e,u,t[u],null,r)}return e}function m(n,r,e,t){for(var o in l(r,e))e[o]!==("value"===o||"checked"===o?n[o]:r[o])&&p(n,o,e[o],r[o],t);var i=O?e.oncreate:e.onupdate;i&&A.push(function(){i(n,r)})}function h(n,r){var e=r.attributes;if(e){for(var t=0;t<r.children.length;t++)h(n.childNodes[t],r.children[t]);e.ondestroy&&e.ondestroy(n)}return n}function y(n,r,e){function t(){n.removeChild(h(r,e))}var o=e.attributes&&e.attributes.onremove;o?o(r,t):t()}function b(n,r,e,t,o){if(t===e);else if(null==e||e.nodeName!==t.nodeName){var u=g(t,o);n.insertBefore(u,r),null!=e&&y(n,r,e),r=u}else if(null==e.nodeName)r.nodeValue=t;else{m(r,e.attributes,t.attributes,o=o||"svg"===t.nodeName);for(var a={},l={},c=[],f=e.children,s=t.children,v=0;v<f.length;v++){c[v]=r.childNodes[v];var p=d(f[v]);null!=p&&(a[p]=[c[v],f[v]])}for(var v=0,h=0;h<s.length;){var p=d(f[v]),w=d(s[h]=i(s[h]));if(l[p])v++;else if(null==w||O)null==p&&(b(r,c[v],f[v],s[h],o),h++),v++;else{var k=a[w]||[];p===w?(b(r,k[0],k[1],s[h],o),v++):k[0]?b(r,r.insertBefore(k[0],c[v]),k[1],s[h],o):b(r,c[v],null,s[h],o),l[w]=s[h],h++}}for(;v<f.length;)null==d(f[v])&&y(r,c[v],f[v]),v++;for(var v in a)l[v]||y(r,a[v][0],a[v][1])}return r}var w,k=[].map,N=t&&t.children[0]||null,T=N&&o(N),A=[],O=!0,S=l(n),j=s([],S,l(r));return a(),j}function e(r){var e=r.name,t=r.renderer,o=r.limit;return function(r,i){var u=r.board,a=u.dragging,l=u.src,f=u.dst,s=r.pools,d=i.board,v=d.over,p=d.reset,g=d.startDrag,m=i.dropToken,h=s[e],y=function(n){return function(r){r.preventDefault();var e=c(event.changedTouches,1),t=e[0],o=document.elementFromPoint(t.clientX,t.clientY);return n(o.closest(".pool"))}},b=y(function(n){return a?v(n.dataset.name):null}),w=y(function(n){return parseInt(n.dataset.value)<(n.dataset.limit||1/0)?m(n.dataset.name):p()}),k=function(){return 0!=h?g(e):p()},N=e.replace(/(Top|Bottom)$/,""),T=["pool","pool-"+e,"pool-"+N,0==h?"empty":"",l==e&&0==h?"invalid-src":"",f==e&&h==o?"invalid-dst":""].join(" "),A=n("div",{class:"default-renderer pool-content"},N,": ",h,"/",o||"∞");return n("div",{class:T,"data-name":e,"data-limit":o,"data-value":h,onmousedown:k,onmouseup:function(n){return function(){return h<(o||1/0)?m(n):p()}}(e),onmouseover:function(){return a?v(e):null},ontouchstart:k,ontouchend:w,ontouchmove:b},t?t({value:h,label:N,limit:o}):A)}}function t(r){var t=r.player;return n("div",{class:"player-area "+("Top"==t?"flip":"")},n(e,{name:"aura"+t,limit:5}),n(e,{name:"flare"+t}),n(e,{name:"life"+t}),n(p,{player:t.toLowerCase()}))}function o(n,r){return function(e,t,o,i){function u(r,e){var t=e?e+".":"";return Object.keys(r||{}).reduce(function(e,o){var i=t+o,a=r[o];return e[o]="function"==typeof a?function(r){return function(e,t){var o=a(r);return o="function"==typeof o?o(e,t):o,n(e,{name:i,data:r},o),o}}:u(a,i),e},{})}var a=u(t);return r(e,a,o,i)}}function i(n){if(b(n))return o(y,n);var r=b(n.log)?n.log:y;return function(n){return o(r,n)}}function u(n,r,e){return l({},n,a({},r,function(){for(var t=arguments.length,o=Array(t),i=0;i<t;i++)o[i]=arguments[i];return function(t){return k(n[r].apply(null,o),function(n){return l({},t,n)},e)(t)}}))}"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("service-worker-190594d5b0.js",{scope:window.location.pathname}).then(function(n){n.onupdatefound=function(){var r=n.installing;r.onstatechange=function(){switch(r.state){case"installed":navigator.serviceWorker.controller}}}}).catch(function(n){})});var a=function(n,r,e){return r in n?Object.defineProperty(n,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[r]=e,n},l=Object.assign||function(n){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}return n},c=function(){function n(n,r){var e=[],t=!0,o=!1,i=void 0;try{for(var u,a=n[Symbol.iterator]();!(t=(u=a.next()).done)&&(e.push(u.value),!r||e.length!==r);t=!0);}catch(n){o=!0,i=n}finally{try{!t&&a.return&&a.return()}finally{if(o)throw i}}return e}return function(r,e){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return n(r,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),f=function(n){if(Array.isArray(n)){for(var r=0,e=Array(n.length);r<n.length;r++)e[r]=n[r];return e}return Array.from(n)},s={board:{startDrag:function(n){return function(){return{src:n,dragging:!0}}},over:function(n){return function(r){var e=r.dragging,t=r.src;return{dst:e&&n!=t?n:null}}},reset:function(){return function(){return{src:null,dst:null,dragging:!1}}}},dropToken:function(n){return function(r){var e=r.board.src,t=r.ledger;return n==e||null==e||null==n?{board:s.board.reset()()}:{board:s.board.reset()(),ledger:[].concat(f(t),[[e,n]])}}},tapVigor:function(n){return function(r){return l({},r,{vigor:l({},r.vigor,a({},n,(r.vigor[n]+1)%3))})}}},d={pools:{distance:10,shadow:0,lifeTop:8,lifeBottom:8,auraTop:3,auraBottom:3,flareTop:0,flareBottom:0},board:{dragging:!1,src:null,dst:null},ledger:[],vigor:{top:0,bottom:1}},v=function(r){var e=r.visible;return n("svg",{width:"79.578mm",height:"158.75mm",version:"1.1",viewBox:"0 0 79.578 158.75",style:{position:"absolute",top:0,bottom:0,width:"100%",height:"100%"}},n("g",{transform:"translate(-13.128 -80.042)"},n("path",{d:"m92.226 164.71c3.9811-28.587-18.143-84.667-18.143-84.667l-21.167 21.167-21.167-21.167s-22.124 56.08-18.143 84.667c3.8559 27.688 39.31 74.083 39.31 74.083s35.454-46.395 39.31-74.083z",fill:e?"#f5a5ad":"white",stroke:e?"":"#f5a5ad","image-rendering":"auto"})))},p=function(r){var e=r.player;return function(r,t){var o=r.vigor,i=t.tapVigor;return n("div",{class:"vigor",onclick:function(){return i(e)}},n("div",{class:"vigor-title"},"vigor"),n("div",{class:"vigor-content"},o[e]))}},g=function(r){var e=r.value;return n("div",{class:"distance pool-content"},new Array(10).fill().map(function(r,t){var o=(10-e)/2,i=t+1<=e+o&&t+1>o;return n("div",{class:["step","step"+t,t%2==0?"flip":""].join(" "),key:t+1},n(v,{visible:i}))}))},m=function(r){var e=r.value,t=r.label,o=r.limit,i=t+": "+e+"/"+(o||"∞");return n("div",{class:"pool-content shadow-renderer"},n("div",null,i),n("div",{class:"flip"},i))},h=function(r){return n("div",{class:"board "+(r.board.dragging?"dragging":"")},n(t,{player:"Top"}),n("div",{class:"common-area"},n(e,{name:"shadow",renderer:m}),n(e,{name:"distance",limit:10,renderer:g})),n(t,{player:"Bottom"}))},y=function(n,r,e){},b=function(n){return"function"==typeof n},w=function(){for(var n=arguments.length,r=Array(n),e=0;e<n;e++)r[e]=arguments[e];return r.reduce(function(n,r){return function(){return n(r.apply(void 0,arguments))}})},k=function(){for(var n=arguments.length,r=Array(n),e=0;e<n;e++)r[e]=arguments[e];return w.apply(void 0,f(r.reverse()))},N=function(n){return n.reduce(function(n,r){var e,t=c(r,2),o=t[0],i=t[1];return l({},n,(e={},a(e,o,n[o]-1),a(e,i,n[i]+1),e))},d.pools)},T=function(n,r,e){return function(t){return function(o,i,c,f){var s=function(e){return n.setItem(r,JSON.stringify(e[r])),e};return t(l({},o,a({},r,JSON.parse(n.getItem(r))||o[r])),u(i,e,s),c,f)}}},A=function(n){return function(r,e,t,o){var i=function(n){return window.location.hash=btoa(JSON.stringify(n)),n};return n(JSON.parse(atob((window.location.hash.match(/#(.*)/)||[,"ZmFsc2U="])[1]))||r,u(u(e,"tapVigor",i),"dropToken",i),t,o)}},O=function(n){return function(r,e,t,o){return n(l({},r,{pools:N(r.ledger)}),l({},e,{dropToken:function(n){return function(r){return k(e.dropToken(n),function(n){return l({},r,n)},function(n){return l({},n,{pools:N(n.ledger)})},function(n){return n})(r)}}}),t,o)}},S=function(n){return function(r,e,t,o){return n(r,e,t,o)}};w(T(sessionStorage,"ledger","dropToken"),T(sessionStorage,"vigor","tapVigor"),A,S,O,i)(r)(d,s,h,document.body)}();