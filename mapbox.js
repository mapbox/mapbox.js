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
var previousMM=MM;if(!com){var com={};if(!com.modestmaps){com.modestmaps={}}}var MM=com.modestmaps={noConflict:function(){MM=previousMM;return this}};(function(a){a.extend=function(d,b){for(var c in b.prototype){if(typeof d.prototype[c]=="undefined"){d.prototype[c]=b.prototype[c]}}return d};a.getFrame=function(){return function(b){(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(c){window.setTimeout(function(){c(+new Date())},10)})(b)}}();a.transformProperty=(function(d){if(!this.document){return}var c=document.documentElement.style;for(var b=0;b<d.length;b++){if(d[b] in c){return d[b]}}return false})(["transformProperty","WebkitTransform","OTransform","MozTransform","msTransform"]);a.matrixString=function(b){if(b.scale*b.width%1){b.scale+=(1-b.scale*b.width%1)/b.width}var c=b.scale||1;if(a._browser.webkit3d){return"translate3d("+b.x.toFixed(0)+"px,"+b.y.toFixed(0)+"px, 0px)scale3d("+c+","+c+", 1)"}else{return"translate("+b.x.toFixed(6)+"px,"+b.y.toFixed(6)+"px)scale("+c+","+c+")"}};a._browser=(function(b){return{webkit:("WebKitCSSMatrix" in b),webkit3d:("WebKitCSSMatrix" in b)&&("m11" in new WebKitCSSMatrix())}})(this);a.moveElement=function(d,b){if(a.transformProperty){if(!b.scale){b.scale=1}if(!b.width){b.width=0}if(!b.height){b.height=0}var c=a.matrixString(b);if(d[a.transformProperty]!==c){d.style[a.transformProperty]=d[a.transformProperty]=c}}else{d.style.left=b.x+"px";d.style.top=b.y+"px";if(b.width&&b.height&&b.scale){d.style.width=Math.ceil(b.width*b.scale)+"px";d.style.height=Math.ceil(b.height*b.scale)+"px"}}};a.cancelEvent=function(b){b.cancelBubble=true;b.cancel=true;b.returnValue=false;if(b.stopPropagation){b.stopPropagation()}if(b.preventDefault){b.preventDefault()}return false};a.coerceLayer=function(b){if(typeof b=="string"){return new a.Layer(new a.TemplatedLayer(b))}else{if("draw" in b&&typeof b.draw=="function"){return b}else{return new a.Layer(b)}}};a.addEvent=function(d,c,b){if(d.addEventListener){d.addEventListener(c,b,false);if(c=="mousewheel"){d.addEventListener("DOMMouseScroll",b,false)}}else{if(d.attachEvent){d["e"+c+b]=b;d[c+b]=function(){d["e"+c+b](window.event)};d.attachEvent("on"+c,d[c+b])}}};a.removeEvent=function(d,c,b){if(d.removeEventListener){d.removeEventListener(c,b,false);if(c=="mousewheel"){d.removeEventListener("DOMMouseScroll",b,false)}}else{if(d.detachEvent){d.detachEvent("on"+c,d[c+b]);d[c+b]=null}}};a.getStyle=function(c,b){if(c.currentStyle){return c.currentStyle[b]}else{if(window.getComputedStyle){return document.defaultView.getComputedStyle(c,null).getPropertyValue(b)}}};a.Point=function(b,c){this.x=parseFloat(b);this.y=parseFloat(c)};a.Point.prototype={x:0,y:0,toString:function(){return"("+this.x.toFixed(3)+", "+this.y.toFixed(3)+")"},copy:function(){return new a.Point(this.x,this.y)}};a.Point.distance=function(c,b){return Math.sqrt(Math.pow(b.x-c.x,2)+Math.pow(b.y-c.y,2))};a.Point.interpolate=function(d,c,b){return new a.Point(d.x+(c.x-d.x)*b,d.y+(c.y-d.y)*b)};a.Coordinate=function(d,b,c){this.row=d;this.column=b;this.zoom=c};a.Coordinate.prototype={row:0,column:0,zoom:0,toString:function(){return"("+this.row.toFixed(3)+", "+this.column.toFixed(3)+" @"+this.zoom.toFixed(3)+")"},toKey:function(){return this.zoom+","+this.row+","+this.column},copy:function(){return new a.Coordinate(this.row,this.column,this.zoom)},container:function(){return new a.Coordinate(Math.floor(this.row),Math.floor(this.column),Math.floor(this.zoom))},zoomTo:function(b){var c=Math.pow(2,b-this.zoom);return new a.Coordinate(this.row*c,this.column*c,b)},zoomBy:function(c){var b=Math.pow(2,c);return new a.Coordinate(this.row*b,this.column*b,this.zoom+c)},up:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row-b,this.column,this.zoom)},right:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row,this.column+b,this.zoom)},down:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row+b,this.column,this.zoom)},left:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row,this.column-b,this.zoom)}};a.Location=function(b,c){this.lat=parseFloat(b);this.lon=parseFloat(c)};a.Location.prototype={lat:0,lon:0,toString:function(){return"("+this.lat.toFixed(3)+", "+this.lon.toFixed(3)+")"},copy:function(){return new a.Location(this.lat,this.lon)}};a.Location.distance=function(i,h,b){if(!b){b=6378000}var o=Math.PI/180,g=i.lat*o,n=i.lon*o,f=h.lat*o,m=h.lon*o,l=Math.cos(g)*Math.cos(n)*Math.cos(f)*Math.cos(m),k=Math.cos(g)*Math.sin(n)*Math.cos(f)*Math.sin(m),j=Math.sin(g)*Math.sin(f);return Math.acos(l+k+j)*b};a.Location.interpolate=function(i,g,m){if(i.lat===g.lat&&i.lon===g.lon){return new a.Location(i.lat,i.lon)}var s=Math.PI/180,k=i.lat*s,n=i.lon*s,j=g.lat*s,l=g.lon*s;var o=2*Math.asin(Math.sqrt(Math.pow(Math.sin((k-j)/2),2)+Math.cos(k)*Math.cos(j)*Math.pow(Math.sin((n-l)/2),2)));var e=Math.sin((1-m)*o)/Math.sin(o);var b=Math.sin(m*o)/Math.sin(o);var r=e*Math.cos(k)*Math.cos(n)+b*Math.cos(j)*Math.cos(l);var q=e*Math.cos(k)*Math.sin(n)+b*Math.cos(j)*Math.sin(l);var p=e*Math.sin(k)+b*Math.sin(j);var c=Math.atan2(p,Math.sqrt(Math.pow(r,2)+Math.pow(q,2)));var h=Math.atan2(q,r);return new a.Location(c/s,h/s)};a.Location.bearing=function(d,c){var e=Math.PI/180,i=d.lat*e,g=d.lon*e,h=c.lat*e,f=c.lon*e;var b=Math.atan2(Math.sin(g-f)*Math.cos(h),Math.cos(i)*Math.sin(h)-Math.sin(i)*Math.cos(h)*Math.cos(g-f))/-(Math.PI/180);return(b<0)?b+360:b};a.Extent=function(g,c,f,e){if(g instanceof a.Location&&c instanceof a.Location){var d=g,b=c;g=d.lat;c=d.lon;f=b.lat;e=b.lon}if(isNaN(f)){f=g}if(isNaN(e)){e=c}this.north=Math.max(g,f);this.south=Math.min(g,f);this.east=Math.max(e,c);this.west=Math.min(e,c)};a.Extent.prototype={north:0,south:0,east:0,west:0,copy:function(){return new a.Extent(this.north,this.west,this.south,this.east)},toString:function(b){if(isNaN(b)){b=3}return[this.north.toFixed(b),this.west.toFixed(b),this.south.toFixed(b),this.east.toFixed(b)].join(", ")},northWest:function(){return new a.Location(this.north,this.west)},southEast:function(){return new a.Location(this.south,this.east)},northEast:function(){return new a.Location(this.north,this.east)},southWest:function(){return new a.Location(this.south,this.west)},center:function(){return new a.Location(this.south+(this.north-this.south)/2,this.east+(this.west-this.east)/2)},encloseLocation:function(b){if(b.lat>this.north){this.north=b.lat}if(b.lat<this.south){this.south=b.lat}if(b.lon>this.east){this.east=b.lon}if(b.lon<this.west){this.west=b.lon}},encloseLocations:function(c){var b=c.length;for(var d=0;d<b;d++){this.encloseLocation(c[d])}},setFromLocations:function(c){var b=c.length,e=c[0];this.north=this.south=e.lat;this.east=this.west=e.lon;for(var d=1;d<b;d++){this.encloseLocation(c[d])}},encloseExtent:function(b){if(b.north>this.north){this.north=b.north}if(b.south<this.south){this.south=b.south}if(b.east>this.east){this.east=b.east}if(b.west<this.west){this.west=b.west}},containsLocation:function(b){return b.lat>=this.south&&b.lat<=this.north&&b.lon>=this.west&&b.lon<=this.east},toArray:function(){return[this.northWest(),this.southEast()]}};a.Extent.fromString=function(c){var b=c.split(/\s*,\s*/);if(b.length!=4){throw"Invalid extent string (expecting 4 comma-separated numbers)"}return new a.Extent(parseFloat(b[0]),parseFloat(b[1]),parseFloat(b[2]),parseFloat(b[3]))};a.Extent.fromArray=function(b){var c=new a.Extent();c.setFromLocations(b);return c};a.Transformation=function(d,f,b,c,e,g){this.ax=d;this.bx=f;this.cx=b;this.ay=c;this.by=e;this.cy=g};a.Transformation.prototype={ax:0,bx:0,cx:0,ay:0,by:0,cy:0,transform:function(b){return new a.Point(this.ax*b.x+this.bx*b.y+this.cx,this.ay*b.x+this.by*b.y+this.cy)},untransform:function(b){return new a.Point((b.x*this.by-b.y*this.bx-this.cx*this.by+this.cy*this.bx)/(this.ax*this.by-this.ay*this.bx),(b.x*this.ay-b.y*this.ax-this.cx*this.ay+this.cy*this.ax)/(this.bx*this.ay-this.by*this.ax))}};a.deriveTransformation=function(l,k,f,e,b,o,h,g,d,c,n,m){var j=a.linearSolution(l,k,f,b,o,h,d,c,n);var i=a.linearSolution(l,k,e,b,o,g,d,c,m);return new a.Transformation(j[0],j[1],j[2],i[0],i[1],i[2])};a.linearSolution=function(f,o,i,e,n,h,d,m,g){f=parseFloat(f);o=parseFloat(o);i=parseFloat(i);e=parseFloat(e);n=parseFloat(n);h=parseFloat(h);d=parseFloat(d);m=parseFloat(m);g=parseFloat(g);var l=(((h-g)*(o-n))-((i-h)*(n-m)))/(((e-d)*(o-n))-((f-e)*(n-m)));var k=(((h-g)*(f-e))-((i-h)*(e-d)))/(((n-m)*(f-e))-((o-n)*(e-d)));var j=i-(f*l)-(o*k);return[l,k,j]};a.Projection=function(c,b){if(!b){b=new a.Transformation(1,0,0,0,1,0)}this.zoom=c;this.transformation=b};a.Projection.prototype={zoom:0,transformation:null,rawProject:function(b){throw"Abstract method not implemented by subclass."},rawUnproject:function(b){throw"Abstract method not implemented by subclass."},project:function(b){b=this.rawProject(b);if(this.transformation){b=this.transformation.transform(b)}return b},unproject:function(b){if(this.transformation){b=this.transformation.untransform(b)}b=this.rawUnproject(b);return b},locationCoordinate:function(c){var b=new a.Point(Math.PI*c.lon/180,Math.PI*c.lat/180);b=this.project(b);return new a.Coordinate(b.y,b.x,this.zoom)},coordinateLocation:function(c){c=c.zoomTo(this.zoom);var b=new a.Point(c.column,c.row);b=this.unproject(b);return new a.Location(180*b.y/Math.PI,180*b.x/Math.PI)}};a.LinearProjection=function(c,b){a.Projection.call(this,c,b)};a.LinearProjection.prototype={rawProject:function(b){return new a.Point(b.x,b.y)},rawUnproject:function(b){return new a.Point(b.x,b.y)}};a.extend(a.LinearProjection,a.Projection);a.MercatorProjection=function(c,b){a.Projection.call(this,c,b)};a.MercatorProjection.prototype={rawProject:function(b){return new a.Point(b.x,Math.log(Math.tan(0.25*Math.PI+0.5*b.y)))},rawUnproject:function(b){return new a.Point(b.x,2*Math.atan(Math.pow(Math.E,b.y))-0.5*Math.PI)}};a.extend(a.MercatorProjection,a.Projection);a.MapProvider=function(b){if(b){this.getTile=b}};a.MapProvider.prototype={tileLimits:[new a.Coordinate(0,0,0),new a.Coordinate(1,1,0).zoomTo(18)],getTileUrl:function(b){throw"Abstract method not implemented by subclass."},getTile:function(b){throw"Abstract method not implemented by subclass."},releaseTile:function(b){},setZoomRange:function(c,b){this.tileLimits[0]=this.tileLimits[0].zoomTo(c);this.tileLimits[1]=this.tileLimits[1].zoomTo(b)},sourceCoordinate:function(f){var c=this.tileLimits[0].zoomTo(f.zoom),d=this.tileLimits[1].zoomTo(f.zoom),b=Math.pow(2,f.zoom),e;if(f.column<0){e=((f.column%b)+b)%b}else{e=f.column%b}if(f.row<c.row||f.row>=d.row){return null}else{if(e<c.column||e>=d.column){return null}else{return new a.Coordinate(f.row,e,f.zoom)}}}};a.Template=function(e,b){var f=e.match(/{(Q|quadkey)}/);if(f){e=e.replace("{subdomains}","{S}").replace("{zoom}","{Z}").replace("{quadkey}","{Q}")}var d=(b&&b.length&&e.indexOf("{S}")>=0);function c(m,k,l){var j="";for(var h=1;h<=l;h++){j+=(((m>>l-h)&1)<<1)|((k>>l-h)&1)}return j||"0"}var g=function(k){var j=this.sourceCoordinate(k);if(!j){return null}var i=e;if(d){var h=parseInt(j.zoom+j.row+j.column,10)%b.length;i=i.replace("{S}",b[h])}if(f){return i.replace("{Z}",j.zoom.toFixed(0)).replace("{Q}",c(j.row,j.column,j.zoom))}else{return i.replace("{Z}",j.zoom.toFixed(0)).replace("{X}",j.column.toFixed(0)).replace("{Y}",j.row.toFixed(0))}};a.MapProvider.call(this,g)};a.Template.prototype={getTile:function(b){return this.getTileUrl(b)}};a.extend(a.Template,a.MapProvider);a.TemplatedLayer=function(c,b){return new a.Layer(new a.Template(c,b))};a.getMousePoint=function(f,d){var b=new a.Point(f.clientX,f.clientY);b.x+=document.body.scrollLeft+document.documentElement.scrollLeft;b.y+=document.body.scrollTop+document.documentElement.scrollTop;for(var c=d.parent;c;c=c.offsetParent){b.x-=c.offsetLeft;b.y-=c.offsetTop}return b};a.MouseWheelHandler=function(){var d={},g,f,c,b=false;function e(k){var l=0;c=c||new Date().getTime();try{f.scrollTop=1000;f.dispatchEvent(k);l=1000-f.scrollTop}catch(i){l=k.wheelDelta||(-k.detail*5)}var j=new Date().getTime()-c;var h=a.getMousePoint(k,g);if(Math.abs(l)>0&&(j>200)&&!b){g.zoomByAbout(l>0?1:-1,h);c=new Date().getTime()}else{if(b){g.zoomByAbout(l*0.001,h)}}return a.cancelEvent(k)}d.init=function(h){g=h;f=document.body.appendChild(document.createElement("div"));f.style.cssText="visibility:hidden;top:0;height:0;width:0;overflow-y:scroll";var i=f.appendChild(document.createElement("div"));i.style.height="2000px";a.addEvent(g.parent,"mousewheel",e);return d};d.precise=function(h){if(!arguments.length){return b}b=h;return d};d.remove=function(){a.removeEvent(g.parent,"mousewheel",e);f.parentNode.removeChild(f)};return d};a.DoubleClickHandler=function(){var b={},d;function c(g){var f=a.getMousePoint(g,d);d.zoomByAbout(g.shiftKey?-1:1,f);return a.cancelEvent(g)}b.init=function(e){d=e;a.addEvent(d.parent,"dblclick",c);return b};b.remove=function(){a.removeEvent(d.parent,"dblclick",c)};return b};a.DragHandler=function(){var f={},e,g;function c(h){if(h.shiftKey||h.button==2){return}a.addEvent(document,"mouseup",b);a.addEvent(document,"mousemove",d);e=new a.Point(h.clientX,h.clientY);g.parent.style.cursor="move";return a.cancelEvent(h)}function b(h){a.removeEvent(document,"mouseup",b);a.removeEvent(document,"mousemove",d);e=null;g.parent.style.cursor="";return a.cancelEvent(h)}function d(h){if(e){g.panBy(h.clientX-e.x,h.clientY-e.y);e.x=h.clientX;e.y=h.clientY;e.t=+new Date()}return a.cancelEvent(h)}f.init=function(h){g=h;a.addEvent(g.parent,"mousedown",c);return f};f.remove=function(){a.removeEvent(g.parent,"mousedown",c)};return f};a.MouseHandler=function(){var c={},d,b;c.init=function(e){d=e;b=[a.DragHandler().init(d),a.DoubleClickHandler().init(d),a.MouseWheelHandler().init(d)];return c};c.remove=function(){for(var e=0;e<b.length;e++){b[e].remove()}return c};return c};a.TouchHandler=function(){var c={},v,q=250,l=30,b=350,u={},o=[],n=true,s=false,i=null;function m(){var x=document.createElement("div");x.setAttribute("ongesturestart","return;");return(typeof x.ongesturestart==="function")}function h(A){for(var z=0;z<A.touches.length;z+=1){var y=A.touches[z];if(y.identifier in u){var x=u[y.identifier];x.x=y.clientX;x.y=y.clientY;x.scale=A.scale}else{u[y.identifier]={scale:A.scale,startPos:{x:y.clientX,y:y.clientY},x:y.clientX,y:y.clientY,time:new Date().getTime()}}}}function e(x,y){return(x&&x.touch)&&(y.identifier==x.touch.identifier)}function d(x){h(x)}function r(x){switch(x.touches.length){case 1:k(x.touches[0]);break;case 2:t(x);break}h(x);return a.cancelEvent(x)}function f(E){var y=new Date().getTime();if(E.touches.length===0&&s){j(i)}for(var C=0;C<E.changedTouches.length;C+=1){var H=E.changedTouches[C],D=u[H.identifier];if(!D||D.wasPinch){continue}var G={x:H.clientX,y:H.clientY},A=y-D.time,z=a.Point.distance(G,D.startPos);if(z>l){}else{if(A>q){G.end=y;G.duration=A;g(G)}else{G.time=y;w(G)}}}var F={};for(var B=0;B<E.touches.length;B++){F[E.touches[B].identifier]=true}for(var x in u){if(!(x in F)){delete F[x]}}return a.cancelEvent(E)}function g(x){}function w(x){if(o.length&&(x.time-o[0].time)<b){p(x);o=[];return}o=[x]}function p(y){var B=v.getZoom(),C=Math.round(B)+1,x=C-B;var A=new a.Point(y.x,y.y);v.zoomByAbout(x,A)}function k(z){var y={x:z.clientX,y:z.clientY},x=u[z.identifier];v.panBy(y.x-x.x,y.y-x.y)}function t(D){var C=D.touches[0],B=D.touches[1],F=new a.Point(C.clientX,C.clientY),E=new a.Point(B.clientX,B.clientY),z=u[C.identifier],y=u[B.identifier];z.wasPinch=true;y.wasPinch=true;var x=a.Point.interpolate(F,E,0.5);v.zoomByAbout(Math.log(D.scale)/Math.LN2-Math.log(z.scale)/Math.LN2,x);var A=a.Point.interpolate(z,y,0.5);v.panBy(x.x-A.x,x.y-A.y);s=true;i=x}function j(x){if(n){var y=v.getZoom(),A=Math.round(y);v.zoomByAbout(A-y,x)}s=false}c.init=function(y){v=y;if(!m()){return c}a.addEvent(v.parent,"touchstart",d);a.addEvent(v.parent,"touchmove",r);a.addEvent(v.parent,"touchend",f);return c};c.remove=function(){if(!m()){return c}a.removeEvent(v.parent,"touchstart",d);a.removeEvent(v.parent,"touchmove",r);a.removeEvent(v.parent,"touchend",f);return c};return c};a.CallbackManager=function(b,d){this.owner=b;this.callbacks={};for(var c=0;c<d.length;c++){this.callbacks[d[c]]=[]}};a.CallbackManager.prototype={owner:null,callbacks:null,addCallback:function(b,c){if(typeof(c)=="function"&&this.callbacks[b]){this.callbacks[b].push(c)}},removeCallback:function(e,f){if(typeof(f)=="function"&&this.callbacks[e]){var c=this.callbacks[e],b=c.length;for(var d=0;d<b;d++){if(c[d]===f){c.splice(d,1);break}}}},dispatchCallback:function(d,c){if(this.callbacks[d]){for(var b=0;b<this.callbacks[d].length;b+=1){try{this.callbacks[d][b](this.owner,c)}catch(f){}}}}};a.RequestManager=function(){this.loadingBay=document.createDocumentFragment();this.requestsById={};this.openRequestCount=0;this.maxOpenRequests=4;this.requestQueue=[];this.callbackManager=new a.CallbackManager(this,["requestcomplete","requesterror"])};a.RequestManager.prototype={loadingBay:null,requestsById:null,requestQueue:null,openRequestCount:null,maxOpenRequests:null,callbackManager:null,addCallback:function(b,c){this.callbackManager.addCallback(b,c)},removeCallback:function(b,c){this.callbackManager.removeCallback(b,c)},dispatchCallback:function(c,b){this.callbackManager.dispatchCallback(c,b)},clear:function(){this.clearExcept({})},clearRequest:function(d){if(d in this.requestsById){delete this.requestsById[d]}for(var b=0;b<this.requestQueue.length;b++){var c=this.requestQueue[b];if(c&&c.id==d){this.requestQueue[b]=null}}},clearExcept:function(f){for(var e=0;e<this.requestQueue.length;e++){var g=this.requestQueue[e];if(g&&!(g.id in f)){this.requestQueue[e]=null}}var b=this.loadingBay.childNodes;for(var d=b.length-1;d>=0;d--){var c=b[d];if(!(c.id in f)){this.loadingBay.removeChild(c);this.openRequestCount--;c.src=c.coord=c.onload=c.onerror=null}}for(var k in this.requestsById){if(!(k in f)){if(this.requestsById.hasOwnProperty(k)){var h=this.requestsById[k];delete this.requestsById[k];if(h!==null){h=h.id=h.coord=h.url=null}}}}},hasRequest:function(b){return(b in this.requestsById)},requestTile:function(e,d,b){if(!(e in this.requestsById)){var c={id:e,coord:d.copy(),url:b};this.requestsById[e]=c;if(b){this.requestQueue.push(c)}}},getProcessQueue:function(){if(!this._processQueue){var b=this;this._processQueue=function(){b.processQueue()}}return this._processQueue},processQueue:function(d){if(d&&this.requestQueue.length>8){this.requestQueue.sort(d)}while(this.openRequestCount<this.maxOpenRequests&&this.requestQueue.length>0){var c=this.requestQueue.pop();if(c){this.openRequestCount++;var b=document.createElement("img");b.id=c.id;b.style.position="absolute";b.coord=c.coord;this.loadingBay.appendChild(b);b.onload=b.onerror=this.getLoadComplete();b.src=c.url;c=c.id=c.coord=c.url=null}}},_loadComplete:null,getLoadComplete:function(){if(!this._loadComplete){var b=this;this._loadComplete=function(d){d=d||window.event;var c=d.srcElement||d.target;c.onload=c.onerror=null;b.loadingBay.removeChild(c);b.openRequestCount--;delete b.requestsById[c.id];if(d.type==="load"&&(c.complete||(c.readyState&&c.readyState=="complete"))){b.dispatchCallback("requestcomplete",c)}else{b.dispatchCallback("requesterror",{element:c,url:(""+c.src)});c.src=null}setTimeout(b.getProcessQueue(),0)}}return this._loadComplete}};a.Layer=function(c,b){this.parent=b||document.createElement("div");this.parent.style.cssText="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0";this.levels={};this.requestManager=new a.RequestManager();this.requestManager.addCallback("requestcomplete",this.getTileComplete());this.requestManager.addCallback("requesterror",this.getTileError());if(c){this.setProvider(c)}};a.Layer.prototype={map:null,parent:null,tiles:null,levels:null,requestManager:null,provider:null,emptyImage:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",_tileComplete:null,getTileComplete:function(){if(!this._tileComplete){var b=this;this._tileComplete=function(c,d){b.tiles[d.id]=d;b.positionTile(d)}}return this._tileComplete},getTileError:function(){if(!this._tileError){var b=this;this._tileError=function(c,d){d.src=b.emptyImage;b.tiles[d.id]=d;b.positionTile(d)}}return this._tileError},draw:function(){var p=this.map.coordinate.zoomTo(Math.round(this.map.coordinate.zoom));function f(t,s){if(t&&s){var v=t.coord;var u=s.coord;if(v.zoom==u.zoom){var r=Math.abs(p.row-v.row-0.5)+Math.abs(p.column-v.column-0.5);var w=Math.abs(p.row-u.row-0.5)+Math.abs(p.column-u.column-0.5);return r<w?1:r>w?-1:0}else{return v.zoom<u.zoom?1:v.zoom>u.zoom?-1:0}}return t?1:s?-1:0}var o=Math.round(this.map.coordinate.zoom);var n=this.map.pointCoordinate(new a.Point(0,0)).zoomTo(o).container();var i=this.map.pointCoordinate(this.map.dimensions).zoomTo(o).container().right().down();var k={};var m=this.createOrGetLevel(n.zoom);var h=n.copy();for(h.column=n.column;h.column<=i.column;h.column++){for(h.row=n.row;h.row<=i.row;h.row++){var c=this.inventoryVisibleTile(m,h);while(c.length){k[c.pop()]=true}}}for(var e in this.levels){if(this.levels.hasOwnProperty(e)){var q=parseInt(e,10);if(q>=n.zoom-5&&q<n.zoom+2){continue}var d=this.levels[e];d.style.display="none";var g=this.tileElementsInLevel(d);while(g.length){this.provider.releaseTile(g[0].coord);this.requestManager.clearRequest(g[0].coord.toKey());d.removeChild(g[0]);g.shift()}}}var b=n.zoom-5;var l=n.zoom+2;for(var j=b;j<l;j++){this.adjustVisibleLevel(this.levels[j],j,k)}this.requestManager.clearExcept(k);this.requestManager.processQueue(f)},inventoryVisibleTile:function(m,c){var g=c.toKey(),d=[g];if(g in this.tiles){var f=this.tiles[g];if(f.parentNode!=m){m.appendChild(f);if("reAddTile" in this.provider){this.provider.reAddTile(g,c,f)}}return d}if(!this.requestManager.hasRequest(g)){var l=this.provider.getTile(c);if(typeof l=="string"){this.addTileImage(g,c,l)}else{if(l){this.addTileElement(g,c,l)}}}var e=false;var j=c.zoom;for(var h=1;h<=j;h++){var b=c.zoomBy(-h).container();var k=b.toKey();if(k in this.tiles){d.push(k);e=true;break}}if(!e){var i=c.zoomBy(1);d.push(i.toKey());i.column+=1;d.push(i.toKey());i.row+=1;d.push(i.toKey());i.column-=1;d.push(i.toKey())}return d},tileElementsInLevel:function(d){var b=[];for(var c=d.firstChild;c;c=c.nextSibling){if(c.nodeType==1){b.push(c)}}return b},adjustVisibleLevel:function(c,k,d){if(!c){return}var e=1;var j=this.map.coordinate.copy();if(c.childNodes.length>0){c.style.display="block";e=Math.pow(2,this.map.coordinate.zoom-k);j=j.zoomTo(k)}else{c.style.display="none";return false}var h=this.map.tileSize.x*e;var f=this.map.tileSize.y*e;var b=new a.Point(this.map.dimensions.x/2,this.map.dimensions.y/2);var i=this.tileElementsInLevel(c);while(i.length){var g=i.pop();if(!d[g.id]){this.provider.releaseTile(g.coord);this.requestManager.clearRequest(g.coord.toKey());c.removeChild(g)}else{a.moveElement(g,{x:Math.round(b.x+(g.coord.column-j.column)*h),y:Math.round(b.y+(g.coord.row-j.row)*f),scale:e,width:this.map.tileSize.x,height:this.map.tileSize.y})}}},createOrGetLevel:function(b){if(b in this.levels){return this.levels[b]}var c=document.createElement("div");c.id=this.parent.id+"-zoom-"+b;c.style.cssText=this.parent.style.cssText;c.style.zIndex=b;this.parent.appendChild(c);this.levels[b]=c;return c},addTileImage:function(c,d,b){this.requestManager.requestTile(c,d,b)},addTileElement:function(c,d,b){b.id=c;b.coord=d.copy();this.positionTile(b)},positionTile:function(d){var c=this.map.coordinate.zoomTo(d.coord.zoom);d.style.cssText="position:absolute;-webkit-user-select:none;-webkit-user-drag:none;-moz-user-drag:none;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;-ms-transform-origin:0 0;width:"+this.map.tileSize.x+"px; height: "+this.map.tileSize.y+"px;";d.ondragstart=function(){return false};var e=Math.pow(2,this.map.coordinate.zoom-d.coord.zoom);a.moveElement(d,{x:Math.round((this.map.dimensions.x/2)+(d.coord.column-c.column)*this.map.tileSize.x),y:Math.round((this.map.dimensions.y/2)+(d.coord.row-c.row)*this.map.tileSize.y),scale:e,width:this.map.tileSize.x,height:this.map.tileSize.y});var b=this.levels[d.coord.zoom];b.appendChild(d);d.className="map-tile-loaded";if(Math.round(this.map.coordinate.zoom)==d.coord.zoom){b.style.display="block"}this.requestRedraw()},_redrawTimer:undefined,requestRedraw:function(){if(!this._redrawTimer){this._redrawTimer=setTimeout(this.getRedraw(),1000)}},_redraw:null,getRedraw:function(){if(!this._redraw){var b=this;this._redraw=function(){b.draw();b._redrawTimer=0}}return this._redraw},setProvider:function(c){var d=(this.provider===null);if(!d){this.requestManager.clear();for(var b in this.levels){if(this.levels.hasOwnProperty(b)){var e=this.levels[b];while(e.firstChild){this.provider.releaseTile(e.firstChild.coord);e.removeChild(e.firstChild)}}}}this.tiles={};this.provider=c;if(!d){this.draw()}},destroy:function(){this.requestManager.clear();this.requestManager.removeCallback("requestcomplete",this.getTileComplete());this.provider=null;if(this.parent.parentNode){this.parent.parentNode.removeChild(this.parent)}this.map=null}};a.Map=function(f,e,g,h){if(typeof f=="string"){f=document.getElementById(f);if(!f){throw"The ID provided to modest maps could not be found."}}this.parent=f;this.parent.style.padding="0";this.parent.style.overflow="hidden";var b=a.getStyle(this.parent,"position");if(b!="relative"&&b!="absolute"){this.parent.style.position="relative"}this.layers=[];if(!e){e=[]}if(!(e instanceof Array)){e=[e]}for(var d=0;d<e.length;d++){this.addLayer(e[d])}this.projection=new a.MercatorProjection(0,a.deriveTransformation(-Math.PI,Math.PI,0,0,Math.PI,Math.PI,1,0,-Math.PI,-Math.PI,0,1));this.tileSize=new a.Point(256,256);this.coordLimits=[new a.Coordinate(0,-Infinity,0),new a.Coordinate(1,Infinity,0).zoomTo(18)];this.coordinate=new a.Coordinate(0.5,0.5,0);if(!g){g=new a.Point(this.parent.offsetWidth,this.parent.offsetHeight);this.autoSize=true;a.addEvent(window,"resize",this.windowResize())}else{this.autoSize=false;this.parent.style.width=Math.round(g.x)+"px";this.parent.style.height=Math.round(g.y)+"px"}this.dimensions=g;this.callbackManager=new a.CallbackManager(this,["zoomed","panned","centered","extentset","resized","drawn"]);if(h===undefined){this.eventHandlers=[a.MouseHandler().init(this),a.TouchHandler().init(this)]}else{this.eventHandlers=h;if(h instanceof Array){for(var c=0;c<h.length;c++){h[c].init(this)}}}};a.Map.prototype={parent:null,dimensions:null,projection:null,coordinate:null,tileSize:null,coordLimits:null,layers:null,callbackManager:null,eventHandlers:null,autoSize:null,toString:function(){return"Map(#"+this.parent.id+")"},addCallback:function(b,c){this.callbackManager.addCallback(b,c);return this},removeCallback:function(b,c){this.callbackManager.removeCallback(b,c);return this},dispatchCallback:function(c,b){this.callbackManager.dispatchCallback(c,b);return this},windowResize:function(){if(!this._windowResize){var b=this;this._windowResize=function(c){b.dimensions=new a.Point(b.parent.offsetWidth,b.parent.offsetHeight);b.draw();b.dispatchCallback("resized",[b.dimensions])}}return this._windowResize},setZoomRange:function(c,b){this.coordLimits[0]=this.coordLimits[0].zoomTo(c);this.coordLimits[1]=this.coordLimits[1].zoomTo(b);return this},zoomBy:function(b){this.coordinate=this.enforceLimits(this.coordinate.zoomBy(b));a.getFrame(this.getRedraw());this.dispatchCallback("zoomed",b);return this},zoomIn:function(){return this.zoomBy(1)},zoomOut:function(){return this.zoomBy(-1)},setZoom:function(b){return this.zoomBy(b-this.coordinate.zoom)},zoomByAbout:function(c,b){var e=this.pointLocation(b);this.coordinate=this.enforceLimits(this.coordinate.zoomBy(c));var d=this.locationPoint(e);this.dispatchCallback("zoomed",c);return this.panBy(b.x-d.x,b.y-d.y)},panBy:function(c,b){this.coordinate.column-=c/this.tileSize.x;this.coordinate.row-=b/this.tileSize.y;this.coordinate=this.enforceLimits(this.coordinate);a.getFrame(this.getRedraw());this.dispatchCallback("panned",[c,b]);return this},panLeft:function(){return this.panBy(100,0)},panRight:function(){return this.panBy(-100,0)},panDown:function(){return this.panBy(0,-100)},panUp:function(){return this.panBy(0,100)},setCenter:function(b){return this.setCenterZoom(b,this.coordinate.zoom)},setCenterZoom:function(b,c){this.coordinate=this.projection.locationCoordinate(b).zoomTo(parseFloat(c)||0);a.getFrame(this.getRedraw());this.dispatchCallback("centered",[b,c]);return this},extentCoordinate:function(p,q){if(p instanceof a.Extent){p=p.toArray()}var t,j;for(var k=0;k<p.length;k++){var l=this.projection.locationCoordinate(p[k]);if(t){t.row=Math.min(t.row,l.row);t.column=Math.min(t.column,l.column);t.zoom=Math.min(t.zoom,l.zoom);j.row=Math.max(j.row,l.row);j.column=Math.max(j.column,l.column);j.zoom=Math.max(j.zoom,l.zoom)}else{t=l.copy();j=l.copy()}}var h=this.dimensions.x+1;var g=this.dimensions.y+1;var m=(j.column-t.column)/(h/this.tileSize.x);var r=Math.log(m)/Math.log(2);var n=t.zoom-(q?r:Math.ceil(r));var o=(j.row-t.row)/(g/this.tileSize.y);var d=Math.log(o)/Math.log(2);var e=t.zoom-(q?d:Math.ceil(d));var b=Math.min(n,e);b=Math.min(b,this.coordLimits[1].zoom);b=Math.max(b,this.coordLimits[0].zoom);var c=(t.row+j.row)/2;var s=(t.column+j.column)/2;var f=t.zoom;return new a.Coordinate(c,s,f).zoomTo(b)},setExtent:function(b,c){this.coordinate=this.extentCoordinate(b,c);this.draw();this.dispatchCallback("extentset",b);return this},setSize:function(b){this.dimensions=new a.Point(b.x,b.y);this.parent.style.width=Math.round(this.dimensions.x)+"px";this.parent.style.height=Math.round(this.dimensions.y)+"px";if(this.autoSize){a.removeEvent(window,"resize",this.windowResize());this.autoSize=false}this.draw();this.dispatchCallback("resized",this.dimensions);return this},coordinatePoint:function(c){if(c.zoom!=this.coordinate.zoom){c=c.zoomTo(this.coordinate.zoom)}var b=new a.Point(this.dimensions.x/2,this.dimensions.y/2);b.x+=this.tileSize.x*(c.column-this.coordinate.column);b.y+=this.tileSize.y*(c.row-this.coordinate.row);return b},pointCoordinate:function(b){var c=this.coordinate.copy();c.column+=(b.x-this.dimensions.x/2)/this.tileSize.x;c.row+=(b.y-this.dimensions.y/2)/this.tileSize.y;return c},locationCoordinate:function(b){return this.projection.locationCoordinate(b)},coordinateLocation:function(b){return this.projection.coordinateLocation(b)},locationPoint:function(b){return this.coordinatePoint(this.locationCoordinate(b))},pointLocation:function(b){return this.coordinateLocation(this.pointCoordinate(b))},getExtent:function(){return new a.Extent(this.pointLocation(new a.Point(0,0)),this.pointLocation(this.dimensions))},extent:function(b,c){if(b){return this.setExtent(b,c)}else{return this.getExtent()}},getCenter:function(){return this.projection.coordinateLocation(this.coordinate)},center:function(b){if(b){return this.setCenter(b)}else{return this.getCenter()}},getZoom:function(){return this.coordinate.zoom},zoom:function(b){if(b!==undefined){return this.setZoom(b)}else{return this.getZoom()}},getLayers:function(){return this.layers.slice()},getLayerAt:function(b){return this.layers[b]},addLayer:function(b){this.layers.push(b);this.parent.appendChild(b.parent);b.map=this;if(this.coordinate){a.getFrame(this.getRedraw())}return this},removeLayer:function(c){for(var b=0;b<this.layers.length;b++){if(c==this.layers[b]){this.removeLayerAt(b);break}}return this},setLayerAt:function(c,d){if(c<0||c>=this.layers.length){throw new Error("invalid index in setLayerAt(): "+c)}if(this.layers[c]!=d){if(c<this.layers.length){var b=this.layers[c];this.parent.insertBefore(d.parent,b.parent);b.destroy()}else{this.parent.appendChild(d.parent)}this.layers[c]=d;d.map=this;a.getFrame(this.getRedraw())}return this},insertLayerAt:function(c,d){if(c<0||c>this.layers.length){throw new Error("invalid index in insertLayerAt(): "+c)}if(c==this.layers.length){this.layers.push(d);this.parent.appendChild(d.parent)}else{var b=this.layers[c];this.parent.insertBefore(d.parent,b.parent);this.layers.splice(c,0,d)}d.map=this;a.getFrame(this.getRedraw());return this},removeLayerAt:function(c){if(c<0||c>=this.layers.length){throw new Error("invalid index in removeLayer(): "+c)}var b=this.layers[c];this.layers.splice(c,1);b.destroy();return this},swapLayersAt:function(c,b){if(c<0||c>=this.layers.length||b<0||b>=this.layers.length){throw new Error("invalid index in swapLayersAt(): "+index)}var f=this.layers[c],d=this.layers[b],e=document.createElement("div");this.parent.replaceChild(e,d.parent);this.parent.replaceChild(d.parent,f.parent);this.parent.replaceChild(f.parent,e);this.layers[c]=d;this.layers[b]=f;return this},enforceZoomLimits:function(e){var c=this.coordLimits;if(c){var d=c[0].zoom;var b=c[1].zoom;if(e.zoom<d){e=e.zoomTo(d)}else{if(e.zoom>b){e=e.zoomTo(b)}}}return e},enforcePanLimits:function(f){if(this.coordLimits){f=f.copy();var d=this.coordLimits[0].zoomTo(f.zoom);var b=this.coordLimits[1].zoomTo(f.zoom);var c=this.pointCoordinate(new a.Point(0,0)).zoomTo(f.zoom);var e=this.pointCoordinate(this.dimensions).zoomTo(f.zoom);if(b.row-d.row<e.row-c.row){f.row=(b.row+d.row)/2}else{if(c.row<d.row){f.row+=d.row-c.row}else{if(e.row>b.row){f.row-=e.row-b.row}}}if(b.column-d.column<e.column-c.column){f.column=(b.column+d.column)/2}else{if(c.column<d.column){f.column+=d.column-c.column}else{if(e.column>b.column){f.column-=e.column-b.column}}}}return f},enforceLimits:function(b){return this.enforcePanLimits(this.enforceZoomLimits(b))},draw:function(){this.coordinate=this.enforceLimits(this.coordinate);if(this.dimensions.x<=0||this.dimensions.y<=0){if(this.autoSize){var b=this.parent.offsetWidth,d=this.parent.offsetHeight;this.dimensions=new a.Point(b,d);if(b<=0||d<=0){return}}else{return}}for(var c=0;c<this.layers.length;c++){this.layers[c].draw()}this.dispatchCallback("drawn")},_redrawTimer:undefined,requestRedraw:function(){if(!this._redrawTimer){this._redrawTimer=setTimeout(this.getRedraw(),1000)}},_redraw:null,getRedraw:function(){if(!this._redraw){var b=this;this._redraw=function(){b.draw();b._redrawTimer=0}}return this._redraw},destroy:function(){for(var b=0;b<this.layers.length;b++){this.layers[b].destroy()}this.layers=[];this.projection=null;for(var c=0;c<this.eventHandlers.length;c++){this.eventHandlers[c].remove()}if(this.autoSize){a.removeEvent(window,"resize",this.windowResize())}}};a.mapByCenterZoom=function(d,f,b,e){var c=a.coerceLayer(f),g=new a.Map(d,c,false);g.setCenterZoom(b,e).draw();return g};a.mapByExtent=function(d,f,e,c){var b=a.coerceLayer(f),g=new a.Map(d,b,false);g.setExtent([e,c]).draw();return g};if(typeof module!=="undefined"&&module.exports){module.exports={Point:a.Point,Projection:a.Projection,MercatorProjection:a.MercatorProjection,LinearProjection:a.LinearProjection,Transformation:a.Transformation,Location:a.Location,MapProvider:a.MapProvider,Template:a.Template,Coordinate:a.Coordinate,deriveTransformation:a.deriveTransformation}}})(MM);/* wax - 7.0.0dev - v6.0.4-41-ga031612 */


!function (name, context, definition) {
  if (typeof module !== 'undefined') module.exports = definition(name, context);
  else if (typeof define === 'function' && typeof define.amd  === 'object') define(definition);
  else context[name] = definition(name, context);
}('bean', this, function (name, context) {
  var win = window
    , old = context[name]
    , overOut = /over|out/
    , namespaceRegex = /[^\.]*(?=\..*)\.|.*/
    , nameRegex = /\..*/
    , addEvent = 'addEventListener'
    , attachEvent = 'attachEvent'
    , removeEvent = 'removeEventListener'
    , detachEvent = 'detachEvent'
    , doc = document || {}
    , root = doc.documentElement || {}
    , W3C_MODEL = root[addEvent]
    , eventSupport = W3C_MODEL ? addEvent : attachEvent
    , slice = Array.prototype.slice
    , mouseTypeRegex = /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i
    , mouseWheelTypeRegex = /mouse.*(wheel|scroll)/i
    , textTypeRegex = /^text/i
    , touchTypeRegex = /^touch|^gesture/i
    , ONE = { one: 1 } // singleton for quick matching making add() do one()

    , nativeEvents = (function (hash, events, i) {
        for (i = 0; i < events.length; i++)
          hash[events[i]] = 1
        return hash
      })({}, (
          'click dblclick mouseup mousedown contextmenu ' +                  // mouse buttons
          'mousewheel mousemultiwheel DOMMouseScroll ' +                     // mouse wheel
          'mouseover mouseout mousemove selectstart selectend ' +            // mouse movement
          'keydown keypress keyup ' +                                        // keyboard
          'orientationchange ' +                                             // mobile
          'focus blur change reset select submit ' +                         // form elements
          'load unload beforeunload resize move DOMContentLoaded readystatechange ' + // window
          'error abort scroll ' +                                            // misc
          (W3C_MODEL ? // element.fireEvent('onXYZ'... is not forgiving if we try to fire an event
                       // that doesn't actually exist, so make sure we only do these on newer browsers
            'show ' +                                                          // mouse buttons
            'input invalid ' +                                                 // form elements
            'touchstart touchmove touchend touchcancel ' +                     // touch
            'gesturestart gesturechange gestureend ' +                         // gesture
            'message readystatechange pageshow pagehide popstate ' +           // window
            'hashchange offline online ' +                                     // window
            'afterprint beforeprint ' +                                        // printing
            'dragstart dragenter dragover dragleave drag drop dragend ' +      // dnd
            'loadstart progress suspend emptied stalled loadmetadata ' +       // media
            'loadeddata canplay canplaythrough playing waiting seeking ' +     // media
            'seeked ended durationchange timeupdate play pause ratechange ' +  // media
            'volumechange cuechange ' +                                        // media
            'checking noupdate downloading cached updateready obsolete ' +     // appcache
            '' : '')
        ).split(' ')
      )

    , customEvents = (function () {
        function isDescendant(parent, node) {
          while ((node = node.parentNode) !== null) {
            if (node === parent) return true
          }
          return false
        }

        function check(event) {
          var related = event.relatedTarget
          if (!related) return related === null
          return (related !== this && related.prefix !== 'xul' && !/document/.test(this.toString()) && !isDescendant(this, related))
        }

        return {
            mouseenter: { base: 'mouseover', condition: check }
          , mouseleave: { base: 'mouseout', condition: check }
          , mousewheel: { base: /Firefox/.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel' }
        }
      })()

    , fixEvent = (function () {
        var commonProps = 'altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which'.split(' ')
          , mouseProps = commonProps.concat('button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '))
          , mouseWheelProps = mouseProps.concat('wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis'.split(' ')) // 'axis' is FF specific
          , keyProps = commonProps.concat('char charCode key keyCode keyIdentifier keyLocation'.split(' '))
          , textProps = commonProps.concat(['data'])
          , touchProps = commonProps.concat('touches targetTouches changedTouches scale rotation'.split(' '))
          , preventDefault = 'preventDefault'
          , createPreventDefault = function (event) {
              return function () {
                if (event[preventDefault])
                  event[preventDefault]()
                else
                  event.returnValue = false
              }
            }
          , stopPropagation = 'stopPropagation'
          , createStopPropagation = function (event) {
              return function () {
                if (event[stopPropagation])
                  event[stopPropagation]()
                else
                  event.cancelBubble = true
              }
            }
          , createStop = function (synEvent) {
              return function () {
                synEvent[preventDefault]()
                synEvent[stopPropagation]()
                synEvent.stopped = true
              }
            }
          , copyProps = function (event, result, props) {
              var i, p
              for (i = props.length; i--;) {
                p = props[i]
                if (!(p in result) && p in event) result[p] = event[p]
              }
            }

        return function (event, isNative) {
          var result = { originalEvent: event, isNative: isNative }
          if (!event)
            return result

          var props
            , type = event.type
            , target = event.target || event.srcElement

          result[preventDefault] = createPreventDefault(event)
          result[stopPropagation] = createStopPropagation(event)
          result.stop = createStop(result)
          result.target = target && target.nodeType === 3 ? target.parentNode : target

          if (isNative) { // we only need basic augmentation on custom events, the rest is too expensive
            if (type.indexOf('key') !== -1) {
              props = keyProps
              result.keyCode = event.which || event.keyCode
            } else if (mouseTypeRegex.test(type)) {
              props = mouseProps
              result.rightClick = event.which === 3 || event.button === 2
              result.pos = { x: 0, y: 0 }
              if (event.pageX || event.pageY) {
                result.clientX = event.pageX
                result.clientY = event.pageY
              } else if (event.clientX || event.clientY) {
                result.clientX = event.clientX + doc.body.scrollLeft + root.scrollLeft
                result.clientY = event.clientY + doc.body.scrollTop + root.scrollTop
              }
              if (overOut.test(type))
                result.relatedTarget = event.relatedTarget || event[(type === 'mouseover' ? 'from' : 'to') + 'Element']
            } else if (touchTypeRegex.test(type)) {
              props = touchProps
            } else if (mouseWheelTypeRegex.test(type)) {
              props = mouseWheelProps
            } else if (textTypeRegex.test(type)) {
              props = textProps
            }
            copyProps(event, result, props || commonProps)
          }
          return result
        }
      })()

      // if we're in old IE we can't do onpropertychange on doc or win so we use doc.documentElement for both
    , targetElement = function (element, isNative) {
        return !W3C_MODEL && !isNative && (element === doc || element === win) ? root : element
      }

      // we use one of these per listener, of any type
    , RegEntry = (function () {
        function entry(element, type, handler, original, namespaces) {
          this.element = element
          this.type = type
          this.handler = handler
          this.original = original
          this.namespaces = namespaces
          this.custom = customEvents[type]
          this.isNative = nativeEvents[type] && element[eventSupport]
          this.eventType = W3C_MODEL || this.isNative ? type : 'propertychange'
          this.customType = !W3C_MODEL && !this.isNative && type
          this.target = targetElement(element, this.isNative)
          this.eventSupport = this.target[eventSupport]
        }

        entry.prototype = {
            // given a list of namespaces, is our entry in any of them?
            inNamespaces: function (checkNamespaces) {
              var i, j
              if (!checkNamespaces)
                return true
              if (!this.namespaces)
                return false
              for (i = checkNamespaces.length; i--;) {
                for (j = this.namespaces.length; j--;) {
                  if (checkNamespaces[i] === this.namespaces[j])
                    return true
                }
              }
              return false
            }

            // match by element, original fn (opt), handler fn (opt)
          , matches: function (checkElement, checkOriginal, checkHandler) {
              return this.element === checkElement &&
                (!checkOriginal || this.original === checkOriginal) &&
                (!checkHandler || this.handler === checkHandler)
            }
        }

        return entry
      })()

    , registry = (function () {
        // our map stores arrays by event type, just because it's better than storing
        // everything in a single array. uses '$' as a prefix for the keys for safety
        var map = {}

          // generic functional search of our registry for matching listeners,
          // `fn` returns false to break out of the loop
          , forAll = function (element, type, original, handler, fn) {
              if (!type || type === '*') {
                // search the whole registry
                for (var t in map) {
                  if (t.charAt(0) === '$')
                    forAll(element, t.substr(1), original, handler, fn)
                }
              } else {
                var i = 0, l, list = map['$' + type], all = element === '*'
                if (!list)
                  return
                for (l = list.length; i < l; i++) {
                  if (all || list[i].matches(element, original, handler))
                    if (!fn(list[i], list, i, type))
                      return
                }
              }
            }

          , has = function (element, type, original) {
              // we're not using forAll here simply because it's a bit slower and this
              // needs to be fast
              var i, list = map['$' + type]
              if (list) {
                for (i = list.length; i--;) {
                  if (list[i].matches(element, original, null))
                    return true
                }
              }
              return false
            }

          , get = function (element, type, original) {
              var entries = []
              forAll(element, type, original, null, function (entry) { return entries.push(entry) })
              return entries
            }

          , put = function (entry) {
              (map['$' + entry.type] || (map['$' + entry.type] = [])).push(entry)
              return entry
            }

          , del = function (entry) {
              forAll(entry.element, entry.type, null, entry.handler, function (entry, list, i) {
                list.splice(i, 1)
                if (list.length === 0)
                  delete map['$' + entry.type]
                return false
              })
            }

            // dump all entries, used for onunload
          , entries = function () {
              var t, entries = []
              for (t in map) {
                if (t.charAt(0) === '$')
                  entries = entries.concat(map[t])
              }
              return entries
            }

        return { has: has, get: get, put: put, del: del, entries: entries }
      })()

      // add and remove listeners to DOM elements
    , listener = W3C_MODEL ? function (element, type, fn, add) {
        element[add ? addEvent : removeEvent](type, fn, false)
      } : function (element, type, fn, add, custom) {
        if (custom && add && element['_on' + custom] === null)
          element['_on' + custom] = 0
        element[add ? attachEvent : detachEvent]('on' + type, fn)
      }

    , nativeHandler = function (element, fn, args) {
        return function (event) {
          event = fixEvent(event || ((this.ownerDocument || this.document || this).parentWindow || win).event, true)
          return fn.apply(element, [event].concat(args))
        }
      }

    , customHandler = function (element, fn, type, condition, args, isNative) {
        return function (event) {
          if (condition ? condition.apply(this, arguments) : W3C_MODEL ? true : event && event.propertyName === '_on' + type || !event) {
            if (event)
              event = fixEvent(event || ((this.ownerDocument || this.document || this).parentWindow || win).event, isNative)
            fn.apply(element, event && (!args || args.length === 0) ? arguments : slice.call(arguments, event ? 0 : 1).concat(args))
          }
        }
      }

    , once = function (rm, element, type, fn, originalFn) {
        // wrap the handler in a handler that does a remove as well
        return function () {
          rm(element, type, originalFn)
          fn.apply(this, arguments)
        }
      }

    , removeListener = function (element, orgType, handler, namespaces) {
        var i, l, entry
          , type = (orgType && orgType.replace(nameRegex, ''))
          , handlers = registry.get(element, type, handler)

        for (i = 0, l = handlers.length; i < l; i++) {
          if (handlers[i].inNamespaces(namespaces)) {
            if ((entry = handlers[i]).eventSupport)
              listener(entry.target, entry.eventType, entry.handler, false, entry.type)
            // TODO: this is problematic, we have a registry.get() and registry.del() that
            // both do registry searches so we waste cycles doing this. Needs to be rolled into
            // a single registry.forAll(fn) that removes while finding, but the catch is that
            // we'll be splicing the arrays that we're iterating over. Needs extra tests to
            // make sure we don't screw it up. @rvagg
            registry.del(entry)
          }
        }
      }

    , addListener = function (element, orgType, fn, originalFn, args) {
        var entry
          , type = orgType.replace(nameRegex, '')
          , namespaces = orgType.replace(namespaceRegex, '').split('.')

        if (registry.has(element, type, fn))
          return element // no dupe
        if (type === 'unload')
          fn = once(removeListener, element, type, fn, originalFn) // self clean-up
        if (customEvents[type]) {
          if (customEvents[type].condition)
            fn = customHandler(element, fn, type, customEvents[type].condition, true)
          type = customEvents[type].base || type
        }
        entry = registry.put(new RegEntry(element, type, fn, originalFn, namespaces[0] && namespaces))
        entry.handler = entry.isNative ?
          nativeHandler(element, entry.handler, args) :
          customHandler(element, entry.handler, type, false, args, false)
        if (entry.eventSupport)
          listener(entry.target, entry.eventType, entry.handler, true, entry.customType)
      }

    , del = function (selector, fn, $) {
        return function (e) {
          var target, i, array = typeof selector === 'string' ? $(selector, this) : selector
          for (target = e.target; target && target !== this; target = target.parentNode) {
            for (i = array.length; i--;) {
              if (array[i] === target) {
                return fn.apply(target, arguments)
              }
            }
          }
        }
      }

    , remove = function (element, typeSpec, fn) {
        var k, m, type, namespaces, i
          , rm = removeListener
          , isString = typeSpec && typeof typeSpec === 'string'

        if (isString && typeSpec.indexOf(' ') > 0) {
          // remove(el, 't1 t2 t3', fn) or remove(el, 't1 t2 t3')
          typeSpec = typeSpec.split(' ')
          for (i = typeSpec.length; i--;)
            remove(element, typeSpec[i], fn)
          return element
        }
        type = isString && typeSpec.replace(nameRegex, '')
        if (type && customEvents[type])
          type = customEvents[type].type
        if (!typeSpec || isString) {
          // remove(el) or remove(el, t1.ns) or remove(el, .ns) or remove(el, .ns1.ns2.ns3)
          if (namespaces = isString && typeSpec.replace(namespaceRegex, ''))
            namespaces = namespaces.split('.')
          rm(element, type, fn, namespaces)
        } else if (typeof typeSpec === 'function') {
          // remove(el, fn)
          rm(element, null, typeSpec)
        } else {
          // remove(el, { t1: fn1, t2, fn2 })
          for (k in typeSpec) {
            if (typeSpec.hasOwnProperty(k))
              remove(element, k, typeSpec[k])
          }
        }
        return element
      }

    , add = function (element, events, fn, delfn, $) {
        var type, types, i, args
          , originalFn = fn
          , isDel = fn && typeof fn === 'string'

        if (events && !fn && typeof events === 'object') {
          for (type in events) {
            if (events.hasOwnProperty(type))
              add.apply(this, [ element, type, events[type] ])
          }
        } else {
          args = arguments.length > 3 ? slice.call(arguments, 3) : []
          types = (isDel ? fn : events).split(' ')
          isDel && (fn = del(events, (originalFn = delfn), $)) && (args = slice.call(args, 1))
          // special case for one()
          this === ONE && (fn = once(remove, element, events, fn, originalFn))
          for (i = types.length; i--;) addListener(element, types[i], fn, originalFn, args)
        }
        return element
      }

    , one = function () {
        return add.apply(ONE, arguments)
      }

    , fireListener = W3C_MODEL ? function (isNative, type, element) {
        var evt = doc.createEvent(isNative ? 'HTMLEvents' : 'UIEvents')
        evt[isNative ? 'initEvent' : 'initUIEvent'](type, true, true, win, 1)
        element.dispatchEvent(evt)
      } : function (isNative, type, element) {
        element = targetElement(element, isNative)
        // if not-native then we're using onpropertychange so we just increment a custom property
        isNative ? element.fireEvent('on' + type, doc.createEventObject()) : element['_on' + type]++
      }

    , fire = function (element, type, args) {
        var i, j, l, names, handlers
          , types = type.split(' ')

        for (i = types.length; i--;) {
          type = types[i].replace(nameRegex, '')
          if (names = types[i].replace(namespaceRegex, ''))
            names = names.split('.')
          if (!names && !args && element[eventSupport]) {
            fireListener(nativeEvents[type], type, element)
          } else {
            // non-native event, either because of a namespace, arguments or a non DOM element
            // iterate over all listeners and manually 'fire'
            handlers = registry.get(element, type)
            args = [false].concat(args)
            for (j = 0, l = handlers.length; j < l; j++) {
              if (handlers[j].inNamespaces(names))
                handlers[j].handler.apply(element, args)
            }
          }
        }
        return element
      }

    , clone = function (element, from, type) {
        var i = 0
          , handlers = registry.get(from, type)
          , l = handlers.length

        for (;i < l; i++)
          handlers[i].original && add(element, handlers[i].type, handlers[i].original)
        return element
      }

    , bean = {
          add: add
        , one: one
        , remove: remove
        , clone: clone
        , fire: fire
        , noConflict: function () {
            context[name] = old
            return this
          }
      }

  if (win[attachEvent]) {
    // for IE, clean up on unload to avoid leaks
    var cleanup = function () {
      var i, entries = registry.entries()
      for (i in entries) {
        if (entries[i].type && entries[i].type !== 'unload')
          remove(entries[i].element, entries[i].type)
      }
      win[detachEvent]('onunload', cleanup)
      win.CollectGarbage && win.CollectGarbage()
    }
    win[attachEvent]('onunload', cleanup)
  }

  return bean
})
// Copyright Google Inc.
// Licensed under the Apache Licence Version 2.0
// Autogenerated at Tue Oct 11 13:36:46 EDT 2011
// @provides html4
var html4 = {};
html4.atype = {
  NONE: 0,
  URI: 1,
  URI_FRAGMENT: 11,
  SCRIPT: 2,
  STYLE: 3,
  ID: 4,
  IDREF: 5,
  IDREFS: 6,
  GLOBAL_NAME: 7,
  LOCAL_NAME: 8,
  CLASSES: 9,
  FRAME_TARGET: 10
};
html4.ATTRIBS = {
  '*::class': 9,
  '*::dir': 0,
  '*::id': 4,
  '*::lang': 0,
  '*::onclick': 2,
  '*::ondblclick': 2,
  '*::onkeydown': 2,
  '*::onkeypress': 2,
  '*::onkeyup': 2,
  '*::onload': 2,
  '*::onmousedown': 2,
  '*::onmousemove': 2,
  '*::onmouseout': 2,
  '*::onmouseover': 2,
  '*::onmouseup': 2,
  '*::style': 3,
  '*::title': 0,
  'a::accesskey': 0,
  'a::coords': 0,
  'a::href': 1,
  'a::hreflang': 0,
  'a::name': 7,
  'a::onblur': 2,
  'a::onfocus': 2,
  'a::rel': 0,
  'a::rev': 0,
  'a::shape': 0,
  'a::tabindex': 0,
  'a::target': 10,
  'a::type': 0,
  'area::accesskey': 0,
  'area::alt': 0,
  'area::coords': 0,
  'area::href': 1,
  'area::nohref': 0,
  'area::onblur': 2,
  'area::onfocus': 2,
  'area::shape': 0,
  'area::tabindex': 0,
  'area::target': 10,
  'bdo::dir': 0,
  'blockquote::cite': 1,
  'br::clear': 0,
  'button::accesskey': 0,
  'button::disabled': 0,
  'button::name': 8,
  'button::onblur': 2,
  'button::onfocus': 2,
  'button::tabindex': 0,
  'button::type': 0,
  'button::value': 0,
  'canvas::height': 0,
  'canvas::width': 0,
  'caption::align': 0,
  'col::align': 0,
  'col::char': 0,
  'col::charoff': 0,
  'col::span': 0,
  'col::valign': 0,
  'col::width': 0,
  'colgroup::align': 0,
  'colgroup::char': 0,
  'colgroup::charoff': 0,
  'colgroup::span': 0,
  'colgroup::valign': 0,
  'colgroup::width': 0,
  'del::cite': 1,
  'del::datetime': 0,
  'dir::compact': 0,
  'div::align': 0,
  'dl::compact': 0,
  'font::color': 0,
  'font::face': 0,
  'font::size': 0,
  'form::accept': 0,
  'form::action': 1,
  'form::autocomplete': 0,
  'form::enctype': 0,
  'form::method': 0,
  'form::name': 7,
  'form::onreset': 2,
  'form::onsubmit': 2,
  'form::target': 10,
  'h1::align': 0,
  'h2::align': 0,
  'h3::align': 0,
  'h4::align': 0,
  'h5::align': 0,
  'h6::align': 0,
  'hr::align': 0,
  'hr::noshade': 0,
  'hr::size': 0,
  'hr::width': 0,
  'iframe::align': 0,
  'iframe::frameborder': 0,
  'iframe::height': 0,
  'iframe::marginheight': 0,
  'iframe::marginwidth': 0,
  'iframe::width': 0,
  'img::align': 0,
  'img::alt': 0,
  'img::border': 0,
  'img::height': 0,
  'img::hspace': 0,
  'img::ismap': 0,
  'img::name': 7,
  'img::src': 1,
  'img::usemap': 11,
  'img::vspace': 0,
  'img::width': 0,
  'input::accept': 0,
  'input::accesskey': 0,
  'input::align': 0,
  'input::alt': 0,
  'input::autocomplete': 0,
  'input::checked': 0,
  'input::disabled': 0,
  'input::ismap': 0,
  'input::maxlength': 0,
  'input::name': 8,
  'input::onblur': 2,
  'input::onchange': 2,
  'input::onfocus': 2,
  'input::onselect': 2,
  'input::readonly': 0,
  'input::size': 0,
  'input::src': 1,
  'input::tabindex': 0,
  'input::type': 0,
  'input::usemap': 11,
  'input::value': 0,
  'ins::cite': 1,
  'ins::datetime': 0,
  'label::accesskey': 0,
  'label::for': 5,
  'label::onblur': 2,
  'label::onfocus': 2,
  'legend::accesskey': 0,
  'legend::align': 0,
  'li::type': 0,
  'li::value': 0,
  'map::name': 7,
  'menu::compact': 0,
  'ol::compact': 0,
  'ol::start': 0,
  'ol::type': 0,
  'optgroup::disabled': 0,
  'optgroup::label': 0,
  'option::disabled': 0,
  'option::label': 0,
  'option::selected': 0,
  'option::value': 0,
  'p::align': 0,
  'pre::width': 0,
  'q::cite': 1,
  'select::disabled': 0,
  'select::multiple': 0,
  'select::name': 8,
  'select::onblur': 2,
  'select::onchange': 2,
  'select::onfocus': 2,
  'select::size': 0,
  'select::tabindex': 0,
  'table::align': 0,
  'table::bgcolor': 0,
  'table::border': 0,
  'table::cellpadding': 0,
  'table::cellspacing': 0,
  'table::frame': 0,
  'table::rules': 0,
  'table::summary': 0,
  'table::width': 0,
  'tbody::align': 0,
  'tbody::char': 0,
  'tbody::charoff': 0,
  'tbody::valign': 0,
  'td::abbr': 0,
  'td::align': 0,
  'td::axis': 0,
  'td::bgcolor': 0,
  'td::char': 0,
  'td::charoff': 0,
  'td::colspan': 0,
  'td::headers': 6,
  'td::height': 0,
  'td::nowrap': 0,
  'td::rowspan': 0,
  'td::scope': 0,
  'td::valign': 0,
  'td::width': 0,
  'textarea::accesskey': 0,
  'textarea::cols': 0,
  'textarea::disabled': 0,
  'textarea::name': 8,
  'textarea::onblur': 2,
  'textarea::onchange': 2,
  'textarea::onfocus': 2,
  'textarea::onselect': 2,
  'textarea::readonly': 0,
  'textarea::rows': 0,
  'textarea::tabindex': 0,
  'tfoot::align': 0,
  'tfoot::char': 0,
  'tfoot::charoff': 0,
  'tfoot::valign': 0,
  'th::abbr': 0,
  'th::align': 0,
  'th::axis': 0,
  'th::bgcolor': 0,
  'th::char': 0,
  'th::charoff': 0,
  'th::colspan': 0,
  'th::headers': 6,
  'th::height': 0,
  'th::nowrap': 0,
  'th::rowspan': 0,
  'th::scope': 0,
  'th::valign': 0,
  'th::width': 0,
  'thead::align': 0,
  'thead::char': 0,
  'thead::charoff': 0,
  'thead::valign': 0,
  'tr::align': 0,
  'tr::bgcolor': 0,
  'tr::char': 0,
  'tr::charoff': 0,
  'tr::valign': 0,
  'ul::compact': 0,
  'ul::type': 0
};
html4.eflags = {
  OPTIONAL_ENDTAG: 1,
  EMPTY: 2,
  CDATA: 4,
  RCDATA: 8,
  UNSAFE: 16,
  FOLDABLE: 32,
  SCRIPT: 64,
  STYLE: 128
};
html4.ELEMENTS = {
  'a': 0,
  'abbr': 0,
  'acronym': 0,
  'address': 0,
  'applet': 16,
  'area': 2,
  'b': 0,
  'base': 18,
  'basefont': 18,
  'bdo': 0,
  'big': 0,
  'blockquote': 0,
  'body': 49,
  'br': 2,
  'button': 0,
  'canvas': 0,
  'caption': 0,
  'center': 0,
  'cite': 0,
  'code': 0,
  'col': 2,
  'colgroup': 1,
  'dd': 1,
  'del': 0,
  'dfn': 0,
  'dir': 0,
  'div': 0,
  'dl': 0,
  'dt': 1,
  'em': 0,
  'fieldset': 0,
  'font': 0,
  'form': 0,
  'frame': 18,
  'frameset': 16,
  'h1': 0,
  'h2': 0,
  'h3': 0,
  'h4': 0,
  'h5': 0,
  'h6': 0,
  'head': 49,
  'hr': 2,
  'html': 49,
  'i': 0,
  'iframe': 4,
  'img': 2,
  'input': 2,
  'ins': 0,
  'isindex': 18,
  'kbd': 0,
  'label': 0,
  'legend': 0,
  'li': 1,
  'link': 18,
  'map': 0,
  'menu': 0,
  'meta': 18,
  'nobr': 0,
  'noembed': 4,
  'noframes': 20,
  'noscript': 20,
  'object': 16,
  'ol': 0,
  'optgroup': 0,
  'option': 1,
  'p': 1,
  'param': 18,
  'pre': 0,
  'q': 0,
  's': 0,
  'samp': 0,
  'script': 84,
  'select': 0,
  'small': 0,
  'span': 0,
  'strike': 0,
  'strong': 0,
  'style': 148,
  'sub': 0,
  'sup': 0,
  'table': 0,
  'tbody': 1,
  'td': 1,
  'textarea': 8,
  'tfoot': 1,
  'th': 1,
  'thead': 1,
  'title': 24,
  'tr': 1,
  'tt': 0,
  'u': 0,
  'ul': 0,
  'var': 0
};
html4.ueffects = {
  NOT_LOADED: 0,
  SAME_DOCUMENT: 1,
  NEW_DOCUMENT: 2
};
html4.URIEFFECTS = {
  'a::href': 2,
  'area::href': 2,
  'blockquote::cite': 0,
  'body::background': 1,
  'del::cite': 0,
  'form::action': 2,
  'img::src': 1,
  'input::src': 1,
  'ins::cite': 0,
  'q::cite': 0
};
html4.ltypes = {
  UNSANDBOXED: 2,
  SANDBOXED: 1,
  DATA: 0
};
html4.LOADERTYPES = {
  'a::href': 2,
  'area::href': 2,
  'blockquote::cite': 2,
  'body::background': 1,
  'del::cite': 2,
  'form::action': 2,
  'img::src': 1,
  'input::src': 1,
  'ins::cite': 2,
  'q::cite': 2
};;
// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview
 * An HTML sanitizer that can satisfy a variety of security policies.
 *
 * <p>
 * The HTML sanitizer is built around a SAX parser and HTML element and
 * attributes schemas.
 *
 * @author mikesamuel@gmail.com
 * @requires html4
 * @overrides window
 * @provides html, html_sanitize
 */

/**
 * @namespace
 */
var html = (function (html4) {
  var lcase;
  // The below may not be true on browsers in the Turkish locale.
  if ('script' === 'SCRIPT'.toLowerCase()) {
    lcase = function (s) { return s.toLowerCase(); };
  } else {
    /**
     * {@updoc
     * $ lcase('SCRIPT')
     * # 'script'
     * $ lcase('script')
     * # 'script'
     * }
     */
    lcase = function (s) {
      return s.replace(
          /[A-Z]/g,
          function (ch) {
            return String.fromCharCode(ch.charCodeAt(0) | 32);
          });
    };
  }

  var ENTITIES = {
    lt   : '<',
    gt   : '>',
    amp  : '&',
    nbsp : '\240',
    quot : '"',
    apos : '\''
  };
  
  // Schemes on which to defer to uripolicy. Urls with other schemes are denied
  var WHITELISTED_SCHEMES = /^(?:https?|mailto|data)$/i;

  var decimalEscapeRe = /^#(\d+)$/;
  var hexEscapeRe = /^#x([0-9A-Fa-f]+)$/;
  /**
   * Decodes an HTML entity.
   *
   * {@updoc
   * $ lookupEntity('lt')
   * # '<'
   * $ lookupEntity('GT')
   * # '>'
   * $ lookupEntity('amp')
   * # '&'
   * $ lookupEntity('nbsp')
   * # '\xA0'
   * $ lookupEntity('apos')
   * # "'"
   * $ lookupEntity('quot')
   * # '"'
   * $ lookupEntity('#xa')
   * # '\n'
   * $ lookupEntity('#10')
   * # '\n'
   * $ lookupEntity('#x0a')
   * # '\n'
   * $ lookupEntity('#010')
   * # '\n'
   * $ lookupEntity('#x00A')
   * # '\n'
   * $ lookupEntity('Pi')      // Known failure
   * # '\u03A0'
   * $ lookupEntity('pi')      // Known failure
   * # '\u03C0'
   * }
   *
   * @param name the content between the '&' and the ';'.
   * @return a single unicode code-point as a string.
   */
  function lookupEntity(name) {
    name = lcase(name);  // TODO: &pi; is different from &Pi;
    if (ENTITIES.hasOwnProperty(name)) { return ENTITIES[name]; }
    var m = name.match(decimalEscapeRe);
    if (m) {
      return String.fromCharCode(parseInt(m[1], 10));
    } else if (!!(m = name.match(hexEscapeRe))) {
      return String.fromCharCode(parseInt(m[1], 16));
    }
    return '';
  }

  function decodeOneEntity(_, name) {
    return lookupEntity(name);
  }

  var nulRe = /\0/g;
  function stripNULs(s) {
    return s.replace(nulRe, '');
  }

  var entityRe = /&(#\d+|#x[0-9A-Fa-f]+|\w+);/g;
  /**
   * The plain text of a chunk of HTML CDATA which possibly containing.
   *
   * {@updoc
   * $ unescapeEntities('')
   * # ''
   * $ unescapeEntities('hello World!')
   * # 'hello World!'
   * $ unescapeEntities('1 &lt; 2 &amp;&AMP; 4 &gt; 3&#10;')
   * # '1 < 2 && 4 > 3\n'
   * $ unescapeEntities('&lt;&lt <- unfinished entity&gt;')
   * # '<&lt <- unfinished entity>'
   * $ unescapeEntities('/foo?bar=baz&copy=true')  // & often unescaped in URLS
   * # '/foo?bar=baz&copy=true'
   * $ unescapeEntities('pi=&pi;&#x3c0;, Pi=&Pi;\u03A0') // FIXME: known failure
   * # 'pi=\u03C0\u03c0, Pi=\u03A0\u03A0'
   * }
   *
   * @param s a chunk of HTML CDATA.  It must not start or end inside an HTML
   *   entity.
   */
  function unescapeEntities(s) {
    return s.replace(entityRe, decodeOneEntity);
  }

  var ampRe = /&/g;
  var looseAmpRe = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi;
  var ltRe = /</g;
  var gtRe = />/g;
  var quotRe = /\"/g;
  var eqRe = /\=/g;  // Backslash required on JScript.net

  /**
   * Escapes HTML special characters in attribute values as HTML entities.
   *
   * {@updoc
   * $ escapeAttrib('')
   * # ''
   * $ escapeAttrib('"<<&==&>>"')  // Do not just escape the first occurrence.
   * # '&#34;&lt;&lt;&amp;&#61;&#61;&amp;&gt;&gt;&#34;'
   * $ escapeAttrib('Hello <World>!')
   * # 'Hello &lt;World&gt;!'
   * }
   */
  function escapeAttrib(s) {
    // Escaping '=' defangs many UTF-7 and SGML short-tag attacks.
    return s.replace(ampRe, '&amp;').replace(ltRe, '&lt;').replace(gtRe, '&gt;')
        .replace(quotRe, '&#34;').replace(eqRe, '&#61;');
  }

  /**
   * Escape entities in RCDATA that can be escaped without changing the meaning.
   * {@updoc
   * $ normalizeRCData('1 < 2 &&amp; 3 > 4 &amp;& 5 &lt; 7&8')
   * # '1 &lt; 2 &amp;&amp; 3 &gt; 4 &amp;&amp; 5 &lt; 7&amp;8'
   * }
   */
  function normalizeRCData(rcdata) {
    return rcdata
        .replace(looseAmpRe, '&amp;$1')
        .replace(ltRe, '&lt;')
        .replace(gtRe, '&gt;');
  }


  // TODO(mikesamuel): validate sanitizer regexs against the HTML5 grammar at
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/tokenization.html
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html

  /** token definitions. */
  var INSIDE_TAG_TOKEN = new RegExp(
      // Don't capture space.
      '^\\s*(?:'
      // Capture an attribute name in group 1, and value in group 3.
      // We capture the fact that there was an attribute in group 2, since
      // interpreters are inconsistent in whether a group that matches nothing
      // is null, undefined, or the empty string.
      + ('(?:'
         + '([a-z][a-z-]*)'                    // attribute name
         + ('('                                // optionally followed
            + '\\s*=\\s*'
            + ('('
               // A double quoted string.
               + '\"[^\"]*\"'
               // A single quoted string.
               + '|\'[^\']*\''
               // The positive lookahead is used to make sure that in
               // <foo bar= baz=boo>, the value for bar is blank, not "baz=boo".
               + '|(?=[a-z][a-z-]*\\s*=)'
               // An unquoted value that is not an attribute name.
               // We know it is not an attribute name because the previous
               // zero-width match would've eliminated that possibility.
               + '|[^>\"\'\\s]*'
               + ')'
               )
            + ')'
            ) + '?'
         + ')'
         )
      // End of tag captured in group 3.
      + '|(\/?>)'
      // Don't capture cruft
      + '|[\\s\\S][^a-z\\s>]*)',
      'i');

  var OUTSIDE_TAG_TOKEN = new RegExp(
      '^(?:'
      // Entity captured in group 1.
      + '&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);'
      // Comment, doctypes, and processing instructions not captured.
      + '|<\!--[\\s\\S]*?--\>|<!\\w[^>]*>|<\\?[^>*]*>'
      // '/' captured in group 2 for close tags, and name captured in group 3.
      + '|<(\/)?([a-z][a-z0-9]*)'
      // Text captured in group 4.
      + '|([^<&>]+)'
      // Cruft captured in group 5.
      + '|([<&>]))',
      'i');

  /**
   * Given a SAX-like event handler, produce a function that feeds those
   * events and a parameter to the event handler.
   *
   * The event handler has the form:{@code
   * {
   *   // Name is an upper-case HTML tag name.  Attribs is an array of
   *   // alternating upper-case attribute names, and attribute values.  The
   *   // attribs array is reused by the parser.  Param is the value passed to
   *   // the saxParser.
   *   startTag: function (name, attribs, param) { ... },
   *   endTag:   function (name, param) { ... },
   *   pcdata:   function (text, param) { ... },
   *   rcdata:   function (text, param) { ... },
   *   cdata:    function (text, param) { ... },
   *   startDoc: function (param) { ... },
   *   endDoc:   function (param) { ... }
   * }}
   *
   * @param {Object} handler a record containing event handlers.
   * @return {Function} that takes a chunk of html and a parameter.
   *   The parameter is passed on to the handler methods.
   */
  function makeSaxParser(handler) {
    return function parse(htmlText, param) {
      htmlText = String(htmlText);
      var htmlLower = null;

      var inTag = false;  // True iff we're currently processing a tag.
      var attribs = [];  // Accumulates attribute names and values.
      var tagName = void 0;  // The name of the tag currently being processed.
      var eflags = void 0;  // The element flags for the current tag.
      var openTag = void 0;  // True if the current tag is an open tag.

      if (handler.startDoc) { handler.startDoc(param); }

      while (htmlText) {
        var m = htmlText.match(inTag ? INSIDE_TAG_TOKEN : OUTSIDE_TAG_TOKEN);
        htmlText = htmlText.substring(m[0].length);

        if (inTag) {
          if (m[1]) { // attribute
            // setAttribute with uppercase names doesn't work on IE6.
            var attribName = lcase(m[1]);
            var decodedValue;
            if (m[2]) {
              var encodedValue = m[3];
              switch (encodedValue.charCodeAt(0)) {  // Strip quotes
                case 34: case 39:
                  encodedValue = encodedValue.substring(
                      1, encodedValue.length - 1);
                  break;
              }
              decodedValue = unescapeEntities(stripNULs(encodedValue));
            } else {
              // Use name as value for valueless attribs, so
              //   <input type=checkbox checked>
              // gets attributes ['type', 'checkbox', 'checked', 'checked']
              decodedValue = attribName;
            }
            attribs.push(attribName, decodedValue);
          } else if (m[4]) {
            if (eflags !== void 0) {  // False if not in whitelist.
              if (openTag) {
                if (handler.startTag) {
                  handler.startTag(tagName, attribs, param);
                }
              } else {
                if (handler.endTag) {
                  handler.endTag(tagName, param);
                }
              }
            }

            if (openTag
                && (eflags & (html4.eflags.CDATA | html4.eflags.RCDATA))) {
              if (htmlLower === null) {
                htmlLower = lcase(htmlText);
              } else {
                htmlLower = htmlLower.substring(
                    htmlLower.length - htmlText.length);
              }
              var dataEnd = htmlLower.indexOf('</' + tagName);
              if (dataEnd < 0) { dataEnd = htmlText.length; }
              if (dataEnd) {
                if (eflags & html4.eflags.CDATA) {
                  if (handler.cdata) {
                    handler.cdata(htmlText.substring(0, dataEnd), param);
                  }
                } else if (handler.rcdata) {
                  handler.rcdata(
                    normalizeRCData(htmlText.substring(0, dataEnd)), param);
                }
                htmlText = htmlText.substring(dataEnd);
              }
            }

            tagName = eflags = openTag = void 0;
            attribs.length = 0;
            inTag = false;
          }
        } else {
          if (m[1]) {  // Entity
            if (handler.pcdata) { handler.pcdata(m[0], param); }
          } else if (m[3]) {  // Tag
            openTag = !m[2];
            inTag = true;
            tagName = lcase(m[3]);
            eflags = html4.ELEMENTS.hasOwnProperty(tagName)
                ? html4.ELEMENTS[tagName] : void 0;
          } else if (m[4]) {  // Text
            if (handler.pcdata) { handler.pcdata(m[4], param); }
          } else if (m[5]) {  // Cruft
            if (handler.pcdata) {
              var ch = m[5];
              handler.pcdata(
                  ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : '&amp;',
                  param);
            }
          }
        }
      }

      if (handler.endDoc) { handler.endDoc(param); }
    };
  }

  /**
   * Returns a function that strips unsafe tags and attributes from html.
   * @param {Function} sanitizeAttributes
   *     maps from (tagName, attribs[]) to null or a sanitized attribute array.
   *     The attribs array can be arbitrarily modified, but the same array
   *     instance is reused, so should not be held.
   * @return {Function} from html to sanitized html
   */
  function makeHtmlSanitizer(sanitizeAttributes) {
    var stack;
    var ignoring;
    return makeSaxParser({
        startDoc: function (_) {
          stack = [];
          ignoring = false;
        },
        startTag: function (tagName, attribs, out) {
          if (ignoring) { return; }
          if (!html4.ELEMENTS.hasOwnProperty(tagName)) { return; }
          var eflags = html4.ELEMENTS[tagName];
          if (eflags & html4.eflags.FOLDABLE) {
            return;
          } else if (eflags & html4.eflags.UNSAFE) {
            ignoring = !(eflags & html4.eflags.EMPTY);
            return;
          }
          attribs = sanitizeAttributes(tagName, attribs);
          // TODO(mikesamuel): relying on sanitizeAttributes not to
          // insert unsafe attribute names.
          if (attribs) {
            if (!(eflags & html4.eflags.EMPTY)) {
              stack.push(tagName);
            }

            out.push('<', tagName);
            for (var i = 0, n = attribs.length; i < n; i += 2) {
              var attribName = attribs[i],
                  value = attribs[i + 1];
              if (value !== null && value !== void 0) {
                out.push(' ', attribName, '="', escapeAttrib(value), '"');
              }
            }
            out.push('>');
          }
        },
        endTag: function (tagName, out) {
          if (ignoring) {
            ignoring = false;
            return;
          }
          if (!html4.ELEMENTS.hasOwnProperty(tagName)) { return; }
          var eflags = html4.ELEMENTS[tagName];
          if (!(eflags & (html4.eflags.UNSAFE | html4.eflags.EMPTY
                          | html4.eflags.FOLDABLE))) {
            var index;
            if (eflags & html4.eflags.OPTIONAL_ENDTAG) {
              for (index = stack.length; --index >= 0;) {
                var stackEl = stack[index];
                if (stackEl === tagName) { break; }
                if (!(html4.ELEMENTS[stackEl]
                      & html4.eflags.OPTIONAL_ENDTAG)) {
                  // Don't pop non optional end tags looking for a match.
                  return;
                }
              }
            } else {
              for (index = stack.length; --index >= 0;) {
                if (stack[index] === tagName) { break; }
              }
            }
            if (index < 0) { return; }  // Not opened.
            for (var i = stack.length; --i > index;) {
              var stackEl = stack[i];
              if (!(html4.ELEMENTS[stackEl]
                    & html4.eflags.OPTIONAL_ENDTAG)) {
                out.push('</', stackEl, '>');
              }
            }
            stack.length = index;
            out.push('</', tagName, '>');
          }
        },
        pcdata: function (text, out) {
          if (!ignoring) { out.push(text); }
        },
        rcdata: function (text, out) {
          if (!ignoring) { out.push(text); }
        },
        cdata: function (text, out) {
          if (!ignoring) { out.push(text); }
        },
        endDoc: function (out) {
          for (var i = stack.length; --i >= 0;) {
            out.push('</', stack[i], '>');
          }
          stack.length = 0;
        }
      });
  }

  // From RFC3986
  var URI_SCHEME_RE = new RegExp(
        "^" +
      "(?:" +
        "([^:\/?#]+)" +         // scheme
      ":)?"
      );

  /**
   * Strips unsafe tags and attributes from html.
   * @param {string} htmlText to sanitize
   * @param {Function} opt_uriPolicy -- a transform to apply to uri/url
   *     attribute values.  If no opt_uriPolicy is provided, no uris
   *     are allowed ie. the default uriPolicy rewrites all uris to null
   * @param {Function} opt_nmTokenPolicy : string -> string? -- a transform to
   *     apply to names, ids, and classes. If no opt_nmTokenPolicy is provided,
   *     all names, ids and classes are passed through ie. the default
   *     nmTokenPolicy is an identity transform
   * @return {string} html
   */
  function sanitize(htmlText, opt_uriPolicy, opt_nmTokenPolicy) {
    var out = [];
    makeHtmlSanitizer(
      function sanitizeAttribs(tagName, attribs) {
        for (var i = 0; i < attribs.length; i += 2) {
          var attribName = attribs[i];
          var value = attribs[i + 1];
          var atype = null, attribKey;
          if ((attribKey = tagName + '::' + attribName,
               html4.ATTRIBS.hasOwnProperty(attribKey))
              || (attribKey = '*::' + attribName,
                  html4.ATTRIBS.hasOwnProperty(attribKey))) {
            atype = html4.ATTRIBS[attribKey];
          }
          if (atype !== null) {
            switch (atype) {
              case html4.atype.NONE: break;
              case html4.atype.SCRIPT:
              case html4.atype.STYLE:
                value = null;
                break;
              case html4.atype.ID:
              case html4.atype.IDREF:
              case html4.atype.IDREFS:
              case html4.atype.GLOBAL_NAME:
              case html4.atype.LOCAL_NAME:
              case html4.atype.CLASSES:
                value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
                break;
              case html4.atype.URI:
                var parsedUri = ('' + value).match(URI_SCHEME_RE);
                if (!parsedUri) {
                  value = null;
                } else if (!parsedUri[1] ||
                    WHITELISTED_SCHEMES.test(parsedUri[1])) {
                  value = opt_uriPolicy && opt_uriPolicy(value);
                } else {
                  value = null;
                }
                break;
              case html4.atype.URI_FRAGMENT:
                if (value && '#' === value.charAt(0)) {
                  value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
                  if (value) { value = '#' + value; }
                } else {
                  value = null;
                }
                break;
              default:
                value = null;
                break;
            }
          } else {
            value = null;
          }
          attribs[i + 1] = value;
        }
        return attribs;
      })(htmlText, out);
    return out.join('');
  }

  return {
    escapeAttrib: escapeAttrib,
    makeHtmlSanitizer: makeHtmlSanitizer,
    makeSaxParser: makeSaxParser,
    normalizeRCData: normalizeRCData,
    sanitize: sanitize,
    unescapeEntities: unescapeEntities
  };
})(html4);

var html_sanitize = html.sanitize;

// Exports for closure compiler.  Note this file is also cajoled
// for domado and run in an environment without 'window'
if (typeof window !== 'undefined') {
  window['html'] = html;
  window['html_sanitize'] = html_sanitize;
}
// Loosen restrictions of Caja's
// html-sanitizer to allow for styling
html4.ATTRIBS['*::style'] = 0;
html4.ELEMENTS['style'] = 0;

html4.ATTRIBS['a::target'] = 0;

html4.ELEMENTS['video'] = 0;
html4.ATTRIBS['video::src'] = 0;
html4.ATTRIBS['video::poster'] = 0;
html4.ATTRIBS['video::controls'] = 0;

html4.ELEMENTS['audio'] = 0;
html4.ATTRIBS['audio::src'] = 0;
html4.ATTRIBS['video::autoplay'] = 0;
html4.ATTRIBS['video::controls'] = 0;
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
var Mustache = (typeof module !== "undefined" && module.exports) || {};

(function (exports) {

  exports.name = "mustache.js";
  exports.version = "0.5.0-dev";
  exports.tags = ["{{", "}}"];
  exports.parse = parse;
  exports.compile = compile;
  exports.render = render;
  exports.clearCache = clearCache;

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  var _toString = Object.prototype.toString;
  var _isArray = Array.isArray;
  var _forEach = Array.prototype.forEach;
  var _trim = String.prototype.trim;

  var isArray;
  if (_isArray) {
    isArray = _isArray;
  } else {
    isArray = function (obj) {
      return _toString.call(obj) === "[object Array]";
    };
  }

  var forEach;
  if (_forEach) {
    forEach = function (obj, callback, scope) {
      return _forEach.call(obj, callback, scope);
    };
  } else {
    forEach = function (obj, callback, scope) {
      for (var i = 0, len = obj.length; i < len; ++i) {
        callback.call(scope, obj[i], i, obj);
      }
    };
  }

  var spaceRe = /^\s*$/;

  function isWhitespace(string) {
    return spaceRe.test(string);
  }

  var trim;
  if (_trim) {
    trim = function (string) {
      return string == null ? "" : _trim.call(string);
    };
  } else {
    var trimLeft, trimRight;

    if (isWhitespace("\xA0")) {
      trimLeft = /^\s+/;
      trimRight = /\s+$/;
    } else {
      // IE doesn't match non-breaking spaces with \s, thanks jQuery.
      trimLeft = /^[\s\xA0]+/;
      trimRight = /[\s\xA0]+$/;
    }

    trim = function (string) {
      return string == null ? "" :
        String(string).replace(trimLeft, "").replace(trimRight, "");
    };
  }

  var escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHTML(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return escapeMap[s] || s;
    });
  }

  /**
   * Adds the `template`, `line`, and `file` properties to the given error
   * object and alters the message to provide more useful debugging information.
   */
  function debug(e, template, line, file) {
    file = file || "<template>";

    var lines = template.split("\n"),
        start = Math.max(line - 3, 0),
        end = Math.min(lines.length, line + 3),
        context = lines.slice(start, end);

    var c;
    for (var i = 0, len = context.length; i < len; ++i) {
      c = i + start + 1;
      context[i] = (c === line ? " >> " : "    ") + context[i];
    }

    e.template = template;
    e.line = line;
    e.file = file;
    e.message = [file + ":" + line, context.join("\n"), "", e.message].join("\n");

    return e;
  }

  /**
   * Looks up the value of the given `name` in the given context `stack`.
   */
  function lookup(name, stack, defaultValue) {
    if (name === ".") {
      return stack[stack.length - 1];
    }

    var names = name.split(".");
    var lastIndex = names.length - 1;
    var target = names[lastIndex];

    var value, context, i = stack.length, j, localStack;
    while (i) {
      localStack = stack.slice(0);
      context = stack[--i];

      j = 0;
      while (j < lastIndex) {
        context = context[names[j++]];

        if (context == null) {
          break;
        }

        localStack.push(context);
      }

      if (context && typeof context === "object" && target in context) {
        value = context[target];
        break;
      }
    }

    // If the value is a function, call it in the current context.
    if (typeof value === "function") {
      value = value.call(localStack[localStack.length - 1]);
    }

    if (value == null)  {
      return defaultValue;
    }

    return value;
  }

  function renderSection(name, stack, callback, inverted) {
    var buffer = "";
    var value =  lookup(name, stack);

    if (inverted) {
      // From the spec: inverted sections may render text once based on the
      // inverse value of the key. That is, they will be rendered if the key
      // doesn't exist, is false, or is an empty list.
      if (value == null || value === false || (isArray(value) && value.length === 0)) {
        buffer += callback();
      }
    } else if (isArray(value)) {
      forEach(value, function (value) {
        stack.push(value);
        buffer += callback();
        stack.pop();
      });
    } else if (typeof value === "object") {
      stack.push(value);
      buffer += callback();
      stack.pop();
    } else if (typeof value === "function") {
      var scope = stack[stack.length - 1];
      var scopedRender = function (template) {
        return render(template, scope);
      };
      buffer += value.call(scope, callback(), scopedRender) || "";
    } else if (value) {
      buffer += callback();
    }

    return buffer;
  }

  /**
   * Parses the given `template` and returns the source of a function that,
   * with the proper arguments, will render the template. Recognized options
   * include the following:
   *
   *   - file     The name of the file the template comes from (displayed in
   *              error messages)
   *   - tags     An array of open and close tags the `template` uses. Defaults
   *              to the value of Mustache.tags
   *   - debug    Set `true` to log the body of the generated function to the
   *              console
   *   - space    Set `true` to preserve whitespace from lines that otherwise
   *              contain only a {{tag}}. Defaults to `false`
   */
  function parse(template, options) {
    options = options || {};

    var tags = options.tags || exports.tags,
        openTag = tags[0],
        closeTag = tags[tags.length - 1];

    var code = [
      'var buffer = "";', // output buffer
      "\nvar line = 1;", // keep track of source line number
      "\ntry {",
      '\nbuffer += "'
    ];

    var spaces = [],      // indices of whitespace in code on the current line
        hasTag = false,   // is there a {{tag}} on the current line?
        nonSpace = false; // is there a non-space char on the current line?

    // Strips all space characters from the code array for the current line
    // if there was a {{tag}} on it and otherwise only spaces.
    var stripSpace = function () {
      if (hasTag && !nonSpace && !options.space) {
        while (spaces.length) {
          code.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    };

    var sectionStack = [], updateLine, nextOpenTag, nextCloseTag;

    var setTags = function (source) {
      tags = trim(source).split(/\s+/);
      nextOpenTag = tags[0];
      nextCloseTag = tags[tags.length - 1];
    };

    var includePartial = function (source) {
      code.push(
        '";',
        updateLine,
        '\nvar partial = partials["' + trim(source) + '"];',
        '\nif (partial) {',
        '\n  buffer += render(partial,stack[stack.length - 1],partials);',
        '\n}',
        '\nbuffer += "'
      );
    };

    var openSection = function (source, inverted) {
      var name = trim(source);

      if (name === "") {
        throw debug(new Error("Section name may not be empty"), template, line, options.file);
      }

      sectionStack.push({name: name, inverted: inverted});

      code.push(
        '";',
        updateLine,
        '\nvar name = "' + name + '";',
        '\nvar callback = (function () {',
        '\n  return function () {',
        '\n    var buffer = "";',
        '\nbuffer += "'
      );
    };

    var openInvertedSection = function (source) {
      openSection(source, true);
    };

    var closeSection = function (source) {
      var name = trim(source);
      var openName = sectionStack.length != 0 && sectionStack[sectionStack.length - 1].name;

      if (!openName || name != openName) {
        throw debug(new Error('Section named "' + name + '" was never opened'), template, line, options.file);
      }

      var section = sectionStack.pop();

      code.push(
        '";',
        '\n    return buffer;',
        '\n  };',
        '\n})();'
      );

      if (section.inverted) {
        code.push("\nbuffer += renderSection(name,stack,callback,true);");
      } else {
        code.push("\nbuffer += renderSection(name,stack,callback);");
      }

      code.push('\nbuffer += "');
    };

    var sendPlain = function (source) {
      code.push(
        '";',
        updateLine,
        '\nbuffer += lookup("' + trim(source) + '",stack,"");',
        '\nbuffer += "'
      );
    };

    var sendEscaped = function (source) {
      code.push(
        '";',
        updateLine,
        '\nbuffer += escapeHTML(lookup("' + trim(source) + '",stack,""));',
        '\nbuffer += "'
      );
    };

    var line = 1, c, callback;
    for (var i = 0, len = template.length; i < len; ++i) {
      if (template.slice(i, i + openTag.length) === openTag) {
        i += openTag.length;
        c = template.substr(i, 1);
        updateLine = '\nline = ' + line + ';';
        nextOpenTag = openTag;
        nextCloseTag = closeTag;
        hasTag = true;

        switch (c) {
        case "!": // comment
          i++;
          callback = null;
          break;
        case "=": // change open/close tags, e.g. {{=<% %>=}}
          i++;
          closeTag = "=" + closeTag;
          callback = setTags;
          break;
        case ">": // include partial
          i++;
          callback = includePartial;
          break;
        case "#": // start section
          i++;
          callback = openSection;
          break;
        case "^": // start inverted section
          i++;
          callback = openInvertedSection;
          break;
        case "/": // end section
          i++;
          callback = closeSection;
          break;
        case "{": // plain variable
          closeTag = "}" + closeTag;
          // fall through
        case "&": // plain variable
          i++;
          nonSpace = true;
          callback = sendPlain;
          break;
        default: // escaped variable
          nonSpace = true;
          callback = sendEscaped;
        }

        var end = template.indexOf(closeTag, i);

        if (end === -1) {
          throw debug(new Error('Tag "' + openTag + '" was not closed properly'), template, line, options.file);
        }

        var source = template.substring(i, end);

        if (callback) {
          callback(source);
        }

        // Maintain line count for \n in source.
        var n = 0;
        while (~(n = source.indexOf("\n", n))) {
          line++;
          n++;
        }

        i = end + closeTag.length - 1;
        openTag = nextOpenTag;
        closeTag = nextCloseTag;
      } else {
        c = template.substr(i, 1);

        switch (c) {
        case '"':
        case "\\":
          nonSpace = true;
          code.push("\\" + c);
          break;
        case "\r":
          // Ignore carriage returns.
          break;
        case "\n":
          spaces.push(code.length);
          code.push("\\n");
          stripSpace(); // Check for whitespace on the current line.
          line++;
          break;
        default:
          if (isWhitespace(c)) {
            spaces.push(code.length);
          } else {
            nonSpace = true;
          }

          code.push(c);
        }
      }
    }

    if (sectionStack.length != 0) {
      throw debug(new Error('Section "' + sectionStack[sectionStack.length - 1].name + '" was not closed properly'), template, line, options.file);
    }

    // Clean up any whitespace from a closing {{tag}} that was at the end
    // of the template without a trailing \n.
    stripSpace();

    code.push(
      '";',
      "\nreturn buffer;",
      "\n} catch (e) { throw {error: e, line: line}; }"
    );

    // Ignore `buffer += "";` statements.
    var body = code.join("").replace(/buffer \+= "";\n/g, "");

    if (options.debug) {
      if (typeof console != "undefined" && console.log) {
        console.log(body);
      } else if (typeof print === "function") {
        print(body);
      }
    }

    return body;
  }

  /**
   * Used by `compile` to generate a reusable function for the given `template`.
   */
  function _compile(template, options) {
    var args = "view,partials,stack,lookup,escapeHTML,renderSection,render";
    var body = parse(template, options);
    var fn = new Function(args, body);

    // This anonymous function wraps the generated function so we can do
    // argument coercion, setup some variables, and handle any errors
    // encountered while executing it.
    return function (view, partials) {
      partials = partials || {};

      var stack = [view]; // context stack

      try {
        return fn(view, partials, stack, lookup, escapeHTML, renderSection, render);
      } catch (e) {
        throw debug(e.error, template, e.line, options.file);
      }
    };
  }

  // Cache of pre-compiled templates.
  var _cache = {};

  /**
   * Clear the cache of compiled templates.
   */
  function clearCache() {
    _cache = {};
  }

  /**
   * Compiles the given `template` into a reusable function using the given
   * `options`. In addition to the options accepted by Mustache.parse,
   * recognized options include the following:
   *
   *   - cache    Set `false` to bypass any pre-compiled version of the given
   *              template. Otherwise, a given `template` string will be cached
   *              the first time it is parsed
   */
  function compile(template, options) {
    options = options || {};

    // Use a pre-compiled version from the cache if we have one.
    if (options.cache !== false) {
      if (!_cache[template]) {
        _cache[template] = _compile(template, options);
      }

      return _cache[template];
    }

    return _compile(template, options);
  }

  /**
   * High-level function that renders the given `template` using the given
   * `view` and `partials`. If you need to use any of the template options (see
   * `compile` above), you must compile in a separate step, and then call that
   * compiled function.
   */
  function render(template, view, partials) {
    return compile(template)(view, partials);
  }

})(Mustache);
/*!
  * Reqwest! A general purpose XHR connection manager
  * (c) Dustin Diaz 2011
  * https://github.com/ded/reqwest
  * license MIT
  */
!function(a,b){typeof module!="undefined"?module.exports=b():typeof define=="function"&&define.amd?define(a,b):this[a]=b()}("reqwest",function(){function handleReadyState(a,b,c){return function(){a&&a[readyState]==4&&(twoHundo.test(a.status)?b(a):c(a))}}function setHeaders(a,b){var c=b.headers||{},d;c.Accept=c.Accept||defaultHeaders.accept[b.type]||defaultHeaders.accept["*"],!b.crossOrigin&&!c[requestedWith]&&(c[requestedWith]=defaultHeaders.requestedWith),c[contentType]||(c[contentType]=b.contentType||defaultHeaders.contentType);for(d in c)c.hasOwnProperty(d)&&a.setRequestHeader(d,c[d])}function generalCallback(a){lastValue=a}function urlappend(a,b){return a+(/\?/.test(a)?"&":"?")+b}function handleJsonp(a,b,c,d){var e=uniqid++,f=a.jsonpCallback||"callback",g=a.jsonpCallbackName||"reqwest_"+e,h=new RegExp("((^|\\?|&)"+f+")=([^&]+)"),i=d.match(h),j=doc.createElement("script"),k=0;i?i[3]==="?"?d=d.replace(h,"$1="+g):g=i[3]:d=urlappend(d,f+"="+g),win[g]=generalCallback,j.type="text/javascript",j.src=d,j.async=!0,typeof j.onreadystatechange!="undefined"&&(j.event="onclick",j.htmlFor=j.id="_reqwest_"+e),j.onload=j.onreadystatechange=function(){if(j[readyState]&&j[readyState]!=="complete"&&j[readyState]!=="loaded"||k)return!1;j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),a.success&&a.success(lastValue),lastValue=undefined,head.removeChild(j),k=1},head.appendChild(j)}function getRequest(a,b,c){var d=(a.method||"GET").toUpperCase(),e=typeof a=="string"?a:a.url,f=a.processData!==!1&&a.data&&typeof a.data!="string"?reqwest.toQueryString(a.data):a.data||null,g;return(a.type=="jsonp"||d=="GET")&&f&&(e=urlappend(e,f),f=null),a.type=="jsonp"?handleJsonp(a,b,c,e):(g=xhr(),g.open(d,e,!0),setHeaders(g,a),g.onreadystatechange=handleReadyState(g,b,c),a.before&&a.before(g),g.send(f),g)}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments)}function setType(a){var b=a.match(/\.(json|jsonp|html|xml)(\?|$)/);return b?b[1]:"js"}function init(o,fn){function complete(a){o.timeout&&clearTimeout(self.timeout),self.timeout=null,o.complete&&o.complete(a)}function success(resp){var r=resp.responseText;if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r}fn(resp),o.success&&o.success(resp),complete(resp)}function error(a,b,c){o.error&&o.error(a,b,c),complete(a)}this.url=typeof o=="string"?o:o.url,this.timeout=null;var type=o.type||setType(this.url),self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){self.abort()},o.timeout)),this.request=getRequest(o,success,error)}function reqwest(a,b){return new Reqwest(a,b)}function normalize(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function serial(a,b){var c=a.name,d=a.tagName.toLowerCase(),e=function(a){a&&!a.disabled&&b(c,normalize(a.attributes.value&&a.attributes.value.specified?a.value:a.text))};if(a.disabled||!c)return;switch(d){case"input":if(!/reset|button|image|file/i.test(a.type)){var f=/checkbox/i.test(a.type),g=/radio/i.test(a.type),h=a.value;(!f&&!g||a.checked)&&b(c,normalize(f&&h===""?"on":h))}break;case"textarea":b(c,normalize(a.value));break;case"select":if(a.type.toLowerCase()==="select-one")e(a.selectedIndex>=0?a.options[a.selectedIndex]:null);else for(var i=0;a.length&&i<a.length;i++)a.options[i].selected&&e(a.options[i])}}function eachFormElement(){var a=this,b,c,d,e=function(b,c){for(var e=0;e<c.length;e++){var f=b[byTag](c[e]);for(d=0;d<f.length;d++)serial(f[d],a)}};for(c=0;c<arguments.length;c++)b=arguments[c],/input|select|textarea/i.test(b.tagName)&&serial(b,a),e(b,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var a={};return eachFormElement.apply(function(b,c){b in a?(a[b]&&!isArray(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments),a}var win=window,doc=document,twoHundo=/^20\d$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,lastValue,xmlHttpRequest="XMLHttpRequest",isArray=typeof Array.isArray=="function"?Array.isArray:function(a){return a instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"},requestedWith:xmlHttpRequest},xhr=win[xmlHttpRequest]?function(){return new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")};return Reqwest.prototype={abort:function(){this.request.abort()},retry:function(){init.call(this,this.o,this.fn)}},reqwest.serializeArray=function(){var a=[];return eachFormElement.apply(function(b,c){a.push({name:b,value:c})},arguments),a},reqwest.serialize=function(){if(arguments.length===0)return"";var a,b,c=Array.prototype.slice.call(arguments,0);return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),a=="map"?b=serializeHash:a=="array"?b=reqwest.serializeArray:b=serializeQueryString,b.apply(null,c)},reqwest.toQueryString=function(a){var b="",c,d=encodeURIComponent,e=function(a,c){b+=d(a)+"="+d(c)+"&"};if(isArray(a))for(c=0;a&&c<a.length;c++)e(a[c].name,a[c].value);else for(var f in a){if(!Object.hasOwnProperty.call(a,f))continue;var g=a[f];if(isArray(g))for(c=0;c<g.length;c++)e(f,g[c]);else e(f,a[f])}return b.replace(/&$/,"").replace(/%20/g,"+")},reqwest.compat=function(a,b){return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new Reqwest(a,b)},reqwest});wax = wax || {};

// Attribution
// -----------
wax.attribution = function() {
    var container,
        a = {};

    a.content = function(x) {
        if (typeof x === 'undefined') return container.innerHTML;
        container.innerHTML = wax.u.sanitize(x);
        return this;
    };

    a.element = function() {
        return container;
    };

    a.init = function() {
        container = document.createElement('div');
        container.className = 'map-attribution';
        return this;
    };

    return a.init();
};
wax = wax || {};

// Attribution
// -----------
wax.bwdetect = function(options, callback) {
    var detector = {},
        threshold = options.threshold || 400,
        // test image: 30.29KB
        testImage = 'http://a.tiles.mapbox.com/mapbox/1.0.0/blue-marble-topo-bathy-jul/0/0/0.png?preventcache=' + (+new Date()),
        // High-bandwidth assumed
        // 1: high bandwidth (.png, .jpg)
        // 0: low bandwidth (.png128, .jpg70)
        bw = 1,
        // Alternative versions
        auto = options.auto === undefined ? true : options.auto;

    function bwTest() {
        wax.bw = -1;
        var im = new Image();
        im.src = testImage;
        var first = true;
        var timeout = setTimeout(function() {
            if (first && wax.bw == -1) {
                detector.bw(0);
                first = false;
            }
        }, threshold);
        im.onload = function() {
            if (first && wax.bw == -1) {
                clearTimeout(timeout);
                detector.bw(1);
                first = false;
            }
        };
    }

    detector.bw = function(x) {
        if (!arguments.length) return bw;
        var oldBw = bw;
        if (wax.bwlisteners && wax.bwlisteners.length) (function () {
            listeners = wax.bwlisteners;
            wax.bwlisteners = [];
            for (i = 0; i < listeners; i++) {
                listeners[i](x);
            }
        })();
        wax.bw = x;

        if (bw != (bw = x)) callback(x);
    };

    detector.add = function() {
        if (auto) bwTest();
        return this;
    };

    if (wax.bw == -1) {
      wax.bwlisteners = wax.bwlisteners || [];
      wax.bwlisteners.push(detector.bw);
    } else if (wax.bw !== undefined) {
        detector.bw(wax.bw);
    } else {
        detector.add();
    }
    return detector;
};
// Formatter
// ---------
//
// This code is no longer the recommended code path for Wax -
// see `template.js`, a safe implementation of Mustache templates.
wax.formatter = function(x) {
    var formatter = {},
        f;

    // Prevent against just any input being used.
    if (x && typeof x === 'string') {
        try {
            // Ugly, dangerous use of eval.
            eval('f = ' + x);
        } catch (e) {
            if (console) console.log(e);
        }
    } else if (x && typeof x === 'function') {
        f = x;
    } else {
        f = function() {};
    }

    // Wrap the given formatter function in order to
    // catch exceptions that it may throw.
    formatter.format = function(options, data) {
        try {
            return wax.u.sanitize(f(options, data));
        } catch (e) {
            if (console) console.log(e);
        }
    };

    return formatter;
};
// GridInstance
// ------------
// GridInstances are queryable, fully-formed
// objects for acquiring features from events.
//
// This code ignores format of 1.1-1.2
wax.gi = function(grid_tile, options) {
    options = options || {};
    // resolution is the grid-elements-per-pixel ratio of gridded data.
    // The size of a tile element. For now we expect tiles to be squares.
    var instance = {},
        resolution = options.resolution || 4,
        tileSize = options.tileSize || 256;

    // Resolve the UTF-8 encoding stored in grids to simple
    // number values.
    // See the [utfgrid spec](https://github.com/mapbox/utfgrid-spec)
    // for details.
    function resolveCode(key) {
        if (key >= 93) key--;
        if (key >= 35) key--;
        key -= 32;
        return key;
    }

    instance.grid_tile = function() {
        return grid_tile;
    };

    instance.getKey = function(x, y) {
        if (!(grid_tile && grid_tile.grid)) return;
        if ((y < 0) || (x < 0)) return;
        if ((Math.floor(y) >= tileSize) ||
            (Math.floor(x) >= tileSize)) return;
        // Find the key in the grid. The above calls should ensure that
        // the grid's array is large enough to make this work.
        return resolveCode(grid_tile.grid[
           Math.floor((y) / resolution)
        ].charCodeAt(
           Math.floor((x) / resolution)
        ));
    };

    // Lower-level than tileFeature - has nothing to do
    // with the DOM. Takes a px offset from 0, 0 of a grid.
    instance.gridFeature = function(x, y) {
        // Find the key in the grid. The above calls should ensure that
        // the grid's array is large enough to make this work.
        var key = this.getKey(x, y),
            keys = grid_tile.keys;

        if (keys &&
            keys[key] &&
            grid_tile.data[keys[key]]) {
            return grid_tile.data[keys[key]];
        }
    };

    // Get a feature:
    // * `x` and `y`: the screen coordinates of an event
    // * `tile_element`: a DOM element of a tile, from which we can get an offset.
    instance.tileFeature = function(x, y, tile_element) {
        if (!grid_tile) return;
        // IE problem here - though recoverable, for whatever reason
        var offset = wax.u.offset(tile_element);
            feature = this.gridFeature(x - offset.left, y - offset.top);
        return feature;
    };

    return instance;
};
// GridManager
// -----------
// Generally one GridManager will be used per map.
//
// It takes one options object, which current accepts a single option:
// `resolution` determines the number of pixels per grid element in the grid.
// The default is 4.
wax.gm = function() {

    var resolution = 4,
        grid_tiles = {},
        manager = {},
        tilejson,
        formatter;

    var gridUrl = function(url) {
        if (url) {
            return url.replace(/(\.png|\.jpg|\.jpeg)(\d*)/, '.grid.json');
        }
    };

    function templatedGridUrl(template) {
        if (typeof template === 'string') template = [template];
        return function templatedGridFinder(url) {
            if (!url) return;
            var rx = new RegExp('/(\\d+)\\/(\\d+)\\/(\\d+)\\.[\\w\\._]+');
            var xyz = rx.exec(url);
            if (!xyz) return;
            return template[parseInt(xyz[2], 10) % template.length]
                .replace(/\{z\}/g, xyz[1])
                .replace(/\{x\}/g, xyz[2])
                .replace(/\{y\}/g, xyz[3]);
        };
    }

    manager.formatter = function(x) {
        if (!arguments.length) return formatter;
        formatter =  wax.formatter(x);
        return manager;
    };

    manager.template = function(x) {
        if (!arguments.length) return formatter;
        formatter = wax.template(x);
        return manager;
    };

    manager.gridUrl = function(x) {
        // Getter-setter
        if (!arguments.length) return gridUrl;

        // Handle tilesets that don't support grids
        if (!x) {
            gridUrl = function() { return null; };
        } else {
            gridUrl = typeof x === 'function' ?
                x : templatedGridUrl(x);
        }
        return manager;
    };

    manager.getGrid = function(url, callback) {
        var gurl = gridUrl(url);
        if (!formatter || !gurl) return callback(null, null);

        wax.request.get(gurl, function(err, t) {
            if (err) return callback(err, null);
            callback(null, wax.gi(t, {
                formatter: formatter,
                resolution: resolution
            }));
        });
        return manager;
    };

    manager.tilejson = function(x) {
        if (!arguments.length) return tilejson;
        // prefer templates over formatters
        if (x.template) {
            manager.template(x.template);
        } else if (x.formatter) {
            manager.formatter(x.formatter);
        } else {
            // In this case, we cannot support grids
            formatter = undefined;
        }
        manager.gridUrl(x.grids);
        if (x.resolution) resolution = x.resolution;
        tilejson = x;
        return manager;
    };

    return manager;
};
wax = wax || {};

// Hash
// ----
wax.hash = function(options) {
    options = options || {};

    function getState() {
        return location.hash.substring(1);
    }

    function pushState(state) {
        var l = window.location;
        l.replace(l.toString().replace((l.hash || /$/), '#' + state));
    }

    var s0, // old hash
        hash = {},
        lat = 90 - 1e-8;  // allowable latitude range

    function parseHash(s) {
        var args = s.split('/');
        for (var i = 0; i < args.length; i++) {
            args[i] = Number(args[i]);
            if (isNaN(args[i])) return true;
        }
        if (args.length < 3) {
            // replace bogus hash
            return true;
        } else if (args.length == 3) {
            options.setCenterZoom(args);
        }
    }

    function move() {
        var s1 = options.getCenterZoom();
        if (s0 !== s1) {
            s0 = s1;
            // don't recenter the map!
            pushState(s0);
        }
    }

    function stateChange(state) {
        // ignore spurious hashchange events
        if (state === s0) return;
        if (parseHash(s0 = state)) {
            // replace bogus hash
            move();
        }
    }

    var _move = wax.u.throttle(move, 500);

    hash.add = function() {
        stateChange(getState());
        options.bindChange(_move);
        return this;
    };

    hash.remove = function() {
        options.unbindChange(_move);
        return this;
    };

    return hash.add();
};
wax = wax || {};

wax.interaction = function() {
    var gm = wax.gm(),
        interaction = {},
        _downLock = false,
        _clickTimeout = false,
        // Active feature
        // Down event
        _d,
        // Touch tolerance
        tol = 4,
        grid,
        attach,
        detach,
        parent,
        map,
        tileGrid;

    var defaultEvents = {
        mousemove: onMove,
        touchstart: onDown,
        mousedown: onDown
    };

    var touchEnds = {
        touchend: onUp,
        touchmove: onUp,
        touchcancel: touchCancel
    };

    // Abstract getTile method. Depends on a tilegrid with
    // grid[ [x, y, tile] ] structure.
    function getTile(e) {
        var g = grid();
        for (var i = 0; i < g.length; i++) {
            if ((g[i][0] < e.y) &&
               ((g[i][0] + 256) > e.y) &&
                (g[i][1] < e.x) &&
               ((g[i][1] + 256) > e.x)) return g[i][2];
        }
        return false;
    }

    // Clear the double-click timeout to prevent double-clicks from
    // triggering popups.
    function killTimeout() {
        if (_clickTimeout) {
            window.clearTimeout(_clickTimeout);
            _clickTimeout = null;
            return true;
        } else {
            return false;
        }
    }

    function onMove(e) {
        // If the user is actually dragging the map, exit early
        // to avoid performance hits.
        if (_downLock) return;

        var pos = wax.u.eventoffset(e);

        interaction.screen_feature(pos, function(feature) {
            if (feature) {
                bean.fire(interaction, 'on', {
                    parent: parent(),
                    data: feature,
                    formatter: gm.formatter().format,
                    e: e
                });
            } else {
                bean.fire(interaction, 'off');
            }
        });
    }

    // A handler for 'down' events - which means `mousedown` and `touchstart`
    function onDown(e) {
        // Ignore double-clicks by ignoring clicks within 300ms of
        // each other.
        if (killTimeout()) { return; }

        // Prevent interaction offset calculations happening while
        // the user is dragging the map.
        //
        // Store this event so that we can compare it to the
        // up event
        _downLock = true;
        _d = wax.u.eventoffset(e);
        if (e.type === 'mousedown') {
            bean.add(document.body, 'click', onUp);

        // Only track single-touches. Double-touches will not affect this
        // control
        } else if (e.type === 'touchstart' && e.touches.length === 1) {
            // Don't make the user click close if they hit another tooltip
            bean.fire(interaction, 'off');
            // Touch moves invalidate touches
            bean.add(parent(), touchEnds);
        }
    }

    function touchCancel() {
        bean.remove(parent(), touchEnds);
        _downLock = false;
    }

    function onUp(e) {
        var evt = {},
            pos = wax.u.eventoffset(e);
        _downLock = false;

        // TODO: refine
        for (var key in e) {
          evt[key] = e[key];
        }

        bean.remove(document.body, 'mouseup', onUp);
        bean.remove(parent(), touchEnds);

        if (e.type === 'touchend') {
            // If this was a touch and it survived, there's no need to avoid a double-tap
            // but also wax.u.eventoffset will have failed, since this touch
            // event doesn't have coordinates
            interaction.click(e, _d);
        } else if (Math.round(pos.y / tol) === Math.round(_d.y / tol) &&
            Math.round(pos.x / tol) === Math.round(_d.x / tol)) {
            // Contain the event data in a closure.
            _clickTimeout = window.setTimeout(
                function() {
                    _clickTimeout = null;
                    interaction.click(evt, pos);
                }, 300);
        }
        return onUp;
    }

    // Handle a click event. Takes a second
    interaction.click = function(e, pos) {
        interaction.screen_feature(pos, function(feature) {
            if (feature) bean.fire(interaction, 'on', {
                parent: parent(),
                data: feature,
                formatter: gm.formatter().format,
                e: e
            });
        });
    };

    interaction.screen_feature = function(pos, callback) {
        var tile = getTile(pos);
        if (!tile) callback(null);
        gm.getGrid(tile.src, function(err, g) {
            if (err || !g) return callback(null);
            var feature = g.tileFeature(pos.x, pos.y, tile);
            callback(feature);
        });
    };

    // set an attach function that should be
    // called when maps are set
    interaction.attach = function(x) {
        if (!arguments.length) return attach;
        attach = x;
        return interaction;
    };

    interaction.detach = function(x) {
        if (!arguments.length) return detach;
        detach = x;
        return interaction;
    };

    // Attach listeners to the map
    interaction.map = function(x) {
        if (!arguments.length) return map;
        map = x;
        if (attach) attach(map);
        bean.add(parent(), defaultEvents);
        bean.add(parent(), 'touchstart', onDown);
        return interaction;
    };

    // set a grid getter for this control
    interaction.grid = function(x) {
        if (!arguments.length) return grid;
        grid = x;
        return interaction;
    };

    // detach this and its events from the map cleanly
    interaction.remove = function(x) {
        if (detach) detach(map);
        bean.remove(parent(), defaultEvents);
        bean.fire(interaction, 'remove');
        return interaction;
    };

    // get or set a tilejson chunk of json
    interaction.tilejson = function(x) {
        if (!arguments.length) return gm.tilejson();
        gm.tilejson(x);
        return interaction;
    };

    // return the formatter, which has an exposed .format
    // function
    interaction.formatter = function() {
        return gm.formatter();
    };

    // ev can be 'on', 'off', fn is the handler
    interaction.on = function(ev, fn) {
        bean.add(interaction, ev, fn);
        return interaction;
    };

    // ev can be 'on', 'off', fn is the handler
    interaction.off = function(ev, fn) {
        bean.remove(interaction, ev, fn);
        return interaction;
    };

    // Return or set the gridmanager implementation
    interaction.gridmanager = function(x) {
        if (!arguments.length) return gm;
        gm = x;
        return interaction;
    };

    // parent should be a function that returns
    // the parent element of the map
    interaction.parent  = function(x) {
        parent = x;
        return interaction;
    };

    return interaction;
};
// Wax Legend
// ----------

// Wax header
var wax = wax || {};

wax.legend = function() {
    var element,
        legend = {},
        container;

    legend.element = function() {
        return container;
    };

    legend.content = function(content) {
        if (!arguments.length) return element.innerHTML;

        element.innerHTML = wax.u.sanitize(content);
        element.style.display = 'block';
        if (element.innerHTML === '') {
            element.style.display = 'none';
        }

        return legend;
    };

    legend.add = function() {
        container = document.createElement('div');
        container.className = 'map-legends';

        element = container.appendChild(document.createElement('div'));
        element.className = 'map-legend';
        element.style.display = 'none';
        return legend;
    };

    return legend.add();
};
var wax = wax || {};

wax.location = function() {

    var t = {};

    function on(o) {
        console.log(o);
        if ((o.e.type === 'mousemove' || !o.e.type)) {
            return;
        } else {
            var loc = o.formatter({ format: 'location' }, o.data);
            if (loc) {
                window.location.href = loc;
            }
        }
    }

    t.events = function() {
        return {
            on: on
        };
    };

    return t;

};
// Override movetips positioning

var wax = wax || {};
wax.movetip = wax.movetip  || {};

wax.movetip = function() {
    var popped = false,
        t = {},
        _tooltipOffset,
        _contextOffset,
        tooltip,
        parent;

    function moveTooltip(e) {
       var eo = wax.u.eventoffset(e);
       // faux-positioning
       if ((eo.y - _contextOffset.top) <
           (_tooltipOffset.height + 5) &&
           (_contextOffset.height > _tooltipOffset.height)) {
           eo.y += _tooltipOffset.height;
           tooltip.className += ' flip-y';
       }

       tooltip.style.left = eo.x + 'px';
       tooltip.style.top = eo.y - _tooltipOffset.height - 5 + 'px';
    }

    // Get the active tooltip for a layer or create a new one if no tooltip exists.
    // Hide any tooltips on layers underneath this one.
    function getTooltip(feature) {
        var tooltip = document.createElement('div'),
            inner = document.createElement('div'),
            tip = document.createElement('div');
        inner.innerHTML = feature;
        inner.className = 'inner';
        tip.className = 'tip';
        tooltip.className = 'wax-tooltip wax-tooltip-0';
        tooltip.appendChild(inner);
        tooltip.appendChild(tip);
        return tooltip;
    }

    // Hide a given tooltip.
    function hide() {
        if (tooltip) {
          tooltip.parentNode.removeChild(tooltip);
          tooltip = null;
        }
    }

    function on(o) {
        var content;
        if (popped) return;
        if ((o.e.type === 'mousemove' || o.e.type === 'touchend' || !o.e.type)) {
            content = o.formatter({ format: 'teaser' }, o.data);
            if (!content) return;
            hide();
            parent.style.cursor = 'pointer';
            tooltip = document.body.appendChild(getTooltip(content));
        }
        if (tooltip) {
          _tooltipOffset = wax.u.offset(tooltip);
          _contextOffset = wax.u.offset(parent);
          moveTooltip(o.e);
        }
    }

    function off() {
        parent.style.cursor = 'default';
        if (!popped) hide();
    }

    t.parent = function(x) {
        if (!arguments.length) return parent;
        parent = x;
        return t;
    };

    t.events = function() {
        return {
            on: on,
            off: off
        };
    };

    return t;
};

var wax = wax || {};
wax.movetip = {};

wax.movetip = function() {
    var popped = false,
        t = {},
        _tooltipOffset,
        _contextOffset,
        tooltip,
        parent;

    function moveTooltip(e) {
       var eo = wax.u.eventoffset(e);
       // faux-positioning
       if ((_tooltipOffset.height + eo.y) >
           (_contextOffset.top + _contextOffset.height) &&
           (_contextOffset.height > _tooltipOffset.height)) {
           eo.y -= _tooltipOffset.height;
           tooltip.className += ' flip-y';
       }

       // faux-positioning
       if ((_tooltipOffset.width + eo.x) >
           (_contextOffset.left + _contextOffset.width)) {
           eo.x -= _tooltipOffset.width;
           tooltip.className += ' flip-x';
       }

       tooltip.style.left = eo.x + 'px';
       tooltip.style.top = eo.y + 'px';
    }

    // Get the active tooltip for a layer or create a new one if no tooltip exists.
    // Hide any tooltips on layers underneath this one.
    function getTooltip(feature) {
        var tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip map-tooltip-0';
        tooltip.innerHTML = feature;
        return tooltip;
    }

    // Hide a given tooltip.
    function hide() {
        if (tooltip) {
          tooltip.parentNode.removeChild(tooltip);
          tooltip = null;
        }
    }

    function on(o) {
        var content;
        if (popped) return;
        if ((o.e.type === 'mousemove' || !o.e.type)) {
            content = o.formatter({ format: 'teaser' }, o.data);
            if (!content) return;
            hide();
            parent.style.cursor = 'pointer';
            tooltip = document.body.appendChild(getTooltip(content));
        } else {
            content = o.formatter({ format: 'teaser' }, o.data);
            if (!content) return;
            hide();
            var tt = document.body.appendChild(getTooltip(content));
            tt.className += ' map-popup';

            var close = tt.appendChild(document.createElement('a'));
            close.href = '#close';
            close.className = 'close';
            close.innerHTML = 'Close';

            popped = true;

            tooltip = tt;

            _tooltipOffset = wax.u.offset(tooltip);
            _contextOffset = wax.u.offset(parent);
            moveTooltip(o.e);

            bean.add(close, 'click touchend', function closeClick(e) {
                e.stop();
                hide();
                popped = false;
            });
        }
        if (tooltip) {
          _tooltipOffset = wax.u.offset(tooltip);
          _contextOffset = wax.u.offset(parent);
          moveTooltip(o.e);
        }

    }

    function off() {
        parent.style.cursor = 'default';
        if (!popped) hide();
    }

    t.parent = function(x) {
        if (!arguments.length) return parent;
        parent = x;
        return t;
    };

    t.events = function() {
        return {
            on: on,
            off: off
        };
    };

    return t;
};

// Wax GridUtil
// ------------

// Wax header
var wax = wax || {};

// Request
// -------
// Request data cache. `callback(data)` where `data` is the response data.
wax.request = {
    cache: {},
    locks: {},
    promises: {},
    get: function(url, callback) {
        // Cache hit.
        if (this.cache[url]) {
            return callback(this.cache[url][0], this.cache[url][1]);
        // Cache miss.
        } else {
            this.promises[url] = this.promises[url] || [];
            this.promises[url].push(callback);
            // Lock hit.
            if (this.locks[url]) return;
            // Request.
            var that = this;
            this.locks[url] = true;
            reqwest({
                url: url + (~url.indexOf('?') ? '&' : '?') + 'callback=grid',
                type: 'jsonp',
                jsonpCallback: 'callback',
                success: function(data) {
                    that.locks[url] = false;
                    that.cache[url] = [null, data];
                    for (var i = 0; i < that.promises[url].length; i++) {
                        that.promises[url][i](that.cache[url][0], that.cache[url][1]);
                    }
                },
                error: function(err) {
                    that.locks[url] = false;
                    that.cache[url] = [err, null];
                    for (var i = 0; i < that.promises[url].length; i++) {
                        that.promises[url][i](that.cache[url][0], that.cache[url][1]);
                    }
                }
            });
        }
    }
};
// Templating
// ---------
wax.template = function(x) {
    var template = {};

    // Clone the data object such that the '__[format]__' key is only
    // set for this instance of templating.
    template.format = function(options, data) {
        var clone = {};
        for (var key in data) {
            clone[key] = data[key];
        }
        if (options.format) {
            clone['__' + options.format + '__'] = true;
        }
        return wax.u.sanitize(Mustache.to_html(x, clone));
    };

    return template;
};
if (!wax) var wax = {};

// A wrapper for reqwest jsonp to easily load TileJSON from a URL.
wax.tilejson = function(url, callback) {
    reqwest({
        url: url + (~url.indexOf('?') ? '&' : '?') + 'callback=grid',
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: callback,
        error: callback
    });
};
var wax = wax || {};
wax.tooltip = {};

wax.tooltip = function() {
    var popped = false,
        animate = false,
        t = {},
        tooltips = [],
        _currentContent,
        transitionEvent,
        parent;

    if (document.body.style['-webkit-transition'] !== undefined) {
        transitionEvent = 'webkitTransitionEnd';
    } else if (document.body.style.MozTransition !== undefined) {
        transitionEvent = 'transitionend';
    }

    // Get the active tooltip for a layer or create a new one if no tooltip exists.
    // Hide any tooltips on layers underneath this one.
    function getTooltip(feature) {
        var tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip map-tooltip-0';
        tooltip.innerHTML = feature;
        return tooltip;
    }

    function remove() {
        if (this.parentNode) this.parentNode.removeChild(this);
    }

    // Hide a given tooltip.
    function hide() {
        var _ct;
        while (_ct = tooltips.pop()) {
            if (animate && transitionEvent) {
                // This code assumes that transform-supporting browsers
                // also support proper events. IE9 does both.
                  bean.add(_ct, transitionEvent, remove);
                  _ct.className += ' map-fade';
            } else {
                if (_ct.parentNode) _ct.parentNode.removeChild(_ct);
            }
        }
    }

    function on(o) {
        var content;
        if (o.e.type === 'mousemove' || !o.e.type) {
            if (!popped) {
                content = o.content || o.formatter({ format: 'teaser' }, o.data);
                if (!content || content == _currentContent) return;
                hide();
                parent.style.cursor = 'pointer';
                tooltips.push(parent.appendChild(getTooltip(content)));
                _currentContent = content;
            }
        } else {
            content = o.content || o.formatter({ format: 'full' }, o.data);
            if (!content) {
              if (o.e.type && o.e.type.match(/touch/)) {
                // fallback possible
                content = o.content || o.formatter({ format: 'teaser' }, o.data);
              }
              // but if that fails, return just the same.
              if (!content) return;
            }
            hide();
            parent.style.cursor = 'pointer';
            var tt = parent.appendChild(getTooltip(content));
            tt.className += ' map-popup';

            var close = tt.appendChild(document.createElement('a'));
            close.href = '#close';
            close.className = 'close';
            close.innerHTML = 'Close';
            popped = true;

            tooltips.push(tt);

            bean.add(close, 'touchstart mousedown', function(e) {
                e.stop();
            });

            bean.add(close, 'click touchend', function closeClick(e) {
                e.stop();
                hide();
                popped = false;
            });
        }
    }

    function off() {
        parent.style.cursor = 'default';
        _currentContent = null;
        if (!popped) hide();
    }

    t.parent = function(x) {
        if (!arguments.length) return parent;
        parent = x;
        return t;
    };

    t.animate = function(x) {
        if (!arguments.length) return animate;
        animate = x;
        return t;
    };

    t.events = function() {
        return {
            on: on,
            off: off
        };
    };

    return t;
};
var wax = wax || {};

// Utils are extracted from other libraries or
// written from scratch to plug holes in browser compatibility.
wax.u = {
    // From Bonzo
    offset: function(el) {
        // TODO: window margins
        //
        // Okay, so fall back to styles if offsetWidth and height are botched
        // by Firefox.
        var width = el.offsetWidth || parseInt(el.style.width, 10),
            height = el.offsetHeight || parseInt(el.style.height, 10),
            doc_body = document.body,
            top = 0,
            left = 0;

        var calculateOffset = function(el) {
            if (el === doc_body || el === document.documentElement) return;
            top += el.offsetTop;
            left += el.offsetLeft;

            var style = el.style.transform ||
                el.style.WebkitTransform ||
                el.style.OTransform ||
                el.style.MozTransform ||
                el.style.msTransform;

            if (style) {
                var match;
                if (match = style.match(/translate\((.+)px, (.+)px\)/)) {
                    top += parseInt(match[2], 10);
                    left += parseInt(match[1], 10);
                } else if (match = style.match(/translate3d\((.+)px, (.+)px, (.+)px\)/)) {
                    top += parseInt(match[2], 10);
                    left += parseInt(match[1], 10);
                } else if (match = style.match(/matrix3d\(([\-\d,\s]+)\)/)) {
                    var pts = match[1].split(',');
                    top += parseInt(pts[13], 10);
                    left += parseInt(pts[12], 10);
                } else if (match = style.match(/matrix\(.+, .+, .+, .+, (.+), (.+)\)/)) {
                    top += parseInt(match[2], 10);
                    left += parseInt(match[1], 10);
                }
            }
        };

        calculateOffset(el);

        try {
            while (el = el.offsetParent) { calculateOffset(el); }
        } catch(e) {
            // Hello, internet explorer.
        }

        // Offsets from the body
        top += doc_body.offsetTop;
        left += doc_body.offsetLeft;
        // Offsets from the HTML element
        top += doc_body.parentNode.offsetTop;
        left += doc_body.parentNode.offsetLeft;

        // Firefox and other weirdos. Similar technique to jQuery's
        // `doesNotIncludeMarginInBodyOffset`.
        var htmlComputed = document.defaultView ?
            window.getComputedStyle(doc_body.parentNode, null) :
            doc_body.parentNode.currentStyle;
        if (doc_body.parentNode.offsetTop !==
            parseInt(htmlComputed.marginTop, 10) &&
            !isNaN(parseInt(htmlComputed.marginTop, 10))) {
            top += parseInt(htmlComputed.marginTop, 10);
            left += parseInt(htmlComputed.marginLeft, 10);
        }

        return {
            top: top,
            left: left,
            height: height,
            width: width
        };
    },

    '$': function(x) {
        return (typeof x === 'string') ?
            document.getElementById(x) :
            x;
    },

    // IE doesn't have indexOf
    indexOf: function(array, item) {
        var nativeIndexOf = Array.prototype.indexOf;
        if (array === null) return -1;
        var i, l;
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
        for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
        return -1;
    },

    // From quirksmode: normalize the offset of an event from the top-left
    // of the page.
    eventoffset: function(e) {
        var posx = 0;
        var posy = 0;
        if (!e) { e = window.event; }
        if (e.pageX || e.pageY) {
            // Good browsers
            return {
                x: e.pageX,
                y: e.pageY
            };
        } else if (e.clientX || e.clientY) {
            // Internet Explorer
            var doc = document.documentElement, body = document.body;
            var htmlComputed = document.body.parentNode.currentStyle;
            var topMargin = parseInt(htmlComputed.marginTop, 10) || 0;
            var leftMargin = parseInt(htmlComputed.marginLeft, 10) || 0;
            return {
                x: e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                    (doc && doc.clientLeft || body && body.clientLeft || 0) + leftMargin,
                y: e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                    (doc && doc.clientTop  || body && body.clientTop  || 0) + topMargin
            };
        } else if (e.touches && e.touches.length === 1) {
            // Touch browsers
            return {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            };
        }
    },

    // Ripped from underscore.js
    // Internal function used to implement `_.throttle` and `_.debounce`.
    limit: function(func, wait, debounce) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var throttler = function() {
                timeout = null;
                func.apply(context, args);
            };
            if (debounce) clearTimeout(timeout);
            if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    },

    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time.
    throttle: function(func, wait) {
        return this.limit(func, wait, false);
    },

    sanitize: function(content) {
        if (!content) return '';

        function urlX(url) {
            // Data URIs are subject to a bug in Firefox
            // https://bugzilla.mozilla.org/show_bug.cgi?id=255107
            // which let them be a vector. But WebKit does 'the right thing'
            // or at least 'something' about this situation, so we'll tolerate
            // them.
            if (/^(https?:\/\/|data:image)/.test(url)) {
                return url;
            }
        }

        function idX(id) { return id; }

        return html_sanitize(content, urlX, idX);
    }
};
wax = wax || {};
wax.mm = wax.mm || {};

