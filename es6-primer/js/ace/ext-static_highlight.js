<<<<<<< HEAD
/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

ace.define('ace/ext/static_highlight', ['require', 'exports', 'module' , 'ace/edit_session', 'ace/layer/text', 'ace/config', 'ace/lib/dom'], function(require, exports, module) {

=======
define("ace/ext/static_highlight",["require","exports","module","ace/edit_session","ace/layer/text","ace/config","ace/lib/dom"], function(require, exports, module) {
"use strict";
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b

var EditSession = require("../edit_session").EditSession;
var TextLayer = require("../layer/text").Text;
var baseStyles = ".ace_static_highlight {\
font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', 'Droid Sans Mono', monospace;\
font-size: 12px;\
}\
.ace_static_highlight .ace_gutter {\
width: 25px !important;\
<<<<<<< HEAD
display: block;\
=======
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
float: left;\
text-align: right;\
padding: 0 3px 0 0;\
margin-right: 3px;\
position: static !important;\
}\
.ace_static_highlight .ace_line { clear: both; }\
.ace_static_highlight .ace_gutter-cell {\
-moz-user-select: -moz-none;\
-khtml-user-select: none;\
-webkit-user-select: none;\
user-select: none;\
<<<<<<< HEAD
}";
var config = require("../config");
var dom = require("../lib/dom");

exports.render = function(input, mode, theme, lineStart, disableGutter, callback) {
    var waiting = 0;
=======
}\
.ace_static_highlight .ace_gutter-cell:before {\
content: counter(ace_line, decimal);\
counter-increment: ace_line;\
}\
.ace_static_highlight {\
counter-reset: ace_line;\
}\
";
var config = require("../config");
var dom = require("../lib/dom");


var highlight = function(el, opts, callback) {
    var m = el.className.match(/lang-(\w+)/);
    var mode = opts.mode || m && ("ace/mode/" + m[1]);
    if (!mode)
        return false;
    var theme = opts.theme || "ace/theme/textmate";
    
    var data = "";
    var nodes = [];

    if (el.firstElementChild) {
        var textLen = 0;
        for (var i = 0; i < el.childNodes.length; i++) {
            var ch = el.childNodes[i];
            if (ch.nodeType == 3) {
                textLen += ch.data.length;
                data += ch.data;
            } else {
                nodes.push(textLen, ch);
            }
        }
    } else {
        data = dom.getInnerText(el);
        if (opts.trim)
            data = data.trim();
    }
    
    highlight.render(data, mode, theme, opts.firstLineNumber, !opts.showGutter, function (highlighted) {
        dom.importCssString(highlighted.css, "ace_highlight");
        el.innerHTML = highlighted.html;
        var container = el.firstChild.firstChild;
        for (var i = 0; i < nodes.length; i += 2) {
            var pos = highlighted.session.doc.indexToPosition(nodes[i]);
            var node = nodes[i + 1];
            var lineEl = container.children[pos.row];
            lineEl && lineEl.appendChild(node);
        }
        callback && callback();
    });
};
highlight.render = function(input, mode, theme, lineStart, disableGutter, callback) {
    var waiting = 1;
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
    var modeCache = EditSession.prototype.$modes;
    if (typeof theme == "string") {
        waiting++;
        config.loadModule(['theme', theme], function(m) {
            theme = m;
            --waiting || done();
        });
    }
<<<<<<< HEAD

    if (typeof mode == "string") {
        waiting++;
        config.loadModule(['mode', mode], function(m) {
            if (!modeCache[mode]) modeCache[mode] = new m.Mode();
=======
    var modeOptions;
    if (mode && typeof mode === "object" && !mode.getTokenizer) {
        modeOptions = mode;
        mode = modeOptions.path;
    }
    if (typeof mode == "string") {
        waiting++;
        config.loadModule(['mode', mode], function(m) {
            if (!modeCache[mode] || modeOptions)
                modeCache[mode] = new m.Mode(modeOptions);
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            mode = modeCache[mode];
            --waiting || done();
        });
    }
    function done() {
<<<<<<< HEAD
        var result = exports.renderSync(input, mode, theme, lineStart, disableGutter);
        return callback ? callback(result) : result;
    }
    return waiting || done();
};

exports.renderSync = function(input, mode, theme, lineStart, disableGutter) {
=======
        var result = highlight.renderSync(input, mode, theme, lineStart, disableGutter);
        return callback ? callback(result) : result;
    }
    return --waiting || done();
};
highlight.renderSync = function(input, mode, theme, lineStart, disableGutter) {
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
    lineStart = parseInt(lineStart || 1, 10);

    var session = new EditSession("");
    session.setUseWorker(false);
    session.setMode(mode);

    var textLayer = new TextLayer(document.createElement("div"));
    textLayer.setSession(session);
    textLayer.config = {
        characterWidth: 10,
        lineHeight: 20
    };

    session.setValue(input);

    var stringBuilder = [];
    var length =  session.getLength();

    for(var ix = 0; ix < length; ix++) {
        stringBuilder.push("<div class='ace_line'>");
        if (!disableGutter)
<<<<<<< HEAD
            stringBuilder.push("<span class='ace_gutter ace_gutter-cell' unselectable='on'>" + (ix + lineStart) + "</span>");
        textLayer.$renderLine(stringBuilder, ix, true, false);
        stringBuilder.push("</div>");
    }
    var html = "<div class='" + theme.cssClass + "'>" +
        "<div class='ace_static_highlight'>" +
=======
            stringBuilder.push("<span class='ace_gutter ace_gutter-cell' unselectable='on'>" + /*(ix + lineStart) + */ "</span>");
        textLayer.$renderLine(stringBuilder, ix, true, false);
        stringBuilder.push("\n</div>");
    }
    var html = "<div class='" + theme.cssClass + "'>" +
        "<div class='ace_static_highlight' style='counter-reset:ace_line " + (lineStart - 1) + "'>" +
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            stringBuilder.join("") +
        "</div>" +
    "</div>";

    textLayer.destroy();

    return {
        css: baseStyles + theme.cssText,
<<<<<<< HEAD
        html: html
    };
};



exports.highlight = function(el, opts, callback) {
    var m = el.className.match(/lang-(\w+)/);
    var mode = opts.mode || m && ("ace/mode/" + m[1]);
    if (!mode)
        return false;
    var theme = opts.theme || "ace/theme/textmate";
    
    var data = "";
    var nodes = [];

    if (el.firstElementChild) {
        var textLen = 0;
        for (var i = 0; i < el.childNodes.length; i++) {
            var ch = el.childNodes[i];
            if (ch.nodeType == 3) {
                textLen += ch.data.length;
                data += ch.data;
            } else {
                nodes.push(textLen, ch);
            }
        }
    } else {
        data = dom.getInnerText(el);
    }
    
    exports.render(data, mode, theme, 1, true, function (highlighted) {
        dom.importCssString(highlighted.css, "ace_highlight");
        el.innerHTML = highlighted.html;
        var container = el.firstChild.firstChild
        for (var i = 0; i < nodes.length; i += 2) {
            var pos = highlighted.session.doc.indexToPosition(nodes[i])
            var node = nodes[i + 1];
            var lineEl = container.children[pos.row];
            lineEl && lineEl.appendChild(nodes[i+1]);
        }
        callback && callback();
    });
};
});
=======
        html: html,
        session: session
    };
};

module.exports = highlight;
module.exports.highlight =highlight;
});
                (function() {
                    window.require(["ace/ext/static_highlight"], function() {});
                })();
            
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
