<<<<<<< HEAD
ace.define('ace/ext/statusbar', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/lang'], function(require, exports, module) {
=======
define("ace/ext/statusbar",["require","exports","module","ace/lib/dom","ace/lib/lang"], function(require, exports, module) {
"use strict";
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
var dom = require("ace/lib/dom");
var lang = require("ace/lib/lang");

var StatusBar = function(editor, parentNode) {
    this.element = dom.createElement("div");
    this.element.className = "ace_status-indicator";
    this.element.style.cssText = "display: inline-block;";
    parentNode.appendChild(this.element);

    var statusUpdate = lang.delayedCall(function(){
        this.updateStatus(editor)
    }.bind(this));
    editor.on("changeStatus", function() {
        statusUpdate.schedule(100);
    });
    editor.on("changeSelection", function() {
        statusUpdate.schedule(100);
    });
};

(function(){
    this.updateStatus = function(editor) {
        var status = [];
        function add(str, separator) {
            str && status.push(str, separator || "|");
        }

<<<<<<< HEAD
        if (editor.$vimModeHandler)
            add(editor.$vimModeHandler.getStatusText());
        else if (editor.commands.recording)
=======
        add(editor.keyBinding.getStatusText(editor));
        if (editor.commands.recording)
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            add("REC");

        var c = editor.selection.lead;
        add(c.row + ":" + c.column, " ");
        if (!editor.selection.isEmpty()) {
            var r = editor.getSelectionRange();
            add("(" + (r.end.row - r.start.row) + ":"  +(r.end.column - r.start.column) + ")");
        }
        status.pop();
        this.element.textContent = status.join("");
    };
}).call(StatusBar.prototype);

exports.StatusBar = StatusBar;

<<<<<<< HEAD
});
=======
});
                (function() {
                    window.require(["ace/ext/statusbar"], function() {});
                })();
            
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