wax.mm.attribution = function(map, tilejson) {
    tilejson = tilejson || {};

    var a, // internal attribution control
        attribution = {};

    attribution.element = function() {
        return a.element();
    };

    attribution.appendTo = function(elem) {
        wax.u.$(elem).appendChild(a.element());
        return attribution;
    };

    attribution.init = function() {
        a = wax.attribution();
        a.content(tilejson.attribution);
        a.element().className = 'map-attribution map-mm';
        return attribution;
    };

    return attribution.init();
};
wax = wax || {};
wax.mm = wax.mm || {};

wax.mm.boxselector = function(map, tilejson, opts) {
    var corner = null,
        nearCorner = null,
        callback = ((typeof opts === 'function') ?
            opts :
            opts.callback),
        boxDiv,
        style,
        borderWidth = 0,
        horizontal = false,  // Whether the resize is horizontal
        vertical = false,
        edge = 5,  // Distance from border sensitive to resizing
        addEvent = MM.addEvent,
        removeEvent = MM.removeEvent,
        box,
        boxselector = {};

    function getMousePoint(e) {
        // start with just the mouse (x, y)
        var point = new MM.Point(e.clientX, e.clientY);
        // correct for scrolled document
        point.x += document.body.scrollLeft + document.documentElement.scrollLeft;
        point.y += document.body.scrollTop + document.documentElement.scrollTop;

        // correct for nested offsets in DOM
        for (var node = map.parent; node; node = node.offsetParent) {
            point.x -= node.offsetLeft;
            point.y -= node.offsetTop;
        }
        return point;
    }

    function mouseDown(e) {
        if (!e.shiftKey) return;

        corner = nearCorner = getMousePoint(e);
        horizontal = vertical = true;

        style.left = corner.x + 'px';
        style.top = corner.y + 'px';
        style.width = style.height = 0;

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);

        map.parent.style.cursor = 'crosshair';
        return MM.cancelEvent(e);
    }

    // Resize existing box
    function mouseDownResize(e) {
        var point = getMousePoint(e),
            TL = {
                x: parseInt(boxDiv.offsetLeft, 10),
                y: parseInt(boxDiv.offsetTop, 10)
            },
            BR = {
                x: TL.x + parseInt(boxDiv.offsetWidth, 10),
                y: TL.y + parseInt(boxDiv.offsetHeight, 10)
            };

        // Determine whether resize is horizontal, vertical or both
        horizontal = point.x - TL.x <= edge || BR.x - point.x <= edge;
        vertical = point.y - TL.y <= edge || BR.y - point.y <= edge;

        if (vertical || horizontal) {
            corner = {
                x: (point.x - TL.x < BR.x - point.x) ? BR.x : TL.x,
                y: (point.y - TL.y < BR.y - point.y) ? BR.y : TL.y
            };
            nearCorner = {
                x: (point.x - TL.x < BR.x - point.x) ? TL.x : BR.x,
                y: (point.y - TL.y < BR.y - point.y) ? TL.y : BR.y
            };
            addEvent(document, 'mousemove', mouseMove);
            addEvent(document, 'mouseup', mouseUp);
            return MM.cancelEvent(e);
        }
    }

    function mouseMove(e) {
        var point = getMousePoint(e);
        style.display = 'block';
        if (horizontal) {
            style.left = (point.x < corner.x ? point.x : corner.x) + 'px';
            style.width = Math.abs(point.x - corner.x) - 2 * borderWidth + 'px';
        }
        if (vertical) {
            style.top = (point.y < corner.y ? point.y : corner.y) + 'px';
            style.height = Math.abs(point.y - corner.y) - 2 * borderWidth + 'px';
        }
        changeCursor(point, map.parent);
        return MM.cancelEvent(e);
    }

    function mouseUp(e) {
        var point = getMousePoint(e),
            l1 = map.pointLocation( new MM.Point(
                horizontal ? point.x : nearCorner.x,
                vertical? point.y : nearCorner.y
            ));
            l2 = map.pointLocation(corner);

        // Format coordinates like mm.map.getExtent().
        boxselector.extent([
            new MM.Location(
                Math.max(l1.lat, l2.lat),
                Math.min(l1.lon, l2.lon)),
            new MM.Location(
                Math.min(l1.lat, l2.lat),
                Math.max(l1.lon, l2.lon))
        ]);

        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);

        map.parent.style.cursor = 'auto';
    }

    function mouseMoveCursor(e) {
        changeCursor(getMousePoint(e), boxDiv);
    }

    // Set resize cursor if mouse is on edge
    function changeCursor(point, elem) {
        var TL = {
                x: parseInt(boxDiv.offsetLeft, 10),
                y: parseInt(boxDiv.offsetTop, 10)
            },
            BR = {
                x: TL.x + parseInt(boxDiv.offsetWidth, 10),
                y: TL.y + parseInt(boxDiv.offsetHeight, 10)
            };
        // Build cursor style string
        var prefix = '';
        if (point.y - TL.y <= edge) prefix = 'n';
        else if (BR.y - point.y <= edge) prefix = 's';
        if (point.x - TL.x <= edge) prefix += 'w';
        else if (BR.x - point.x <= edge) prefix += 'e';
        if (prefix !== '') prefix += '-resize';
        elem.style.cursor = prefix;
    }

    function drawbox(map, e) {
        if (!boxDiv || !box) return;
        var br = map.locationPoint(box[1]),
            tl = map.locationPoint(box[0]),
            style = boxDiv.style;

        style.display = 'block';
        style.height = 'auto';
        style.width = 'auto';
        style.left = Math.max(0, tl.x) + 'px';
        style.top = Math.max(0, tl.y) + 'px';
        style.right = Math.max(0, map.dimensions.x - br.x) + 'px';
        style.bottom = Math.max(0, map.dimensions.y - br.y) + 'px';
    }

    boxselector.extent = function(x, silent) {
        if (!x) return box;

        box = [
            new MM.Location(
                Math.max(x[0].lat, x[1].lat),
                Math.min(x[0].lon, x[1].lon)),
            new MM.Location(
                Math.min(x[0].lat, x[1].lat),
                Math.max(x[0].lon, x[1].lon))
        ];

        drawbox(map);

        if (!silent) callback(box);
    };

    boxselector.add = function(map) {
        boxDiv = boxDiv || document.createElement('div');
        boxDiv.id = map.parent.id + '-boxselector-box';
        boxDiv.className = 'boxselector-box';
        map.parent.appendChild(boxDiv);
        style = boxDiv.style;
        borderWidth = parseInt(window.getComputedStyle(boxDiv).borderWidth, 10);

        addEvent(map.parent, 'mousedown', mouseDown);
        addEvent(boxDiv, 'mousedown', mouseDownResize);
        addEvent(map.parent, 'mousemove', mouseMoveCursor);
        map.addCallback('drawn', drawbox);
        return this;
    };

    boxselector.remove = function() {
        map.parent.removeChild(boxDiv);
        removeEvent(map.parent, 'mousedown', mouseDown);
        removeEvent(boxDiv, 'mousedown', mouseDownResize);
        removeEvent(map.parent, 'mousemove', mouseMoveCursor);
        map.removeCallback('drawn', drawbox);
    };

    return boxselector.add(map);
};
wax = wax || {};
wax.mm = wax.mm || {};
wax._ = {};

