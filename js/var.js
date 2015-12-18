slideMe = slideMe || {};
slideMe.getHead = document.getElementsByTagName('head')[0];
slideMe.timeList = [];
slideMe.currentArrayNr = '00';
slideMe.contentReady = false;
slideMe.videoready = false;
slideMe.isreloading = false;
slideMe.DOM = {};
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
if (document.all && !window.atob) {
    "document"in self&&("classList"in document.createElement("_")?function(){var a=document.createElement("_");a.classList.add("c1","c2");if(!a.classList.contains("c2")){var c=function(a){var e=DOMTokenList.prototype[a];DOMTokenList.prototype[a]=function(a){var c,d=arguments.length;for(c=0;c<d;c++)a=arguments[c],e.call(this,a)}};c("add");c("remove")}a.classList.toggle("c3",!1);if(a.classList.contains("c3")){var k=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(a,c){return 1 in arguments&&
  !this.contains(a)===!c?c:k.call(this,a)}}a=null}():function(a){if("Element"in a){a=a.Element.prototype;var c=Object,k=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},n=Array.prototype.indexOf||function(f){for(var b=0,a=this.length;b<a;b++)if(b in this&&this[b]===f)return b;return-1},e=function(f,b){this.name=f;this.code=DOMException[f];this.message=b},g=function(f,b){if(""===b)throw new e("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(b))throw new e("INVALID_CHARACTER_ERR",
  "String contains an invalid character");return n.call(f,b)},l=function(f){for(var b=k.call(f.getAttribute("class")||""),b=b?b.split(/\s+/):[],a=0,c=b.length;a<c;a++)this.push(b[a]);this._updateClassName=function(){f.setAttribute("class",this.toString())}},d=l.prototype=[],m=function(){return new l(this)};e.prototype=Error.prototype;d.item=function(a){return this[a]||null};d.contains=function(a){return-1!==g(this,a+"")};d.add=function(){var a=arguments,b=0,c=a.length,d,e=!1;do d=a[b]+"",-1===g(this,
  d)&&(this.push(d),e=!0);while(++b<c);e&&this._updateClassName()};d.remove=function(){var a=arguments,b=0,c=a.length,d,e=!1,h;do for(d=a[b]+"",h=g(this,d);-1!==h;)this.splice(h,1),e=!0,h=g(this,d);while(++b<c);e&&this._updateClassName()};d.toggle=function(a,b){a+="";var c=this.contains(a),d=c?!0!==b&&"remove":!1!==b&&"add";if(d)this[d](a);return!0===b||!1===b?b:!c};d.toString=function(){return this.join(" ")};if(c.defineProperty){d={get:m,enumerable:!0,configurable:!0};try{c.defineProperty(a,"classList",
  d)}catch(p){-2146823252===p.number&&(d.enumerable=!1,c.defineProperty(a,"classList",d))}}else c.prototype.__defineGetter__&&a.__defineGetter__("classList",m)}}(self));
}
