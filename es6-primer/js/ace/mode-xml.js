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

ace.define('ace/mode/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/tokenizer', 'ace/mode/xml_highlight_rules', 'ace/mode/behaviour/xml', 'ace/mode/folding/xml'], function(require, exports, module) {


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var XmlHighlightRules = require("./xml_highlight_rules").XmlHighlightRules;
var XmlBehaviour = require("./behaviour/xml").XmlBehaviour;
var XmlFoldMode = require("./folding/xml").FoldMode;

var Mode = function() {
    this.HighlightRules = XmlHighlightRules;
    this.$behaviour = new XmlBehaviour();
    this.foldingRules = new XmlFoldMode();
};

oop.inherits(Mode, TextMode);

(function() {
    
    this.blockComment = {start: "<!--", end: "-->"};

}).call(Mode.prototype);

exports.Mode = Mode;
});

ace.define('ace/mode/xml_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/xml_util', 'ace/mode/text_highlight_rules'], function(require, exports, module) {


var oop = require("../lib/oop");
var xmlUtil = require("./xml_util");
=======
define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var XmlHighlightRules = function(normalize) {
    this.$rules = {
        start : [
<<<<<<< HEAD
            {token : "punctuation.string.begin", regex : "<\\!\\[CDATA\\[", next : "cdata"},
            {
                token : ["punctuation.instruction.begin", "keyword.instruction"],
                regex : "(<\\?)(xml)(?=[\\s])", next : "xml_declaration"
            },
            {
                token : ["punctuation.instruction.begin", "keyword.instruction"],
                regex : "(<\\?)([-_a-zA-Z0-9]+)", next : "instruction"
            },
            {token : "comment", regex : "<\\!--", next : "comment"},
            {
                token : ["punctuation.doctype.begin", "meta.tag.doctype"],
                regex : "(<\\!)(DOCTYPE)(?=[\\s])", next : "doctype"
            },
            {include : "tag"},
            {include : "reference"}
        ],

        xml_declaration : [
            {include : "attributes"},
            {include : "instruction"}
        ],

        instruction : [
            {token : "punctuation.instruction.end", regex : "\\?>", next : "start"}
        ],

        doctype : [
            {include : "space"},
            {include : "string"},
            {token : "punctuation.doctype.end", regex : ">", next : "start"},
            {token : "xml-pe", regex : "[-_a-zA-Z0-9:]+"},
            {token : "punctuation.begin", regex : "\\[", push : "declarations"}
        ],

        declarations : [{
            token : "text",
            regex : "\\s+"
        }, {
            token: "punctuation.end",
            regex: "]",
            next: "pop"
        }, {
            token : ["punctuation.begin", "keyword"],
=======
            {token : "string.cdata.xml", regex : "<\\!\\[CDATA\\[", next : "cdata"},
            {
                token : ["punctuation.xml-decl.xml", "keyword.xml-decl.xml"],
                regex : "(<\\?)(xml)(?=[\\s])", next : "xml_decl", caseInsensitive: true
            },
            {
                token : ["punctuation.instruction.xml", "keyword.instruction.xml"],
                regex : "(<\\?)([-_a-zA-Z0-9]+)", next : "processing_instruction",
            },
            {token : "comment.xml", regex : "<\\!--", next : "comment"},
            {
                token : ["xml-pe.doctype.xml", "xml-pe.doctype.xml"],
                regex : "(<\\!)(DOCTYPE)(?=[\\s])", next : "doctype", caseInsensitive: true
            },
            {include : "tag"},
            {token : "text.end-tag-open.xml", regex: "</"},
            {token : "text.tag-open.xml", regex: "<"},
            {include : "reference"},
            {defaultToken : "text.xml"}
        ],

        xml_decl : [{
            token : "entity.other.attribute-name.decl-attribute-name.xml",
            regex : "(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"
        }, {
            token : "keyword.operator.decl-attribute-equals.xml",
            regex : "="
        }, {
            include: "whitespace"
        }, {
            include: "string"
        }, {
            token : "punctuation.xml-decl.xml",
            regex : "\\?>",
            next : "start"
        }],

        processing_instruction : [
            {token : "punctuation.instruction.xml", regex : "\\?>", next : "start"},
            {defaultToken : "instruction.xml"}
        ],

        doctype : [
            {include : "whitespace"},
            {include : "string"},
            {token : "xml-pe.doctype.xml", regex : ">", next : "start"},
            {token : "xml-pe.xml", regex : "[-_a-zA-Z0-9:]+"},
            {token : "punctuation.int-subset", regex : "\\[", push : "int_subset"}
        ],

        int_subset : [{
            token : "text.xml",
            regex : "\\s+"
        }, {
            token: "punctuation.int-subset.xml",
            regex: "]",
            next: "pop"
        }, {
            token : ["punctuation.markup-decl.xml", "keyword.markup-decl.xml"],
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            regex : "(<\\!)([-_a-zA-Z0-9]+)",
            push : [{
                token : "text",
                regex : "\\s+"
            },
            {
<<<<<<< HEAD
                token : "punctuation.end",
=======
                token : "punctuation.markup-decl.xml",
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
                regex : ">",
                next : "pop"
            },
            {include : "string"}]
        }],

        cdata : [
<<<<<<< HEAD
            {token : "string.end", regex : "\\]\\]>", next : "start"},
            {token : "text", regex : "\\s+"},
            {token : "text", regex : "(?:[^\\]]|\\](?!\\]>))+"}
        ],

        comment : [
            {token : "comment", regex : "-->", next : "start"},
            {defaultToken : "comment"}
        ],

        tag : [{
            token : ["meta.tag.punctuation.begin", "meta.tag.name"],
            regex : "(<)((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",
            next: [
                {include : "attributes"},
                {token : "meta.tag.punctuation.end", regex : "/?>", next : "start"}
            ]
        }, {
            token : ["meta.tag.punctuation.begin", "meta.tag.name"],
            regex : "(</)((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",
            next: [
                {include : "space"},
                {token : "meta.tag.punctuation.end", regex : ">", next : "start"}
            ]
        }],

        space : [
            {token : "text", regex : "\\s+"}
        ],

        reference : [{
            token : "constant.language.escape",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }, {
            token : "invalid.illegal", regex : "&"
        }],

        string: [{
            token : "string",
            regex : "'",
            push : "qstring_inner"
        }, {
            token : "string",
            regex : '"',
            push : "qqstring_inner"
        }],

        qstring_inner: [
            {token : "string", regex: "'", next: "pop"},
            {include : "reference"},
            {defaultToken : "string"}
        ],

        qqstring_inner: [
            {token : "string", regex: '"', next: "pop"},
            {include : "reference"},
            {defaultToken : "string"}
        ],

        attributes: [{
            token : "entity.other.attribute-name",
            regex : "(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"
        }, {
            token : "keyword.operator.separator",
            regex : "="
        }, {
            include : "space"
        }, {
            include : "string"
=======
            {token : "string.cdata.xml", regex : "\\]\\]>", next : "start"},
            {token : "text.xml", regex : "\\s+"},
            {token : "text.xml", regex : "(?:[^\\]]|\\](?!\\]>))+"}
        ],

        comment : [
            {token : "comment.xml", regex : "-->", next : "start"},
            {defaultToken : "comment.xml"}
        ],

        reference : [{
            token : "constant.language.escape.reference.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }],

        attr_reference : [{
            token : "constant.language.escape.reference.attribute-value.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }],

        tag : [{
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag.punctuation.end-tag-open.xml", "meta.tag.tag-name.xml"],
            regex : "(?:(<)|(</))((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",
            next: [
                {include : "attributes"},
                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
            ]
        }],

        tag_whitespace : [
            {token : "text.tag-whitespace.xml", regex : "\\s+"}
        ],
        whitespace : [
            {token : "text.whitespace.xml", regex : "\\s+"}
        ],
        string: [{
            token : "string.xml",
            regex : "'",
            push : [
                {token : "string.xml", regex: "'", next: "pop"},
                {defaultToken : "string.xml"}
            ]
        }, {
            token : "string.xml",
            regex : '"',
            push : [
                {token : "string.xml", regex: '"', next: "pop"},
                {defaultToken : "string.xml"}
            ]
        }],

        attributes: [{
            token : "entity.other.attribute-name.xml",
            regex : "(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"
        }, {
            token : "keyword.operator.attribute-equals.xml",
            regex : "="
        }, {
            include: "tag_whitespace"
        }, {
            include: "attribute_value"
        }],

        attribute_value: [{
            token : "string.attribute-value.xml",
            regex : "'",
            push : [
                {token : "string.attribute-value.xml", regex: "'", next: "pop"},
                {include : "attr_reference"},
                {defaultToken : "string.attribute-value.xml"}
            ]
        }, {
            token : "string.attribute-value.xml",
            regex : '"',
            push : [
                {token : "string.attribute-value.xml", regex: '"', next: "pop"},
                {include : "attr_reference"},
                {defaultToken : "string.attribute-value.xml"}
            ]
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
        }]
    };

    if (this.constructor === XmlHighlightRules)
        this.normalizeRules();
};


(function() {

    this.embedTagRules = function(HighlightRules, prefix, tag){
        this.$rules.tag.unshift({
<<<<<<< HEAD
            token : ["meta.tag.punctuation.begin", "meta.tag.name." + tag],
            regex : "(<)(" + tag + ")",
            next: [
                {include : "space"},
                {include : "attributes"},
                {token : "meta.tag.punctuation.end", regex : "/?>", next : prefix + "start"}
=======
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(<)(" + tag + "(?=\\s|>|$))",
            next: [
                {include : "attributes"},
                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : prefix + "start"}
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            ]
        });

        this.$rules[tag + "-end"] = [
<<<<<<< HEAD
            {include : "space"},
            {token : "meta.tag.punctuation.end", regex : ">",  next: "start",
=======
            {include : "attributes"},
            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>",  next: "start",
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
                onMatch : function(value, currentState, stack) {
                    stack.splice(0);
                    return this.token;
            }}
        ]

        this.embedRules(HighlightRules, prefix, [{
<<<<<<< HEAD
            token: ["meta.tag.punctuation.begin", "meta.tag.name." + tag],
            regex : "(</)(" + tag + ")",
            next: tag + "-end"
        }, {
            token: "string.begin",
            regex : "<\\!\\[CDATA\\["
        }, {
            token: "string.end",
=======
            token: ["meta.tag.punctuation.end-tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(</)(" + tag + "(?=\\s|>|$))",
            next: tag + "-end"
        }, {
            token: "string.cdata.xml",
            regex : "<\\!\\[CDATA\\["
        }, {
            token: "string.cdata.xml",
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            regex : "\\]\\]>"
        }]);
    };

}).call(TextHighlightRules.prototype);

oop.inherits(XmlHighlightRules, TextHighlightRules);

exports.XmlHighlightRules = XmlHighlightRules;
});

<<<<<<< HEAD
ace.define('ace/mode/xml_util', ['require', 'exports', 'module' ], function(require, exports, module) {


function string(state) {
    return [{
        token : "string",
        regex : '"',
        next : state + "_qqstring"
    }, {
        token : "string",
        regex : "'",
        next : state + "_qstring"
    }];
}

function multiLineString(quote, state) {
    return [
        {token : "string", regex : quote, next : state},
        {
            token : "constant.language.escape",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)" 
        },
        {defaultToken : "string"}
    ];
}

exports.tag = function(states, name, nextState, tagMap) {
    states[name] = [{
        token : "text",
        regex : "\\s+"
    }, {
        
    token : !tagMap ? "meta.tag.tag-name" : function(value) {
            if (tagMap[value])
                return "meta.tag.tag-name." + tagMap[value];
            else
                return "meta.tag.tag-name";
        },
        regex : "[-_a-zA-Z0-9:]+",
        next : name + "_embed_attribute_list" 
    }, {
        token: "empty",
        regex: "",
        next : name + "_embed_attribute_list"
    }];

    states[name + "_qstring"] = multiLineString("'", name + "_embed_attribute_list");
    states[name + "_qqstring"] = multiLineString("\"", name + "_embed_attribute_list");
    
    states[name + "_embed_attribute_list"] = [{
        token : "meta.tag.r",
        regex : "/?>",
        next : nextState
    }, {
        token : "keyword.operator",
        regex : "="
    }, {
        token : "entity.other.attribute-name",
        regex : "[-_a-zA-Z0-9:]+"
    }, {
        token : "constant.numeric", // float
        regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
    }, {
        token : "text",
        regex : "\\s+"
    }].concat(string(name));
};

});

ace.define('ace/mode/behaviour/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/mode/behaviour/cstyle', 'ace/token_iterator'], function(require, exports, module) {


var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var CstyleBehaviour = require("./cstyle").CstyleBehaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;

function hasType(token, type) {
    var tokenTypes = token.type.split('.');
    return type.split('.').every(function(type){
        return (tokenTypes.indexOf(type) !== -1);
    });
    return hasType;
}

var XmlBehaviour = function () {
    
    this.inherit(CstyleBehaviour, ["string_dquotes"]); // Get string behaviour
    
    this.add("autoclosing", "insertion", function (state, action, editor, session, text) {
        if (text == '>') {
            var position = editor.getCursorPosition();
            var iterator = new TokenIterator(session, position.row, position.column);
            var token = iterator.getCurrentToken();

            if (token && hasType(token, 'string') && iterator.getCurrentTokenColumn() + token.value.length > position.column)
                return;
            var atCursor = false;
            if (!token || !hasType(token, 'meta.tag') && !(hasType(token, 'text') && token.value.match('/'))){
                do {
                    token = iterator.stepBackward();
                } while (token && (hasType(token, 'string') || hasType(token, 'keyword.operator') || hasType(token, 'entity.attribute-name') || hasType(token, 'text')));
            } else {
                atCursor = true;
            }
            if (!token || !hasType(token, 'meta.tag.name') || iterator.stepBackward().value.match('/')) {
                return;
            }
            var tag = token.value;
            if (atCursor){
                var tag = tag.substring(0, position.column - token.start);
            }

            return {
               text: '>' + '</' + tag + '>',
               selection: [1, 1]
            }
        }
    });

    this.add('autoindent', 'insertion', function (state, action, editor, session, text) {
        if (text == "\n") {
            var cursor = editor.getCursorPosition();
            var line = session.getLine(cursor.row);
            var rightChars = line.substring(cursor.column, cursor.column + 2);
            if (rightChars == '</') {
                var next_indent = this.$getIndent(line);
                var indent = next_indent + session.getTabString();

                return {
                    text: '\n' + indent + '\n' + next_indent,
                    selection: [1, indent.length, 1, indent.length]
                }
            }
        }
    });
    
}
oop.inherits(XmlBehaviour, Behaviour);

exports.XmlBehaviour = XmlBehaviour;
});

ace.define('ace/mode/behaviour/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/token_iterator', 'ace/lib/lang'], function(require, exports, module) {


var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

var SAFE_INSERT_IN_TOKENS =
    ["text", "paren.rparen", "punctuation.operator"];
var SAFE_INSERT_BEFORE_TOKENS =
    ["text", "paren.rparen", "punctuation.operator", "comment"];


var autoInsertedBrackets = 0;
var autoInsertedRow = -1;
var autoInsertedLineEnd = "";
var maybeInsertedBrackets = 0;
var maybeInsertedRow = -1;
var maybeInsertedLineStart = "";
var maybeInsertedLineEnd = "";

var CstyleBehaviour = function () {
    
    CstyleBehaviour.isSaneInsertion = function(editor, session) {
        var cursor = editor.getCursorPosition();
        var iterator = new TokenIterator(session, cursor.row, cursor.column);
        if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) {
            var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
            if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
                return false;
        }
        iterator.stepForward();
        return iterator.getCurrentTokenRow() !== cursor.row ||
            this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
    };
    
    CstyleBehaviour.$matchTokenType = function(token, types) {
        return types.indexOf(token.type || token) > -1;
    };
    
    CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) {
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (!this.isAutoInsertedClosing(cursor, line, autoInsertedLineEnd[0]))
            autoInsertedBrackets = 0;
        autoInsertedRow = cursor.row;
        autoInsertedLineEnd = bracket + line.substr(cursor.column);
        autoInsertedBrackets++;
    };
    
    CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) {
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (!this.isMaybeInsertedClosing(cursor, line))
            maybeInsertedBrackets = 0;
        maybeInsertedRow = cursor.row;
        maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
        maybeInsertedLineEnd = line.substr(cursor.column);
        maybeInsertedBrackets++;
    };
    
    CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) {
        return autoInsertedBrackets > 0 &&
            cursor.row === autoInsertedRow &&
            bracket === autoInsertedLineEnd[0] &&
            line.substr(cursor.column) === autoInsertedLineEnd;
    };
    
    CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) {
        return maybeInsertedBrackets > 0 &&
            cursor.row === maybeInsertedRow &&
            line.substr(cursor.column) === maybeInsertedLineEnd &&
            line.substr(0, cursor.column) == maybeInsertedLineStart;
    };
    
    CstyleBehaviour.popAutoInsertedClosing = function() {
        autoInsertedLineEnd = autoInsertedLineEnd.substr(1);
        autoInsertedBrackets--;
    };
    
    CstyleBehaviour.clearMaybeInsertedClosing = function() {
        maybeInsertedBrackets = 0;
        maybeInsertedRow = -1;
    };

    this.add("braces", "insertion", function (state, action, editor, session, text) {
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (text == '{') {
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "{" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '{' + selected + '}',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                if (/[\]\}\)]/.test(line[cursor.column])) {
                    CstyleBehaviour.recordAutoInsert(editor, session, "}");
                    return {
                        text: '{}',
                        selection: [1, 1]
                    };
                } else {
                    CstyleBehaviour.recordMaybeInsert(editor, session, "{");
                    return {
                        text: '{',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == '}') {
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '}') {
                var matching = session.$findOpeningBracket('}', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == "\n" || text == "\r\n") {
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) {
                closing = lang.stringRepeat("}", maybeInsertedBrackets);
                CstyleBehaviour.clearMaybeInsertedClosing();
            }
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '}' || closing !== "") {
                var openBracePos = session.findMatchingBracket({row: cursor.row, column: cursor.column}, '}');
                if (!openBracePos)
                     return null;

                var indent = this.getNextLineIndent(state, line.substring(0, cursor.column), session.getTabString());
                var next_indent = this.$getIndent(line);

                return {
                    text: '\n' + indent + '\n' + next_indent + closing,
                    selection: [1, indent.length, 1, indent.length]
                };
            }
        }
    });

    this.add("braces", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '{') {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.end.column, range.end.column + 1);
            if (rightChar == '}') {
                range.end.column++;
                return range;
            } else {
                maybeInsertedBrackets--;
            }
        }
    });

    this.add("parens", "insertion", function (state, action, editor, session, text) {
        if (text == '(') {
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '(' + selected + ')',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, ")");
                return {
                    text: '()',
                    selection: [1, 1]
                };
            }
        } else if (text == ')') {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ')') {
                var matching = session.$findOpeningBracket(')', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("parens", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '(') {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ')') {
=======
define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

function is(token, type) {
    return token.type.lastIndexOf(type + ".xml") > -1;
}

var XmlBehaviour = function () {

    this.add("string_dquotes", "insertion", function (state, action, editor, session, text) {
        if (text == '"' || text == "'") {
            var quote = text;
            var selected = session.doc.getTextRange(editor.getSelectionRange());
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) {
                return {
                    text: quote + selected + quote,
                    selection: false
                };
            }

            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();

            if (rightChar == quote && (is(token, "attribute-value") || is(token, "string"))) {
                return {
                    text: "",
                    selection: [1, 1]
                };
            }

            if (!token)
                token = iterator.stepBackward();

            if (!token)
                return;

            while (is(token, "tag-whitespace") || is(token, "whitespace")) {
                token = iterator.stepBackward();
            }
            var rightSpace = !rightChar || rightChar.match(/\s/);
            if (is(token, "attribute-equals") && (rightSpace || rightChar == '>') || (is(token, "decl-attribute-equals") && (rightSpace || rightChar == '?'))) {
                return {
                    text: quote + quote,
                    selection: [1, 1]
                };
            }
        }
    });

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) {
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
                range.end.column++;
                return range;
            }
        }
    });