wax.mm.bwdetect = function(map, options) {
    options = options || {};
    var lowpng = options.png || '.png128',
        lowjpg = options.jpg || '.jpg70',
        bw = false;

    wax._.bw_png = lowpng;
    wax._.bw_jpg = lowjpg;

    return wax.bwdetect(options, function(x) {
        wax._.bw = !x;
        for (var i = 0; i < map.layers.length; i++) {
            if (map.getLayerAt(i).provider instanceof wax.mm.connector) {
                map.getLayerAt(i).setProvider(map.getLayerAt(i).provider);
            }
        }
    });
};
wax = wax || {};
wax.mm = wax.mm || {};

// Add zoom links, which can be styled as buttons, to a `modestmaps.Map`
// control. This function can be used chaining-style with other
// chaining-style controls.
wax.mm.fullscreen = function(map) {
    // true: fullscreen
    // false: minimized
    var fullscreened = false,
        fullscreen = {},
        a,
        body = document.body,
        smallSize;

    function click(e) {
        if (e) e.stop();
        if (fullscreened) {
            fullscreen.original();
        } else {
            fullscreen.full();
        }
    }

    function ss(w, h) {
        map.dimensions = new MM.Point(w, h);
        map.parent.style.width = Math.round(map.dimensions.x) + 'px';
        map.parent.style.height = Math.round(map.dimensions.y) + 'px';
        map.dispatchCallback('resized', map.dimensions);
    }

    // Modest Maps demands an absolute height & width, and doesn't auto-correct
    // for changes, so here we save the original size of the element and
    // restore to that size on exit from fullscreen.
    fullscreen.add = function(map) {
        a = document.createElement('a');
        a.className = 'map-fullscreen';
        a.href = '#fullscreen';
        a.innerHTML = 'fullscreen';
        bean.add(a, 'click', click);
        return this;
    };
    fullscreen.full = function() {
        if (fullscreened) { return; } else { fullscreened = true; }
        smallSize = [map.parent.offsetWidth, map.parent.offsetHeight];
        map.parent.className += ' map-fullscreen-map';
        body.className += ' map-fullscreen-view';
        ss(map.parent.offsetWidth, map.parent.offsetHeight);
    };
    fullscreen.original = function() {
        if (!fullscreened) { return; } else { fullscreened = false; }
        map.parent.className = map.parent.className.replace(' map-fullscreen-map', '');
        body.className = body.className.replace(' map-fullscreen-view', '');
        ss(smallSize[0], smallSize[1]);
    };
    fullscreen.appendTo = function(elem) {
        wax.u.$(elem).appendChild(a);
        return this;
    };

    return fullscreen.add(map);
};
wax = wax || {};
wax.mm = wax.mm || {};

