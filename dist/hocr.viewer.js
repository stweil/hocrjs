!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(e){return e&&e.__esModule?e:{default:e}}(n(3)),i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._bus=new r.default({})}return o(e,[{key:"$on",value:function(){var e;(e=this._bus).on.apply(e,arguments)}},{key:"$off",value:function(){var e;(e=this._bus).off.apply(e,arguments)}},{key:"$emit",value:function(){var e;(e=this._bus).emit.apply(e,arguments)}}]),e}();t.default=i},function(e,t,n){"use strict";e.exports=n(2)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.HocrjsViewer=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=o(n(0)),a=n(4),l=o(n(6)),s=o(n(7)),c=o(n(10)),u=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.config=Object.assign({},c.default,e),n.dom=n.config.root,"string"==typeof n.dom&&(n.dom=document.querySelector(n.dom)),n.parser=new a.HocrParser(n.config),Object.keys(n.config.fonts).forEach(function(e){var t=n.config.fonts[e].cssUrl;t&&l.default.addCssFragment("hocr-view-font-styles",'@import "'+t+'";\n')}),n.cache={scaleFont:{}},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default),r(t,[{key:"log",value:function(e){var t;if(!(e>this.config.debugLevel)){for(var n=arguments.length,o=Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];(t=console)[["info","debug","log"][e]].apply(t,o)}}},{key:"findByOcrClass",value:function(e){(e=e||{}).tag=e.tag||"*",e.clauses=e.clauses||"",e.title&&(e.clauses+='[title*="'+e.title+'"]'),e.class=e.class||"","string"==typeof e.class&&(e.class=[e.class]);var t=e.class.map(function(e){return 0===e.indexOf("ocr")?e:""===e?"ocr":0!==e.indexOf("x_")?"ocr_"+e:"ocr"+e}).map(function(t){return":scope "+e.tag+'[class^="'+t+'"]'+e.clauses}).join(",");this.log(1,"findByOcrClass:",t);var n=e.context||document.querySelector("."+this.config.rootClass),o=Array.prototype.slice.call(n.querySelectorAll(t));return e.terminal&&(o=o.filter(function(e){if(!e.querySelector('*[class^="ocr"]'))return e})),e.container&&(o=o.filter(function(e){if(e.querySelector('*[class^="ocr"]'))return e})),e.filter&&(o=o.filter(e.filter)),o}},{key:"placeOcrElements",value:function(){var e=this;this.findByOcrClass({title:"bbox"}).forEach(function(t){var n=e.parser.bbox(t);t.style.left=n[0]+"px",t.style.top=n[1]+"px",t.style.width=n[2]-n[0]+"px",t.style.height=n[3]-n[1]+"px"});var t=this.parser.bbox(document.querySelector(".ocr_page"));document.querySelector("body").style.minHeight=t[2]+"px"}},{key:"toggleScaleFont",value:function(e){var t=this;console.time("toggleScaleFont");var n=document.querySelector("."+this.config.features.scaleFont.wrapClass);n||((n=document.createElement("span")).classList.add(this.config.features.scaleFont.wrapClass),this.dom.appendChild(n)),e?this.findByOcrClass({terminal:!0}).forEach(function(e){return t.scaleFont(e,n)}):this.findByOcrClass({terminal:!0}).forEach(function(e){return e.style.fontSize="initial"}),console.timeEnd("toggleScaleFont")}},{key:"scaleFont",value:function(e,t){if(0!==e.textContent.trim().length){if(!(e.textContent in this.cache.scaleFont)){t.style.fontFamily=e.style.fontFamily,t.innerHTML=e.textContent;var n="offsetWidth",o="offsetHeight",r=Math.min(e[n],e[o]),i=this.config.features.scaleFont.minFontSize;for(t.style.fontSize=r+"px",r>i&&t[o]>e[o]&&(r-=t[o]-e[o],t.style.fontSize=r+"px");r>i&&t[n]>e[n];)r-=1,t.style.fontSize=r+"px";this.cache.scaleFont[e.textContent]=r}e.style.fontSize=this.cache.scaleFont[e.textContent]+"px"}}},{key:"toggleTooltips",value:function(e){var t=this,n=document.querySelector("#"+this.config.features.tooltips.styleId);if(e){var o={},r=!0,i=!1,a=void 0;try{for(var l,s=this.findByOcrClass()[Symbol.iterator]();!(r=(l=s.next()).done);r=!0){o[l.value.getAttribute("class")]=!0}}catch(e){i=!0,a=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw a}}this.log(0,"Detected OCR classes",Object.keys(o)),n||(n=document.createElement("style")).setAttribute("id",this.config.features.tooltips.styleId),n.appendChild(document.createTextNode(Object.keys(o).map(function(e){return"."+t.config.rootClass+" ."+e+':hover::before { content: "'+e+'"; }\n'}).join("\n"))),document.head.appendChild(n)}else n&&n.remove()}},{key:"toggleBackgroundImage",value:function(e){var t=this,n=this.dom.querySelector(".ocr_page");e?this.findByOcrClass({title:"image"}).forEach(function(e){var o=t.parser.image(e);n.style.backgroundImage="url("+o+")"}):n.style.backgroundImage=""}},{key:"toggleContentEditable",value:function(e){var t=this,n=function(e){console.warn("Scaling of contentEditable is broken right now"),t.config.features.scaleFont.enabled&&(t.scaleFont(e.target),t.findByOcrClass({context:e.target}).forEach(function(e){t.scaleFont(e)}))};this.findByOcrClass({class:["line","x_word"],clauses:""}).forEach(function(t){e?(t.setAttribute("contentEditable","true"),t.addEventListener("input",n)):(t.removeAttribute("contentEditable"),t.removeEventListener("input",n))})}},{key:"toggleFeature",value:function(e,t){this.dom.classList.toggle("feature-"+e,t);var n="toggle"+e.substr(0,1).toUpperCase()+e.substring(1);n in this&&(this.log(0,"Calling this."+n),this[n](t))}},{key:"scaleTo",value:function(e){var t=this.dom.querySelector(".ocr_page"),n=this.parser.bbox(document.querySelector(".ocr_page"));"height"===e?e=window.innerHeight/n[3]:"width"===e?e=window.innerWidth/n[2]:"original"===e&&(e=1),t.style.transform="scale("+e+")",t.style.transformOrigin="top left",this.$emit("scale-to",e)}},{key:"onConfigChange",value:function(){var e=this;Object.keys(this.config.features).forEach(function(t){e.toggleFeature(t,e.config.features[t].enabled)})}},{key:"init",value:function(){var e=this;this.dom.classList.add(this.config.rootClass),this.config.enableToolbar&&(this.toolbar=new s.default({$parent:this,config:this.config})),this.placeOcrElements(),this.onConfigChange(),window.addEventListener("resize",function(){return e.onConfigChange()})}}]),t}();t.HocrjsViewer=u},function(e,t){function n(){}n.prototype={on:function(e,t,n){var o=this.e||(this.e={});return(o[e]||(o[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){function o(){r.off(e,o),t.apply(n,arguments)}var r=this;return o._=t,this.on(e,o,n)},emit:function(e){var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),o=0,r=n.length;for(o;o<r;o++)n[o].fn.apply(n[o].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),o=n[e],r=[];if(o&&t)for(var i=0,a=o.length;i<a;i++)o[i].fn!==t&&o[i].fn._!==t&&r.push(o[i]);return r.length?n[e]=r:delete n[e],this}},e.exports=n},function(e,t,n){"use strict";e.exports=n(5)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.HocrParser=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return o(e,[{key:"parseTitle",value:function(e){e=this._titleString(e);for(var t=0;t<e.length;t++);}},{key:"bbox",value:function(e){return this._titleString(e).match(/bbox\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/).slice(1).map(function(e){return parseInt(e)})}},{key:"image",value:function(e){return this._titleString(e).match(/image\s+"([^"]+)"/)[1]}},{key:"_titleString",value:function(e){return"string"==typeof e?e:e.getAttribute("title")}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return o(e,null,[{key:"addCssFragment",value:function(e,t){var n=document.querySelector("#"+e);n||((n=document.createElement("style")).id=e,document.head.appendChild(n)),n.appendChild(document.createTextNode(t))}}]),e}();t.default=r},function(e,t,n){"use strict";e.exports=n(8)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=o(n(0)),a=o(n(9)),l=function(e){function t(e){var n=e.$parent,o=e.config;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this)),i=document.createElement("div");i.innerHTML=a.default,r.dom=i.querySelector("div"),n.dom.appendChild(r.dom),r.dom.querySelector(".toggler").addEventListener("click",function(e){o.expandToolbar=!o.expandToolbar,r.toggle(o.expandToolbar)});var l=r.dom.querySelector("select.fontlist");console.log(l),Object.keys(o.fonts).forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.style.fontSize="large",t.style.fontFamily=e,l.appendChild(t)}),l.addEventListener("change",function(e){var t=e.target.options[e.target.selectedIndex].innerHTML;n.findByOcrClass().forEach(function(e){e.style.fontFamily=t}),n.onConfigChange()}),Object.keys(o.features).forEach(function(e){var t=document.createElement("li"),i=document.createElement("input"),a=document.createElement("label");t.appendChild(i),t.appendChild(a),r.dom.querySelector(".features").appendChild(t),a.innerHTML=e,i.setAttribute("type","checkbox"),i.checked=o.features[e].enabled,t.classList.toggle("checked",i.checked);t.addEventListener("click",function(r){i.checked=!i.checked,t.classList.toggle("checked"),o.features[e].enabled=i.checked,n.toggleFeature(e,i.checked)}),i.addEventListener("change",function(r){t.classList.toggle("checked",i.checked),o.features[e].enabled=i.checked,n.toggleFeature(e,i.checked)})});var s=r.dom.querySelector('input[type="range"].zoom');s.addEventListener("input",function(e){return n.scaleTo(e.target.value/100)});var c=!0,u=!1,f=void 0;try{for(var d,h=r.dom.querySelectorAll("button.zoom")[Symbol.iterator]();!(c=(d=h.next()).done);c=!0){d.value.addEventListener("click",function(e){return n.scaleTo(e.target.dataset.scaleFactor)})}}catch(e){u=!0,f=e}finally{try{!c&&h.return&&h.return()}finally{if(u)throw f}}return n.$on("scale-to",function(e){r.dom.querySelector("span.zoom").innerHTML=Math.floor(1e4*e)/100,s.value=100*e}),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default),r(t,[{key:"toggle",value:function(e){this.dom.classList.toggle("expanded",e)}}]),t}();t.default=l},function(e,t){e.exports='<div class="hocrjs-toolbar">\n  <div class="toggler">\n    <div class="toggler-inner toggler-show">\n      &gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>\n    </div>\n    <div class="toggler-inner toggler-hide">\n      &lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>\n    </div>\n  </div>\n  <div class="wrapper">\n    <h2>Font</h2>\n    <select class="fontlist"></select>\n    <h2>Features</h2>\n    <ul class="features">\n    </ul>\n    <h2>Zoom</h2>\n    <input type="range" class="zoom" min="0" max="500" step="2" value="100"/>\n    <span class="zoom">100</span>%\n    <p>\n      <button class="zoom" data-scale-factor="height">Fit height</button>\n      <button class="zoom" data-scale-factor="width">Fit width</button>\n      <button class="zoom" data-scale-factor="original">100 %</button>\n    </p>\n  </div>\n</div>\n\n'},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={root:"body",debugLevel:1,fonts:{"sans-serif":{},serif:{},monospace:{},UnifrakturCook:{cssUrl:"https://fonts.googleapis.com/css?family=UnifrakturCook:700"},UnifrakturMaguntia:{cssUrl:"https://fonts.googleapis.com/css?family=UnifrakturMaguntia"},"Old Standard TT":{cssUrl:"https://fonts.googleapis.com/css?family=Old+Standard+TT"},Cardo:{cssUrl:"https://fonts.googleapis.com/css?family=Cardo"},"Noto Serif":{cssUrl:"https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700&subset=latin-ext"},"Libre Baskerville":{cssUrl:"https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&subset=latin-ext"}},features:{layout:{enabled:!0},backgroundImage:{enabled:!1},scaleFont:{enabled:!1,maxFontSize:128,minFontSize:2,wrapClass:"hocr-viewer-wrap"},disableEmStrong:{enabled:!1},contentEditable:{enabled:!1},tooltips:{enabled:!0,styleId:"hocr-viewer-tooltip-style"},transparentText:{enabled:!1},highlight:{enabled:!0},highlightNotPage:{enabled:!1},highlightInline:{enabled:!1},highlightLine:{enabled:!1},highlightPar:{enabled:!1},highlightCarea:{enabled:!1}},expandToolbar:!0,enableToolbar:!0,rootClass:"hocr-viewer"}}]);