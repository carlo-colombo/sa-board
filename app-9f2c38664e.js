!function(){"use strict";function n(n,e){for(var t=arguments,r=[],o=[],u=arguments.length;u-- >2;)r.push(t[u]);for(;r.length;){var i=r.pop();if(i&&i.pop)for(u=i.length;u--;)r.push(i[u]);else null!=i&&!0!==i&&!1!==i&&o.push(i)}return"function"==typeof n?n(e||{},o):{nodeName:n,attributes:e||{},children:o,key:e&&e.key}}function e(n,e,t,r){function o(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:k.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:o(n)})}}function u(n){return"function"==typeof n?u(n(B,E)):null!=n?n:""}function i(){w=!w;var n=u(t);for(r&&!w&&(N=y(r,N,T,T=n)),O=!1;j.length;)j.pop()()}function a(){w||(w=!0,setTimeout(i))}function l(n,e){var t={};for(var r in n)t[r]=n[r];for(var r in e)t[r]=e[r];return t}function c(n,e,t){var r={};return n.length?(r[n[0]]=n.length>1?c(n.slice(1),e,t[n[0]]):e,l(t,r)):e}function s(n,e){for(var t=0;t<n.length;)e=e[n[t++]];return e}function f(n,e,t){for(var r in t)"function"==typeof t[r]?function(r,o){t[r]=function(r){var u=o(r);return"function"==typeof u&&(u=u(s(n,B),t)),u&&u!==(e=s(n,B))&&!u.then&&a(B=c(n,l(e,u),B)),u}}(r,t[r]):f(n.concat(r),e[r]=l(e[r]),t[r]=l(t[r]));return t}function d(n){return n?n.key:null}function v(n){return n.currentTarget.events[n.type](n)}function g(n,e,t,r,o){if("key"===e);else if("style"===e)for(var u in l(r,t)){var i=null==t||null==t[u]?"":t[u];"-"===u[0]?n[e].setProperty(u,i):n[e][u]=i}else"o"===e[0]&&"n"===e[1]?(e=e.slice(2),n.events?r||(r=n.events[e]):n.events={},n.events[e]=t,t?r||n.addEventListener(e,v):n.removeEventListener(e,v)):e in n&&"list"!==e&&!o?n[e]=null==t?"":t:null!=t&&!1!==t&&n.setAttribute(e,t),null!=t&&!1!==t||n.removeAttribute(e)}function p(n,e){var t="string"==typeof n||"number"==typeof n?document.createTextNode(n):(e=e||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName),r=n.attributes;if(r){r.oncreate&&j.push(function(){r.oncreate(t)});for(var o=0;o<n.children.length;o++)t.appendChild(p(n.children[o]=u(n.children[o]),e));for(var i in r)g(t,i,r[i],null,e)}return t}function m(n,e,t,r){for(var o in l(e,t))t[o]!==("value"===o||"checked"===o?n[o]:e[o])&&g(n,o,t[o],e[o],r);var u=O?t.oncreate:t.onupdate;u&&j.push(function(){u(n,e)})}function h(n,e){var t=e.attributes;if(t){for(var r=0;r<e.children.length;r++)h(n.childNodes[r],e.children[r]);t.ondestroy&&t.ondestroy(n)}return n}function b(n,e,t){function r(){n.removeChild(h(e,t))}var o=t.attributes&&t.attributes.onremove;o?o(e,r):r()}function y(n,e,t,r,o){if(r===t);else if(null==t||t.nodeName!==r.nodeName){var i=p(r,o);n.insertBefore(i,e),null!=t&&b(n,e,t),e=i}else if(null==t.nodeName)e.nodeValue=r;else{m(e,t.attributes,r.attributes,o=o||"svg"===r.nodeName);for(var a={},l={},c=[],s=t.children,f=r.children,v=0;v<s.length;v++){c[v]=e.childNodes[v];var g=d(s[v]);null!=g&&(a[g]=[c[v],s[v]])}for(var v=0,h=0;h<f.length;){var g=d(s[v]),w=d(f[h]=u(f[h]));if(l[g])v++;else if(null==w||O)null==g&&(y(e,c[v],s[v],f[h],o),h++),v++;else{var k=a[w]||[];g===w?(y(e,k[0],k[1],f[h],o),v++):k[0]?y(e,e.insertBefore(k[0],c[v]),k[1],f[h],o):y(e,c[v],null,f[h],o),l[w]=f[h],h++}}for(;v<s.length;)null==d(s[v])&&b(e,c[v],s[v]),v++;for(var v in a)l[v]||b(e,a[v][0],a[v][1])}return e}var w,k=[].map,N=r&&r.children[0]||null,T=N&&o(N),j=[],O=!0,B=l(n),E=f([],B,l(e));return a(),E}function t(e){var t=e.name,r=e.renderer,o=e.limit;return function(e,u){var i=e.board,a=i.dragging,l=i.src,c=i.dst,s=e.pools,f=u.board,d=f.over,v=f.reset,g=f.startDrag,p=u.dropToken,m=s[t],h=function(n){return function(e){e.preventDefault();var t=event.changedTouches,r=t[0],o=document.elementFromPoint(r.clientX,r.clientY);return n(o.closest(".pool"))}},b=h(function(n){return a?d(n.dataset.name):null}),y=h(function(n){return parseInt(n.dataset.value)<(n.dataset.limit||1/0)?p(n.dataset.name):v()}),w=function(){return 0!=m?g(t):v()},k=t.replace(/(Top|Bottom)$/,""),N=["pool","pool-"+t,"pool-"+k,0==m?"empty":"",l==t&&0==m?"invalid-src":"",c==t&&m==o?"invalid-dst":""].join(" "),T=n("div",{class:"default-renderer pool-content"},k,": ",m,"/",o||"∞");return n("div",{class:N,"data-name":t,"data-limit":o,"data-value":m,onmousedown:w,onmouseup:function(n){return function(){return m<(o||1/0)?p(n):v()}}(t),onmouseover:function(){return a?d(t):null},ontouchstart:w,ontouchend:y,ontouchmove:b},r?r({value:m,label:k,limit:o}):T)}}function r(e){var r=e.player;return n("div",{class:"player-area "+("Top"==r?"flip":"")},n(t,{name:"aura"+r,limit:5}),n(t,{name:"flare"+r}),n(t,{name:"life"+r}))}function o(n,e){return function(t,r,o,u){function i(e,t){var r=t?t+".":"";return Object.keys(e||{}).reduce(function(t,o){var u=r+o,a=e[o];return t[o]="function"==typeof a?function(e){return function(t,r){var o=a(e);return o="function"==typeof o?o(t,r):o,n(t,{name:u,data:e},o),o}}:i(a,u),t},{})}var a=i(r);return e(t,a,o,u)}}function u(n){if(v(n))return o(d,n);var e=v(n.log)?n.log:d;return function(n){return o(e,n)}}"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("service-worker-ca039a8b52.js",{scope:window.location.pathname}).then(function(n){n.onupdatefound=function(){var e=n.installing;e.onstatechange=function(){switch(e.state){case"installed":navigator.serviceWorker.controller}}}}).catch(function(n){})});var i={board:{startDrag:function(n){return function(){return{src:n,dragging:!0}}},over:function(n){return function(e){var t=e.dragging,r=e.src;return{dst:t&&n!=r?n:null}}},reset:function(){return function(){return{src:null,dst:null,dragging:!1}}}},dropToken:function(n){return function(e){var t=e.board.src,r=e.ledger;return n==t||null==t||null==n?{board:i.board.reset()()}:{board:i.board.reset()(),ledger:r.concat([[t,n]])}}}},a={pools:{distance:10,shadow:0,lifeTop:8,lifeBottom:8,auraTop:3,auraBottom:3,flareTop:0,flareBottom:0},board:{dragging:!1,src:null,dst:null},ledger:[]},l=function(e){var t=e.visible;return n("svg",{width:"79.578mm",height:"158.75mm",version:"1.1",viewBox:"0 0 79.578 158.75",style:{position:"absolute",top:0,bottom:0,width:"100%",height:"100%"}},n("g",{transform:"translate(-13.128 -80.042)"},n("path",{d:"m92.226 164.71c3.9811-28.587-18.143-84.667-18.143-84.667l-21.167 21.167-21.167-21.167s-22.124 56.08-18.143 84.667c3.8559 27.688 39.31 74.083 39.31 74.083s35.454-46.395 39.31-74.083z",fill:t?"#f5a5ad":"white",stroke:t?"":"#f5a5ad","image-rendering":"auto"})))},c=function(e){var t=e.value;return n("div",{class:"distance pool-content"},new Array(10).fill().map(function(e,r){var o=(10-t)/2,u=r+1<=t+o&&r+1>o;return n("div",{class:["step","step"+r,r%2==0?"flip":""].join(" "),key:r+1},n(l,{visible:u}))}))},s=function(e){var t=e.value,r=e.label,o=e.limit,u=r+": "+t+"/"+(o||"∞");return n("div",{class:"pool-content shadow-renderer"},n("div",null,u),n("div",{class:"flip"},u))},f=function(e){return n("div",{class:"board "+(e.board.dragging?"dragging":"")},n(r,{player:"Top"}),n("div",{class:"common-area"},n(t,{name:"shadow",renderer:s}),n(t,{name:"distance",limit:10,renderer:c})),n(r,{player:"Bottom"}))},d=function(n,e,t){},v=function(n){return"function"==typeof n},g=function(){for(var n=[],e=arguments.length;e--;)n[e]=arguments[e];return n.reduce(function(n,e){return function(){for(var t=[],r=arguments.length;r--;)t[r]=arguments[r];return n(e.apply(void 0,t))}})},p=function(){for(var n=[],e=arguments.length;e--;)n[e]=arguments[e];return g.apply(void 0,n.reverse())},m=function(n){return n.reduce(function(n,e){var t,r=e[0],o=e[1];return Object.assign({},n,(t={},t[r]=n[r]-1,t[o]=n[o]+1,t))},a.pools)},h=function(n){return function(e,t,r,o){return n(Object.assign({},e,{pools:m(e.ledger)}),Object.assign({},t,{dropToken:function(n){return function(e){return p(t.dropToken(n),function(n){return Object.assign({},e,n)},function(n){return Object.assign({},n,{pools:m(n.ledger)})},function(n){return n})(e)}}}),r,o)}};g(function(n){return function(e){return function(t,r,o,u){return e(Object.assign({},t,{ledger:JSON.parse(n.getItem("ledger"))||t.ledger}),Object.assign({},r,{dropToken:function(e){return function(t){return p(r.dropToken(e),function(n){return Object.assign({},t,n)},function(e){return n.setItem("ledger",JSON.stringify(e.ledger)),e},function(n){return n})(t)}},clear:function(){return function(){return n.setItem("ledger",null)}}}),o,u)}}}(sessionStorage),h,u)(e)(a,i,f,document.body)}();