wax.mm.hash = function(map) {
    return wax.hash({
        getCenterZoom: function() {
            var center = map.getCenter(),
                zoom = map.getZoom(),
                precision = Math.max(
                    0,
                    Math.ceil(Math.log(zoom) / Math.LN2));

            return [zoom.toFixed(2),
                center.lat.toFixed(precision),
                center.lon.toFixed(precision)
            ].join('/');
        },
        setCenterZoom: function setCenterZoom(args) {
            map.setCenterZoom(
                new MM.Location(args[1], args[2]),
                args[0]);
        },
        bindChange: function(fn) {
            map.addCallback('drawn', fn);
        },
        unbindChange: function(fn) {
            map.removeCallback('drawn', fn);
        }
    });
};
wax = wax || {};
wax.mm = wax.mm || {};

wax.mm.interaction = function() {
    var dirty = false,
        _grid,
        map,
        clearingEvents = ['zoomed', 'panned', 'centered',
            'extentset', 'resized', 'drawn'];

    function grid() {
        var zoomLayer = map.getLayerAt(0)
            .levels[Math.round(map.getZoom())];
        if (!dirty && _grid !== undefined && _grid.length) {
            return _grid;
        } else {
            _grid = (function(t) {
                var o = [];
                for (var key in t) {
                    if (t[key].parentNode === zoomLayer) {
                        var offset = wax.u.offset(t[key]);
                        o.push([
                            offset.top,
                            offset.left,
                            t[key]
                        ]);
                    }
                }
                return o;
            })(map.getLayerAt(0).tiles);
            return _grid;
        }
    }

    function setdirty() { dirty = true; }

    function attach(x) {
        if (!arguments.length) return map;
        map = x;
        for (var i = 0; i < clearingEvents.length; i++) {
            map.addCallback(clearingEvents[i], setdirty);
        }
    }

    function detach(x) {
        for (var i = 0; i < clearingEvents.length; i++) {
            map.removeCallback(clearingEvents[i], setdirty);
        }
    }

    return wax.interaction()
        .attach(attach)
        .detach(detach)
        .parent(function() {
          return map.parent;
        })
        .grid(grid);
};
wax = wax || {};
wax.mm = wax.mm || {};

