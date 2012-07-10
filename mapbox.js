/*!
  * bean.js - copyright Jacob Thornton 2011
  * https://github.com/fat/bean
  * MIT License
  * special thanks to:
  * dean edwards: http://dean.edwards.name/
  * dperini: https://github.com/dperini/nwevents
  * the entire mootools team: github.com/mootools/mootools-core
  */
!function(a,b,c){typeof module!="undefined"?module.exports=c(a,b):typeof define=="function"&&typeof define.amd=="object"?define(c):b[a]=c(a,b)}("bean",this,function(a,b){var c=window,d=b[a],e=/over|out/,f=/[^\.]*(?=\..*)\.|.*/,g=/\..*/,h="addEventListener",i="attachEvent",j="removeEventListener",k="detachEvent",l="ownerDocument",m="target",n="querySelectorAll",o=document||{},p=o.documentElement||{},q=p[h],r=q?h:i,s=Array.prototype.slice,t=/click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,u=/mouse.*(wheel|scroll)/i,v=/^text/i,w=/^touch|^gesture/i,x={},y=function(a,b,c){for(c=0;c<b.length;c++)a[b[c]]=1;return a}({},("click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll "+(q?"show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ":"")).split(" ")),z=function(){function c(a){var c=a.relatedTarget;return c?c!==this&&c.prefix!=="xul"&&!/document/.test(this.toString())&&!b(c,this):c===null}var a="compareDocumentPosition",b=a in p?function(b,c){return c[a]&&(c[a](b)&16)===16}:"contains"in p?function(a,b){return b=b.nodeType===9||b===window?p:b,b!==a&&b.contains(a)}:function(a,b){while(a=a.parentNode)if(a===b)return 1;return 0};return{mouseenter:{base:"mouseover",condition:c},mouseleave:{base:"mouseout",condition:c},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}}}(),A=function(){var a="altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which".split(" "),b=a.concat("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" ")),c=b.concat("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis".split(" ")),d=a.concat("char charCode key keyCode keyIdentifier keyLocation".split(" ")),f=a.concat(["data"]),g=a.concat("touches targetTouches changedTouches scale rotation".split(" ")),h=a.concat(["data","origin","source"]),i="preventDefault",j=function(a){return function(){a[i]?a[i]():a.returnValue=!1}},k="stopPropagation",l=function(a){return function(){a[k]?a[k]():a.cancelBubble=!0}},n=function(a){return function(){a[i](),a[k](),a.stopped=!0}},q=function(a,b,c){var d,e;for(d=c.length;d--;)e=c[d],!(e in b)&&e in a&&(b[e]=a[e])};return function(r,s){var x={originalEvent:r,isNative:s};if(!r)return x;var y,z=r.type,A=r[m]||r.srcElement;x[i]=j(r),x[k]=l(r),x.stop=n(x),x[m]=A&&A.nodeType===3?A.parentNode:A;if(s){if(z.indexOf("key")!==-1)y=d,x.keyCode=r.keyCode||r.which;else if(t.test(z)){y=b,x.rightClick=r.which===3||r.button===2,x.pos={x:0,y:0};if(r.pageX||r.pageY)x.clientX=r.pageX,x.clientY=r.pageY;else if(r.clientX||r.clientY)x.clientX=r.clientX+o.body.scrollLeft+p.scrollLeft,x.clientY=r.clientY+o.body.scrollTop+p.scrollTop;e.test(z)&&(x.relatedTarget=r.relatedTarget||r[(z==="mouseover"?"from":"to")+"Element"])}else w.test(z)?y=g:u.test(z)?y=c:v.test(z)?y=f:z==="message"&&(y=h);q(r,x,y||a)}return x}}(),B=function(a,b){return!q&&!b&&(a===o||a===c)?p:a},C=function(){function a(a,b,c,d,e){var f=this.isNative=y[b]&&a[r];this.element=a,this.type=b,this.handler=c,this.original=d,this.namespaces=e,this.custom=z[b],this.eventType=q||f?b:"propertychange",this.customType=!q&&!f&&b,this[m]=B(a,f),this[r]=this[m][r]}return a.prototype={inNamespaces:function(a){var b,c;if(!a)return!0;if(!this.namespaces)return!1;for(b=a.length;b--;)for(c=this.namespaces.length;c--;)if(a[b]===this.namespaces[c])return!0;return!1},matches:function(a,b,c){return this.element===a&&(!b||this.original===b)&&(!c||this.handler===c)}},a}(),D=function(){var a={},b=function(c,d,e,f,g){if(!d||d==="*")for(var h in a)h.charAt(0)==="$"&&b(c,h.substr(1),e,f,g);else{var i=0,j,k=a["$"+d],l=c==="*";if(!k)return;for(j=k.length;i<j;i++)if(l||k[i].matches(c,e,f))if(!g(k[i],k,i,d))return}},c=function(b,c,d){var e,f=a["$"+c];if(f)for(e=f.length;e--;)if(f[e].matches(b,d,null))return!0;return!1},d=function(a,c,d){var e=[];return b(a,c,d,null,function(a){return e.push(a)}),e},e=function(b){return(a["$"+b.type]||(a["$"+b.type]=[])).push(b),b},f=function(c){b(c.element,c.type,null,c.handler,function(b,c,d){return c.splice(d,1),c.length===0&&delete a["$"+b.type],!1})},g=function(){var b,c=[];for(b in a)b.charAt(0)==="$"&&(c=c.concat(a[b]));return c};return{has:c,get:d,put:e,del:f,entries:g}}(),E=o[n]?function(a,b){return b[n](a)}:function(){throw new Error("Bean: No selector engine installed")},F=function(a){E=a},G=q?function(a,b,c,d){a[d?h:j](b,c,!1)}:function(a,b,c,d,e){e&&d&&a["_on"+e]===null&&(a["_on"+e]=0),a[d?i:k]("on"+b,c)},H=function(a,b,d){var e=b.__beanDel,f=function(f){return f=A(f||((this[l]||this.document||this).parentWindow||c).event,!0),e&&(f.currentTarget=e.ft(f[m],a)),b.apply(a,[f].concat(d))};return f.__beanDel=e,f},I=function(a,b,d,e,f,g){var h=b.__beanDel,i=function(i){var j=h?h.ft(i[m],a):this;if(e?e.apply(j,arguments):q?!0:i&&i.propertyName==="_on"+d||!i)i&&(i=A(i||((this[l]||this.document||this).parentWindow||c).event,g),i.currentTarget=j),b.apply(a,i&&(!f||f.length===0)?arguments:s.call(arguments,i?0:1).concat(f))};return i.__beanDel=h,i},J=function(a,b,c,d,e){return function(){a(b,c,e),d.apply(this,arguments)}},K=function(a,b,c,d){var e,f,h,i=b&&b.replace(g,""),j=D.get(a,i,c);for(e=0,f=j.length;e<f;e++)j[e].inNamespaces(d)&&((h=j[e])[r]&&G(h[m],h.eventType,h.handler,!1,h.type),D.del(h))},L=function(a,b,c,d,e){var h,i=b.replace(g,""),j=b.replace(f,"").split(".");if(D.has(a,i,c))return a;i==="unload"&&(c=J(K,a,i,c,d)),z[i]&&(z[i].condition&&(c=I(a,c,i,z[i].condition,e,!0)),i=z[i].base||i),h=D.put(new C(a,i,c,d,j[0]&&j)),h.handler=h.isNative?H(a,h.handler,e):I(a,h.handler,i,!1,e,!1),h[r]&&G(h[m],h.eventType,h.handler,!0,h.customType)},M=function(a,b,c){var d=function(b,d){var e,f=typeof a=="string"?c(a,d):a;for(;b&&b!==d;b=b.parentNode)for(e=f.length;e--;)if(f[e]===b)return b},e=function(a){var c=d(a[m],this);c&&b.apply(c,arguments)};return e.__beanDel={ft:d,selector:a,$:c},e},N=function(a,b,c){var d,e,h,i,j=K,k=b&&typeof b=="string";if(k&&b.indexOf(" ")>0){b=b.split(" ");for(i=b.length;i--;)N(a,b[i],c);return a}e=k&&b.replace(g,""),e&&z[e]&&(e=z[e].type);if(!b||k){if(h=k&&b.replace(f,""))h=h.split(".");j(a,e,c,h)}else if(typeof b=="function")j(a,null,b);else for(d in b)b.hasOwnProperty(d)&&N(a,d,b[d]);return a},O=function(a,b,c,d,e){var f,g,h,i,j=c,k=c&&typeof c=="string";if(b&&!c&&typeof b=="object")for(f in b)b.hasOwnProperty(f)&&O.apply(this,[a,f,b[f]]);else{i=arguments.length>3?s.call(arguments,3):[],g=(k?c:b).split(" "),k&&(c=M(b,j=d,e||E))&&(i=s.call(i,1)),this===x&&(c=J(N,a,b,c,j));for(h=g.length;h--;)L(a,g[h],c,j,i)}return a},P=function(){return O.apply(x,arguments)},Q=q?function(a,b,d){var e=o.createEvent(a?"HTMLEvents":"UIEvents");e[a?"initEvent":"initUIEvent"](b,!0,!0,c,1),d.dispatchEvent(e)}:function(a,b,c){c=B(c,a),a?c.fireEvent("on"+b,o.createEventObject()):c["_on"+b]++},R=function(a,b,c){var d,e,h,i,j,k=b.split(" ");for(d=k.length;d--;){b=k[d].replace(g,"");if(i=k[d].replace(f,""))i=i.split(".");if(!i&&!c&&a[r])Q(y[b],b,a);else{j=D.get(a,b),c=[!1].concat(c);for(e=0,h=j.length;e<h;e++)j[e].inNamespaces(i)&&j[e].handler.apply(a,c)}}return a},S=function(a,b,c){var d=0,e=D.get(b,c),f=e.length,g,h;for(;d<f;d++)e[d].original&&(h=e[d].handler.__beanDel,h?g=[a,h.selector,e[d].type,e[d].original,h.$]:g=[a,e[d].type,e[d].original],O.apply(null,g));return a},T={add:O,one:P,remove:N,clone:S,fire:R,setSelectorEngine:F,noConflict:function(){return b[a]=d,this}};if(c[i]){var U=function(){var a,b=D.entries();for(a in b)b[a].type&&b[a].type!=="unload"&&N(b[a].element,b[a].type);c[k]("onunload",U),c.CollectGarbage&&c.CollectGarbage()};c[i]("onunload",U)}return T})/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
var Mustache = (typeof module !== "undefined" && module.exports) || {};

(function (exports) {

  exports.name = "mustache.js";
  exports.version = "0.5.1-dev";
  exports.tags = ["{{", "}}"];

  exports.parse = parse;
  exports.clearCache = clearCache;
  exports.compile = compile;
  exports.compilePartial = compilePartial;
  exports.render = render;

  exports.Scanner = Scanner;
  exports.Context = Context;
  exports.Renderer = Renderer;

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  function testRe(re, string) {
    return RegExp.prototype.test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRe(nonSpaceRe, string);
  }

  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  // OSWASP Guidlines: escape all non alphanumeric characters in ASCII space.
  var jsCharsRe = /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF\u2028\u2029]/gm;

  function quote(text) {
    var escaped = text.replace(jsCharsRe, function (c) {
      return "\\u" + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
    });

    return '"' + escaped + '"';
  }

  function escapeRe(string) {
    return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  // Export these utility functions.
  exports.isWhitespace = isWhitespace;
  exports.isArray = isArray;
  exports.quote = quote;
  exports.escapeRe = escapeRe;
  exports.escapeHtml = escapeHtml;

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, `null` otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return null;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail of this scanner if no match
   * can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = null;
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this.clearCache();
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.clearCache = function () {
    this._cache = {};
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name === ".") {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf(".") > 0) {
            var names = name.split("."), i = 0;

            value = context.view;

            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) {
            break;
          }

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === "function") {
      value = value.call(this.view);
    }

    return value;
  };

  function Renderer() {
    this.clearCache();
  }

  Renderer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Renderer.prototype.compile = function (tokens, tags) {
    var fn = compileTokens(tokens),
        self = this;

    return function (view) {
      return fn(Context.make(view), self);
    };
  };

  Renderer.prototype.compilePartial = function (name, tokens, tags) {
    this._partialCache[name] = this.compile(tokens, tags);
    return this._partialCache[name];
  };

  Renderer.prototype.render = function (template, view) {
    var fn = this._cache[template];

    if (!fn) {
      fn = this.compile(template);
      this._cache[template] = fn;
    }

    return fn(view);
  };

  Renderer.prototype._section = function (name, context, callback) {
    var value = context.lookup(name);

    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";
        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(context.push(value[i]), this);
        }
        return buffer;
      } else {
        return callback(context.push(value), this);
      }
      break;
    case "function":
      var sectionText = callback(context, this), self = this;
      var scopedRender = function (template) {
        return self.render(template, context);
      };
      return value.call(context.view, sectionText, scopedRender) || "";
      break;
    default:
      if (value) {
        return callback(context, this);
      }
    }

    return "";
  };

  Renderer.prototype._inverted = function (name, context, callback) {
    var value = context.lookup(name);

    // From the spec: inverted sections may render text once based on the
    // inverse value of the key. That is, they will be rendered if the key
    // doesn't exist, is false, or is an empty list.
    if (value == null || value === false || (isArray(value) && value.length === 0)) {
      return callback(context, this);
    }

    return "";
  };

  Renderer.prototype._partial = function (name, context) {
    var fn = this._partialCache[name];

    if (fn) {
      return fn(context, this);
    }

    return "";
  };

  Renderer.prototype._name = function (name, context, escape) {
    var value = context.lookup(name);

    if (typeof value === "function") {
      value = value.call(context.view);
    }

    var string = (value == null) ? "" : String(value);

    if (escape) {
      return escapeHtml(string);
    }

    return string;
  };

  /**
   * Low-level function that compiles the given `tokens` into a
   * function that accepts two arguments: a Context and a
   * Renderer. Returns the body of the function as a string if
   * `returnBody` is true.
   */
  function compileTokens(tokens, returnBody) {
    if (typeof tokens === "string") {
      tokens = parse(tokens);
    }

    var body = ['""'];
    var token, method, escape;

    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token.type) {
      case "#":
      case "^":
        method = (token.type === "#") ? "_section" : "_inverted";
        body.push("r." + method + "(" + quote(token.value) + ", c, function (c, r) {\n" +
          "  " + compileTokens(token.tokens, true) + "\n" +
          "})");
        break;
      case "{":
      case "&":
      case "name":
        escape = token.type === "name" ? "true" : "false";
        body.push("r._name(" + quote(token.value) + ", c, " + escape + ")");
        break;
      case ">":
        body.push("r._partial(" + quote(token.value) + ", c)");
        break;
      case "text":
        body.push(quote(token.value));
        break;
      }
    }

    // Convert to a string body.
    body = "return " + body.join(" + ") + ";";

    // Good for debugging.
    // console.log(body);

    if (returnBody) {
      return body;
    }

    // For great evil!
    return new Function("c, r", body);
  }

  function escapeTags(tags) {
    if (tags.length === 2) {
      return [
        new RegExp(escapeRe(tags[0]) + "\\s*"),
        new RegExp("\\s*" + escapeRe(tags[1]))
      ];
    }

    throw new Error("Invalid tags: " + tags.join(" "));
  }

  /**
   * Forms the given linear array of `tokens` into a nested tree structure
   * where tokens that represent a section have a "tokens" array property
   * that contains all tokens that are in that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];
    var token, section;

    for (var i = 0; i < tokens.length; ++i) {
      token = tokens[i];

      switch (token.type) {
      case "#":
      case "^":
        token.tokens = [];
        sections.push(token);
        collector.push(token);
        collector = token.tokens;
        break;
      case "/":
        if (sections.length === 0) {
          throw new Error("Unopened section: " + token.value);
        }

        section = sections.pop();

        if (section.value !== token.value) {
          throw new Error("Unclosed section: " + section.value);
        }

        if (sections.length > 0) {
          collector = sections[sections.length - 1].tokens;
        } else {
          collector = tree;
        }
        break;
      default:
        collector.push(token);
      }
    }

    // Make sure there were no open sections when we're done.
    section = sections.pop();

    if (section) {
      throw new Error("Unclosed section: " + section.value);
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var lastToken;

    for (var i = 0; i < tokens.length; ++i) {
      var token = tokens[i];

      if (lastToken && lastToken.type === "text" && token.type === "text") {
        lastToken.value += token.value;
        tokens.splice(i--, 1); // Remove this token from the array.
      } else {
        lastToken = token;
      }
    }
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  function parse(template, tags) {
    tags = tags || exports.tags;
    var tagRes = escapeTags(tags);

    var scanner = new Scanner(template);

    var tokens = [],      // Buffer to hold the tokens
        spaces = [],      // Indices of whitespace tokens on the current line
        hasTag = false,   // Is there a {{tag}} on the current line?
        nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    var stripSpace = function () {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          tokens.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    };

    var type, value, chr;

    while (!scanner.eos()) {
      value = scanner.scanUntil(tagRes[0]);

      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value[i];

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push({type: "text", value: chr});

          if (chr === "\n") {
            stripSpace(); // Check for whitespace on the current line.
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) {
        break;
      }

      hasTag = true;
      type = scanner.scan(tagRe) || "name";

      // Skip any whitespace between tag and value.
      scanner.scan(whiteRe);

      // Extract the tag value.
      if (type === "=") {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === "{") {
        var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
        value = scanner.scanUntil(closeRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error("Unclosed tag at " + scanner.pos);
      }

      tokens.push({type: type, value: value});

      if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      }

      // Set the tags for the next time around.
      if (type === "=") {
        tags = value.split(spaceRe);
        tagRes = escapeTags(tags);
      }
    }

    squashTokens(tokens);

    return nestTokens(tokens);
  }

  // The high-level clearCache, compile, compilePartial, and render functions
  // use this default renderer.
  var _renderer = new Renderer;

  /**
   * Clears all cached templates and partials.
   */
  function clearCache() {
    _renderer.clearCache();
  }

  /**
   * High-level API for compiling the given `tokens` down to a reusable
   * function. If `tokens` is a string it will be parsed using the given `tags`
   * before it is compiled.
   */
  function compile(tokens, tags) {
    return _renderer.compile(tokens, tags);
  }

  /**
   * High-level API for compiling the `tokens` for the partial with the given
   * `name` down to a reusable function. If `tokens` is a string it will be
   * parsed using the given `tags` before it is compiled.
   */
  function compilePartial(name, tokens, tags) {
    return _renderer.compilePartial(name, tokens, tags);
  }

  /**
   * High-level API for rendering the `template` using the given `view`. The
   * optional `partials` object may be given here for convenience, but note that
   * it will cause all partials to be re-compiled, thus hurting performance. Of
   * course, this only matters if you're going to render the same template more
   * than once. If so, it is best to call `compilePartial` before calling this
   * function and to leave the `partials` argument blank.
   */
  function render(template, view, partials) {
    if (partials) {
      for (var name in partials) {
        compilePartial(name, partials[name]);
      }
    }

    return _renderer.render(template, view);
  }

})(Mustache);
/*!
  * Reqwest! A general purpose XHR connection manager
  * (c) Dustin Diaz 2011
  * https://github.com/ded/reqwest
  * license MIT
  */