<<<<<<< HEAD
    this.add("brackets", "insertion", function (state, action, editor, session, text) {
        if (text == '[') {
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '[' + selected + ']',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, "]");
                return {
                    text: '[]',
                    selection: [1, 1]
                };
            }
        } else if (text == ']') {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ']') {
                var matching = session.$findOpeningBracket(']', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("brackets", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '[') {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ']') {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("string_dquotes", "insertion", function (state, action, editor, session, text) {
        if (text == '"' || text == "'") {
            var quote = text;
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) {
                return {
                    text: quote + selected + quote,
                    selection: false
                };
            } else {
                var cursor = editor.getCursorPosition();
                var line = session.doc.getLine(cursor.row);
                var leftChar = line.substring(cursor.column-1, cursor.column);
                if (leftChar == '\\') {
                    return null;
                }
                var tokens = session.getTokens(selection.start.row);
                var col = 0, token;
                var quotepos = -1; // Track whether we're inside an open quote.

                for (var x = 0; x < tokens.length; x++) {
                    token = tokens[x];
                    if (token.type == "string") {
                      quotepos = -1;
                    } else if (quotepos < 0) {
                      quotepos = token.value.indexOf(quote);
                    }
                    if ((token.value.length + col) > selection.start.column) {
                        break;
                    }
                    col += tokens[x].value.length;
                }
                if (!token || (quotepos < 0 && token.type !== "comment" && (token.type !== "string" || ((selection.start.column !== token.value.length+col-1) && token.value.lastIndexOf(quote) === token.value.length-1)))) {
                    if (!CstyleBehaviour.isSaneInsertion(editor, session))
                        return;
                    return {
                        text: quote + quote,
                        selection: [1,1]
                    };
                } else if (token && token.type === "string") {
                    var rightChar = line.substring(cursor.column, cursor.column + 1);
                    if (rightChar == quote) {
                        return {
                            text: '',
                            selection: [1, 1]
=======
    this.add("autoclosing", "insertion", function (state, action, editor, session, text) {
        if (text == '>') {
            var position = editor.getCursorPosition();
            var iterator = new TokenIterator(session, position.row, position.column);
            var token = iterator.getCurrentToken() || iterator.stepBackward();
            if (!token || !(is(token, "tag-name") || is(token, "tag-whitespace") || is(token, "attribute-name") || is(token, "attribute-equals") || is(token, "attribute-value")))
                return;
            if (is(token, "reference.attribute-value"))
                return;
            if (is(token, "attribute-value")) {
                var firstChar = token.value.charAt(0);
                if (firstChar == '"' || firstChar == "'") {
                    var lastChar = token.value.charAt(token.value.length - 1);
                    var tokenEnd = iterator.getCurrentTokenColumn() + token.value.length;
                    if (tokenEnd > position.column || tokenEnd == position.column && firstChar != lastChar)
                        return;
                }
            }
            while (!is(token, "tag-name")) {
                token = iterator.stepBackward();
            }

            var tokenRow = iterator.getCurrentTokenRow();
            var tokenColumn = iterator.getCurrentTokenColumn();
            if (is(iterator.stepBackward(), "end-tag-open"))
                return;

            var element = token.value;
            if (tokenRow == position.row)
                element = element.substring(0, position.column - tokenColumn);

            if (this.voidElements.hasOwnProperty(element.toLowerCase()))
                 return;

            return {
               text: ">" + "</" + element + ">",
               selection: [1, 1]
            };
        }
    });

    this.add("autoindent", "insertion", function (state, action, editor, session, text) {
        if (text == "\n") {
            var cursor = editor.getCursorPosition();
            var line = session.getLine(cursor.row);
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();

            if (token && token.type.indexOf("tag-close") !== -1) {
                while (token && token.type.indexOf("tag-name") === -1) {
                    token = iterator.stepBackward();
                }

                if (!token) {
                    return;
                }

                var tag = token.value;
                var row = iterator.getCurrentTokenRow();
                token = iterator.stepBackward();
                if (!token || token.type.indexOf("end-tag") !== -1) {
                    return;
                }

                if (this.voidElements && !this.voidElements[tag]) {
                    var nextToken = session.getTokenAt(cursor.row, cursor.column+1);
                    var line = session.getLine(row);
                    var nextIndent = this.$getIndent(line);
                    var indent = nextIndent + session.getTabString();

                    if (nextToken && nextToken.value === "</") {
                        return {
                            text: "\n" + indent + "\n" + nextIndent,
                            selection: [1, indent.length, 1, indent.length]
                        };
                    } else {
                        return {
                            text: "\n" + indent
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
                        };
                    }
                }
            }
        }
    });

<<<<<<< HEAD
    this.add("string_dquotes", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) {
                range.end.column++;
                return range;
            }
        }
    });

};

oop.inherits(CstyleBehaviour, Behaviour);

exports.CstyleBehaviour = CstyleBehaviour;
});

ace.define('ace/mode/folding/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/range', 'ace/mode/folding/fold_mode', 'ace/token_iterator'], function(require, exports, module) {

=======
};

oop.inherits(XmlBehaviour, Behaviour);

exports.XmlBehaviour = XmlBehaviour;
});

define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"], function(require, exports, module) {
"use strict";
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b

var oop = require("../../lib/oop");
var lang = require("../../lib/lang");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;
var TokenIterator = require("../../token_iterator").TokenIterator;

<<<<<<< HEAD
var FoldMode = exports.FoldMode = function(voidElements) {
    BaseFoldMode.call(this);
    this.voidElements = voidElements || {};
};
oop.inherits(FoldMode, BaseFoldMode);

=======
var FoldMode = exports.FoldMode = function(voidElements, optionalEndTags) {
    BaseFoldMode.call(this);
    this.voidElements = voidElements || {};
    this.optionalEndTags = oop.mixin({}, this.voidElements);
    if (optionalEndTags)
        oop.mixin(this.optionalEndTags, optionalEndTags);
    
};
oop.inherits(FoldMode, BaseFoldMode);

var Tag = function() {
    this.tagName = "";
    this.closing = false;
    this.selfClosing = false;
    this.start = {row: 0, column: 0};
    this.end = {row: 0, column: 0};
};

function is(token, type) {
    return token.type.lastIndexOf(type + ".xml") > -1;
}

>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
(function() {

    this.getFoldWidget = function(session, foldStyle, row) {
        var tag = this._getFirstTagInLine(session, row);

<<<<<<< HEAD
        if (tag.closing)
            return foldStyle == "markbeginend" ? "end" : "";

        if (!tag.tagName || this.voidElements[tag.tagName.toLowerCase()])
            return "";

        if (tag.selfClosing)
            return "";

        if (tag.value.indexOf("/" + tag.tagName) !== -1)
=======
        if (!tag)
            return "";

        if (tag.closing || (!tag.tagName && tag.selfClosing))
            return foldStyle == "markbeginend" ? "end" : "";

        if (!tag.tagName || tag.selfClosing || this.voidElements.hasOwnProperty(tag.tagName.toLowerCase()))
            return "";

        if (this._findEndTagInLine(session, row, tag.tagName, tag.end.column))
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            return "";

        return "start";
    };
<<<<<<< HEAD
    
    this._getFirstTagInLine = function(session, row) {
        var tokens = session.getTokens(row);
        var value = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (token.type.lastIndexOf("meta.tag", 0) === 0)
                value += token.value;
            else
                value += lang.stringRepeat(" ", token.value.length);
        }
        
        return this._parseTag(value);
    };

    this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/;
    this._parseTag = function(tag) {
        
        var match = tag.match(this.tagRe);
        var column = 0;

        return {
            value: tag,
            match: match ? match[2] : "",
            closing: match ? !!match[3] : false,
            selfClosing: match ? !!match[5] || match[2] == "/>" : false,
            tagName: match ? match[4] : "",
            column: match[1] ? column + match[1].length : column
        };
=======
    this._getFirstTagInLine = function(session, row) {
        var tokens = session.getTokens(row);
        var tag = new Tag();

        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (is(token, "tag-open")) {
                tag.end.column = tag.start.column + token.value.length;
                tag.closing = is(token, "end-tag-open");
                token = tokens[++i];
                if (!token)
                    return null;
                tag.tagName = token.value;
                tag.end.column += token.value.length;
                for (i++; i < tokens.length; i++) {
                    token = tokens[i];
                    tag.end.column += token.value.length;
                    if (is(token, "tag-close")) {
                        tag.selfClosing = token.value == '/>';
                        break;
                    }
                }
                return tag;
            } else if (is(token, "tag-close")) {
                tag.selfClosing = token.value == '/>';
                return tag;
            }
            tag.start.column += token.value.length;
        }

        return null;
    };

    this._findEndTagInLine = function(session, row, tagName, startColumn) {
        var tokens = session.getTokens(row);
        var column = 0;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            column += token.value.length;
            if (column < startColumn)
                continue;
            if (is(token, "end-tag-open")) {
                token = tokens[i + 1];
                if (token && token.value == tagName)
                    return true;
            }
        }
        return false;
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
    };
    this._readTagForward = function(iterator) {
        var token = iterator.getCurrentToken();
        if (!token)
            return null;
<<<<<<< HEAD
            
        var value = "";
        var start;
        
        do {
            if (token.type.lastIndexOf("meta.tag", 0) === 0) {
                if (!start) {
                    var start = {
                        row: iterator.getCurrentTokenRow(),
                        column: iterator.getCurrentTokenColumn()
                    };
                }
                value += token.value;
                if (value.indexOf(">") !== -1) {
                    var tag = this._parseTag(value);
                    tag.start = start;
                    tag.end = {
                        row: iterator.getCurrentTokenRow(),
                        column: iterator.getCurrentTokenColumn() + token.value.length
                    };
                    iterator.stepForward();
                    return tag;
                }
            }
        } while(token = iterator.stepForward());
        
=======

        var tag = new Tag();
        do {
            if (is(token, "tag-open")) {
                tag.closing = is(token, "end-tag-open");
                tag.start.row = iterator.getCurrentTokenRow();
                tag.start.column = iterator.getCurrentTokenColumn();
            } else if (is(token, "tag-name")) {
                tag.tagName = token.value;
            } else if (is(token, "tag-close")) {
                tag.selfClosing = token.value == "/>";
                tag.end.row = iterator.getCurrentTokenRow();
                tag.end.column = iterator.getCurrentTokenColumn() + token.value.length;
                iterator.stepForward();
                return tag;
            }
        } while(token = iterator.stepForward());

>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
        return null;
    };
    
    this._readTagBackward = function(iterator) {
        var token = iterator.getCurrentToken();
        if (!token)
            return null;
<<<<<<< HEAD
            
        var value = "";
        var end;

        do {
            if (token.type.lastIndexOf("meta.tag", 0) === 0) {
                if (!end) {
                    end = {
                        row: iterator.getCurrentTokenRow(),
                        column: iterator.getCurrentTokenColumn() + token.value.length
                    };
                }
                value = token.value + value;
                if (value.indexOf("<") !== -1) {
                    var tag = this._parseTag(value);
                    tag.end = end;
                    tag.start = {
                        row: iterator.getCurrentTokenRow(),
                        column: iterator.getCurrentTokenColumn()
                    };
                    iterator.stepBackward();
                    return tag;
                }
            }
        } while(token = iterator.stepBackward());
        
=======

        var tag = new Tag();
        do {
            if (is(token, "tag-open")) {
                tag.closing = is(token, "end-tag-open");
                tag.start.row = iterator.getCurrentTokenRow();
                tag.start.column = iterator.getCurrentTokenColumn();
                iterator.stepBackward();
                return tag;
            } else if (is(token, "tag-name")) {
                tag.tagName = token.value;
            } else if (is(token, "tag-close")) {
                tag.selfClosing = token.value == "/>";
                tag.end.row = iterator.getCurrentTokenRow();
                tag.end.column = iterator.getCurrentTokenColumn() + token.value.length;
            }
        } while(token = iterator.stepBackward());

>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
        return null;
    };
    
    this._pop = function(stack, tag) {
        while (stack.length) {
            
            var top = stack[stack.length-1];
            if (!tag || top.tagName == tag.tagName) {
                return stack.pop();
            }
<<<<<<< HEAD
            else if (this.voidElements[tag.tagName]) {
                return;
            }
            else if (this.voidElements[top.tagName]) {
=======
            else if (this.optionalEndTags.hasOwnProperty(tag.tagName)) {
                return;
            }
            else if (this.optionalEndTags.hasOwnProperty(top.tagName)) {
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
                stack.pop();
                continue;
            } else {
                return null;
            }
        }
    };
    
    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var firstTag = this._getFirstTagInLine(session, row);
        
<<<<<<< HEAD
        if (!firstTag.match)
=======
        if (!firstTag)
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            return null;
        
        var isBackward = firstTag.closing || firstTag.selfClosing;
        var stack = [];
        var tag;
        
        if (!isBackward) {
<<<<<<< HEAD
            var iterator = new TokenIterator(session, row, firstTag.column);
            var start = {
                row: row,
                column: firstTag.column + firstTag.tagName.length + 2
=======
            var iterator = new TokenIterator(session, row, firstTag.start.column);
            var start = {
                row: row,
                column: firstTag.start.column + firstTag.tagName.length + 2
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            };
            while (tag = this._readTagForward(iterator)) {
                if (tag.selfClosing) {
                    if (!stack.length) {
                        tag.start.column += tag.tagName.length + 2;
                        tag.end.column -= 2;
                        return Range.fromPoints(tag.start, tag.end);
                    } else
                        continue;
                }
                
                if (tag.closing) {
                    this._pop(stack, tag);
                    if (stack.length == 0)
                        return Range.fromPoints(start, tag.start);
                }
                else {
<<<<<<< HEAD
                    stack.push(tag)
=======
                    stack.push(tag);
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
                }
            }
        }
        else {
<<<<<<< HEAD
            var iterator = new TokenIterator(session, row, firstTag.column + firstTag.match.length);
            var end = {
                row: row,
                column: firstTag.column
=======
            var iterator = new TokenIterator(session, row, firstTag.end.column);
            var end = {
                row: row,
                column: firstTag.start.column
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
            };
            
            while (tag = this._readTagBackward(iterator)) {
                if (tag.selfClosing) {
                    if (!stack.length) {
                        tag.start.column += tag.tagName.length + 2;
                        tag.end.column -= 2;
                        return Range.fromPoints(tag.start, tag.end);
                    } else
                        continue;
                }
                
                if (!tag.closing) {
                    this._pop(stack, tag);
                    if (stack.length == 0) {
                        tag.start.column += tag.tagName.length + 2;
                        return Range.fromPoints(tag.start, end);
                    }
                }
                else {
<<<<<<< HEAD
                    stack.push(tag)
=======
                    stack.push(tag);
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
                }
            }
        }
        
    };

}).call(FoldMode.prototype);

});
<<<<<<< HEAD
=======

define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var lang = require("../lib/lang");
var TextMode = require("./text").Mode;
var XmlHighlightRules = require("./xml_highlight_rules").XmlHighlightRules;
var XmlBehaviour = require("./behaviour/xml").XmlBehaviour;
var XmlFoldMode = require("./folding/xml").FoldMode;

var Mode = function() {
    this.HighlightRules = XmlHighlightRules;
    this.$behaviour = new XmlBehaviour();
    this.foldingRules = new XmlFoldMode();
};

oop.inherits(Mode, TextMode);

(function() {

    this.voidElements = lang.arrayToMap([]);

    this.blockComment = {start: "<!--", end: "-->"};

    this.$id = "ace/mode/xml";
}).call(Mode.prototype);

exports.Mode = Mode;
});
>>>>>>> 6fc80b839e98743818ac30d9d8dfb3084bb5b72b