wax.mm.legend = function(map, tilejson) {
    tilejson = tilejson || {};
    var l, // parent legend
        legend = {};

    legend.add = function() {
        l = wax.legend()
            .content(tilejson.legend);
        return legend;
    };

    legend.content = function(x) {
        if (!arguments.length) return l.content();
        l.content(legend);
        return legend;
    };

    legend.element = function() {
        return l.element();
    };

    legend.appendTo = function(elem) {
        wax.u.$(elem).appendChild(l.element());
        return legend;
    };

    return legend.add();
};
wax = wax || {};
wax.mm = wax.mm || {};

// This takes an object of options:
//
// * `callback`: a function called with an array of `com.modestmaps.Location`
//   objects when the map is edited
//
// It also exposes a public API function: `addLocation`, which adds a point
// to the map as if added by the user.
wax.mm.pointselector = function(map, tilejson, opts) {
    var mouseDownPoint = null,
        mouseUpPoint = null,
        tolerance = 5,
        overlayDiv,
        pointselector = {},
        locations = [];

    var callback = (typeof opts === 'function') ?
        opts :
        opts.callback;

    // Create a `com.modestmaps.Point` from a screen event, like a click.
    function makePoint(e) {
        var coords = wax.u.eventoffset(e);
        var point = new MM.Point(coords.x, coords.y);
        // correct for scrolled document

        // and for the document
        var body = {
            x: parseFloat(MM.getStyle(document.documentElement, 'margin-left')),
            y: parseFloat(MM.getStyle(document.documentElement, 'margin-top'))
        };

        if (!isNaN(body.x)) point.x -= body.x;
        if (!isNaN(body.y)) point.y -= body.y;

        // TODO: use wax.util.offset
        // correct for nested offsets in DOM
        for (var node = map.parent; node; node = node.offsetParent) {
            point.x -= node.offsetLeft;
            point.y -= node.offsetTop;
        }
        return point;
    }

    // Currently locations in this control contain circular references to elements.
    // These can't be JSON encoded, so here's a utility to clean the data that's
    // spit back.
    function cleanLocations(locations) {
        var o = [];
        for (var i = 0; i < locations.length; i++) {
            o.push(new MM.Location(locations[i].lat, locations[i].lon));
        }
        return o;
    }

    // Attach this control to a map by registering callbacks
    // and adding the overlay

    // Redraw the points when the map is moved, so that they stay in the
    // correct geographic locations.
    function drawPoints() {
        var offset = new MM.Point(0, 0);
        for (var i = 0; i < locations.length; i++) {
            var point = map.locationPoint(locations[i]);
            if (!locations[i].pointDiv) {
                locations[i].pointDiv = document.createElement('div');
                locations[i].pointDiv.className = 'map-point-div';
                locations[i].pointDiv.style.position = 'absolute';
                locations[i].pointDiv.style.display = 'block';
                // TODO: avoid circular reference
                locations[i].pointDiv.location = locations[i];
                // Create this closure once per point
                bean.add(locations[i].pointDiv, 'mouseup',
                    (function selectPointWrap(e) {
                    var l = locations[i];
                    return function(e) {
                        MM.removeEvent(map.parent, 'mouseup', mouseUp);
                        pointselector.deleteLocation(l, e);
                    };
                })());
                map.parent.appendChild(locations[i].pointDiv);
            }
            locations[i].pointDiv.style.left = point.x + 'px';
            locations[i].pointDiv.style.top = point.y + 'px';
        }
    }

    function mouseDown(e) {
        mouseDownPoint = makePoint(e);
        bean.add(map.parent, 'mouseup', mouseUp);
    }

    // Remove the awful circular reference from locations.
    // TODO: This function should be made unnecessary by not having it.
    function mouseUp(e) {
        if (!mouseDownPoint) return;
        mouseUpPoint = makePoint(e);
        if (MM.Point.distance(mouseDownPoint, mouseUpPoint) < tolerance) {
            pointselector.addLocation(map.pointLocation(mouseDownPoint));
            callback(cleanLocations(locations));
        }
        mouseDownPoint = null;
    }

    // API for programmatically adding points to the map - this
    // calls the callback for ever point added, so it can be symmetrical.
    // Useful for initializing the map when it's a part of a form.
    pointselector.addLocation = function(location) {
        locations.push(location);
        drawPoints();
        callback(cleanLocations(locations));
    };

    pointselector.locations = function(x) {
        return locations;
    };

    pointselector.add = function(map) {
        bean.add(map.parent, 'mousedown', mouseDown);
        map.addCallback('drawn', drawPoints);
        return this;
    };

    pointselector.remove = function(map) {
        bean.remove(map.parent, 'mousedown', mouseDown);
        map.removeCallback('drawn', drawPoints);
        for (var i = locations.length - 1; i > -1; i--) {
            pointselector.deleteLocation(locations[i]);
        }
        return this;
    };

    pointselector.deleteLocation = function(location, e) {
        if (!e || confirm('Delete this point?')) {
            location.pointDiv.parentNode.removeChild(location.pointDiv);
            locations.splice(wax.u.indexOf(locations, location), 1);
            callback(cleanLocations(locations));
        }
    };

    return pointselector.add(map);
};
wax = wax || {};
wax.mm = wax.mm || {};