!function(a,b){typeof module!="undefined"?module.exports=b():typeof define=="function"&&define.amd?define(a,b):this[a]=b()}("reqwest",function(){function handleReadyState(a,b,c){return function(){a&&a[readyState]==4&&(twoHundo.test(a.status)?b(a):c(a))}}function setHeaders(a,b){var c=b.headers||{},d;c.Accept=c.Accept||defaultHeaders.accept[b.type]||defaultHeaders.accept["*"],!b.crossOrigin&&!c[requestedWith]&&(c[requestedWith]=defaultHeaders.requestedWith),c[contentType]||(c[contentType]=b.contentType||defaultHeaders.contentType);for(d in c)c.hasOwnProperty(d)&&a.setRequestHeader(d,c[d])}function generalCallback(a){lastValue=a}function urlappend(a,b){return a+(/\?/.test(a)?"&":"?")+b}function handleJsonp(a,b,c,d){var e=uniqid++,f=a.jsonpCallback||"callback",g=a.jsonpCallbackName||"reqwest_"+e,h=new RegExp("((^|\\?|&)"+f+")=([^&]+)"),i=d.match(h),j=doc.createElement("script"),k=0;i?i[3]==="?"?d=d.replace(h,"$1="+g):g=i[3]:d=urlappend(d,f+"="+g),win[g]=generalCallback,j.type="text/javascript",j.src=d,j.async=!0,typeof j.onreadystatechange!="undefined"&&(j.event="onclick",j.htmlFor=j.id="_reqwest_"+e),j.onload=j.onreadystatechange=function(){if(j[readyState]&&j[readyState]!=="complete"&&j[readyState]!=="loaded"||k)return!1;j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),a.success&&a.success(lastValue),lastValue=undefined,head.removeChild(j),k=1},head.appendChild(j)}function getRequest(a,b,c){var d=(a.method||"GET").toUpperCase(),e=typeof a=="string"?a:a.url,f=a.processData!==!1&&a.data&&typeof a.data!="string"?reqwest.toQueryString(a.data):a.data||null,g;return(a.type=="jsonp"||d=="GET")&&f&&(e=urlappend(e,f),f=null),a.type=="jsonp"?handleJsonp(a,b,c,e):(g=xhr(),g.open(d,e,!0),setHeaders(g,a),g.onreadystatechange=handleReadyState(g,b,c),a.before&&a.before(g),g.send(f),g)}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments)}function setType(a){var b=a.match(/\.(json|jsonp|html|xml)(\?|$)/);return b?b[1]:"js"}function init(o,fn){function complete(a){o.timeout&&clearTimeout(self.timeout),self.timeout=null,o.complete&&o.complete(a)}function success(resp){var r=resp.responseText;if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r}fn(resp),o.success&&o.success(resp),complete(resp)}function error(a,b,c){o.error&&o.error(a,b,c),complete(a)}this.url=typeof o=="string"?o:o.url,this.timeout=null;var type=o.type||setType(this.url),self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){self.abort()},o.timeout)),this.request=getRequest(o,success,error)}function reqwest(a,b){return new Reqwest(a,b)}function normalize(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function serial(a,b){var c=a.name,d=a.tagName.toLowerCase(),e=function(a){a&&!a.disabled&&b(c,normalize(a.attributes.value&&a.attributes.value.specified?a.value:a.text))};if(a.disabled||!c)return;switch(d){case"input":if(!/reset|button|image|file/i.test(a.type)){var f=/checkbox/i.test(a.type),g=/radio/i.test(a.type),h=a.value;(!f&&!g||a.checked)&&b(c,normalize(f&&h===""?"on":h))}break;case"textarea":b(c,normalize(a.value));break;case"select":if(a.type.toLowerCase()==="select-one")e(a.selectedIndex>=0?a.options[a.selectedIndex]:null);else for(var i=0;a.length&&i<a.length;i++)a.options[i].selected&&e(a.options[i])}}function eachFormElement(){var a=this,b,c,d,e=function(b,c){for(var e=0;e<c.length;e++){var f=b[byTag](c[e]);for(d=0;d<f.length;d++)serial(f[d],a)}};for(c=0;c<arguments.length;c++)b=arguments[c],/input|select|textarea/i.test(b.tagName)&&serial(b,a),e(b,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var a={};return eachFormElement.apply(function(b,c){b in a?(a[b]&&!isArray(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments),a}var win=window,doc=document,twoHundo=/^20\d$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,lastValue,xmlHttpRequest="XMLHttpRequest",isArray=typeof Array.isArray=="function"?Array.isArray:function(a){return a instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"},requestedWith:xmlHttpRequest},xhr=win[xmlHttpRequest]?function(){return new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")};return Reqwest.prototype={abort:function(){this.request.abort()},retry:function(){init.call(this,this.o,this.fn)}},reqwest.serializeArray=function(){var a=[];return eachFormElement.apply(function(b,c){a.push({name:b,value:c})},arguments),a},reqwest.serialize=function(){if(arguments.length===0)return"";var a,b,c=Array.prototype.slice.call(arguments,0);return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),a=="map"?b=serializeHash:a=="array"?b=reqwest.serializeArray:b=serializeQueryString,b.apply(null,c)},reqwest.toQueryString=function(a){var b="",c,d=encodeURIComponent,e=function(a,c){b+=d(a)+"="+d(c)+"&"};if(isArray(a))for(c=0;a&&c<a.length;c++)e(a[c].name,a[c].value);else for(var f in a){if(!Object.hasOwnProperty.call(a,f))continue;var g=a[f];if(isArray(g))for(c=0;c<g.length;c++)e(f,g[c]);else e(f,a[f])}return b.replace(/&$/,"").replace(/%20/g,"+")},reqwest.compat=function(a,b){return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new Reqwest(a,b)},reqwest})/*
 * Modest Maps JS v3.1.3
 * http://modestmaps.com/
 *
 * Copyright (c) 2011 Stamen Design, All Rights Reserved.
 *
 * Open source under the BSD License.
 * http://creativecommons.org/licenses/BSD/
 *
 * Versioned using Semantic Versioning (v.major.minor.patch)
 * See CHANGELOG and http://semver.org/ for more details.
 *
 */
var previousMM=MM;if(!com){var com={};if(!com.modestmaps){com.modestmaps={}}}var MM=com.modestmaps={noConflict:function(){MM=previousMM;return this}};(function(a){a.extend=function(d,b){for(var c in b.prototype){if(typeof d.prototype[c]=="undefined"){d.prototype[c]=b.prototype[c]}}return d};a.getFrame=function(){return function(b){(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(c){window.setTimeout(function(){c(+new Date())},10)})(b)}}();a.transformProperty=(function(d){if(!this.document){return}var c=document.documentElement.style;for(var b=0;b<d.length;b++){if(d[b] in c){return d[b]}}return false})(["transformProperty","WebkitTransform","OTransform","MozTransform","msTransform"]);a.matrixString=function(b){if(b.scale*b.width%1){b.scale+=(1-b.scale*b.width%1)/b.width}var c=b.scale||1;if(a._browser.webkit3d){return"translate3d("+b.x.toFixed(0)+"px,"+b.y.toFixed(0)+"px, 0px)scale3d("+c+","+c+", 1)"}else{return"translate("+b.x.toFixed(6)+"px,"+b.y.toFixed(6)+"px)scale("+c+","+c+")"}};a._browser=(function(b){return{webkit:("WebKitCSSMatrix" in b),webkit3d:("WebKitCSSMatrix" in b)&&("m11" in new WebKitCSSMatrix())}})(this);a.moveElement=function(d,b){if(a.transformProperty){if(!b.scale){b.scale=1}if(!b.width){b.width=0}if(!b.height){b.height=0}var c=a.matrixString(b);if(d[a.transformProperty]!==c){d.style[a.transformProperty]=d[a.transformProperty]=c}}else{d.style.left=b.x+"px";d.style.top=b.y+"px";if(b.width&&b.height&&b.scale){d.style.width=Math.ceil(b.width*b.scale)+"px";d.style.height=Math.ceil(b.height*b.scale)+"px"}}};a.cancelEvent=function(b){b.cancelBubble=true;b.cancel=true;b.returnValue=false;if(b.stopPropagation){b.stopPropagation()}if(b.preventDefault){b.preventDefault()}return false};a.coerceLayer=function(b){if(typeof b=="string"){return new a.Layer(new a.TemplatedLayer(b))}else{if("draw" in b&&typeof b.draw=="function"){return b}else{return new a.Layer(b)}}};a.addEvent=function(d,c,b){if(d.addEventListener){d.addEventListener(c,b,false);if(c=="mousewheel"){d.addEventListener("DOMMouseScroll",b,false)}}else{if(d.attachEvent){d["e"+c+b]=b;d[c+b]=function(){d["e"+c+b](window.event)};d.attachEvent("on"+c,d[c+b])}}};a.removeEvent=function(d,c,b){if(d.removeEventListener){d.removeEventListener(c,b,false);if(c=="mousewheel"){d.removeEventListener("DOMMouseScroll",b,false)}}else{if(d.detachEvent){d.detachEvent("on"+c,d[c+b]);d[c+b]=null}}};a.getStyle=function(c,b){if(c.currentStyle){return c.currentStyle[b]}else{if(window.getComputedStyle){return document.defaultView.getComputedStyle(c,null).getPropertyValue(b)}}};a.Point=function(b,c){this.x=parseFloat(b);this.y=parseFloat(c)};a.Point.prototype={x:0,y:0,toString:function(){return"("+this.x.toFixed(3)+", "+this.y.toFixed(3)+")"},copy:function(){return new a.Point(this.x,this.y)}};a.Point.distance=function(c,b){return Math.sqrt(Math.pow(b.x-c.x,2)+Math.pow(b.y-c.y,2))};a.Point.interpolate=function(d,c,b){return new a.Point(d.x+(c.x-d.x)*b,d.y+(c.y-d.y)*b)};a.Coordinate=function(d,b,c){this.row=d;this.column=b;this.zoom=c};a.Coordinate.prototype={row:0,column:0,zoom:0,toString:function(){return"("+this.row.toFixed(3)+", "+this.column.toFixed(3)+" @"+this.zoom.toFixed(3)+")"},toKey:function(){return this.zoom+","+this.row+","+this.column},copy:function(){return new a.Coordinate(this.row,this.column,this.zoom)},container:function(){return new a.Coordinate(Math.floor(this.row),Math.floor(this.column),Math.floor(this.zoom))},zoomTo:function(b){var c=Math.pow(2,b-this.zoom);return new a.Coordinate(this.row*c,this.column*c,b)},zoomBy:function(c){var b=Math.pow(2,c);return new a.Coordinate(this.row*b,this.column*b,this.zoom+c)},up:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row-b,this.column,this.zoom)},right:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row,this.column+b,this.zoom)},down:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row+b,this.column,this.zoom)},left:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row,this.column-b,this.zoom)}};a.Location=function(b,c){this.lat=parseFloat(b);this.lon=parseFloat(c)};a.Location.prototype={lat:0,lon:0,toString:function(){return"("+this.lat.toFixed(3)+", "+this.lon.toFixed(3)+")"},copy:function(){return new a.Location(this.lat,this.lon)}};a.Location.distance=function(i,h,b){if(!b){b=6378000}var o=Math.PI/180,g=i.lat*o,n=i.lon*o,f=h.lat*o,m=h.lon*o,l=Math.cos(g)*Math.cos(n)*Math.cos(f)*Math.cos(m),k=Math.cos(g)*Math.sin(n)*Math.cos(f)*Math.sin(m),j=Math.sin(g)*Math.sin(f);return Math.acos(l+k+j)*b};a.Location.interpolate=function(i,g,m){if(i.lat===g.lat&&i.lon===g.lon){return new a.Location(i.lat,i.lon)}var s=Math.PI/180,k=i.lat*s,n=i.lon*s,j=g.lat*s,l=g.lon*s;var o=2*Math.asin(Math.sqrt(Math.pow(Math.sin((k-j)/2),2)+Math.cos(k)*Math.cos(j)*Math.pow(Math.sin((n-l)/2),2)));var e=Math.sin((1-m)*o)/Math.sin(o);var b=Math.sin(m*o)/Math.sin(o);var r=e*Math.cos(k)*Math.cos(n)+b*Math.cos(j)*Math.cos(l);var q=e*Math.cos(k)*Math.sin(n)+b*Math.cos(j)*Math.sin(l);var p=e*Math.sin(k)+b*Math.sin(j);var c=Math.atan2(p,Math.sqrt(Math.pow(r,2)+Math.pow(q,2)));var h=Math.atan2(q,r);return new a.Location(c/s,h/s)};a.Location.bearing=function(d,c){var e=Math.PI/180,i=d.lat*e,g=d.lon*e,h=c.lat*e,f=c.lon*e;var b=Math.atan2(Math.sin(g-f)*Math.cos(h),Math.cos(i)*Math.sin(h)-Math.sin(i)*Math.cos(h)*Math.cos(g-f))/-(Math.PI/180);return(b<0)?b+360:b};a.Extent=function(g,c,f,e){if(g instanceof a.Location&&c instanceof a.Location){var d=g,b=c;g=d.lat;c=d.lon;f=b.lat;e=b.lon}if(isNaN(f)){f=g}if(isNaN(e)){e=c}this.north=Math.max(g,f);this.south=Math.min(g,f);this.east=Math.max(e,c);this.west=Math.min(e,c)};a.Extent.prototype={north:0,south:0,east:0,west:0,copy:function(){return new a.Extent(this.north,this.west,this.south,this.east)},toString:function(b){if(isNaN(b)){b=3}return[this.north.toFixed(b),this.west.toFixed(b),this.south.toFixed(b),this.east.toFixed(b)].join(", ")},northWest:function(){return new a.Location(this.north,this.west)},southEast:function(){return new a.Location(this.south,this.east)},northEast:function(){return new a.Location(this.north,this.east)},southWest:function(){return new a.Location(this.south,this.west)},center:function(){return new a.Location(this.south+(this.north-this.south)/2,this.east+(this.west-this.east)/2)},encloseLocation:function(b){if(b.lat>this.north){this.north=b.lat}if(b.lat<this.south){this.south=b.lat}if(b.lon>this.east){this.east=b.lon}if(b.lon<this.west){this.west=b.lon}},encloseLocations:function(c){var b=c.length;for(var d=0;d<b;d++){this.encloseLocation(c[d])}},setFromLocations:function(c){var b=c.length,e=c[0];this.north=this.south=e.lat;this.east=this.west=e.lon;for(var d=1;d<b;d++){this.encloseLocation(c[d])}},encloseExtent:function(b){if(b.north>this.north){this.north=b.north}if(b.south<this.south){this.south=b.south}if(b.east>this.east){this.east=b.east}if(b.west<this.west){this.west=b.west}},containsLocation:function(b){return b.lat>=this.south&&b.lat<=this.north&&b.lon>=this.west&&b.lon<=this.east},toArray:function(){return[this.northWest(),this.southEast()]}};a.Extent.fromString=function(c){var b=c.split(/\s*,\s*/);if(b.length!=4){throw"Invalid extent string (expecting 4 comma-separated numbers)"}return new a.Extent(parseFloat(b[0]),parseFloat(b[1]),parseFloat(b[2]),parseFloat(b[3]))};a.Extent.fromArray=function(b){var c=new a.Extent();c.setFromLocations(b);return c};a.Transformation=function(d,f,b,c,e,g){this.ax=d;this.bx=f;this.cx=b;this.ay=c;this.by=e;this.cy=g};a.Transformation.prototype={ax:0,bx:0,cx:0,ay:0,by:0,cy:0,transform:function(b){return new a.Point(this.ax*b.x+this.bx*b.y+this.cx,this.ay*b.x+this.by*b.y+this.cy)},untransform:function(b){return new a.Point((b.x*this.by-b.y*this.bx-this.cx*this.by+this.cy*this.bx)/(this.ax*this.by-this.ay*this.bx),(b.x*this.ay-b.y*this.ax-this.cx*this.ay+this.cy*this.ax)/(this.bx*this.ay-this.by*this.ax))}};a.deriveTransformation=function(l,k,f,e,b,o,h,g,d,c,n,m){var j=a.linearSolution(l,k,f,b,o,h,d,c,n);var i=a.linearSolution(l,k,e,b,o,g,d,c,m);return new a.Transformation(j[0],j[1],j[2],i[0],i[1],i[2])};a.linearSolution=function(f,o,i,e,n,h,d,m,g){f=parseFloat(f);o=parseFloat(o);i=parseFloat(i);e=parseFloat(e);n=parseFloat(n);h=parseFloat(h);d=parseFloat(d);m=parseFloat(m);g=parseFloat(g);var l=(((h-g)*(o-n))-((i-h)*(n-m)))/(((e-d)*(o-n))-((f-e)*(n-m)));var k=(((h-g)*(f-e))-((i-h)*(e-d)))/(((n-m)*(f-e))-((o-n)*(e-d)));var j=i-(f*l)-(o*k);return[l,k,j]};a.Projection=function(c,b){if(!b){b=new a.Transformation(1,0,0,0,1,0)}this.zoom=c;this.transformation=b};a.Projection.prototype={zoom:0,transformation:null,rawProject:function(b){throw"Abstract method not implemented by subclass."},rawUnproject:function(b){throw"Abstract method not implemented by subclass."},project:function(b){b=this.rawProject(b);if(this.transformation){b=this.transformation.transform(b)}return b},unproject:function(b){if(this.transformation){b=this.transformation.untransform(b)}b=this.rawUnproject(b);return b},locationCoordinate:function(c){var b=new a.Point(Math.PI*c.lon/180,Math.PI*c.lat/180);b=this.project(b);return new a.Coordinate(b.y,b.x,this.zoom)},coordinateLocation:function(c){c=c.zoomTo(this.zoom);var b=new a.Point(c.column,c.row);b=this.unproject(b);return new a.Location(180*b.y/Math.PI,180*b.x/Math.PI)}};a.LinearProjection=function(c,b){a.Projection.call(this,c,b)};a.LinearProjection.prototype={rawProject:function(b){return new a.Point(b.x,b.y)},rawUnproject:function(b){return new a.Point(b.x,b.y)}};a.extend(a.LinearProjection,a.Projection);a.MercatorProjection=function(c,b){a.Projection.call(this,c,b)};a.MercatorProjection.prototype={rawProject:function(b){return new a.Point(b.x,Math.log(Math.tan(0.25*Math.PI+0.5*b.y)))},rawUnproject:function(b){return new a.Point(b.x,2*Math.atan(Math.pow(Math.E,b.y))-0.5*Math.PI)}};a.extend(a.MercatorProjection,a.Projection);a.MapProvider=function(b){if(b){this.getTile=b}};a.MapProvider.prototype={tileLimits:[new a.Coordinate(0,0,0),new a.Coordinate(1,1,0).zoomTo(18)],getTileUrl:function(b){throw"Abstract method not implemented by subclass."},getTile:function(b){throw"Abstract method not implemented by subclass."},releaseTile:function(b){},setZoomRange:function(c,b){this.tileLimits[0]=this.tileLimits[0].zoomTo(c);this.tileLimits[1]=this.tileLimits[1].zoomTo(b)},sourceCoordinate:function(f){var c=this.tileLimits[0].zoomTo(f.zoom),d=this.tileLimits[1].zoomTo(f.zoom),b=Math.pow(2,f.zoom),e;if(f.column<0){e=((f.column%b)+b)%b}else{e=f.column%b}if(f.row<c.row||f.row>=d.row){return null}else{if(e<c.column||e>=d.column){return null}else{return new a.Coordinate(f.row,e,f.zoom)}}}};a.Template=function(e,b){var f=e.match(/{(Q|quadkey)}/);if(f){e=e.replace("{subdomains}","{S}").replace("{zoom}","{Z}").replace("{quadkey}","{Q}")}var d=(b&&b.length&&e.indexOf("{S}")>=0);function c(m,k,l){var j="";for(var h=1;h<=l;h++){j+=(((m>>l-h)&1)<<1)|((k>>l-h)&1)}return j||"0"}var g=function(k){var j=this.sourceCoordinate(k);if(!j){return null}var i=e;if(d){var h=parseInt(j.zoom+j.row+j.column,10)%b.length;i=i.replace("{S}",b[h])}if(f){return i.replace("{Z}",j.zoom.toFixed(0)).replace("{Q}",c(j.row,j.column,j.zoom))}else{return i.replace("{Z}",j.zoom.toFixed(0)).replace("{X}",j.column.toFixed(0)).replace("{Y}",j.row.toFixed(0))}};a.MapProvider.call(this,g)};a.Template.prototype={getTile:function(b){return this.getTileUrl(b)}};a.extend(a.Template,a.MapProvider);a.TemplatedLayer=function(c,b){return new a.Layer(new a.Template(c,b))};a.getMousePoint=function(f,d){var b=new a.Point(f.clientX,f.clientY);b.x+=document.body.scrollLeft+document.documentElement.scrollLeft;b.y+=document.body.scrollTop+document.documentElement.scrollTop;for(var c=d.parent;c;c=c.offsetParent){b.x-=c.offsetLeft;b.y-=c.offsetTop}return b};a.MouseWheelHandler=function(){var d={},g,f,c,b=false;function e(k){var l=0;c=c||new Date().getTime();try{f.scrollTop=1000;f.dispatchEvent(k);l=1000-f.scrollTop}catch(i){l=k.wheelDelta||(-k.detail*5)}var j=new Date().getTime()-c;var h=a.getMousePoint(k,g);if(Math.abs(l)>0&&(j>200)&&!b){g.zoomByAbout(l>0?1:-1,h);c=new Date().getTime()}else{if(b){g.zoomByAbout(l*0.001,h)}}return a.cancelEvent(k)}d.init=function(h){g=h;f=document.body.appendChild(document.createElement("div"));f.style.cssText="visibility:hidden;top:0;height:0;width:0;overflow-y:scroll";var i=f.appendChild(document.createElement("div"));i.style.height="2000px";a.addEvent(g.parent,"mousewheel",e);return d};d.precise=function(h){if(!arguments.length){return b}b=h;return d};d.remove=function(){a.removeEvent(g.parent,"mousewheel",e);f.parentNode.removeChild(f)};return d};a.DoubleClickHandler=function(){var b={},d;function c(g){var f=a.getMousePoint(g,d);d.zoomByAbout(g.shiftKey?-1:1,f);return a.cancelEvent(g)}b.init=function(e){d=e;a.addEvent(d.parent,"dblclick",c);return b};b.remove=function(){a.removeEvent(d.parent,"dblclick",c)};return b};a.DragHandler=function(){var f={},e,g;function c(h){if(h.shiftKey||h.button==2){return}a.addEvent(document,"mouseup",b);a.addEvent(document,"mousemove",d);e=new a.Point(h.clientX,h.clientY);g.parent.style.cursor="move";return a.cancelEvent(h)}function b(h){a.removeEvent(document,"mouseup",b);a.removeEvent(document,"mousemove",d);e=null;g.parent.style.cursor="";return a.cancelEvent(h)}function d(h){if(e){g.panBy(h.clientX-e.x,h.clientY-e.y);e.x=h.clientX;e.y=h.clientY;e.t=+new Date()}return a.cancelEvent(h)}f.init=function(h){g=h;a.addEvent(g.parent,"mousedown",c);return f};f.remove=function(){a.removeEvent(g.parent,"mousedown",c)};return f};a.MouseHandler=function(){var c={},d,b;c.init=function(e){d=e;b=[a.DragHandler().init(d),a.DoubleClickHandler().init(d),a.MouseWheelHandler().init(d)];return c};c.remove=function(){for(var e=0;e<b.length;e++){b[e].remove()}return c};return c};a.TouchHandler=function(){var c={},v,q=250,l=30,b=350,u={},o=[],n=true,s=false,i=null;function m(){var x=document.createElement("div");x.setAttribute("ongesturestart","return;");return(typeof x.ongesturestart==="function")}function h(A){for(var z=0;z<A.touches.length;z+=1){var y=A.touches[z];if(y.identifier in u){var x=u[y.identifier];x.x=y.clientX;x.y=y.clientY;x.scale=A.scale}else{u[y.identifier]={scale:A.scale,startPos:{x:y.clientX,y:y.clientY},x:y.clientX,y:y.clientY,time:new Date().getTime()}}}}function e(x,y){return(x&&x.touch)&&(y.identifier==x.touch.identifier)}function d(x){h(x)}function r(x){switch(x.touches.length){case 1:k(x.touches[0]);break;case 2:t(x);break}h(x);return a.cancelEvent(x)}function f(E){var y=new Date().getTime();if(E.touches.length===0&&s){j(i)}for(var C=0;C<E.changedTouches.length;C+=1){var H=E.changedTouches[C],D=u[H.identifier];if(!D||D.wasPinch){continue}var G={x:H.clientX,y:H.clientY},A=y-D.time,z=a.Point.distance(G,D.startPos);if(z>l){}else{if(A>q){G.end=y;G.duration=A;g(G)}else{G.time=y;w(G)}}}var F={};for(var B=0;B<E.touches.length;B++){F[E.touches[B].identifier]=true}for(var x in u){if(!(x in F)){delete F[x]}}return a.cancelEvent(E)}function g(x){}function w(x){if(o.length&&(x.time-o[0].time)<b){p(x);o=[];return}o=[x]}function p(y){var B=v.getZoom(),C=Math.round(B)+1,x=C-B;var A=new a.Point(y.x,y.y);v.zoomByAbout(x,A)}function k(z){var y={x:z.clientX,y:z.clientY},x=u[z.identifier];v.panBy(y.x-x.x,y.y-x.y)}function t(D){var C=D.touches[0],B=D.touches[1],F=new a.Point(C.clientX,C.clientY),E=new a.Point(B.clientX,B.clientY),z=u[C.identifier],y=u[B.identifier];z.wasPinch=true;y.wasPinch=true;var x=a.Point.interpolate(F,E,0.5);v.zoomByAbout(Math.log(D.scale)/Math.LN2-Math.log(z.scale)/Math.LN2,x);var A=a.Point.interpolate(z,y,0.5);v.panBy(x.x-A.x,x.y-A.y);s=true;i=x}function j(x){if(n){var y=v.getZoom(),A=Math.round(y);v.zoomByAbout(A-y,x)}s=false}c.init=function(y){v=y;if(!m()){return c}a.addEvent(v.parent,"touchstart",d);a.addEvent(v.parent,"touchmove",r);a.addEvent(v.parent,"touchend",f);return c};c.remove=function(){if(!m()){return c}a.removeEvent(v.parent,"touchstart",d);a.removeEvent(v.parent,"touchmove",r);a.removeEvent(v.parent,"touchend",f);return c};return c};a.CallbackManager=function(b,d){this.owner=b;this.callbacks={};for(var c=0;c<d.length;c++){this.callbacks[d[c]]=[]}};a.CallbackManager.prototype={owner:null,callbacks:null,addCallback:function(b,c){if(typeof(c)=="function"&&this.callbacks[b]){this.callbacks[b].push(c)}},removeCallback:function(e,f){if(typeof(f)=="function"&&this.callbacks[e]){var c=this.callbacks[e],b=c.length;for(var d=0;d<b;d++){if(c[d]===f){c.splice(d,1);break}}}},dispatchCallback:function(d,c){if(this.callbacks[d]){for(var b=0;b<this.callbacks[d].length;b+=1){try{this.callbacks[d][b](this.owner,c)}catch(f){}}}}};a.RequestManager=function(){this.loadingBay=document.createDocumentFragment();this.requestsById={};this.openRequestCount=0;this.maxOpenRequests=4;this.requestQueue=[];this.callbackManager=new a.CallbackManager(this,["requestcomplete","requesterror"])};a.RequestManager.prototype={loadingBay:null,requestsById:null,requestQueue:null,openRequestCount:null,maxOpenRequests:null,callbackManager:null,addCallback:function(b,c){this.callbackManager.addCallback(b,c)},removeCallback:function(b,c){this.callbackManager.removeCallback(b,c)},dispatchCallback:function(c,b){this.callbackManager.dispatchCallback(c,b)},clear:function(){this.clearExcept({})},clearRequest:function(d){if(d in this.requestsById){delete this.requestsById[d]}for(var b=0;b<this.requestQueue.length;b++){var c=this.requestQueue[b];if(c&&c.id==d){this.requestQueue[b]=null}}},clearExcept:function(f){for(var e=0;e<this.requestQueue.length;e++){var g=this.requestQueue[e];if(g&&!(g.id in f)){this.requestQueue[e]=null}}var b=this.loadingBay.childNodes;for(var d=b.length-1;d>=0;d--){var c=b[d];if(!(c.id in f)){this.loadingBay.removeChild(c);this.openRequestCount--;c.src=c.coord=c.onload=c.onerror=null}}for(var k in this.requestsById){if(!(k in f)){if(this.requestsById.hasOwnProperty(k)){var h=this.requestsById[k];delete this.requestsById[k];if(h!==null){h=h.id=h.coord=h.url=null}}}}},hasRequest:function(b){return(b in this.requestsById)},requestTile:function(e,d,b){if(!(e in this.requestsById)){var c={id:e,coord:d.copy(),url:b};this.requestsById[e]=c;if(b){this.requestQueue.push(c)}}},getProcessQueue:function(){if(!this._processQueue){var b=this;this._processQueue=function(){b.processQueue()}}return this._processQueue},processQueue:function(d){if(d&&this.requestQueue.length>8){this.requestQueue.sort(d)}while(this.openRequestCount<this.maxOpenRequests&&this.requestQueue.length>0){var c=this.requestQueue.pop();if(c){this.openRequestCount++;var b=document.createElement("img");b.id=c.id;b.style.position="absolute";b.coord=c.coord;this.loadingBay.appendChild(b);b.onload=b.onerror=this.getLoadComplete();b.src=c.url;c=c.id=c.coord=c.url=null}}},_loadComplete:null,getLoadComplete:function(){if(!this._loadComplete){var b=this;this._loadComplete=function(d){d=d||window.event;var c=d.srcElement||d.target;c.onload=c.onerror=null;b.loadingBay.removeChild(c);b.openRequestCount--;delete b.requestsById[c.id];if(d.type==="load"&&(c.complete||(c.readyState&&c.readyState=="complete"))){b.dispatchCallback("requestcomplete",c)}else{b.dispatchCallback("requesterror",{element:c,url:(""+c.src)});c.src=null}setTimeout(b.getProcessQueue(),0)}}return this._loadComplete}};a.Layer=function(c,b){this.parent=b||document.createElement("div");this.parent.style.cssText="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0";this.levels={};this.requestManager=new a.RequestManager();this.requestManager.addCallback("requestcomplete",this.getTileComplete());this.requestManager.addCallback("requesterror",this.getTileError());if(c){this.setProvider(c)}};a.Layer.prototype={map:null,parent:null,tiles:null,levels:null,requestManager:null,provider:null,emptyImage:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",_tileComplete:null,getTileComplete:function(){if(!this._tileComplete){var b=this;this._tileComplete=function(c,d){b.tiles[d.id]=d;b.positionTile(d)}}return this._tileComplete},getTileError:function(){if(!this._tileError){var b=this;this._tileError=function(c,d){d.src=b.emptyImage;b.tiles[d.id]=d;b.positionTile(d)}}return this._tileError},draw:function(){var p=this.map.coordinate.zoomTo(Math.round(this.map.coordinate.zoom));function f(t,s){if(t&&s){var v=t.coord;var u=s.coord;if(v.zoom==u.zoom){var r=Math.abs(p.row-v.row-0.5)+Math.abs(p.column-v.column-0.5);var w=Math.abs(p.row-u.row-0.5)+Math.abs(p.column-u.column-0.5);return r<w?1:r>w?-1:0}else{return v.zoom<u.zoom?1:v.zoom>u.zoom?-1:0}}return t?1:s?-1:0}var o=Math.round(this.map.coordinate.zoom);var n=this.map.pointCoordinate(new a.Point(0,0)).zoomTo(o).container();var i=this.map.pointCoordinate(this.map.dimensions).zoomTo(o).container().right().down();var k={};var m=this.createOrGetLevel(n.zoom);var h=n.copy();for(h.column=n.column;h.column<=i.column;h.column++){for(h.row=n.row;h.row<=i.row;h.row++){var c=this.inventoryVisibleTile(m,h);while(c.length){k[c.pop()]=true}}}for(var e in this.levels){if(this.levels.hasOwnProperty(e)){var q=parseInt(e,10);if(q>=n.zoom-5&&q<n.zoom+2){continue}var d=this.levels[e];d.style.display="none";var g=this.tileElementsInLevel(d);while(g.length){this.provider.releaseTile(g[0].coord);this.requestManager.clearRequest(g[0].coord.toKey());d.removeChild(g[0]);g.shift()}}}var b=n.zoom-5;var l=n.zoom+2;for(var j=b;j<l;j++){this.adjustVisibleLevel(this.levels[j],j,k)}this.requestManager.clearExcept(k);this.requestManager.processQueue(f)},inventoryVisibleTile:function(m,c){var g=c.toKey(),d=[g];if(g in this.tiles){var f=this.tiles[g];if(f.parentNode!=m){m.appendChild(f);if("reAddTile" in this.provider){this.provider.reAddTile(g,c,f)}}return d}if(!this.requestManager.hasRequest(g)){var l=this.provider.getTile(c);if(typeof l=="string"){this.addTileImage(g,c,l)}else{if(l){this.addTileElement(g,c,l)}}}var e=false;var j=c.zoom;for(var h=1;h<=j;h++){var b=c.zoomBy(-h).container();var k=b.toKey();if(k in this.tiles){d.push(k);e=true;break}}if(!e){var i=c.zoomBy(1);d.push(i.toKey());i.column+=1;d.push(i.toKey());i.row+=1;d.push(i.toKey());i.column-=1;d.push(i.toKey())}return d},tileElementsInLevel:function(d){var b=[];for(var c=d.firstChild;c;c=c.nextSibling){if(c.nodeType==1){b.push(c)}}return b},adjustVisibleLevel:function(c,k,d){if(!c){return}var e=1;var j=this.map.coordinate.copy();if(c.childNodes.length>0){c.style.display="block";e=Math.pow(2,this.map.coordinate.zoom-k);j=j.zoomTo(k)}else{c.style.display="none";return false}var h=this.map.tileSize.x*e;var f=this.map.tileSize.y*e;var b=new a.Point(this.map.dimensions.x/2,this.map.dimensions.y/2);var i=this.tileElementsInLevel(c);while(i.length){var g=i.pop();if(!d[g.id]){this.provider.releaseTile(g.coord);this.requestManager.clearRequest(g.coord.toKey());c.removeChild(g)}else{a.moveElement(g,{x:Math.round(b.x+(g.coord.column-j.column)*h),y:Math.round(b.y+(g.coord.row-j.row)*f),scale:e,width:this.map.tileSize.x,height:this.map.tileSize.y})}}},createOrGetLevel:function(b){if(b in this.levels){return this.levels[b]}var c=document.createElement("div");c.id=this.parent.id+"-zoom-"+b;c.style.cssText=this.parent.style.cssText;c.style.zIndex=b;this.parent.appendChild(c);this.levels[b]=c;return c},addTileImage:function(c,d,b){this.requestManager.requestTile(c,d,b)},addTileElement:function(c,d,b){b.id=c;b.coord=d.copy();this.positionTile(b)},positionTile:function(d){var c=this.map.coordinate.zoomTo(d.coord.zoom);d.style.cssText="position:absolute;-webkit-user-select:none;-webkit-user-drag:none;-moz-user-drag:none;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;-ms-transform-origin:0 0;width:"+this.map.tileSize.x+"px; height: "+this.map.tileSize.y+"px;";d.ondragstart=function(){return false};var e=Math.pow(2,this.map.coordinate.zoom-d.coord.zoom);a.moveElement(d,{x:Math.round((this.map.dimensions.x/2)+(d.coord.column-c.column)*this.map.tileSize.x),y:Math.round((this.map.dimensions.y/2)+(d.coord.row-c.row)*this.map.tileSize.y),scale:e,width:this.map.tileSize.x,height:this.map.tileSize.y});var b=this.levels[d.coord.zoom];b.appendChild(d);d.className="map-tile-loaded";if(Math.round(this.map.coordinate.zoom)==d.coord.zoom){b.style.display="block"}this.requestRedraw()},_redrawTimer:undefined,requestRedraw:function(){if(!this._redrawTimer){this._redrawTimer=setTimeout(this.getRedraw(),1000)}},_redraw:null,getRedraw:function(){if(!this._redraw){var b=this;this._redraw=function(){b.draw();b._redrawTimer=0}}return this._redraw},setProvider:function(c){var d=(this.provider===null);if(!d){this.requestManager.clear();for(var b in this.levels){if(this.levels.hasOwnProperty(b)){var e=this.levels[b];while(e.firstChild){this.provider.releaseTile(e.firstChild.coord);e.removeChild(e.firstChild)}}}}this.tiles={};this.provider=c;if(!d){this.draw()}},destroy:function(){this.requestManager.clear();this.requestManager.removeCallback("requestcomplete",this.getTileComplete());this.provider=null;if(this.parent.parentNode){this.parent.parentNode.removeChild(this.parent)}this.map=null}};a.Map=function(f,e,g,h){if(typeof f=="string"){f=document.getElementById(f);if(!f){throw"The ID provided to modest maps could not be found."}}this.parent=f;this.parent.style.padding="0";this.parent.style.overflow="hidden";var b=a.getStyle(this.parent,"position");if(b!="relative"&&b!="absolute"){this.parent.style.position="relative"}this.layers=[];if(!e){e=[]}if(!(e instanceof Array)){e=[e]}for(var d=0;d<e.length;d++){this.addLayer(e[d])}this.projection=new a.MercatorProjection(0,a.deriveTransformation(-Math.PI,Math.PI,0,0,Math.PI,Math.PI,1,0,-Math.PI,-Math.PI,0,1));this.tileSize=new a.Point(256,256);this.coordLimits=[new a.Coordinate(0,-Infinity,0),new a.Coordinate(1,Infinity,0).zoomTo(18)];this.coordinate=new a.Coordinate(0.5,0.5,0);if(!g){g=new a.Point(this.parent.offsetWidth,this.parent.offsetHeight);this.autoSize=true;a.addEvent(window,"resize",this.windowResize())}else{this.autoSize=false;this.parent.style.width=Math.round(g.x)+"px";this.parent.style.height=Math.round(g.y)+"px"}this.dimensions=g;this.callbackManager=new a.CallbackManager(this,["zoomed","panned","centered","extentset","resized","drawn"]);if(h===undefined){this.eventHandlers=[a.MouseHandler().init(this),a.TouchHandler().init(this)]}else{this.eventHandlers=h;if(h instanceof Array){for(var c=0;c<h.length;c++){h[c].init(this)}}}};a.Map.prototype={parent:null,dimensions:null,projection:null,coordinate:null,tileSize:null,coordLimits:null,layers:null,callbackManager:null,eventHandlers:null,autoSize:null,toString:function(){return"Map(#"+this.parent.id+")"},addCallback:function(b,c){this.callbackManager.addCallback(b,c);return this},removeCallback:function(b,c){this.callbackManager.removeCallback(b,c);return this},dispatchCallback:function(c,b){this.callbackManager.dispatchCallback(c,b);return this},windowResize:function(){if(!this._windowResize){var b=this;this._windowResize=function(c){b.dimensions=new a.Point(b.parent.offsetWidth,b.parent.offsetHeight);b.draw();b.dispatchCallback("resized",[b.dimensions])}}return this._windowResize},setZoomRange:function(c,b){this.coordLimits[0]=this.coordLimits[0].zoomTo(c);this.coordLimits[1]=this.coordLimits[1].zoomTo(b);return this},zoomBy:function(b){this.coordinate=this.enforceLimits(this.coordinate.zoomBy(b));a.getFrame(this.getRedraw());this.dispatchCallback("zoomed",b);return this},zoomIn:function(){return this.zoomBy(1)},zoomOut:function(){return this.zoomBy(-1)},setZoom:function(b){return this.zoomBy(b-this.coordinate.zoom)},zoomByAbout:function(c,b){var e=this.pointLocation(b);this.coordinate=this.enforceLimits(this.coordinate.zoomBy(c));var d=this.locationPoint(e);this.dispatchCallback("zoomed",c);return this.panBy(b.x-d.x,b.y-d.y)},panBy:function(c,b){this.coordinate.column-=c/this.tileSize.x;this.coordinate.row-=b/this.tileSize.y;this.coordinate=this.enforceLimits(this.coordinate);a.getFrame(this.getRedraw());this.dispatchCallback("panned",[c,b]);return this},panLeft:function(){return this.panBy(100,0)},panRight:function(){return this.panBy(-100,0)},panDown:function(){return this.panBy(0,-100)},panUp:function(){return this.panBy(0,100)},setCenter:function(b){return this.setCenterZoom(b,this.coordinate.zoom)},setCenterZoom:function(b,c){this.coordinate=this.projection.locationCoordinate(b).zoomTo(parseFloat(c)||0);a.getFrame(this.getRedraw());this.dispatchCallback("centered",[b,c]);return this},extentCoordinate:function(p,q){if(p instanceof a.Extent){p=p.toArray()}var t,j;for(var k=0;k<p.length;k++){var l=this.projection.locationCoordinate(p[k]);if(t){t.row=Math.min(t.row,l.row);t.column=Math.min(t.column,l.column);t.zoom=Math.min(t.zoom,l.zoom);j.row=Math.max(j.row,l.row);j.column=Math.max(j.column,l.column);j.zoom=Math.max(j.zoom,l.zoom)}else{t=l.copy();j=l.copy()}}var h=this.dimensions.x+1;var g=this.dimensions.y+1;var m=(j.column-t.column)/(h/this.tileSize.x);var r=Math.log(m)/Math.log(2);var n=t.zoom-(q?r:Math.ceil(r));var o=(j.row-t.row)/(g/this.tileSize.y);var d=Math.log(o)/Math.log(2);var e=t.zoom-(q?d:Math.ceil(d));var b=Math.min(n,e);b=Math.min(b,this.coordLimits[1].zoom);b=Math.max(b,this.coordLimits[0].zoom);var c=(t.row+j.row)/2;var s=(t.column+j.column)/2;var f=t.zoom;return new a.Coordinate(c,s,f).zoomTo(b)},setExtent:function(b,c){this.coordinate=this.extentCoordinate(b,c);this.draw();this.dispatchCallback("extentset",b);return this},setSize:function(b){this.dimensions=new a.Point(b.x,b.y);this.parent.style.width=Math.round(this.dimensions.x)+"px";this.parent.style.height=Math.round(this.dimensions.y)+"px";if(this.autoSize){a.removeEvent(window,"resize",this.windowResize());this.autoSize=false}this.draw();this.dispatchCallback("resized",this.dimensions);return this},coordinatePoint:function(c){if(c.zoom!=this.coordinate.zoom){c=c.zoomTo(this.coordinate.zoom)}var b=new a.Point(this.dimensions.x/2,this.dimensions.y/2);b.x+=this.tileSize.x*(c.column-this.coordinate.column);b.y+=this.tileSize.y*(c.row-this.coordinate.row);return b},pointCoordinate:function(b){var c=this.coordinate.copy();c.column+=(b.x-this.dimensions.x/2)/this.tileSize.x;c.row+=(b.y-this.dimensions.y/2)/this.tileSize.y;return c},locationCoordinate:function(b){return this.projection.locationCoordinate(b)},coordinateLocation:function(b){return this.projection.coordinateLocation(b)},locationPoint:function(b){return this.coordinatePoint(this.locationCoordinate(b))},pointLocation:function(b){return this.coordinateLocation(this.pointCoordinate(b))},getExtent:function(){return new a.Extent(this.pointLocation(new a.Point(0,0)),this.pointLocation(this.dimensions))},extent:function(b,c){if(b){return this.setExtent(b,c)}else{return this.getExtent()}},getCenter:function(){return this.projection.coordinateLocation(this.coordinate)},center:function(b){if(b){return this.setCenter(b)}else{return this.getCenter()}},getZoom:function(){return this.coordinate.zoom},zoom:function(b){if(b!==undefined){return this.setZoom(b)}else{return this.getZoom()}},getLayers:function(){return this.layers.slice()},getLayerAt:function(b){return this.layers[b]},addLayer:function(b){this.layers.push(b);this.parent.appendChild(b.parent);b.map=this;if(this.coordinate){a.getFrame(this.getRedraw())}return this},removeLayer:function(c){for(var b=0;b<this.layers.length;b++){if(c==this.layers[b]){this.removeLayerAt(b);break}}return this},setLayerAt:function(c,d){if(c<0||c>=this.layers.length){throw new Error("invalid index in setLayerAt(): "+c)}if(this.layers[c]!=d){if(c<this.layers.length){var b=this.layers[c];this.parent.insertBefore(d.parent,b.parent);b.destroy()}else{this.parent.appendChild(d.parent)}this.layers[c]=d;d.map=this;a.getFrame(this.getRedraw())}return this},insertLayerAt:function(c,d){if(c<0||c>this.layers.length){throw new Error("invalid index in insertLayerAt(): "+c)}if(c==this.layers.length){this.layers.push(d);this.parent.appendChild(d.parent)}else{var b=this.layers[c];this.parent.insertBefore(d.parent,b.parent);this.layers.splice(c,0,d)}d.map=this;a.getFrame(this.getRedraw());return this},removeLayerAt:function(c){if(c<0||c>=this.layers.length){throw new Error("invalid index in removeLayer(): "+c)}var b=this.layers[c];this.layers.splice(c,1);b.destroy();return this},swapLayersAt:function(c,b){if(c<0||c>=this.layers.length||b<0||b>=this.layers.length){throw new Error("invalid index in swapLayersAt(): "+index)}var f=this.layers[c],d=this.layers[b],e=document.createElement("div");this.parent.replaceChild(e,d.parent);this.parent.replaceChild(d.parent,f.parent);this.parent.replaceChild(f.parent,e);this.layers[c]=d;this.layers[b]=f;return this},enforceZoomLimits:function(e){var c=this.coordLimits;if(c){var d=c[0].zoom;var b=c[1].zoom;if(e.zoom<d){e=e.zoomTo(d)}else{if(e.zoom>b){e=e.zoomTo(b)}}}return e},enforcePanLimits:function(f){if(this.coordLimits){f=f.copy();var d=this.coordLimits[0].zoomTo(f.zoom);var b=this.coordLimits[1].zoomTo(f.zoom);var c=this.pointCoordinate(new a.Point(0,0)).zoomTo(f.zoom);var e=this.pointCoordinate(this.dimensions).zoomTo(f.zoom);if(b.row-d.row<e.row-c.row){f.row=(b.row+d.row)/2}else{if(c.row<d.row){f.row+=d.row-c.row}else{if(e.row>b.row){f.row-=e.row-b.row}}}if(b.column-d.column<e.column-c.column){f.column=(b.column+d.column)/2}else{if(c.column<d.column){f.column+=d.column-c.column}else{if(e.column>b.column){f.column-=e.column-b.column}}}}return f},enforceLimits:function(b){return this.enforcePanLimits(this.enforceZoomLimits(b))},draw:function(){this.coordinate=this.enforceLimits(this.coordinate);if(this.dimensions.x<=0||this.dimensions.y<=0){if(this.autoSize){var b=this.parent.offsetWidth,d=this.parent.offsetHeight;this.dimensions=new a.Point(b,d);if(b<=0||d<=0){return}}else{return}}for(var c=0;c<this.layers.length;c++){this.layers[c].draw()}this.dispatchCallback("drawn")},_redrawTimer:undefined,requestRedraw:function(){if(!this._redrawTimer){this._redrawTimer=setTimeout(this.getRedraw(),1000)}},_redraw:null,getRedraw:function(){if(!this._redraw){var b=this;this._redraw=function(){b.draw();b._redrawTimer=0}}return this._redraw},destroy:function(){for(var b=0;b<this.layers.length;b++){this.layers[b].destroy()}this.layers=[];this.projection=null;for(var c=0;c<this.eventHandlers.length;c++){this.eventHandlers[c].remove()}if(this.autoSize){a.removeEvent(window,"resize",this.windowResize())}}};a.mapByCenterZoom=function(d,f,b,e){var c=a.coerceLayer(f),g=new a.Map(d,c,false);g.setCenterZoom(b,e).draw();return g};a.mapByExtent=function(d,f,e,c){var b=a.coerceLayer(f),g=new a.Map(d,b,false);g.setExtent([e,c]).draw();return g};if(typeof module!=="undefined"&&module.exports){module.exports={Point:a.Point,Projection:a.Projection,MercatorProjection:a.MercatorProjection,LinearProjection:a.LinearProjection,Transformation:a.Transformation,Location:a.Location,MapProvider:a.MapProvider,Template:a.Template,Coordinate:a.Coordinate,deriveTransformation:a.deriveTransformation}}})(MM);/* wax - 7.0.0dev - v6.0.4-41-ga031612 */!function(a,b,c){typeof module!="undefined"?module.exports=c(a,b):typeof define=="function"&&typeof define.amd=="object"?define(c):b[a]=c(a,b)}("bean",this,function(a,b){var c=window,d=b[a],e=/over|out/,f=/[^\.]*(?=\..*)\.|.*/,g=/\..*/,h="addEventListener",i="attachEvent",j="removeEventListener",k="detachEvent",l=document||{},m=l.documentElement||{},n=m[h],o=n?h:i,p=Array.prototype.slice,q=/click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,r=/mouse.*(wheel|scroll)/i,s=/^text/i,t=/^touch|^gesture/i,u={one:1},v=function(a,b,c){for(c=0;c<b.length;c++)a[b[c]]=1;return a}({},("click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange error abort scroll "+(n?"show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend message readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ":"")).split(" ")),w=function(){function a(a,b){while((b=b.parentNode)!==null)if(b===a)return!0;return!1}function b(b){var c=b.relatedTarget;return c?c!==this&&c.prefix!=="xul"&&!/document/.test(this.toString())&&!a(this,c):c===null}return{mouseenter:{base:"mouseover",condition:b},mouseleave:{base:"mouseout",condition:b},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}}}(),x=function(){var a="altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which".split(" "),b=a.concat("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" ")),c=b.concat("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis".split(" ")),d=a.concat("char charCode key keyCode keyIdentifier keyLocation".split(" ")),f=a.concat(["data"]),g=a.concat("touches targetTouches changedTouches scale rotation".split(" ")),h="preventDefault",i=function(a){return function(){a[h]?a[h]():a.returnValue=!1}},j="stopPropagation",k=function(a){return function(){a[j]?a[j]():a.cancelBubble=!0}},n=function(a){return function(){a[h](),a[j](),a.stopped=!0}},o=function(a,b,c){var d,e;for(d=c.length;d--;)e=c[d],!(e in b)&&e in a&&(b[e]=a[e])};return function(p,u){var v={originalEvent:p,isNative:u};if(!p)return v;var w,x=p.type,y=p.target||p.srcElement;v[h]=i(p),v[j]=k(p),v.stop=n(v),v.target=y&&y.nodeType===3?y.parentNode:y;if(u){if(x.indexOf("key")!==-1)w=d,v.keyCode=p.which||p.keyCode;else if(q.test(x)){w=b,v.rightClick=p.which===3||p.button===2,v.pos={x:0,y:0};if(p.pageX||p.pageY)v.clientX=p.pageX,v.clientY=p.pageY;else if(p.clientX||p.clientY)v.clientX=p.clientX+l.body.scrollLeft+m.scrollLeft,v.clientY=p.clientY+l.body.scrollTop+m.scrollTop;e.test(x)&&(v.relatedTarget=p.relatedTarget||p[(x==="mouseover"?"from":"to")+"Element"])}else t.test(x)?w=g:r.test(x)?w=c:s.test(x)&&(w=f);o(p,v,w||a)}return v}}(),y=function(a,b){return!n&&!b&&(a===l||a===c)?m:a},z=function(){function a(a,b,c,d,e){this.element=a,this.type=b,this.handler=c,this.original=d,this.namespaces=e,this.custom=w[b],this.isNative=v[b]&&a[o],this.eventType=n||this.isNative?b:"propertychange",this.customType=!n&&!this.isNative&&b,this.target=y(a,this.isNative),this.eventSupport=this.target[o]}return a.prototype={inNamespaces:function(a){var b,c;if(!a)return!0;if(!this.namespaces)return!1;for(b=a.length;b--;)for(c=this.namespaces.length;c--;)if(a[b]===this.namespaces[c])return!0;return!1},matches:function(a,b,c){return this.element===a&&(!b||this.original===b)&&(!c||this.handler===c)}},a}(),A=function(){var a={},b=function(c,d,e,f,g){if(!d||d==="*")for(var h in a)h.charAt(0)==="$"&&b(c,h.substr(1),e,f,g);else{var i=0,j,k=a["$"+d],l=c==="*";if(!k)return;for(j=k.length;i<j;i++)if(l||k[i].matches(c,e,f))if(!g(k[i],k,i,d))return}},c=function(b,c,d){var e,f=a["$"+c];if(f)for(e=f.length;e--;)if(f[e].matches(b,d,null))return!0;return!1},d=function(a,c,d){var e=[];return b(a,c,d,null,function(a){return e.push(a)}),e},e=function(b){return(a["$"+b.type]||(a["$"+b.type]=[])).push(b),b},f=function(c){b(c.element,c.type,null,c.handler,function(b,c,d){return c.splice(d,1),c.length===0&&delete a["$"+b.type],!1})},g=function(){var b,c=[];for(b in a)b.charAt(0)==="$"&&(c=c.concat(a[b]));return c};return{has:c,get:d,put:e,del:f,entries:g}}(),B=n?function(a,b,c,d){a[d?h:j](b,c,!1)}:function(a,b,c,d,e){e&&d&&a["_on"+e]===null&&(a["_on"+e]=0),a[d?i:k]("on"+b,c)},C=function(a,b,d){return function(e){return e=x(e||((this.ownerDocument||this.document||this).parentWindow||c).event,!0),b.apply(a,[e].concat(d))}},D=function(a,b,d,e,f,g){return function(h){if(e?e.apply(this,arguments):n?!0:h&&h.propertyName==="_on"+d||!h)h&&(h=x(h||((this.ownerDocument||this.document||this).parentWindow||c).event,g)),b.apply(a,h&&(!f||f.length===0)?arguments:p.call(arguments,h?0:1).concat(f))}},E=function(a,b,c,d,e){return function(){a(b,c,e),d.apply(this,arguments)}},F=function(a,b,c,d){var e,f,h,i=b&&b.replace(g,""),j=A.get(a,i,c);for(e=0,f=j.length;e<f;e++)j[e].inNamespaces(d)&&((h=j[e]).eventSupport&&B(h.target,h.eventType,h.handler,!1,h.type),A.del(h))},G=function(a,b,c,d,e){var h,i=b.replace(g,""),j=b.replace(f,"").split(".");if(A.has(a,i,c))return a;i==="unload"&&(c=E(F,a,i,c,d)),w[i]&&(w[i].condition&&(c=D(a,c,i,w[i].condition,!0)),i=w[i].base||i),h=A.put(new z(a,i,c,d,j[0]&&j)),h.handler=h.isNative?C(a,h.handler,e):D(a,h.handler,i,!1,e,!1),h.eventSupport&&B(h.target,h.eventType,h.handler,!0,h.customType)},H=function(a,b,c){return function(d){var e,f,g=typeof a=="string"?c(a,this):a;for(e=d.target;e&&e!==this;e=e.parentNode)for(f=g.length;f--;)if(g[f]===e)return b.apply(e,arguments)}},I=function(a,b,c){var d,e,h,i,j,k=F,l=b&&typeof b=="string";if(l&&b.indexOf(" ")>0){b=b.split(" ");for(j=b.length;j--;)I(a,b[j],c);return a}h=l&&b.replace(g,""),h&&w[h]&&(h=w[h].type);if(!b||l){if(i=l&&b.replace(f,""))i=i.split(".");k(a,h,c,i)}else if(typeof b=="function")k(a,null,b);else for(d in b)b.hasOwnProperty(d)&&I(a,d,b[d]);return a},J=function(a,b,c,d,e){var f,g,h,i,j=c,k=c&&typeof c=="string";if(b&&!c&&typeof b=="object")for(f in b)b.hasOwnProperty(f)&&J.apply(this,[a,f,b[f]]);else{i=arguments.length>3?p.call(arguments,3):[],g=(k?c:b).split(" "),k&&(c=H(b,j=d,e))&&(i=p.call(i,1)),this===u&&(c=E(I,a,b,c,j));for(h=g.length;h--;)G(a,g[h],c,j,i)}return a},K=function(){return J.apply(u,arguments)},L=n?function(a,b,d){var e=l.createEvent(a?"HTMLEvents":"UIEvents");e[a?"initEvent":"initUIEvent"](b,!0,!0,c,1),d.dispatchEvent(e)}:function(a,b,c){c=y(c,a),a?c.fireEvent("on"+b,l.createEventObject()):c["_on"+b]++},M=function(a,b,c){var d,e,h,i,j,k=b.split(" ");for(d=k.length;d--;){b=k[d].replace(g,"");if(i=k[d].replace(f,""))i=i.split(".");if(!i&&!c&&a[o])L(v[b],b,a);else{j=A.get(a,b),c=[!1].concat(c);for(e=0,h=j.length;e<h;e++)j[e].inNamespaces(i)&&j[e].handler.apply(a,c)}}return a},N=function(a,b,c){var d=0,e=A.get(b,c),f=e.length;for(;d<f;d++)e[d].original&&J(a,e[d].type,e[d].original);return a},O={add:J,one:K,remove:I,clone:N,fire:M,noConflict:function(){return b[a]=d,this}};if(c[i]){var P=function(){var a,b=A.entries();for(a in b)b[a].type&&b[a].type!=="unload"&&I(b[a].element,b[a].type);c[k]("onunload",P),c.CollectGarbage&&c.CollectGarbage()};c[i]("onunload",P)}return O});var html4={};html4.atype={NONE:0,URI:1,URI_FRAGMENT:11,SCRIPT:2,STYLE:3,ID:4,IDREF:5,IDREFS:6,GLOBAL_NAME:7,LOCAL_NAME:8,CLASSES:9,FRAME_TARGET:10},html4.ATTRIBS={"*::class":9,"*::dir":0,"*::id":4,"*::lang":0,"*::onclick":2,"*::ondblclick":2,"*::onkeydown":2,"*::onkeypress":2,"*::onkeyup":2,"*::onload":2,"*::onmousedown":2,"*::onmousemove":2,"*::onmouseout":2,"*::onmouseover":2,"*::onmouseup":2,"*::style":3,"*::title":0,"a::accesskey":0,"a::coords":0,"a::href":1,"a::hreflang":0,"a::name":7,"a::onblur":2,"a::onfocus":2,"a::rel":0,"a::rev":0,"a::shape":0,"a::tabindex":0,"a::target":10,"a::type":0,"area::accesskey":0,"area::alt":0,"area::coords":0,"area::href":1,"area::nohref":0,"area::onblur":2,"area::onfocus":2,"area::shape":0,"area::tabindex":0,"area::target":10,"bdo::dir":0,"blockquote::cite":1,"br::clear":0,"button::accesskey":0,"button::disabled":0,"button::name":8,"button::onblur":2,"button::onfocus":2,"button::tabindex":0,"button::type":0,"button::value":0,"canvas::height":0,"canvas::width":0,"caption::align":0,"col::align":0,"col::char":0,"col::charoff":0,"col::span":0,"col::valign":0,"col::width":0,"colgroup::align":0,"colgroup::char":0,"colgroup::charoff":0,"colgroup::span":0,"colgroup::valign":0,"colgroup::width":0,"del::cite":1,"del::datetime":0,"dir::compact":0,"div::align":0,"dl::compact":0,"font::color":0,"font::face":0,"font::size":0,"form::accept":0,"form::action":1,"form::autocomplete":0,"form::enctype":0,"form::method":0,"form::name":7,"form::onreset":2,"form::onsubmit":2,"form::target":10,"h1::align":0,"h2::align":0,"h3::align":0,"h4::align":0,"h5::align":0,"h6::align":0,"hr::align":0,"hr::noshade":0,"hr::size":0,"hr::width":0,"iframe::align":0,"iframe::frameborder":0,"iframe::height":0,"iframe::marginheight":0,"iframe::marginwidth":0,"iframe::width":0,"img::align":0,"img::alt":0,"img::border":0,"img::height":0,"img::hspace":0,"img::ismap":0,"img::name":7,"img::src":1,"img::usemap":11,"img::vspace":0,"img::width":0,"input::accept":0,"input::accesskey":0,"input::align":0,"input::alt":0,"input::autocomplete":0,"input::checked":0,"input::disabled":0,"input::ismap":0,"input::maxlength":0,"input::name":8,"input::onblur":2,"input::onchange":2,"input::onfocus":2,"input::onselect":2,"input::readonly":0,"input::size":0,"input::src":1,"input::tabindex":0,"input::type":0,"input::usemap":11,"input::value":0,"ins::cite":1,"ins::datetime":0,"label::accesskey":0,"label::for":5,"label::onblur":2,"label::onfocus":2,"legend::accesskey":0,"legend::align":0,"li::type":0,"li::value":0,"map::name":7,"menu::compact":0,"ol::compact":0,"ol::start":0,"ol::type":0,"optgroup::disabled":0,"optgroup::label":0,"option::disabled":0,"option::label":0,"option::selected":0,"option::value":0,"p::align":0,"pre::width":0,"q::cite":1,"select::disabled":0,"select::multiple":0,"select::name":8,"select::onblur":2,"select::onchange":2,"select::onfocus":2,"select::size":0,"select::tabindex":0,"table::align":0,"table::bgcolor":0,"table::border":0,"table::cellpadding":0,"table::cellspacing":0,"table::frame":0,"table::rules":0,"table::summary":0,"table::width":0,"tbody::align":0,"tbody::char":0,"tbody::charoff":0,"tbody::valign":0,"td::abbr":0,"td::align":0,"td::axis":0,"td::bgcolor":0,"td::char":0,"td::charoff":0,"td::colspan":0,"td::headers":6,"td::height":0,"td::nowrap":0,"td::rowspan":0,"td::scope":0,"td::valign":0,"td::width":0,"textarea::accesskey":0,"textarea::cols":0,"textarea::disabled":0,"textarea::name":8,"textarea::onblur":2,"textarea::onchange":2,"textarea::onfocus":2,"textarea::onselect":2,"textarea::readonly":0,"textarea::rows":0,"textarea::tabindex":0,"tfoot::align":0,"tfoot::char":0,"tfoot::charoff":0,"tfoot::valign":0,"th::abbr":0,"th::align":0,"th::axis":0,"th::bgcolor":0,"th::char":0,"th::charoff":0,"th::colspan":0,"th::headers":6,"th::height":0,"th::nowrap":0,"th::rowspan":0,"th::scope":0,"th::valign":0,"th::width":0,"thead::align":0,"thead::char":0,"thead::charoff":0,"thead::valign":0,"tr::align":0,"tr::bgcolor":0,"tr::char":0,"tr::charoff":0,"tr::valign":0,"ul::compact":0,"ul::type":0},html4.eflags={OPTIONAL_ENDTAG:1,EMPTY:2,CDATA:4,RCDATA:8,UNSAFE:16,FOLDABLE:32,SCRIPT:64,STYLE:128},html4.ELEMENTS={a:0,abbr:0,acronym:0,address:0,applet:16,area:2,b:0,base:18,basefont:18,bdo:0,big:0,blockquote:0,body:49,br:2,button:0,canvas:0,caption:0,center:0,cite:0,code:0,col:2,colgroup:1,dd:1,del:0,dfn:0,dir:0,div:0,dl:0,dt:1,em:0,fieldset:0,font:0,form:0,frame:18,frameset:16,h1:0,h2:0,h3:0,h4:0,h5:0,h6:0,head:49,hr:2,html:49,i:0,iframe:4,img:2,input:2,ins:0,isindex:18,kbd:0,label:0,legend:0,li:1,link:18,map:0,menu:0,meta:18,nobr:0,noembed:4,noframes:20,noscript:20,object:16,ol:0,optgroup:0,option:1,p:1,param:18,pre:0,q:0,s:0,samp:0,script:84,select:0,small:0,span:0,strike:0,strong:0,style:148,sub:0,sup:0,table:0,tbody:1,td:1,textarea:8,tfoot:1,th:1,thead:1,title:24,tr:1,tt:0,u:0,ul:0,"var":0},html4.ueffects={NOT_LOADED:0,SAME_DOCUMENT:1,NEW_DOCUMENT:2},html4.URIEFFECTS={"a::href":2,"area::href":2,"blockquote::cite":0,"body::background":1,"del::cite":0,"form::action":2,"img::src":1,"input::src":1,"ins::cite":0,"q::cite":0},html4.ltypes={UNSANDBOXED:2,SANDBOXED:1,DATA:0},html4.LOADERTYPES={"a::href":2,"area::href":2,"blockquote::cite":2,"body::background":1,"del::cite":2,"form::action":2,"img::src":1,"input::src":1,"ins::cite":2,"q::cite":2};var html=function(a){function g(a){a=b(a);if(c.hasOwnProperty(a))return c[a];var d=a.match(e);return d?String.fromCharCode(parseInt(d[1],10)):(d=a.match(f))?String.fromCharCode(parseInt(d[1],16)):""}function h(a,b){return g(b)}function j(a){return a.replace(i,"")}function l(a){return a.replace(k,h)}function s(a){return a.replace(m,"&amp;").replace(o,"&lt;").replace(p,"&gt;").replace(q,"&#34;").replace(r,"&#61;")}function t(a){return a.replace(n,"&amp;$1").replace(o,"&lt;").replace(p,"&gt;")}function w(c){return function d(d,e){d=String(d);var f=null,g=!1,h=[],i=void 0,k=void 0,m=void 0;c.startDoc&&c.startDoc(e);while(d){var n=d.match(g?u:v);d=d.substring(n[0].length);if(g){if(n[1]){var o=b(n[1]),p;if(n[2]){var q=n[3];switch(q.charCodeAt(0)){case 34:case 39:q=q.substring(1,q.length-1)}p=l(j(q))}else p=o;h.push(o,p)}else if(n[4]){k!==void 0&&(m?c.startTag&&c.startTag(i,h,e):c.endTag&&c.endTag(i,e));if(m&&k&(a.eflags.CDATA|a.eflags.RCDATA)){f===null?f=b(d):f=f.substring(f.length-d.length);var r=f.indexOf("</"+i);r<0&&(r=d.length),r&&(k&a.eflags.CDATA?c.cdata&&c.cdata(d.substring(0,r),e):c.rcdata&&c.rcdata(t(d.substring(0,r)),e),d=d.substring(r))}i=k=m=void 0,h.length=0,g=!1}}else if(n[1])c.pcdata&&c.pcdata(n[0],e);else if(n[3])m=!n[2],g=!0,i=b(n[3]),k=a.ELEMENTS.hasOwnProperty(i)?a.ELEMENTS[i]:void 0;else if(n[4])c.pcdata&&c.pcdata(n[4],e);else if(n[5]&&c.pcdata){var s=n[5];c.pcdata(s==="<"?"&lt;":s===">"?"&gt;":"&amp;",e)}}c.endDoc&&c.endDoc(e)}}function x(b){var c,d;return w({startDoc:function(a){c=[],d=!1},startTag:function(e,f,g){if(d)return;if(!a.ELEMENTS.hasOwnProperty(e))return;var h=a.ELEMENTS[e];if(h&a.eflags.FOLDABLE)return;if(h&a.eflags.UNSAFE){d=!(h&a.eflags.EMPTY);return}f=b(e,f);if(f){h&a.eflags.EMPTY||c.push(e),g.push("<",e);for(var i=0,j=f.length;i<j;i+=2){var k=f[i],l=f[i+1];l!==null&&l!==void 0&&g.push(" ",k,'="',s(l),'"')}g.push(">")}},endTag:function(b,e){if(d){d=!1;return}if(!a.ELEMENTS.hasOwnProperty(b))return;var f=a.ELEMENTS[b];if(!(f&(a.eflags.UNSAFE|a.eflags.EMPTY|a.eflags.FOLDABLE))){var g;if(f&a.eflags.OPTIONAL_ENDTAG)for(g=c.length;--g>=0;){var h=c[g];if(h===b)break;if(!(a.ELEMENTS[h]&a.eflags.OPTIONAL_ENDTAG))return}else for(g=c.length;--g>=0;)if(c[g]===b)break;if(g<0)return;for(var i=c.length;--i>g;){var h=c[i];a.ELEMENTS[h]&a.eflags.OPTIONAL_ENDTAG||e.push("</",h,">")}c.length=g,e.push("</",b,">")}},pcdata:function(a,b){d||b.push(a)},rcdata:function(a,b){d||b.push(a)},cdata:function(a,b){d||b.push(a)},endDoc:function(a){for(var b=c.length;--b>=0;)a.push("</",c[b],">");c.length=0}})}function z(b,c,e){var f=[];return x(function g(b,f){for(var g=0;g<f.length;g+=2){var h=f[g],i=f[g+1],j=null,k;if((k=b+"::"+h,a.ATTRIBS.hasOwnProperty(k))||(k="*::"+h,a.ATTRIBS.hasOwnProperty(k)))j=a.ATTRIBS[k];if(j!==null)switch(j){case a.atype.NONE:break;case a.atype.SCRIPT:case a.atype.STYLE:i=null;break;case a.atype.ID:case a.atype.IDREF:case a.atype.IDREFS:case a.atype.GLOBAL_NAME:case a.atype.LOCAL_NAME:case a.atype.CLASSES:i=e?e(i):i;break;case a.atype.URI:var l=(""+i).match(y);l?!l[1]||d.test(l[1])?i=c&&c(i):i=null:i=null;break;case a.atype.URI_FRAGMENT:i&&"#"===i.charAt(0)?(i=e?e(i):i,i&&(i="#"+i)):i=null;break;default:i=null}else i=null;f[g+1]=i}return f})(b,f),f.join("")}var b;"script"==="SCRIPT".toLowerCase()?b=function(a){return a.toLowerCase()}:b=function(a){return a.replace(/[A-Z]/g,function(a){return String.fromCharCode(a.charCodeAt(0)|32)})};var c={lt:"<",gt:">",amp:"&",nbsp:" ",quot:'"',apos:"'"},d=/^(?:https?|mailto|data)$/i,e=/^#(\d+)$/,f=/^#x([0-9A-Fa-f]+)$/,i=/\0/g,k=/&(#\d+|#x[0-9A-Fa-f]+|\w+);/g,m=/&/g,n=/&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,o=/</g,p=/>/g,q=/\"/g,r=/\=/g,u=new RegExp("^\\s*(?:(?:([a-z][a-z-]*)(\\s*=\\s*(\"[^\"]*\"|'[^']*'|(?=[a-z][a-z-]*\\s*=)|[^>\"'\\s]*))?)|(/?>)|[\\s\\S][^a-z\\s>]*)","i"),v=new RegExp("^(?:&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);|<!--[\\s\\S]*?-->|<!\\w[^>]*>|<\\?[^>*]*>|<(/)?([a-z][a-z0-9]*)|([^<&>]+)|([<&>]))","i"),y=new RegExp("^(?:([^:/?#]+):)?");return{escapeAttrib:s,makeHtmlSanitizer:x,makeSaxParser:w,normalizeRCData:t,sanitize:z,unescapeEntities:l}}(html4),html_sanitize=html.sanitize;typeof window!="undefined"&&(window.html=html,window.html_sanitize=html_sanitize),html4.ATTRIBS["*::style"]=0,html4.ELEMENTS.style=0,html4.ATTRIBS["a::target"]=0,html4.ELEMENTS.video=0,html4.ATTRIBS["video::src"]=0,html4.ATTRIBS["video::poster"]=0,html4.ATTRIBS["video::controls"]=0,html4.ELEMENTS.audio=0,html4.ATTRIBS["audio::src"]=0,html4.ATTRIBS["video::autoplay"]=0,html4.ATTRIBS["video::controls"]=0;var Mustache=typeof module!="undefined"&&module.exports||{};(function(a){function i(a){return h.test(a)}function n(a){return String(a).replace(/[&<>"'\/]/g,function(a){return m[a]||a})}function o(a,b,c,d){d=d||"<template>";var e=b.split("\n"),f=Math.max(c-3,0),g=Math.min(e.length,c+3),h=e.slice(f,g),i;for(var j=0,k=h.length;j<k;++j)i=j+f+1,h[j]=(i===c?" >> ":"    ")+h[j];return a.template=b,a.line=c,a.file=d,a.message=[d+":"+c,h.join("\n"),"",a.message].join("\n"),a}function p(a,b,c){if(a===".")return b[b.length-1];var d=a.split("."),e=d.length-1,f=d[e],g,h,i=b.length,j,k;while(i){k=b.slice(0),h=b[--i],j=0;while(j<e){h=h[d[j++]];if(h==null)break;k.push(h)}if(h&&typeof h=="object"&&f in h){g=h[f];break}}return typeof g=="function"&&(g=g.call(k[k.length-1])),g==null?c:g}function q(a,b,c,d){var e="",h=p(a,b);if(d){if(h==null||h===!1||f(h)&&h.length===0)e+=c()}else if(f(h))g(h,function(a){b.push(a),e+=c(),b.pop()});else if(typeof h=="object")b.push(h),e+=c(),b.pop();else if(typeof h=="function"){var i=b[b.length-1],j=function(a){return w(a,i)};e+=h.call(i,c(),j)||""}else h&&(e+=c());return e}function r(b,c){c=c||{};var d=c.tags||a.tags,e=d[0],f=d[d.length-1],g=['var buffer = "";',"\nvar line = 1;","\ntry {",'\nbuffer += "'],h=[],k=!1,l=!1,m=function(){if(k&&!l&&!c.space)while(h.length)g.splice(h.pop(),1);else h=[];k=!1,l=!1},n=[],p,q,r,s=function(a){d=j(a).split(/\s+/),q=d[0],r=d[d.length-1]},t=function(a){g.push('";',p,'\nvar partial = partials["'+j(a)+'"];',"\nif (partial) {","\n  buffer += render(partial,stack[stack.length - 1],partials);","\n}",'\nbuffer += "')},u=function(a,d){var e=j(a);if(e==="")throw o(new Error("Section name may not be empty"),b,z,c.file);n.push({name:e,inverted:d}),g.push('";',p,'\nvar name = "'+e+'";',"\nvar callback = (function () {","\n  return function () {",'\n    var buffer = "";','\nbuffer += "')},v=function(a){u(a,!0)},w=function(a){var d=j(a),e=n.length!=0&&n[n.length-1].name;if(!e||d!=e)throw o(new Error('Section named "'+d+'" was never opened'),b,z,c.file);var f=n.pop();g.push('";',"\n    return buffer;","\n  };","\n})();"),f.inverted?g.push("\nbuffer += renderSection(name,stack,callback,true);"):g.push("\nbuffer += renderSection(name,stack,callback);"),g.push('\nbuffer += "')},x=function(a){g.push('";',p,'\nbuffer += lookup("'+j(a)+'",stack,"");','\nbuffer += "')},y=function(a){g.push('";',p,'\nbuffer += escapeHTML(lookup("'+j(a)+'",stack,""));','\nbuffer += "')},z=1,A,B;for(var C=0,D=b.length;C<D;++C)if(b.slice(C,C+e.length)===e){C+=e.length,A=b.substr(C,1),p="\nline = "+z+";",q=e,r=f,k=!0;switch(A){case"!":C++,B=null;break;case"=":C++,f="="+f,B=s;break;case">":C++,B=t;break;case"#":C++,B=u;break;case"^":C++,B=v;break;case"/":C++,B=w;break;case"{":f="}"+f;case"&":C++,l=!0,B=x;break;default:l=!0,B=y}var E=b.indexOf(f,C);if(E===-1)throw o(new Error('Tag "'+e+'" was not closed properly'),b,z,c.file);var F=b.substring(C,E);B&&B(F);var G=0;while(~(G=F.indexOf("\n",G)))z++,G++;C=E+f.length-1,e=q,f=r}else{A=b.substr(C,1);switch(A){case'"':case"\\":l=!0,g.push("\\"+A);break;case"\r":break;case"\n":h.push(g.length),g.push("\\n"),m(),z++;break;default:i(A)?h.push(g.length):l=!0,g.push(A)}}if(n.length!=0)throw o(new Error('Section "'+n[n.length-1].name+'" was not closed properly'),b,z,c.file);m(),g.push('";',"\nreturn buffer;","\n} catch (e) { throw {error: e, line: line}; }");var H=g.join("").replace(/buffer \+= "";\n/g,"");return c.debug&&(typeof console!="undefined"&&console.log?console.log(H):typeof print=="function"&&print(H)),H}function s(a,b){var c="view,partials,stack,lookup,escapeHTML,renderSection,render",d=r(a,b),e=new Function(c,d);return function(c,d){d=d||{};var f=[c];try{return e(c,d,f,p,n,q,w)}catch(g){throw o(g.error,a,g.line,b.file)}}}function u(){t={}}function v(a,b){return b=b||{},b.cache!==!1?(t[a]||(t[a]=s(a,b)),t[a]):s(a,b)}function w(a,b,c){return v(a)(b,c)}a.name="mustache.js",a.version="0.5.0-dev",a.tags=["{{","}}"],a.parse=r,a.compile=v,a.render=w,a.clearCache=u,a.to_html=function(a,b,c,d){var e=w(a,b,c);if(typeof d=="function")d(e);else return e};var b=Object.prototype.toString,c=Array.isArray,d=Array.prototype.forEach,e=String.prototype.trim,f;c?f=c:f=function(a){return b.call(a)==="[object Array]"};var g;d?g=function(a,b,c){return d.call(a,b,c)}:g=function(a,b,c){for(var d=0,e=a.length;d<e;++d)b.call(c,a[d],d,a)};var h=/^\s*$/,j;if(e)j=function(a){return a==null?"":e.call(a)};else{var k,l;i(" ")?(k=/^\s+/,l=/\s+$/):(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),j=function(a){return a==null?"":String(a).replace(k,"").replace(l,"")}}var m={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},t={}})(Mustache),!function(a,b){typeof module!="undefined"?module.exports=b():typeof define=="function"&&define.amd?define(a,b):this[a]=b()}("reqwest",function(){function handleReadyState(a,b,c){return function(){a&&a[readyState]==4&&(twoHundo.test(a.status)?b(a):c(a))}}function setHeaders(a,b){var c=b.headers||{},d;c.Accept=c.Accept||defaultHeaders.accept[b.type]||defaultHeaders.accept["*"],!b.crossOrigin&&!c[requestedWith]&&(c[requestedWith]=defaultHeaders.requestedWith),c[contentType]||(c[contentType]=b.contentType||defaultHeaders.contentType);for(d in c)c.hasOwnProperty(d)&&a.setRequestHeader(d,c[d])}function generalCallback(a){lastValue=a}function urlappend(a,b){return a+(/\?/.test(a)?"&":"?")+b}function handleJsonp(a,b,c,d){var e=uniqid++,f=a.jsonpCallback||"callback",g=a.jsonpCallbackName||"reqwest_"+e,h=new RegExp("((^|\\?|&)"+f+")=([^&]+)"),i=d.match(h),j=doc.createElement("script"),k=0;i?i[3]==="?"?d=d.replace(h,"$1="+g):g=i[3]:d=urlappend(d,f+"="+g),win[g]=generalCallback,j.type="text/javascript",j.src=d,j.async=!0,typeof j.onreadystatechange!="undefined"&&(j.event="onclick",j.htmlFor=j.id="_reqwest_"+e),j.onload=j.onreadystatechange=function(){if(j[readyState]&&j[readyState]!=="complete"&&j[readyState]!=="loaded"||k)return!1;j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),a.success&&a.success(lastValue),lastValue=undefined,head.removeChild(j),k=1},head.appendChild(j)}function getRequest(a,b,c){var d=(a.method||"GET").toUpperCase(),e=typeof a=="string"?a:a.url,f=a.processData!==!1&&a.data&&typeof a.data!="string"?reqwest.toQueryString(a.data):a.data||null,g;return(a.type=="jsonp"||d=="GET")&&f&&(e=urlappend(e,f),f=null),a.type=="jsonp"?handleJsonp(a,b,c,e):(g=xhr(),g.open(d,e,!0),setHeaders(g,a),g.onreadystatechange=handleReadyState(g,b,c),a.before&&a.before(g),g.send(f),g)}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments)}function setType(a){var b=a.match(/\.(json|jsonp|html|xml)(\?|$)/);return b?b[1]:"js"}function init(o,fn){function complete(a){o.timeout&&clearTimeout(self.timeout),self.timeout=null,o.complete&&o.complete(a)}function success(resp){var r=resp.responseText;if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r}fn(resp),o.success&&o.success(resp),complete(resp)}function error(a,b,c){o.error&&o.error(a,b,c),complete(a)}this.url=typeof o=="string"?o:o.url,this.timeout=null;var type=o.type||setType(this.url),self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){self.abort()},o.timeout)),this.request=getRequest(o,success,error)}function reqwest(a,b){return new Reqwest(a,b)}function normalize(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function serial(a,b){var c=a.name,d=a.tagName.toLowerCase(),e=function(a){a&&!a.disabled&&b(c,normalize(a.attributes.value&&a.attributes.value.specified?a.value:a.text))};if(a.disabled||!c)return;switch(d){case"input":if(!/reset|button|image|file/i.test(a.type)){var f=/checkbox/i.test(a.type),g=/radio/i.test(a.type),h=a.value;(!f&&!g||a.checked)&&b(c,normalize(f&&h===""?"on":h))}break;case"textarea":b(c,normalize(a.value));break;case"select":if(a.type.toLowerCase()==="select-one")e(a.selectedIndex>=0?a.options[a.selectedIndex]:null);else for(var i=0;a.length&&i<a.length;i++)a.options[i].selected&&e(a.options[i])}}function eachFormElement(){var a=this,b,c,d,e=function(b,c){for(var e=0;e<c.length;e++){var f=b[byTag](c[e]);for(d=0;d<f.length;d++)serial(f[d],a)}};for(c=0;c<arguments.length;c++)b=arguments[c],/input|select|textarea/i.test(b.tagName)&&serial(b,a),e(b,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var a={};return eachFormElement.apply(function(b,c){b in a?(a[b]&&!isArray(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments),a}var win=window,doc=document,twoHundo=/^20\d$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,lastValue,xmlHttpRequest="XMLHttpRequest",isArray=typeof Array.isArray=="function"?Array.isArray:function(a){return a instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"},requestedWith:xmlHttpRequest},xhr=win[xmlHttpRequest]?function(){return new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")};return Reqwest.prototype={abort:function(){this.request.abort()},retry:function(){init.call(this,this.o,this.fn)}},reqwest.serializeArray=function(){var a=[];return eachFormElement.apply(function(b,c){a.push({name:b,value:c})},arguments),a},reqwest.serialize=function(){if(arguments.length===0)return"";var a,b,c=Array.prototype.slice.call(arguments,0);return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),a=="map"?b=serializeHash:a=="array"?b=reqwest.serializeArray:b=serializeQueryString,b.apply(null,c)},reqwest.toQueryString=function(a){var b="",c,d=encodeURIComponent,e=function(a,c){b+=d(a)+"="+d(c)+"&"};if(isArray(a))for(c=0;a&&c<a.length;c++)e(a[c].name,a[c].value);else for(var f in a){if(!Object.hasOwnProperty.call(a,f))continue;var g=a[f];if(isArray(g))for(c=0;c<g.length;c++)e(f,g[c]);else e(f,a[f])}return b.replace(/&$/,"").replace(/%20/g,"+")},reqwest.compat=function(a,b){return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new Reqwest(a,b)},reqwest}),wax=wax||{},wax.attribution=function(){var a,b={};return b.content=function(b){return typeof b=="undefined"?a.innerHTML:(a.innerHTML=wax.u.sanitize(b),this)},b.element=function(){return a},b.init=function(){return a=document.createElement("div"),a.className="map-attribution",this},b.init()},wax=wax||{},wax.bwdetect=function(a,b){function h(){wax.bw=-1;var a=new Image;a.src=e;var b=!0,f=setTimeout(function(){b&&wax.bw==-1&&(c.bw(0),b=!1)},d);a.onload=function(){b&&wax.bw==-1&&(clearTimeout(f),c.bw(1),b=!1)}}var c={},d=a.threshold||400,e="http://a.tiles.mapbox.com/mapbox/1.0.0/blue-marble-topo-bathy-jul/0/0/0.png?preventcache="+ +(new Date),f=1,g=a.auto===undefined?!0:a.auto;return c.bw=function(a){if(!arguments.length)return f;var c=f;wax.bwlisteners&&wax.bwlisteners.length&&function(){listeners=wax.bwlisteners,wax.bwlisteners=[];for(i=0;i<listeners;i++)listeners[i](a)}(),wax.bw=a,f!=(f=a)&&b(a)},c.add=function(){return g&&h(),this},wax.bw==-1?(wax.bwlisteners=wax.bwlisteners||[],wax.bwlisteners.push(c.bw)):wax.bw!==undefined?c.bw(wax.bw):c.add(),c},wax.formatter=function(x){var formatter={},f;if(x&&typeof x=="string")try{eval("f = "+x)}catch(e){console&&console.log(e)}else x&&typeof x=="function"?f=x:f=function(){};return formatter.format=function(a,b){try{return wax.u.sanitize(f(a,b))}catch(c){console&&console.log(c)}},formatter},wax.gi=function(a,b){function f(a){return a>=93&&a--,a>=35&&a--,a-=32,a}b=b||{};var c={},d=b.resolution||4,e=b.tileSize||256;return c.grid_tile=function(){return a},c.getKey=function(b,c){if(!a||!a.grid)return;if(c<0||b<0)return;if(Math.floor(c)>=e||Math.floor(b)>=e)return;return f(a.grid[Math.floor(c/d)].charCodeAt(Math.floor(b/d)))},c.gridFeature=function(b,c){var d=this.getKey(b,c),e=a.keys;if(e&&e[d]&&a.data[e[d]])return a.data[e[d]]},c.tileFeature=function(b,c,d){if(!a)return;var e=wax.u.offset(d);return feature=this.gridFeature(b-e.left,c-e.top),feature},c},wax.gm=function(){function g(a){return typeof a=="string"&&(a=[a]),function b(b){if(!b)return;var c=new RegExp("/(\\d+)\\/(\\d+)\\/(\\d+)\\.[\\w\\._]+"),d=c.exec(b);if(!d)return;return a[parseInt(d[2],10)%a.length].replace(/\{z\}/g,d[1]).replace(/\{x\}/g,d[2]).replace(/\{y\}/g,d[3])}}var a=4,b={},c={},d,e,f=function(a){if(a)return a.replace(/(\.png|\.jpg|\.jpeg)(\d*)/,".grid.json")};return c.formatter=function(a){return arguments.length?(e=wax.formatter(a),c):e},c.template=function(a){return arguments.length?(e=wax.template(a),c):e},c.gridUrl=function(a){return arguments.length?(a?f=typeof a=="function"?a:g(a):f=function(){return null},c):f},c.getGrid=function(b,d){var g=f(b);return!e||!g?d(null,null):(wax.request.get(g,function(b,c){if(b)return d(b,null);d(null,wax.gi(c,{formatter:e,resolution:a}))}),c)},c.tilejson=function(b){return arguments.length?(b.template?c.template(b.template):b.formatter?c.formatter(b.formatter):e=undefined,c.gridUrl(b.grids),b.resolution&&(a=b.resolution),d=b,c):d},c},wax=wax||{},wax.hash=function(a){function b(){return location.hash.substring(1)}function c(a){var b=window.location;b.replace(b.toString().replace(b.hash||/$/,"#"+a))}function g(b){var c=b.split("/");for(var d=0;d<c.length;d++){c[d]=Number(c[d]);if(isNaN(c[d]))return!0}if(c.length<3)return!0;c.length==3&&a.setCenterZoom(c)}function h(){var b=a.getCenterZoom();d!==b&&(d=b,c(d))}function i(a){if(a===d)return;g(d=a)&&h()}a=a||{};var d,e={},f=90-1e-8,j=wax.u.throttle(h,500);return e.add=function(){return i(b()),a.bindChange(j),this},e.remove=function(){return a.unbindChange(j),this},e.add()},wax=wax||{},wax.interaction=function(){function o(a){var b=g();for(var c=0;c<b.length;c++)if(b[c][0]<a.y&&b[c][0]+256>a.y&&b[c][1]<a.x&&b[c][1]+256>a.x)return b[c][2];return!1}function p(){return d?(window.clearTimeout(d),d=null,!0):!1}function q(d){if(c)return;var e=wax.u.eventoffset(d);b.screen_feature(e,function(c){c?bean.fire(b,"on",{parent:j(),data:c,formatter:a.formatter().format,e:d}):bean.fire(b,"off")})}function r(a){if(p())return;c=!0,e=wax.u.eventoffset(a),a.type==="mousedown"?bean.add(document.body,"click",t):a.type==="touchstart"&&a.touches.length===1&&(bean.fire(b,"off"),bean.add(j(),n))}function s(){bean.remove(j(),n),c=!1}function t(a){var g={},h=wax.u.eventoffset(a);c=!1;for(var i in a)g[i]=a[i];return bean.remove(document.body,"mouseup",t),bean.remove(j(),n),a.type==="touchend"?b.click(a,e):Math.round(h.y/f)===Math.round(e.y/f)&&Math.round(h.x/f)===Math.round(e.x/f)&&(d=window.setTimeout(function(){d=null,b.click(g,h)},300)),t}var a=wax.gm(),b={},c=!1,d=!1,e,f=4,g,h,i,j,k,l,m={mousemove:q,touchstart:r,mousedown:r
},n={touchend:t,touchmove:t,touchcancel:s};return b.click=function(c,d){b.screen_feature(d,function(d){d&&bean.fire(b,"on",{parent:j(),data:d,formatter:a.formatter().format,e:c})})},b.screen_feature=function(b,c){var d=o(b);d||c(null),a.getGrid(d.src,function(a,e){if(a||!e)return c(null);var f=e.tileFeature(b.x,b.y,d);c(f)})},b.attach=function(a){return arguments.length?(h=a,b):h},b.detach=function(a){return arguments.length?(i=a,b):i},b.map=function(a){return arguments.length?(k=a,h&&h(k),bean.add(j(),m),bean.add(j(),"touchstart",r),b):k},b.grid=function(a){return arguments.length?(g=a,b):g},b.remove=function(a){return i&&i(k),bean.remove(j(),m),bean.fire(b,"remove"),b},b.tilejson=function(c){return arguments.length?(a.tilejson(c),b):a.tilejson()},b.formatter=function(){return a.formatter()},b.on=function(a,c){return bean.add(b,a,c),b},b.off=function(a,c){return bean.remove(b,a,c),b},b.gridmanager=function(c){return arguments.length?(a=c,b):a},b.parent=function(a){return j=a,b},b};var wax=wax||{};wax.legend=function(){var a,b={},c;return b.element=function(){return c},b.content=function(c){return arguments.length?(a.innerHTML=wax.u.sanitize(c),a.style.display="block",a.innerHTML===""&&(a.style.display="none"),b):a.innerHTML},b.add=function(){return c=document.createElement("div"),c.className="map-legends",a=c.appendChild(document.createElement("div")),a.className="map-legend",a.style.display="none",b},b.add()};var wax=wax||{};wax.location=function(){function b(a){console.log(a);if(a.e.type==="mousemove"||!a.e.type)return;var b=a.formatter({format:"location"},a.data);b&&(window.location.href=b)}var a={};return a.events=function(){return{on:b}},a};var wax=wax||{};wax.movetip=wax.movetip||{},wax.movetip=function(){function g(a){var b=wax.u.eventoffset(a);b.y-d.top<c.height+5&&d.height>c.height&&(b.y+=c.height,e.className+=" flip-y"),e.style.left=b.x+"px",e.style.top=b.y-c.height-5+"px"}function h(a){var b=document.createElement("div"),c=document.createElement("div"),d=document.createElement("div");return c.innerHTML=a,c.className="inner",d.className="tip",b.className="wax-tooltip wax-tooltip-0",b.appendChild(c),b.appendChild(d),b}function i(){e&&(e.parentNode.removeChild(e),e=null)}function j(b){var j;if(a)return;if(b.e.type==="mousemove"||b.e.type==="touchend"||!b.e.type){j=b.formatter({format:"teaser"},b.data);if(!j)return;i(),f.style.cursor="pointer",e=document.body.appendChild(h(j))}e&&(c=wax.u.offset(e),d=wax.u.offset(f),g(b.e))}function k(){f.style.cursor="default",a||i()}var a=!1,b={},c,d,e,f;return b.parent=function(a){return arguments.length?(f=a,b):f},b.events=function(){return{on:j,off:k}},b};var wax=wax||{};wax.movetip={},wax.movetip=function(){function g(a){var b=wax.u.eventoffset(a);c.height+b.y>d.top+d.height&&d.height>c.height&&(b.y-=c.height,e.className+=" flip-y"),c.width+b.x>d.left+d.width&&(b.x-=c.width,e.className+=" flip-x"),e.style.left=b.x+"px",e.style.top=b.y+"px"}function h(a){var b=document.createElement("div");return b.className="map-tooltip map-tooltip-0",b.innerHTML=a,b}function i(){e&&(e.parentNode.removeChild(e),e=null)}function j(b){var j;if(a)return;if(b.e.type==="mousemove"||!b.e.type){j=b.formatter({format:"teaser"},b.data);if(!j)return;i(),f.style.cursor="pointer",e=document.body.appendChild(h(j))}else{j=b.formatter({format:"teaser"},b.data);if(!j)return;i();var k=document.body.appendChild(h(j));k.className+=" map-popup";var l=k.appendChild(document.createElement("a"));l.href="#close",l.className="close",l.innerHTML="Close",a=!0,e=k,c=wax.u.offset(e),d=wax.u.offset(f),g(b.e),bean.add(l,"click touchend",function(b){b.stop(),i(),a=!1})}e&&(c=wax.u.offset(e),d=wax.u.offset(f),g(b.e))}function k(){f.style.cursor="default",a||i()}var a=!1,b={},c,d,e,f;return b.parent=function(a){return arguments.length?(f=a,b):f},b.events=function(){return{on:j,off:k}},b};var wax=wax||{};wax.request={cache:{},locks:{},promises:{},get:function(a,b){if(this.cache[a])return b(this.cache[a][0],this.cache[a][1]);this.promises[a]=this.promises[a]||[],this.promises[a].push(b);if(this.locks[a])return;var c=this;this.locks[a]=!0,reqwest({url:a+(~a.indexOf("?")?"&":"?")+"callback=grid",type:"jsonp",jsonpCallback:"callback",success:function(b){c.locks[a]=!1,c.cache[a]=[null,b];for(var d=0;d<c.promises[a].length;d++)c.promises[a][d](c.cache[a][0],c.cache[a][1])},error:function(b){c.locks[a]=!1,c.cache[a]=[b,null];for(var d=0;d<c.promises[a].length;d++)c.promises[a][d](c.cache[a][0],c.cache[a][1])}})}},wax.template=function(a){var b={};return b.format=function(b,c){var d={};for(var e in c)d[e]=c[e];return b.format&&(d["__"+b.format+"__"]=!0),wax.u.sanitize(Mustache.to_html(a,d))},b};if(!wax)var wax={};wax.tilejson=function(a,b){reqwest({url:a+(~a.indexOf("?")?"&":"?")+"callback=grid",type:"jsonp",jsonpCallback:"callback",success:b,error:b})};var wax=wax||{};wax.tooltip={},wax.tooltip=function(){function h(a){var b=document.createElement("div");return b.className="map-tooltip map-tooltip-0",b.innerHTML=a,b}function i(){this.parentNode&&this.parentNode.removeChild(this)}function j(){var a;while(a=d.pop())b&&f?(bean.add(a,f,i),a.className+=" map-fade"):a.parentNode&&a.parentNode.removeChild(a)}function k(b){var c;if(b.e.type==="mousemove"||!b.e.type){if(!a){c=b.content||b.formatter({format:"teaser"},b.data);if(!c||c==e)return;j(),g.style.cursor="pointer",d.push(g.appendChild(h(c))),e=c}}else{c=b.content||b.formatter({format:"full"},b.data);if(!c){b.e.type&&b.e.type.match(/touch/)&&(c=b.content||b.formatter({format:"teaser"},b.data));if(!c)return}j(),g.style.cursor="pointer";var f=g.appendChild(h(c));f.className+=" map-popup";var i=f.appendChild(document.createElement("a"));i.href="#close",i.className="close",i.innerHTML="Close",a=!0,d.push(f),bean.add(i,"touchstart mousedown",function(a){a.stop()}),bean.add(i,"click touchend",function(b){b.stop(),j(),a=!1})}}function l(){g.style.cursor="default",e=null,a||j()}var a=!1,b=!1,c={},d=[],e,f,g;return document.body.style["-webkit-transition"]!==undefined?f="webkitTransitionEnd":document.body.style.MozTransition!==undefined&&(f="transitionend"),c.parent=function(a){return arguments.length?(g=a,c):g},c.animate=function(a){return arguments.length?(b=a,c):b},c.events=function(){return{on:k,off:l}},c};var wax=wax||{};wax.u={offset:function(a){var b=a.offsetWidth||parseInt(a.style.width,10),c=a.offsetHeight||parseInt(a.style.height,10),d=document.body,e=0,f=0,g=function(a){if(a===d||a===document.documentElement)return;e+=a.offsetTop,f+=a.offsetLeft;var b=a.style.transform||a.style.WebkitTransform||a.style.OTransform||a.style.MozTransform||a.style.msTransform;if(b){var c;if(c=b.match(/translate\((.+)px, (.+)px\)/))e+=parseInt(c[2],10),f+=parseInt(c[1],10);else if(c=b.match(/translate3d\((.+)px, (.+)px, (.+)px\)/))e+=parseInt(c[2],10),f+=parseInt(c[1],10);else if(c=b.match(/matrix3d\(([\-\d,\s]+)\)/)){var g=c[1].split(",");e+=parseInt(g[13],10),f+=parseInt(g[12],10)}else if(c=b.match(/matrix\(.+, .+, .+, .+, (.+), (.+)\)/))e+=parseInt(c[2],10),f+=parseInt(c[1],10)}};g(a);try{while(a=a.offsetParent)g(a)}catch(h){}e+=d.offsetTop,f+=d.offsetLeft,e+=d.parentNode.offsetTop,f+=d.parentNode.offsetLeft;var i=document.defaultView?window.getComputedStyle(d.parentNode,null):d.parentNode.currentStyle;return d.parentNode.offsetTop!==parseInt(i.marginTop,10)&&!isNaN(parseInt(i.marginTop,10))&&(e+=parseInt(i.marginTop,10),f+=parseInt(i.marginLeft,10)),{top:e,left:f,height:c,width:b}},$:function(a){return typeof a=="string"?document.getElementById(a):a},indexOf:function(a,b){var c=Array.prototype.indexOf;if(a===null)return-1;var d,e;if(c&&a.indexOf===c)return a.indexOf(b);for(d=0,e=a.length;d<e;d++)if(a[d]===b)return d;return-1},eventoffset:function(a){var b=0,c=0;a||(a=window.event);if(a.pageX||a.pageY)return{x:a.pageX,y:a.pageY};if(a.clientX||a.clientY){var d=document.documentElement,e=document.body,f=document.body.parentNode.currentStyle,g=parseInt(f.marginTop,10)||0,h=parseInt(f.marginLeft,10)||0;return{x:a.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0)+h,y:a.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)+g}}if(a.touches&&a.touches.length===1)return{x:a.touches[0].pageX,y:a.touches[0].pageY}},limit:function(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,a.apply(e,f)};c&&clearTimeout(d);if(c||!d)d=setTimeout(g,b)}},throttle:function(a,b){return this.limit(a,b,!1)},sanitize:function(a){function b(a){if(/^(https?:\/\/|data:image)/.test(a))return a}function c(a){return a}return a?html_sanitize(a,b,c):""}},wax=wax||{},wax.mm=wax.mm||{},wax.mm.attribution=function(a,b){b=b||{};var c,d={};return d.element=function(){return c.element()},d.appendTo=function(a){return wax.u.$(a).appendChild(c.element()),d},d.init=function(){return c=wax.attribution(),c.content(b.attribution),c.element().className="map-attribution map-mm",d},d.init()},wax=wax||{},wax.mm=wax.mm||{},wax.mm.boxselector=function(a,b,c){function q(b){var c=new MM.Point(b.clientX,b.clientY);c.x+=document.body.scrollLeft+document.documentElement.scrollLeft,c.y+=document.body.scrollTop+document.documentElement.scrollTop;for(var d=a.parent;d;d=d.offsetParent)c.x-=d.offsetLeft,c.y-=d.offsetTop;return c}function r(b){if(!b.shiftKey)return;return d=e=q(b),j=k=!0,h.left=d.x+"px",h.top=d.y+"px",h.width=h.height=0,m(document,"mousemove",t),m(document,"mouseup",u),a.parent.style.cursor="crosshair",MM.cancelEvent(b)}function s(a){var b=q(a),c={x:parseInt(g.offsetLeft,10),y:parseInt(g.offsetTop,10)},f={x:c.x+parseInt(g.offsetWidth,10),y:c.y+parseInt(g.offsetHeight,10)};j=b.x-c.x<=l||f.x-b.x<=l,k=b.y-c.y<=l||f.y-b.y<=l;if(k||j)return d={x:b.x-c.x<f.x-b.x?f.x:c.x,y:b.y-c.y<f.y-b.y?f.y:c.y},e={x:b.x-c.x<f.x-b.x?c.x:f.x,y:b.y-c.y<f.y-b.y?c.y:f.y},m(document,"mousemove",t),m(document,"mouseup",u),MM.cancelEvent(a)}function t(b){var c=q(b);return h.display="block",j&&(h.left=(c.x<d.x?c.x:d.x)+"px",h.width=Math.abs(c.x-d.x)-2*i+"px"),k&&(h.top=(c.y<d.y?c.y:d.y)+"px",h.height=Math.abs(c.y-d.y)-2*i+"px"),w(c,a.parent),MM.cancelEvent(b)}function u(b){var c=q(b),f=a.pointLocation(new MM.Point(j?c.x:e.x,k?c.y:e.y));l2=a.pointLocation(d),p.extent([new MM.Location(Math.max(f.lat,l2.lat),Math.min(f.lon,l2.lon)),new MM.Location(Math.min(f.lat,l2.lat),Math.max(f.lon,l2.lon))]),n(document,"mousemove",t),n(document,"mouseup",u),a.parent.style.cursor="auto"}function v(a){w(q(a),g)}function w(a,b){var c={x:parseInt(g.offsetLeft,10),y:parseInt(g.offsetTop,10)},d={x:c.x+parseInt(g.offsetWidth,10),y:c.y+parseInt(g.offsetHeight,10)},e="";a.y-c.y<=l?e="n":d.y-a.y<=l&&(e="s"),a.x-c.x<=l?e+="w":d.x-a.x<=l&&(e+="e"),e!==""&&(e+="-resize"),b.style.cursor=e}function x(a,b){if(!g||!o)return;var c=a.locationPoint(o[1]),d=a.locationPoint(o[0]),e=g.style;e.display="block",e.height="auto",e.width="auto",e.left=Math.max(0,d.x)+"px",e.top=Math.max(0,d.y)+"px",e.right=Math.max(0,a.dimensions.x-c.x)+"px",e.bottom=Math.max(0,a.dimensions.y-c.y)+"px"}var d=null,e=null,f=typeof c=="function"?c:c.callback,g,h,i=0,j=!1,k=!1,l=5,m=MM.addEvent,n=MM.removeEvent,o,p={};return p.extent=function(b,c){if(!b)return o;o=[new MM.Location(Math.max(b[0].lat,b[1].lat),Math.min(b[0].lon,b[1].lon)),new MM.Location(Math.min(b[0].lat,b[1].lat),Math.max(b[0].lon,b[1].lon))],x(a),c||f(o)},p.add=function(a){return g=g||document.createElement("div"),g.id=a.parent.id+"-boxselector-box",g.className="boxselector-box",a.parent.appendChild(g),h=g.style,i=parseInt(window.getComputedStyle(g).borderWidth,10),m(a.parent,"mousedown",r),m(g,"mousedown",s),m(a.parent,"mousemove",v),a.addCallback("drawn",x),this},p.remove=function(){a.parent.removeChild(g),n(a.parent,"mousedown",r),n(g,"mousedown",s),n(a.parent,"mousemove",v),a.removeCallback("drawn",x)},p.add(a)},wax=wax||{},wax.mm=wax.mm||{},wax._={},wax.mm.bwdetect=function(a,b){b=b||{};var c=b.png||".png128",d=b.jpg||".jpg70",e=!1;return wax._.bw_png=c,wax._.bw_jpg=d,wax.bwdetect(b,function(b){wax._.bw=!b;for(var c=0;c<a.layers.length;c++)a.getLayerAt(c).provider instanceof wax.mm.connector&&a.getLayerAt(c).setProvider(a.getLayerAt(c).provider)})},wax=wax||{},wax.mm=wax.mm||{},wax.mm.fullscreen=function(a){function g(a){a&&a.stop(),b?c.original():c.full()}function h(b,c){a.dimensions=new MM.Point(b,c),a.parent.style.width=Math.round(a.dimensions.x)+"px",a.parent.style.height=Math.round(a.dimensions.y)+"px",a.dispatchCallback("resized",a.dimensions)}var b=!1,c={},d,e=document.body,f;return c.add=function(a){return d=document.createElement("a"),d.className="map-fullscreen",d.href="#fullscreen",d.innerHTML="fullscreen",bean.add(d,"click",g),this},c.full=function(){if(b)return;b=!0,f=[a.parent.offsetWidth,a.parent.offsetHeight],a.parent.className+=" map-fullscreen-map",e.className+=" map-fullscreen-view",h(a.parent.offsetWidth,a.parent.offsetHeight)},c.original=function(){if(!b)return;b=!1,a.parent.className=a.parent.className.replace(" map-fullscreen-map",""),e.className=e.className.replace(" map-fullscreen-view",""),h(f[0],f[1])},c.appendTo=function(a){return wax.u.$(a).appendChild(d),this},c.add(a)},wax=wax||{},wax.mm=wax.mm||{},wax.mm.hash=function(a){return wax.hash({getCenterZoom:function(){var b=a.getCenter(),c=a.getZoom(),d=Math.max(0,Math.ceil(Math.log(c)/Math.LN2));return[c.toFixed(2),b.lat.toFixed(d),b.lon.toFixed(d)].join("/")},setCenterZoom:function b(b){a.setCenterZoom(new MM.Location(b[1],b[2]),b[0])},bindChange:function(b){a.addCallback("drawn",b)},unbindChange:function(b){a.removeCallback("drawn",b)}})},wax=wax||{},wax.mm=wax.mm||{},wax.mm.interaction=function(){function e(){var d=c.getLayerAt(0).levels[Math.round(c.getZoom())];return!a&&b!==undefined&&b.length?b:(b=function(a){var b=[];for(var c in a)if(a[c].parentNode===d){var e=wax.u.offset(a[c]);b.push([e.top,e.left,a[c]])}return b}(c.getLayerAt(0).tiles),b)}function f(){a=!0}function g(a){if(!arguments.length)return c;c=a;for(var b=0;b<d.length;b++)c.addCallback(d[b],f)}function h(a){for(var b=0;b<d.length;b++)c.removeCallback(d[b],f)}var a=!1,b,c,d=["zoomed","panned","centered","extentset","resized","drawn"];return wax.interaction().attach(g).detach(h).parent(function(){return c.parent}).grid(e)},wax=wax||{},wax.mm=wax.mm||{},wax.mm.legend=function(a,b){b=b||{};var c,d={};return d.add=function(){return c=wax.legend().content(b.legend),d},d.content=function(a){return arguments.length?(c.content(d),d):c.content()},d.element=function(){return c.element()},d.appendTo=function(a){return wax.u.$(a).appendChild(c.element()),d},d.add()},wax=wax||{},wax.mm=wax.mm||{},wax.mm.pointselector=function(a,b,c){function k(b){var c=wax.u.eventoffset(b),d=new MM.Point(c.x,c.y),e={x:parseFloat(MM.getStyle(document.documentElement,"margin-left")),y:parseFloat(MM.getStyle(document.documentElement,"margin-top"))};isNaN(e.x)||(d.x-=e.x),isNaN(e.y)||(d.y-=e.y);for(var f=a.parent;f;f=f.offsetParent)d.x-=f.offsetLeft,d.y-=f.offsetTop;return d}function l(a){var b=[];for(var c=0;c<a.length;c++)b.push(new MM.Location(a[c].lat,a[c].lon));return b}function m(){var b=new MM.Point(0,0);for(var c=0;c<i.length;c++){var d=a.locationPoint(i[c]);i[c].pointDiv||(i[c].pointDiv=document.createElement("div"),i[c].pointDiv.className="map-point-div",i[c].pointDiv.style.position="absolute",i[c].pointDiv.style.display="block",i[c].pointDiv.location=i[c],bean.add(i[c].pointDiv,"mouseup",function(b){var d=i[c];return function(b){MM.removeEvent(a.parent,"mouseup",o),h.deleteLocation(d,b)}}()),a.parent.appendChild(i[c].pointDiv)),i[c].pointDiv.style.left=d.x+"px",i[c].pointDiv.style.top=d.y+"px"}}function n(b){d=k(b),bean.add(a.parent,"mouseup",o)}function o(b){if(!d)return;e=k(b),MM.Point.distance(d,e)<f&&(h.addLocation(a.pointLocation(d)),j(l(i))),d=null}var d=null,e=null,f=5,g,h={},i=[],j=typeof c=="function"?c:c.callback;return h.addLocation=function(a){i.push(a),m(),j(l(i))},h.locations=function(a){return i},h.add=function(a){return bean.add(a.parent,"mousedown",n),a.addCallback("drawn",m),this},h.remove=function(a){bean.remove(a.parent,"mousedown",n),a.removeCallback("drawn",m);for(var b=i.length-1;b>-1;b--)h.deleteLocation(i[b]);return this},h.deleteLocation=function(a,b){if(!b||confirm("Delete this point?"))a.pointDiv.parentNode.removeChild(a.pointDiv),i.splice(wax.u.indexOf(i,a),1),j(l(i))},h.add(a)},wax=wax||{},wax.mm=wax.mm||{},wax.mm.zoombox=function(a){function f(b){var c=new MM.Point(b.clientX,b.clientY);c.x+=document.body.scrollLeft+document.documentElement.scrollLeft,c.y+=document.body.scrollTop+document.documentElement.scrollTop;for(var d=a.parent;d;d=d.offsetParent)c.x-=d.offsetLeft,c.y-=d.offsetTop;return c}function g(b){if(!c)return;c=!1;var h=f(b),j=a.pointLocation(h),k=a.pointLocation(e);a.setExtent([j,k]),d.style.display="none",MM.removeEvent(a.parent,"mousemove",i),MM.removeEvent(a.parent,"mouseup",g),a.parent.style.cursor="auto"}function h(b){if(!b.shiftKey||!!this.drawing)return;return c=!0,e=f(b),d.style.left=e.x+"px",d.style.top=e.y+"px",MM.addEvent(a.parent,"mousemove",i),MM.addEvent(a.parent,"mouseup",g),a.parent.style.cursor="crosshair",MM.cancelEvent(b)}function i(a){if(!c)return;var b=f(a);return d.style.display="block",b.x<e.x?d.style.left=b.x+"px":d.style.left=e.x+"px",d.style.width=Math.abs(b.x-e.x)+"px",b.y<e.y?d.style.top=b.y+"px":d.style.top=e.y+"px",d.style.height=Math.abs(b.y-e.y)+"px",MM.cancelEvent(a)}var b={},c=!1,d,e=null;return b.add=function(a){return d=d||document.createElement("div"),d.id=a.parent.id+"-zoombox-box",d.className="zoombox-box",a.parent.appendChild(d),MM.addEvent(a.parent,"mousedown",h),this},b.remove=function(){a.parent.removeChild(d),MM.removeEvent(a.parent,"mousedown",h)},b.add(a)},wax=wax||{},wax.mm=wax.mm||{},wax.mm.zoomer=function(a){var b={},c=document.createElement("a");c.innerHTML="+",c.href="#",c.className="zoomer zoomin",bean.add(c,"mousedown dblclick",function(a){a.stop()}),bean.add(c,"touchstart click",function(b){b.stop(),a.zoomIn()},!1);var d=document.createElement("a");return d.innerHTML="-",d.href="#",d.className="zoomer zoomout",bean.add(d,"mousedown dblclick",function(a){a.stop()}),bean.add(d,"touchstart click",function(b){b.stop(),a.zoomOut()}),b.add=function(a){return a.addCallback("drawn",function(a,b){a.coordinate.zoom===a.coordLimits[0].zoom?d.className="zoomer zoomout zoomdisabled":a.coordinate.zoom===a.coordLimits[1].zoom?c.className="zoomer zoomin zoomdisabled":(c.className="zoomer zoomin",d.className="zoomer zoomout")}),b},b.appendTo=function(a){return wax.u.$(a).appendChild(c),wax.u.$(a).appendChild(d),b},b.add(a)};var wax=wax||{};wax.mm=wax.mm||{},wax.mm._provider=function(a){this.options={tiles:a.tiles,scheme:a.scheme||"xyz",minzoom:a.minzoom||0,maxzoom:a.maxzoom||22,bounds:a.bounds||[-180,-90,180,90]}},wax.mm._provider.prototype={outerLimits:function(){return[this.locationCoordinate(new MM.Location(this.options.bounds[0],this.options.bounds[1])).zoomTo(this.options.minzoom),this.locationCoordinate(new MM.Location(this.options.bounds[2],this.options.bounds[3])).zoomTo(this.options.maxzoom)]},getTile:function(a){if(!(coord=this.sourceCoordinate(a)))return null;if(coord.zoom<this.options.minzoom||coord.zoom>this.options.maxzoom)return null;coord.row=this.options.scheme==="tms"?Math.pow(2,coord.zoom)-coord.row-1:coord.row;var b=this.options.tiles[parseInt(Math.pow(2,coord.zoom)*coord.row+coord.column,10)%this.options.tiles.length].replace("{z}",coord.zoom.toFixed(0)).replace("{x}",coord.column.toFixed(0)).replace("{y}",coord.row.toFixed(0));return wax._&&wax._.bw&&(b=b.replace(".png",wax._.bw_png).replace(".jpg",wax._.bw_jpg)),b}},MM&&MM.extend(wax.mm._provider,MM.MapProvider),wax.mm.connector=function(a){var b=new wax.mm._provider(a);return new MM.Layer(b)};(function(context, MM) {
    var easey = function() {
        var easey = {},
            running = false,
            abort = false; // killswitch for transitions

        var easings = {
            easeIn: function(t) { return t * t; },
            easeOut: function(t) { return Math.sin(t * Math.PI / 2); },
            easeInOut: function(t) { return (1 - Math.cos(Math.PI * t)) / 2; },
            linear: function(t) { return t; }
        };
        var easing = easings.easeOut;

        // to is the singular coordinate that any transition is based off
        // three dimensions:
        //
        // * to
        // * time
        // * path
        var from, to, map;

        easey.stop = function() {
            abort = true;
        };

        easey.running = function() {
            return running;
        };

        easey.point = function(x) {
            to = map.pointCoordinate(x);
            return easey;
        };

        easey.zoom = function(x) {
            to = map.enforceZoomLimits(to.zoomTo(x));
            return easey;
        };

        easey.location = function(x) {
            to = map.locationCoordinate(x);
            return easey;
        };

        easey.from = function(x) {
            if (!arguments.length) return from.copy();
            from = x.copy();
            return easey;
        };

        easey.to = function(x) {
            if (!arguments.length) return to.copy();
            to = map.enforceZoomLimits(x.copy());
            return easey;
        };

        easey.path = function(x) {
            path = paths[x];
            return easey;
        };

        easey.easing = function(x) {
            easing = easings[x];
            return easey;
        };

        easey.map = function(x) {
            if (!arguments.length) return map;
            map = x;
            from = map.coordinate.copy();
            to = map.coordinate.copy();
            return easey;
        };

        function interp(a, b, p) {
            if (p === 0) return a;
            if (p === 1) return b;
            return a + ((b - a) * p);
        }

        var paths = {};

        // The screen path simply moves between
        // coordinates in a non-geographical way
        paths.screen = function(a, b, t) {
            var zoom_lerp = interp(a.zoom, b.zoom, t);
            var az = a.copy();
            var bz = b.copy().zoomTo(a.zoom);
            return (new MM.Coordinate(
                interp(az.row, bz.row, t),
                interp(az.column, bz.column, t),
                az.zoom)).zoomTo(zoom_lerp);
        };

        function ptWithCoords(a, b) {
            // distance from the center of the map
            var point = new MM.Point(map.dimensions.x / 2, map.dimensions.y / 2);
            point.x += map.tileSize.x * (b.column - a.column);
            point.y += map.tileSize.y * (b.row - a.row);
            return point;
        }

        // The screen path means that the b
        // coordinate should maintain its point on screen
        // throughout the transition, but the map
        // should move to its zoom level
        paths.about = function(a, b, t) {
            var zoom_lerp = interp(a.zoom, b.zoom, t);

            var bs = b.copy().zoomTo(a.zoom);
            var az = a.copy().zoomTo(zoom_lerp);
            var bz = b.copy().zoomTo(zoom_lerp);
            var start = ptWithCoords(a, bs);
            var end = ptWithCoords(az, bz);

            az.column -= (start.x - end.x) / map.tileSize.x;
            az.row -= (start.y - end.y) / map.tileSize.y;

            return az;
        };

        var path = paths.screen;

        easey.t = function(t) {
            map.coordinate = path(from, to, easing(t));
            map.draw();
            return easey;
        };

        easey.future = function(parts) {
            var futures = [];
            for (var t = 0; t < parts; t++) {
                futures.push(path(from, to, t / (parts - 1)));
            }
            return futures;
        };

        var start;
        easey.resetRun = function () {
            start = (+ new Date());
            return easey;
        };

        easey.run = function(time, callback) {

            time = time || 1000;

            start = (+new Date());

            running = true;

            function tick() {
                var delta = (+new Date()) - start;
                if (abort) {
                    return void (abort = running = false);
                } else if (delta > time) {
                    running = false;
                    map.coordinate = path(from, to, 1);
                    map.draw();
                    if (callback) return callback(map);
                } else {
                    map.coordinate = path(from, to, easing(delta / time));
                    map.draw();
                    MM.getFrame(tick);
                }
            }

            MM.getFrame(tick);
        };

        // Optimally smooth (constant perceived velocity) and
        // efficient (minimal path distance) zooming and panning.
        //
        // Based on "Smooth and efficient zooming and panning"
        // by Jarke J. van Wijk and Wim A.A. Nuij
        //
        // Model described in section 3, equations 1 through 5
        // Derived equation (9) of optimal path implemented below
        easey.optimal = function(V, rho, callback) {
            // Section 6 describes user testing of these tunable values
            V = V || 0.9;
            rho = rho || 1.42;

            function sqr(n) { return n*n; }
            function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
            function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
            function tanh(n) { return sinh(n) / cosh(n); }

            map.coordinate = from; // For when `from` not current coordinate

            // Width is measured in coordinate units at zoom 0
            var TL = map.pointCoordinate(new MM.Point(0, 0)).zoomTo(0),
                BR = map.pointCoordinate(map.dimensions).zoomTo(0),
                w0 = Math.max(BR.column - TL.column, BR.row - TL.row),
                w1 = w0 * Math.pow(2, from.zoom - to.zoom),
                start = from.zoomTo(0),
                end = to.zoomTo(0),
                c0 = {x: start.column, y: start.row},
                c1 = {x: end.column, y: end.row},
                u0 = 0,
                u1 = Math.sqrt(sqr(c1.x - c0.x) + sqr(c1.y - c0.y));

            function b(i) {
                var n = sqr(w1) - sqr(w0) + (i ? -1: 1) * Math.pow(rho, 4) * sqr(u1 - u0),
                    d = 2 * (i ? w1 : w0) * sqr(rho) * (u1 - u0);
                return n/d;
            }

            function r(i) {
                return Math.log(-b(i) + Math.sqrt(sqr(b(i)) + 1));
            }

            var r0 = r(0),
                r1 = r(1),
                S = (r1 - r0) / rho;

            // Width
            var w = function(s) {
                return w0 * cosh(r0) / cosh (rho * s + r0);
            };

            // Zoom
            var u = function(s) {
                return (w0 / sqr(rho)) * cosh(r0) * tanh(rho * s + r0) - (w0 / sqr(rho)) * sinh(r0) + u0;
            };

            // Special case, when no panning necessary
            if (Math.abs(u1) < 0.000001) {
                if (Math.abs(w0 - w1) < 0.000001) return;

                // Based on section 4
                var k = w1 < w0 ? -1 : 1;
                S = Math.abs(Math.log(w1/w0)) / rho;
                u = function(s) {
                    return u0;
                };
                w = function(s) {
                    return w0 * Math.exp(k * rho * s);
                };
            }

            path = function (a, b, t) {
                if (t == 1) return to;
                var s = t * S,
                    us = u(s),
                    z = a.zoom + (Math.log(w0/w(s)) / Math.LN2),
                    x = interp(c0.x, c1.x, us/u1),
                    y = interp(c0.y, c1.y, us/u1);
                return new MM.Coordinate(y, x, 0).zoomTo(z);
            };

            easey.easing('linear');
            easey.run(S / V * 1000, callback);
        };

        return easey;
    };

    this.easey = easey;
})(this, MM);
;(function(context, MM) {

    easey.TouchHandler = function() {
        var handler = {},
            map,
            prevT = 0,
            acceleration = 25.0,
            speed = null,
            maxTapTime = 250,
            maxTapDistance = 30,
            maxDoubleTapDelay = 350,
            drag = 0.10,
            locations = {},
            taps = [],
            wasPinching = false,
            nowPoint = null,
            oldPoint = null,
            lastMove = null,
            lastPinchCenter = null;

        function animate(t) {
            var dir = { x: 0, y: 0 };
            var dt = Math.max(0.001, (t - prevT) / 1000.0);
            if (nowPoint && oldPoint &&
                (lastMove > (+new Date() - 50))) {
                dir.x = nowPoint.x - oldPoint.x;
                dir.y = nowPoint.y - oldPoint.y;
                speed.x = dir.x;
                speed.y = dir.y;
            } else {
                speed.x -= speed.x * drag;
                speed.y -= speed.y * drag;
                if (Math.abs(speed.x) < 0.001) {
                    speed.x = 0;
                }
                if (Math.abs(speed.y) < 0.001) {
                    speed.y = 0;
                }
            }
            if (speed.x || speed.y) {
                map.panBy(speed.x, speed.y);
            }
            prevT = t;
            // tick every frame for time-based anim accuracy
            MM.getFrame(animate);
        }

        // Test whether touches are from the same source -
        // whether this is the same touchmove event.
        function sameTouch (event, touch) {
            return (event && event.touch) &&
                (touch.identifier == event.touch.identifier);
        }

        function updateTouches (e) {
            for (var i = 0; i < e.touches.length; i += 1) {
                var t = e.touches[i];
                if (t.identifier in locations) {
                    var l = locations[t.identifier];
                    l.x = t.clientX;
                    l.y = t.clientY;
                    l.scale = e.scale;
                } else {
                    locations[t.identifier] = {
                        scale: e.scale,
                        startPos: { x: t.clientX, y: t.screenY },
                        x: t.clientX,
                        y: t.clientY,
                        time: new Date().getTime()
                    };
                }
            }
        }

        function touchStartMachine(e) {
            updateTouches(e);
            return MM.cancelEvent(e);
        }

        function touchMoveMachine(e) {
            switch (e.touches.length) {
                case 1:
                    onPanning(e.touches[0]);
                break;
                case 2:
                    onPinching(e);
                break;
            }
            updateTouches(e);
            return MM.cancelEvent(e);
        }

        // Handle a tap event - mainly watch for a doubleTap
        function onTap(tap) {
            if (taps.length &&
                (tap.time - taps[0].time) < maxDoubleTapDelay) {
                onDoubleTap(tap);
            taps = [];
            return;
            }
            taps = [tap];
        }

        // Handle a double tap by zooming in a single zoom level to a
        // round zoom.
        function onDoubleTap(tap) {
            // zoom in to a round number
            easey().map(map)
            .to(map.pointCoordinate(tap).zoomTo(map.getZoom() + 1))
            .path('about').run(200, function() {
                map.dispatchCallback('zoomed');
            });
        }

        function isTouchable () {
            var el = document.createElement('div');
            el.setAttribute('ongesturestart', 'return;');
            return (typeof el.ongesturestart === 'function');
        }


        // Re-transform the actual map parent's CSS transformation
        function onPanning(touch) {
            lastMove = +new Date();
            oldPoint = nowPoint;
            nowPoint = { x: touch.clientX, y: touch.clientY };
        }

        function onPinching(e) {
            // use the first two touches and their previous positions
            var t0 = e.touches[0],
            t1 = e.touches[1],
            p0 = new MM.Point(t0.clientX, t0.clientY),
            p1 = new MM.Point(t1.clientX, t1.clientY),
            l0 = locations[t0.identifier],
            l1 = locations[t1.identifier];

            // mark these touches so they aren't used as taps/holds
            l0.wasPinch = true;
            l1.wasPinch = true;

            // scale about the center of these touches
            var center = MM.Point.interpolate(p0, p1, 0.5);

            map.zoomByAbout(
                Math.log(e.scale) / Math.LN2 -
                Math.log(l0.scale) / Math.LN2,
                center);

                // pan from the previous center of these touches
                var prevCenter = MM.Point.interpolate(l0, l1, 0.5);

                map.panBy(center.x - prevCenter.x,
                          center.y - prevCenter.y);
                          wasPinching = true;
                          lastPinchCenter = center;
        }

        // When a pinch event ends, round the zoom of the map.
        function onPinched(p) {
            // TODO: easing
            if (true) {
                var z = map.getZoom(), // current zoom
                tz = Math.round(z);     // target zoom
                map.zoomByAbout(tz - z, p);
            }
            wasPinching = false;
        }

        function touchEndMachine(e) {
            var now = new Date().getTime();
            // round zoom if we're done pinching
            if (e.touches.length === 0 && wasPinching) {
                onPinched(lastPinchCenter);
            }

            oldPoint = nowPoint = null;

            // Look at each changed touch in turn.
            for (var i = 0; i < e.changedTouches.length; i += 1) {
                var t = e.changedTouches[i],
                loc = locations[t.identifier];
                // if we didn't see this one (bug?)
                // or if it was consumed by pinching already
                // just skip to the next one
                if (!loc || loc.wasPinch) {
                    continue;
                }

                // we now know we have an event object and a
                // matching touch that's just ended. Let's see
                // what kind of event it is based on how long it
                // lasted and how far it moved.
                var pos = { x: t.clientX, y: t.clientY },
                time = now - loc.time,
                travel = MM.Point.distance(pos, loc.startPos);
                if (travel > maxTapDistance) {
                    // we will to assume that the drag has been handled separately
                } else if (time > maxTapTime) {
                    // close in space, but not in time: a hold
                    pos.end = now;
                    pos.duration = time;
                    onHold(pos);
                } else {
                    // close in both time and space: a tap
                    pos.time = now;
                    onTap(pos);
                }
            }

            // Weird, sometimes an end event doesn't get thrown
            // for a touch that nevertheless has disappeared.
            // Still, this will eventually catch those ids:

            var validTouchIds = {};
            for (var j = 0; j < e.touches.length; j++) {
                validTouchIds[e.touches[j].identifier] = true;
            }
            for (var id in locations) {
                if (!(id in validTouchIds)) {
                    delete validTouchIds[id];
                }
            }

            return MM.cancelEvent(e);
        }

        handler.init = function(x) {
            map = x;
            // Fail early if this isn't a touch device.
            // TODO: move to add fn
            if (!isTouchable()) return false;

            MM.addEvent(map.parent, 'touchstart',
                touchStartMachine);
            MM.addEvent(map.parent, 'touchmove',
                touchMoveMachine);
            MM.addEvent(map.parent, 'touchend',
                touchEndMachine);

            prevT = new Date().getTime();
            speed = { x: 0, y: 0 };
            MM.getFrame(animate);
        };

        handler.remove = function() {
            // Fail early if this isn't a touch device.
            if (!isTouchable()) return false;

            MM.removeEvent(map.parent, 'touchstart',
                touchStartMachine);
            MM.removeEvent(map.parent, 'touchmove',
                touchMoveMachine);
            MM.removeEvent(map.parent, 'touchend',
                touchEndMachine);
        };

        return handler;
    };

    easey.DoubleClickHandler = function() {
        var handler = {},
            map;

        function doubleClick(e) {
            // Ensure that this handler is attached once.
            // Get the point on the map that was double-clicked
            var point = MM.getMousePoint(e, map);
            z = map.getZoom() + (e.shiftKey ? -1 : 1);
            // use shift-double-click to zoom out
            easey().map(map)
                .to(map.pointCoordinate(MM.getMousePoint(e, map)).zoomTo(z))
                .path('about').run(100, function() {
                map.dispatchCallback('zoomed');
            });
            return MM.cancelEvent(e);
        }

        handler.init = function(x) {
            map = x;
            MM.addEvent(map.parent, 'dblclick', doubleClick);
            return handler;
        };

        handler.remove = function() {
            MM.removeEvent(map.parent, 'dblclick', doubleClick);
        };

        return handler;
    };

    easey.MouseWheelHandler = function() {
        var handler = {},
            map,
            _zoomDiv,
            ea = easey(),
            prevTime,
            precise = false;

        function mouseWheel(e) {
            var delta = 0;
            prevTime = prevTime || new Date().getTime();

            try {
                _zoomDiv.scrollTop = 1000;
                _zoomDiv.dispatchEvent(e);
                delta = 1000 - _zoomDiv.scrollTop;
            } catch (error) {
                delta = e.wheelDelta || (-e.detail * 5);
            }

            // limit mousewheeling to once every 200ms
            var timeSince = new Date().getTime() - prevTime;

            function dispatchZoomed() {
                map.dispatchCallback('zoomed');
            }

            if (!ea.running()) {
              var point = MM.getMousePoint(e, map),
                  z = map.getZoom();
              ea.map(map)
                .easing('easeOut')
                .to(map.pointCoordinate(MM.getMousePoint(e, map)).zoomTo(z + (delta > 0 ? 1 : -1)))
                .path('about').run(100, dispatchZoomed);
                prevTime = new Date().getTime();
            } else if (timeSince > 150){
                ea.zoom(ea.to().zoom + (delta > 0 ? 1 : -1)).from(map.coordinate).resetRun();
                prevTime = new Date().getTime();
            }

            // Cancel the event so that the page doesn't scroll
            return MM.cancelEvent(e);
        }

        handler.init = function(x) {
            map = x;
            _zoomDiv = document.body.appendChild(document.createElement('div'));
            _zoomDiv.style.cssText = 'visibility:hidden;top:0;height:0;width:0;overflow-y:scroll';
            var innerDiv = _zoomDiv.appendChild(document.createElement('div'));
            innerDiv.style.height = '2000px';
            MM.addEvent(map.parent, 'mousewheel', mouseWheel);
            return handler;
        };

        handler.precise = function(x) {
            if (!arguments.length) return precise;
            precise = x;
            return handler;
        };

        handler.remove = function() {
            MM.removeEvent(map.parent, 'mousewheel', mouseWheel);
            _zoomDiv.parentNode.removeChild(_zoomDiv);
        };

        return handler;
    };

    easey.DragHandler = function() {
        var handler = {},
            map,
            prevT = 0,
            speed = null,
            drag = 0.15,
            removed = false,
            mouseDownPoint = null,
            mouseDownTime = 0,
            mousePoint = null,
            prevMousePoint = null,
            moveTime = null,
            prevMoveTime = null,
            animatedLastPoint = true;

        function focusMap(e) {
            map.parent.focus();
        }

        function mouseDown(e) {
            if (e.shiftKey || e.button == 2) return;
            MM.addEvent(document, 'mousemove', mouseMove);
            MM.addEvent(document, 'mouseup', mouseUp);
            mousePoint = prevMousePoint = MM.getMousePoint(e, map);
            moveTime = prevMoveTime = +new Date();
            map.parent.style.cursor = 'move';
            return MM.cancelEvent(e);
        }

        function mouseMove(e) {
            if (mousePoint) {
                if (animatedLastPoint) {
                    prevMousePoint = mousePoint;
                    prevMoveTime = moveTime;
                    animatedLastPoint = false;
                }
                mousePoint = MM.getMousePoint(e, map);
                moveTime = +new Date();
                return MM.cancelEvent(e);
            }
        }

        function mouseUp(e) {
            MM.removeEvent(document, 'mousemove', mouseMove);
            MM.removeEvent(document, 'mouseup', mouseUp);
            if (+new Date() - prevMoveTime < 50) {
                dt = Math.max(1, moveTime - prevMoveTime);
                var dir = { x: 0, y: 0 };
                dir.x = mousePoint.x - prevMousePoint.x;
                dir.y = mousePoint.y - prevMousePoint.y;
                speed.x = dir.x / dt;
                speed.y = dir.y / dt;
            } else {
                speed.x = 0;
                speed.y = 0;
            }
            mousePoint = prevMousePoint = null;
            moveTime = lastMoveTime = null;
            map.parent.style.cursor = '';
            return MM.cancelEvent(e);
        }

        function animate(t) {
            var dir = { x: 0, y: 0 };
            var dt = Math.max(1, t - prevT);
            if (mousePoint && prevMousePoint) {
                if (!animatedLastPoint) {
                    dir.x = mousePoint.x - prevMousePoint.x;
                    dir.y = mousePoint.y - prevMousePoint.y;
                    map.panBy(dir.x, dir.y);
                    animatedLastPoint = true;
                }
            } else {
                // Rough time based animation accuracy
                // using a linear approximation approach
                speed.x *= Math.pow(1 - drag, dt * 60 / 1000);
                speed.y *= Math.pow(1 - drag, dt * 60 / 1000);
                if (Math.abs(speed.x) < 0.001) {
                    speed.x = 0;
                }
                if (Math.abs(speed.y) < 0.001) {
                    speed.y = 0;
                }
                if (speed.x || speed.y) {
                    map.panBy(speed.x * dt, speed.y * dt);
                }
            }
            prevT = t;
            if (!removed) MM.getFrame(animate);
        }

        handler.init = function(x) {
            map = x;
            MM.addEvent(map.parent, 'click', focusMap);
            MM.addEvent(map.parent, 'mousedown', mouseDown);
            prevT = new Date().getTime();
            speed = { x: 0, y: 0 };
            removed = false;
            MM.getFrame(animate);
        };

        handler.remove = function() {
            MM.removeEvent(map.parent, 'click', focusMap);
            MM.removeEvent(map.parent, 'mousedown', mouseDown);
            removed = true;
        };

        return handler;
    };

})(this, MM);
function mmg(){function l(b){b.coord||(b.coord=a.map.locationCoordinate(b.location));var c=a.map.coordinatePoint(b.coord),d;c.x<0?(d=new MM.Location(b.location.lat,b.location.lon),d.lon+=Math.ceil((i.lon-b.location.lon)/360)*360,c=a.map.locationPoint(d),b.coord=a.map.locationCoordinate(d)):c.x>a.map.dimensions.x&&(d=new MM.Location(b.location.lat,b.location.lon),d.lon-=Math.ceil((b.location.lon-j.lon)/360)*360,c=a.map.locationPoint(d),b.coord=a.map.locationCoordinate(d)),c.scale=1,c.width=c.height=0,MM.moveElement(b.element,c)}var a={},b=[],c=[],d=new MM.CallbackManager(a,["drawn","markeradded"]),e=null,f=function(a){var b=document.createElement("div");return b.className="mmg-default",b.style.position="absolute",b},g=function(a,b){return b.geometry.coordinates[1]-a.geometry.coordinates[1]},h,i=null,j=null,k=function(){return!0};return a.parent=document.createElement("div"),a.parent.style.cssText="position: absolute; top: 0px;left:0px; width:100%; height:100%; margin:0; padding:0; z-index:0",a.addCallback=function(b,c){return d.addCallback(b,c),a},a.removeCallback=function(b,c){return d.removeCallback(b,c),a},a.draw=function(){if(!a.map)return;i=a.map.pointLocation(new MM.Point(0,0)),j=a.map.pointLocation(new MM.Point(a.map.dimensions.x,0)),d.dispatchCallback("drawn",a);for(var b=0;b<c.length;b++)l(c[b])},a.add=function(b){return!b||!b.element?null:(a.parent.appendChild(b.element),c.push(b),d.dispatchCallback("markeradded",b),b)},a.remove=function(b){if(!b)return null;a.parent.removeChild(b.element);for(var d=0;d<c.length;d++)if(c[d]===b)return c.splice(d,1),b;return b},a.markers=function(a){if(!arguments.length)return c},a.add_feature=function(b){return a.features(a.features().concat([b]))},a.sort=function(b){return arguments.length?(g=b,a):g},a.features=function(d){if(!arguments.length)return b;while(a.parent.hasChildNodes())a.parent.removeChild(a.parent.lastChild);c=[],d||(d=[]),b=d.slice(),b.sort(g);for(var e=0;e<b.length;e++)k(b[e])&&a.add({element:f(b[e]),location:new MM.Location(b[e].geometry.coordinates[1],b[e].geometry.coordinates[0]),data:b[e]});return a.map&&a.map.coordinate&&a.map.draw(),a},a.url=function(b,c){function d(b){b&&b.features&&a.features(b.features),c&&c(b.features,a)}if(!arguments.length)return h;if(typeof reqwest=="undefined")throw"reqwest is required for url loading";return typeof b=="string"&&(b=[b]),h=b,reqwest(h[0].match(/geojsonp$/)?{url:h[0]+(~h[0].indexOf("?")?"&":"?")+"callback=grid",type:"jsonp",jsonpCallback:"callback",success:d,error:d}:{url:h[0],type:"json",success:d,error:d}),a},a.extent=function(){var b=[{lat:Infinity,lon:Infinity},{lat:-Infinity,lon:-Infinity}],c=a.features();for(var d=0;d<c.length;d++){var e=c[d].geometry.coordinates;e[0]<b[0].lon&&(b[0].lon=e[0]),e[1]<b[0].lat&&(b[0].lat=e[1]),e[0]>b[1].lon&&(b[1].lon=e[0]),e[1]>b[1].lat&&(b[1].lat=e[1])}return b},a.factory=function(b){return arguments.length?(f=b,a.features(a.features()),a):f},a.filter=function(b){return arguments.length?(k=b,a.features(a.features()),a):k},a.destroy=function(){a.parent.parentNode&&a.parent.parentNode.removeChild(a.parent)},a}function mmg_interaction(a){function i(){a.map.addCallback("panned",function(){if(e)while(c.length)a.remove(c.pop())})}var b={},c=[],d=!0,e=!0,f=!0,g=null,h;b.formatter=function(a){return arguments.length?(h=a,b):h},b.formatter(function(a){var b="",c=a.properties;return c?(c.title&&(b+='<div class="mmg-title">'+c.title+"</div>"),c.description&&(b+='<div class="mmg-description">'+c.description+"</div>"),typeof html_sanitize!==undefined&&(b=html_sanitize(b,function(a){if(/^(https?:\/\/|data:image)/.test(a))return a},function(a){return a})),b):null}),b.hide_on_move=function(a){return arguments.length?(e=a,b):e},b.exclusive=function(a){return arguments.length?(d=a,b):d},b.show_on_hover=function(a){return arguments.length?(f=a,b):f},b.hide_tooltips=function(){while(c.length)a.remove(c.pop());for(var b=0;b<j.length;b++)delete j[b].clicked},b.bind_marker=function(e){var i=function(){e.clicked||(g=window.setTimeout(function(){b.hide_tooltips()},200))},j=function(j){var k=h(e.data);if(!k)return;d&&c.length>0&&(b.hide_tooltips(),g&&window.clearTimeout(g));var l=document.createElement("div");l.className="wax-movetip",l.style.width="100%";var m=l.appendChild(document.createElement("div"));m.style.cssText="position: absolute; pointer-events: none;";var n=m.appendChild(document.createElement("div"));n.className="wax-intip",n.style.cssText="pointer-events: auto;",typeof k=="string"?n.innerHTML=k:n.appendChild(k),m.style.bottom=e.element.offsetHeight/2+20+"px",f&&(l.onmouseover=function(){g&&window.clearTimeout(g)},l.onmouseout=i);var o={element:l,data:{},interactive:!1,location:e.location.copy()};c.push(o),a.add(o),a.draw()};e.element.onclick=e.element.ontouchstart=function(){j(),e.clicked=!0},f&&(e.element.onmouseover=j,e.element.onmouseout=i)};if(a){a.addCallback("drawn",i),a.removeCallback("drawn",i);var j=a.markers();for(var k=0;k<j.length;k++)b.bind_marker(j[k]);a.addCallback("markeradded",function(a,c){c.interactive!==!1&&b.bind_marker(c)})}return b}function mmg_csv(a){function b(a){var b;return c(a,function(a,c){if(c){var d={},e=-1,f=b.length;while(++e<f)d[b[e]]=a[e];return d}return b=a,null})}function c(a,b){function j(){if(f.lastIndex>=a.length)return d;if(i)return i=!1,c;var b=f.lastIndex;if(a.charCodeAt(b)===34){var e=b;while(e++<a.length)if(a.charCodeAt(e)===34){if(a.charCodeAt(e+1)!==34)break;e++}f.lastIndex=e+2;var g=a.charCodeAt(e+1);return g===13?(i=!0,a.charCodeAt(e+2)===10&&f.lastIndex++):g===10&&(i=!0),a.substring(b+1,e).replace(/""/g,'"')}var h=f.exec(a);return h?(i=h[0].charCodeAt(0)!==44,a.substring(b,h.index)):(f.lastIndex=a.length,a.substring(b))}var c={},d={},e=[],f=/\r\n|[,\r\n]/g,g=0,h,i;f.lastIndex=0;while((h=j())!==d){var k=[];while(h!==c&&h!==d)k.push(h),h=j();if(b&&!(k=b(k,g++)))continue;e.push(k)}return e}var d=[],e=b(a);if(!e.length)return callback(d);var f="",g="";for(var h in e[0])h.match(/^Lat/i)&&(f=h),h.match(/^Lon/i)&&(g=h);if(!f||!g)throw"CSV: Could not find latitude or longitude field";for(var i=0;i<e.length;i++)e[i][g]!==undefined&&e[i][g]!==undefined&&d.push({type:"Feature",properties:e[i],geometry:{type:"Point",coordinates:[parseFloat(e[i][g]),parseFloat(e[i][f])]}});return d}function mmg_csv_url(a,b){function c(a){return b(mmg_csv(a.responseText))}if(typeof reqwest=="undefined")throw"CSV: reqwest required for mmg_csv_url";reqwest({url:a,type:"string",success:c,error:c})}function simplestyle_factory(a){var b={small:[20,50],medium:[30,70],large:[35,90]},c=a.properties||{},d=c["marker-size"]||"medium",e=c["marker-symbol"]?"-"+c["marker-symbol"]:"",f=c["marker-color"]||"7e7e7e";f=f.replace("#","");var g=document.createElement("img");g.width=b[d][0],g.height=b[d][1],g.className="simplestyle-marker",g.alt=c.title||"",g.src=(simplestyle_factory.baseurl||"http://a.tiles.mapbox.com/v3/marker/")+"pin-"+d.charAt(0)+e+"+"+f+".png";var h=g.style;return h.position="absolute",h.clip="rect(auto auto "+b[d][1]*.75+"px auto)",h.marginTop=-(b[d][1]/2)+"px",h.marginLeft=-(b[d][0]/2)+"px",h.cursor="pointer",g};(function() {
    // mapbox.js
    var mapbox = {};

    // mapbox.load pulls a [TileJSON](http://mapbox.com/wax/tilejson.html)
    // object from a server and uses it to configure a map and various map-related
    // objects
    mapbox.load = function(url, callback) {
        // Support bare IDs as well as fully-formed URLs
        if (url.indexOf('http') !== 0) {
            url = 'http://a.tiles.mapbox.com/v3/' + url + '.jsonp';
        }
        wax.tilejson(url, function(tj) {
            // Pull zoom level out of center
            tj.zoom = tj.center[2];

            // Instantiate center as a Modest Maps-compatible object
            tj.center = {
                lat: tj.center[1],
                lon: tj.center[0]
            };

            tj.thumbnail = 'http://a.tiles.mapbox.com/v3/' + tj.id + '.png';

            // Instantiate tile layer
            if (tj.tiles) tj.layer = new wax.mm.connector(tj);

            // Instantiate markers layer
            if (tj.data) {
                tj.markers = mmg().factory(simplestyle_factory);
                tj.markers.url(tj.data, function() {
                    mmg_interaction(tj.markers);
                    callback(tj);
                });
            } else {
                callback(tj);
            }
        });
    };

    // Full auto mode. This can be supplied as the argument to mapbox.load
    // in order to construct a map from a tilejson snippet.
    mapbox.auto = function(el, callback) {
        return function(options) {
            var map = mapbox.map(el);
            if (options.layer) map.addLayer(options.layer);
            if (options.markers) map.addLayer(options.markers);
            if (options.attribution) wax.mm.attribution(map, options).appendTo(map.parent);
            if (options.legend) wax.mm.legend(map, options).appendTo(map.parent);
            wax.mm.zoomer(map).appendTo(map.parent);
            wax.mm.zoombox(map);
            map.zoom(options.zoom)
                .center(options.center);
            wax.mm.interaction()
                .map(map)
                .tilejson(options)
                .on(wax.tooltip().parent(map.parent).events());

            map.setZoomRange(options.minzoom, options.maxzoom);
            if (callback) callback(map, options);
        };
    };

    mapbox.markers = function() {
        var m = mmg().factory(simplestyle_factory);
        mmg_interaction(m);
        return m;
    };

    var smooth_handlers = [
        easey.TouchHandler,
        easey.DragHandler,
        easey.DoubleClickHandler,
        easey.MouseWheelHandler];

    var default_handlers = [MM.TouchHandler,
        MM.DragHandler,
        MM.DoubleClickHandler,
        MM.MouseWheelHandler];

    MM.Map.prototype.smooth = function(_) {
        while (this.eventHandlers.length) {
            this.eventHandlers.pop().remove();
        }
        if (_) {
            for (var j = 0; j < smooth_handlers.length; j++) {
                var h = smooth_handlers[j]();
                this.eventHandlers.push(h);
                h.init(this);
            }
        } else {
            for (var k = 0; k < default_handlers.length; k++) {
                var def = default_handlers[k]();
                this.eventHandlers.push(def);
                def.init(this);
            }
        }
        return this;
    };

    // a `mapbox.map` is a modestmaps object with the
    // easey handlers as defaults
    mapbox.map = function(el, layer) {
        var m = new MM.Map(el, layer, null, [
            easey.TouchHandler(),
            easey.DragHandler(),
            easey.DoubleClickHandler(),
            easey.MouseWheelHandler()]);

        m.center = function(location, animate) {
            if (location && animate) {
                easey()
                    .map(this)
                    .to(this.locationCoordinate(location))
                    .optimal(null, null, animate.callback || function() {});
            } else if (location) {
                return this.setCenter(location);
            } else {
                return this.getCenter();
            }
        };

        m.zoom = function(zoom, animate) {
            if (zoom !== undefined && animate) {
                easey()
                    .map(this)
                    .to(this.locationCoordinate(this.getCenter()).copy().zoomTo(zoom))
                    .run(600);
            } else if (zoom !== undefined) {
                return this.setZoom(zoom);
            } else {
                return this.getZoom();
            }
        };

        m.centerzoom = function(location, zoom, animate) {
            if (location && zoom !== undefined && animate) {
                easey()
                    .map(this)
                    .to(this.locationCoordinate(location).zoomTo(zoom))
                    .run(animate.duration || 1000, animate.callback || function() {});
            } else if (location && zoom !== undefined) {
                return this.setCenterZoom(location, zoom);
            }
        };

        return m;
    };

    this.mapbox = mapbox;
})(this);
if (typeof mapbox === 'undefined') mapbox = {};

mapbox.provider = function(options) {
    this.options = {
        tiles: options.tiles,
        scheme: options.scheme || 'xyz',
        minzoom: options.minzoom || 0,
        maxzoom: options.maxzoom || 22,
        bounds: options.bounds || [-180, -90, 180, 90]
    };
};

mapbox.provider.prototype = {

    // these are limits for available *tiles*
    // panning limits will be different (since you can wrap around columns)
    // but if you put Infinity in here it will screw up sourceCoordinate
    tileLimits: [
        new MM.Coordinate(0,0,0),             // top left outer
        new MM.Coordinate(1,1,0).zoomTo(18)   // bottom right inner
    ],

    releaseTile: function(c) { },

    getTile: function(c) {
        if (!(coord = this.sourceCoordinate(c))) return null;
        if (coord.zoom < this.options.minzoom || coord.zoom > this.options.maxzoom) return null;

        return this.options.tiles[parseInt(Math.pow(2, coord.zoom) * coord.row + coord.column, 10) %
            this.options.tiles.length]
            .replace('{z}', coord.zoom.toFixed(0))
            .replace('{x}', coord.column.toFixed(0))
            .replace('{y}', coord.row.toFixed(0));
    },

    // use this to tell MapProvider that tiles only exist between certain zoom levels.
    // should be set separately on Map to restrict interactive zoom/pan ranges
    setZoomRange: function(minZoom, maxZoom) {
        this.tileLimits[0] = this.tileLimits[0].zoomTo(minZoom);
        this.tileLimits[1] = this.tileLimits[1].zoomTo(maxZoom);
    },

    // return null if coord is above/below row extents
    // wrap column around the world if it's outside column extents
    // ... you should override this function if you change the tile limits
    // ... see enforce-limits in examples for details
    sourceCoordinate: function(coord) {
        var TL = this.tileLimits[0].zoomTo(coord.zoom),
            BR = this.tileLimits[1].zoomTo(coord.zoom),
            columnSize = Math.pow(2, coord.zoom),
            wrappedColumn;

        if (coord.column < 0) {
            wrappedColumn = ((coord.column % columnSize) + columnSize) % columnSize;
        } else {
            wrappedColumn = coord.column % columnSize;
        }

        if (coord.row < TL.row || coord.row >= BR.row) {
            return null;
        } else if (wrappedColumn < TL.column || wrappedColumn >= BR.column) {
            return null;
        } else {
            return new MM.Coordinate(coord.row, wrappedColumn, coord.zoom);
        }
    }
};