wax.mm.zoombox = function(map) {
    // TODO: respond to resize
    var zoombox = {},
        drawing = false,
        box,
        mouseDownPoint = null;

    function getMousePoint(e) {
        // start with just the mouse (x, y)
        var point = new MM.Point(e.clientX, e.clientY);
        // correct for scrolled document
        point.x += document.body.scrollLeft + document.documentElement.scrollLeft;
        point.y += document.body.scrollTop + document.documentElement.scrollTop;

        // correct for nested offsets in DOM
        for (var node = map.parent; node; node = node.offsetParent) {
            point.x -= node.offsetLeft;
            point.y -= node.offsetTop;
        }
        return point;
    }

    function mouseUp(e) {
        if (!drawing) return;

        drawing = false;
        var point = getMousePoint(e);

        var l1 = map.pointLocation(point),
            l2 = map.pointLocation(mouseDownPoint);

        map.setExtent([l1, l2]);

        box.style.display = 'none';
        MM.removeEvent(map.parent, 'mousemove', mouseMove);
        MM.removeEvent(map.parent, 'mouseup', mouseUp);

        map.parent.style.cursor = 'auto';
    }

    function mouseDown(e) {
        if (!(e.shiftKey && !this.drawing)) return;

        drawing = true;
        mouseDownPoint = getMousePoint(e);

        box.style.left = mouseDownPoint.x + 'px';
        box.style.top = mouseDownPoint.y + 'px';

        MM.addEvent(map.parent, 'mousemove', mouseMove);
        MM.addEvent(map.parent, 'mouseup', mouseUp);

        map.parent.style.cursor = 'crosshair';
        return MM.cancelEvent(e);
    }

    function mouseMove(e) {
        if (!drawing) return;

        var point = getMousePoint(e);
        box.style.display = 'block';
        if (point.x < mouseDownPoint.x) {
            box.style.left = point.x + 'px';
        } else {
            box.style.left = mouseDownPoint.x + 'px';
        }
        box.style.width = Math.abs(point.x - mouseDownPoint.x) + 'px';
        if (point.y < mouseDownPoint.y) {
            box.style.top = point.y + 'px';
        } else {
            box.style.top = mouseDownPoint.y + 'px';
        }
        box.style.height = Math.abs(point.y - mouseDownPoint.y) + 'px';
        return MM.cancelEvent(e);
    }

    zoombox.add = function(map) {
        // Use a flag to determine whether the zoombox is currently being
        // drawn. Necessary only for IE because `mousedown` is triggered
        // twice.
        box = box || document.createElement('div');
        box.id = map.parent.id + '-zoombox-box';
        box.className = 'zoombox-box';
        map.parent.appendChild(box);
        MM.addEvent(map.parent, 'mousedown', mouseDown);
        return this;
    };

    zoombox.remove = function() {
        map.parent.removeChild(box);
        MM.removeEvent(map.parent, 'mousedown', mouseDown);
    };

    return zoombox.add(map);
};
wax = wax || {};
wax.mm = wax.mm || {};