mapbox.layer = function() {
    if (!(this instanceof mapbox.layer)) {
        return new mapbox.layer();
    }
    // instance variables
    this._tilejson = {};
    this._url = '';

    this.parent = document.createElement('div');
    this.parent.style.cssText = 'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0';
    this.levels = {};
    this.requestManager = new MM.RequestManager();
    this.requestManager.addCallback('requestcomplete', this.getTileComplete());
    this.requestManager.addCallback('requesterror', this.getTileError());
    this.setProvider(new mapbox.provider({
        tiles: ['data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=']
    }));
};

mapbox.layer.prototype.refresh = function() {
    var that = this;
    // When the async request for a TileJSON blob comes back,
    // this resets its own tilejson and calls setProvider on itself.
    wax.tilejson(this._url, function(o) {
        that.tilejson(o);
    });
    return this;
};

mapbox.layer.prototype.url = function(x) {
    if (!arguments.length) return this.url;
    this._url = x;
    return this.refresh();
};

mapbox.layer.prototype.id = function(x) {
    this.url('http://a.tiles.mapbox.com/v3/' + x + '.jsonp');
    return this.refresh();
};

mapbox.layer.prototype.tilejson = function(x) {
    if (!arguments.length) return this._tilejson;
    this.setProvider(new mapbox.provider(x));
    this._tilejson = x;
    return this;
};

mapbox.layer.prototype.name = function(x) {
    if (!arguments.length) return this.name;
    this.name = name;
    return this;
};

MM.extend(mapbox.layer, MM.Layer);