wax.mm.zoomer = function(map) {
    var zoomer = {},
        zoomin = document.createElement('a');

    zoomin.innerHTML = '+';
    zoomin.href = '#';
    zoomin.className = 'zoomer zoomin';
    bean.add(zoomin, 'mousedown dblclick', function(e) {
        e.stop();
    });
    bean.add(zoomin, 'touchstart click', function(e) {
        e.stop();
        map.zoomIn();
    }, false);

    var zoomout = document.createElement('a');
    zoomout.innerHTML = '-';
    zoomout.href = '#';
    zoomout.className = 'zoomer zoomout';
    bean.add(zoomout, 'mousedown dblclick', function(e) {
        e.stop();
    });
    bean.add(zoomout, 'touchstart click', function(e) {
        e.stop();
        map.zoomOut();
    });

    zoomer.add = function(map) {
        map.addCallback('drawn', function(map, e) {
            if (map.coordinate.zoom === map.coordLimits[0].zoom) {
                zoomout.className = 'zoomer zoomout zoomdisabled';
            } else if (map.coordinate.zoom === map.coordLimits[1].zoom) {
                zoomin.className = 'zoomer zoomin zoomdisabled';
            } else {
                zoomin.className = 'zoomer zoomin';
                zoomout.className = 'zoomer zoomout';
            }
        });
        return zoomer;
    };

    zoomer.appendTo = function(elem) {
        wax.u.$(elem).appendChild(zoomin);
        wax.u.$(elem).appendChild(zoomout);
        return zoomer;
    };

    return zoomer.add(map);
};
var wax = wax || {};
wax.mm = wax.mm || {};

// A layer connector for Modest Maps conformant to TileJSON
// https://github.com/mapbox/tilejson
wax.mm._provider = function(options) {
    this.options = {
        tiles: options.tiles,
        scheme: options.scheme || 'xyz',
        minzoom: options.minzoom || 0,
        maxzoom: options.maxzoom || 22,
        bounds: options.bounds || [-180, -90, 180, 90]
    };
};

wax.mm._provider.prototype = {
    outerLimits: function() {
        return [
            this.locationCoordinate(
                new MM.Location(
                    this.options.bounds[0],
                    this.options.bounds[1])).zoomTo(this.options.minzoom),
            this.locationCoordinate(
                new MM.Location(
                    this.options.bounds[2],
                    this.options.bounds[3])).zoomTo(this.options.maxzoom)
        ];
    },
    getTile: function(c) {
        if (!(coord = this.sourceCoordinate(c))) return null;
        if (coord.zoom < this.options.minzoom || coord.zoom > this.options.maxzoom) return null;

        coord.row = (this.options.scheme === 'tms') ?
            Math.pow(2, coord.zoom) - coord.row - 1 :
            coord.row;

        var u = this.options.tiles[parseInt(Math.pow(2, coord.zoom) * coord.row + coord.column, 10) %
            this.options.tiles.length]
            .replace('{z}', coord.zoom.toFixed(0))
            .replace('{x}', coord.column.toFixed(0))
            .replace('{y}', coord.row.toFixed(0));

        if (wax._ && wax._.bw) {
            u = u.replace('.png', wax._.bw_png)
                .replace('.jpg', wax._.bw_jpg);
        }

        return u;
    }
};

if (MM) {
    MM.extend(wax.mm._provider, MM.MapProvider);
}

wax.mm.connector = function(options) {
    var x = new wax.mm._provider(options);
    return new MM.Layer(x);
};
;(function(context, MM) {
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
typeof mapbox=="undefined"&&(mapbox={}),typeof mapbox.markers=="undefined"&&(mapbox.markers={}),mapbox.markers.layer=function(){function l(b){b.coord||(b.coord=a.map.locationCoordinate(b.location));var c=a.map.coordinatePoint(b.coord),d;c.x<0?(d=new MM.Location(b.location.lat,b.location.lon),d.lon+=Math.ceil((i.lon-b.location.lon)/360)*360,c=a.map.locationPoint(d),b.coord=a.map.locationCoordinate(d)):c.x>a.map.dimensions.x&&(d=new MM.Location(b.location.lat,b.location.lon),d.lon-=Math.ceil((b.location.lon-j.lon)/360)*360,c=a.map.locationPoint(d),b.coord=a.map.locationCoordinate(d)),c.scale=1,c.width=c.height=0,MM.moveElement(b.element,c)}var a={},b=[],c=[],d=new MM.CallbackManager(a,["drawn","markeradded"]),e=null,f=mapbox.markers.simplestyle_factory,g=function(a,b){return b.geometry.coordinates[1]-a.geometry.coordinates[1]},h,i=null,j=null,k=function(){return!0};return a.parent=document.createElement("div"),a.parent.style.cssText="position: absolute; top: 0px;left:0px; width:100%; height:100%; margin:0; padding:0; z-index:0;pointer-events:none;",a.addCallback=function(b,c){return d.addCallback(b,c),a},a.removeCallback=function(b,c){return d.removeCallback(b,c),a},a.draw=function(){if(!a.map)return;i=a.map.pointLocation(new MM.Point(0,0)),j=a.map.pointLocation(new MM.Point(a.map.dimensions.x,0)),d.dispatchCallback("drawn",a);for(var b=0;b<c.length;b++)l(c[b])},a.add=function(b){return!b||!b.element?null:(a.parent.appendChild(b.element),c.push(b),d.dispatchCallback("markeradded",b),b)},a.remove=function(b){if(!b)return null;a.parent.removeChild(b.element);for(var d=0;d<c.length;d++)if(c[d]===b)return c.splice(d,1),b;return b},a.markers=function(a){if(!arguments.length)return c},a.add_feature=function(b){return a.features(a.features().concat([b]))},a.sort=function(b){return arguments.length?(g=b,a):g},a.features=function(d){if(!arguments.length)return b;while(a.parent.hasChildNodes())a.parent.removeChild(a.parent.lastChild);c=[],d||(d=[]),b=d.slice(),b.sort(g);for(var e=0;e<b.length;e++)k(b[e])&&a.add({element:f(b[e]),location:new MM.Location(b[e].geometry.coordinates[1],b[e].geometry.coordinates[0]),data:b[e]});return a.map&&a.map.coordinate&&a.map.draw(),a},a.url=function(b,c){function d(b){b&&b.features&&a.features(b.features),c&&c(b.features,a)}if(!arguments.length)return h;if(typeof reqwest=="undefined")throw"reqwest is required for url loading";return typeof b=="string"&&(b=[b]),h=b,reqwest(h[0].match(/geojsonp$/)?{url:h[0]+(~h[0].indexOf("?")?"&":"?")+"callback=grid",type:"jsonp",jsonpCallback:"callback",success:d,error:d}:{url:h[0],type:"json",success:d,error:d}),a},a.extent=function(){var b=[{lat:Infinity,lon:Infinity},{lat:-Infinity,lon:-Infinity}],c=a.features();for(var d=0;d<c.length;d++){var e=c[d].geometry.coordinates;e[0]<b[0].lon&&(b[0].lon=e[0]),e[1]<b[0].lat&&(b[0].lat=e[1]),e[0]>b[1].lon&&(b[1].lon=e[0]),e[1]>b[1].lat&&(b[1].lat=e[1])}return b},a.factory=function(b){return arguments.length?(f=b,a.features(a.features()),a):f},a.filter=function(b){return arguments.length?(k=b,a.features(a.features()),a):k},a.destroy=function(){a.parent.parentNode&&a.parent.parentNode.removeChild(a.parent)},a},mmg=mapbox.markers.layer,mapbox.markers.interaction=function(a){function i(){a.map.addCallback("panned",function(){if(e)while(c.length)a.remove(c.pop())})}var b={},c=[],d=!0,e=!0,f=!0,g=null,h;b.formatter=function(a){return arguments.length?(h=a,b):h},b.formatter(function(a){var b="",c=a.properties;return c?(c.title&&(b+='<div class="marker-title">'+c.title+"</div>"),c.description&&(b+='<div class="marker-description">'+c.description+"</div>"),typeof html_sanitize!==undefined&&(b=html_sanitize(b,function(a){if(/^(https?:\/\/|data:image)/.test(a))return a},function(a){return a})),b):null}),b.hide_on_move=function(a){return arguments.length?(e=a,b):e},b.exclusive=function(a){return arguments.length?(d=a,b):d},b.show_on_hover=function(a){return arguments.length?(f=a,b):f},b.hide_tooltips=function(){while(c.length)a.remove(c.pop());for(var b=0;b<j.length;b++)delete j[b].clicked},b.bind_marker=function(e){var i=function(){e.clicked||(g=window.setTimeout(function(){b.hide_tooltips()},200))},j=function(j){var k=h(e.data);if(!k)return;d&&c.length>0&&(b.hide_tooltips(),g&&window.clearTimeout(g));var l=document.createElement("div");l.className="marker-tooltip",l.style.width="100%";var m=l.appendChild(document.createElement("div"));m.style.cssText="position: absolute; pointer-events: none;";var n=m.appendChild(document.createElement("div"));n.className="marker-popup",n.style.cssText="pointer-events: auto;",typeof k=="string"?n.innerHTML=k:n.appendChild(k),m.style.bottom=e.element.offsetHeight/2+20+"px",f&&(l.onmouseover=function(){g&&window.clearTimeout(g)},l.onmouseout=i);var o={element:l,data:{},interactive:!1,location:e.location.copy()};c.push(o),a.add(o),a.draw()};e.element.onclick=e.element.ontouchstart=function(){j(),e.clicked=!0},f&&(e.element.onmouseover=j,e.element.onmouseout=i)};if(a){a.addCallback("drawn",i),a.removeCallback("drawn",i);var j=a.markers();for(var k=0;k<j.length;k++)b.bind_marker(j[k]);a.addCallback("markeradded",function(a,c){c.interactive!==!1&&b.bind_marker(c)})}return b},mmg_interaction=mapbox.markers.interaction,mapbox.markers.csv_to_geojson=function(a){function b(a){var b;return c(a,function(a,c){if(c){var d={},e=-1,f=b.length;while(++e<f)d[b[e]]=a[e];return d}return b=a,null})}function c(a,b){function j(){if(f.lastIndex>=a.length)return d;if(i)return i=!1,c;var b=f.lastIndex;if(a.charCodeAt(b)===34){var e=b;while(e++<a.length)if(a.charCodeAt(e)===34){if(a.charCodeAt(e+1)!==34)break;e++}f.lastIndex=e+2;var g=a.charCodeAt(e+1);return g===13?(i=!0,a.charCodeAt(e+2)===10&&f.lastIndex++):g===10&&(i=!0),a.substring(b+1,e).replace(/""/g,'"')}var h=f.exec(a);return h?(i=h[0].charCodeAt(0)!==44,a.substring(b,h.index)):(f.lastIndex=a.length,a.substring(b))}var c={},d={},e=[],f=/\r\n|[,\r\n]/g,g=0,h,i;f.lastIndex=0;while((h=j())!==d){var k=[];while(h!==c&&h!==d)k.push(h),h=j();if(b&&!(k=b(k,g++)))continue;e.push(k)}return e}var d=[],e=b(a);if(!e.length)return callback(d);var f="",g="";for(var h in e[0])h.match(/^Lat/i)&&(f=h),h.match(/^Lon/i)&&(g=h);if(!f||!g)throw"CSV: Could not find latitude or longitude field";for(var i=0;i<e.length;i++)e[i][g]!==undefined&&e[i][g]!==undefined&&d.push({type:"Feature",properties:e[i],geometry:{type:"Point",coordinates:[parseFloat(e[i][g]),parseFloat(e[i][f])]}});return d},mapbox.markers.csv_url_to_geojson=function(a,b){function c(a){return b(mapbox.markers.csv_to_geojson(a.responseText))}if(typeof reqwest=="undefined")throw"CSV: reqwest required for mapbox.markers.csv_url_to_geojson";reqwest({url:a,type:"string",success:c,error:c})},mapbox.markers.simplestyle_factory=function(a){var b={small:[20,50],medium:[30,70],large:[35,90]},c=a.properties||{},d=c["marker-size"]||"medium",e=c["marker-symbol"]?"-"+c["marker-symbol"]:"",f=c["marker-color"]||"7e7e7e";f=f.replace("#","");var g=document.createElement("img");g.width=b[d][0],g.height=b[d][1],g.className="simplestyle-marker",g.alt=c.title||"",g.src=(mapbox.markers.marker_baseurl||"http://a.tiles.mapbox.com/v3/marker/")+"pin-"+d.charAt(0)+e+"+"+f+".png"+(window.devicePixelRatio===2?"@2x":"");var h=g.style;return h.position="absolute",h.clip="rect(auto auto "+b[d][1]*.75+"px auto)",h.marginTop=-(b[d][1]/2)+"px",h.marginLeft=-(b[d][0]/2)+"px",h.cursor="pointer",h.pointerEvents="all",g}
if (typeof mapbox === 'undefined') mapbox = {};

// Utils
function getStyle(elem, name) {
    if (elem.style[name]) {
        return elem.style[name];
    } else if (elem.currentStyle) {
        return elem.currentStyle[name];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, '-$1');
        name = name.toLowerCase();
        s = document.defaultView.getComputedStyle(elem, '');
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
}


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
        map.controls = document.createElement('div');
        map.controls.style.cssText = 'position: absolute; z-index: 1000';
        map.controls.id = 'controls';
        map.parent.appendChild(map.controls);

    // Check the map parent for default properties.
    // if they aren't set then create some off the bat.
    var i, defaultProperties = ['height', 'width'];
    for (i in defaultProperties) {
        var prop = defaultProperties[i];
        if (getStyle(map.parent, prop) === '0px' || getStyle(map.parent, prop) === 'auto') {
            map.parent.style[prop] = '400px';
        }
    }
    if (options.layer) map.addLayer(options.layer);
    if (options.markers) map.addLayer(options.markers);
    if (options.attribution) wax.mm.attribution(map, options).appendTo(map.parent);
    if (options.legend) wax.mm.legend(map, options).appendTo(map.parent);
    wax.mm.zoomer(map).appendTo(map.controls);
    wax.mm.zoombox(map);
    map.zoom(options.zoom).center(options.center);
    wax.mm.interaction().map(map).tilejson(options).on(wax.tooltip().parent(map.parent).events());

    map.setZoomRange(options.minzoom, options.maxzoom);
    if (callback) callback(map, options);
  };
};

var smooth_handlers = [
easey.TouchHandler, easey.DragHandler, easey.DoubleClickHandler, easey.MouseWheelHandler];

var default_handlers = [MM.TouchHandler, MM.DragHandler, MM.DoubleClickHandler, MM.MouseWheelHandler];

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
  easey.TouchHandler(), easey.DragHandler(), easey.DoubleClickHandler(), easey.MouseWheelHandler()]);

  m.center = function(location, animate) {
    if (location && animate) {
      easey().map(this).to(this.locationCoordinate(location)).optimal(null, null, animate.callback ||
      function() {});
    } else if (location) {
      return this.setCenter(location);
    } else {
      return this.getCenter();
    }
  };

  m.zoom = function(zoom, animate) {
    if (zoom !== undefined && animate) {
      easey().map(this).to(this.locationCoordinate(this.getCenter()).copy().zoomTo(zoom)).run(600);
    } else if (zoom !== undefined) {
      return this.setZoom(zoom);
    } else {
      return this.getZoom();
    }
  };

  m.centerzoom = function(location, zoom, animate) {
    if (location && zoom !== undefined && animate) {
      easey().map(this).to(this.locationCoordinate(location).zoomTo(zoom)).run(animate.duration || 1000, animate.callback ||
      function() {});
    } else if (location && zoom !== undefined) {
      return this.setCenterZoom(location, zoom);
    }
  };

  return m;
};

this.mapbox = mapbox;
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
