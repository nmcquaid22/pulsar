var $ = require('jquery');

function CalculationDesignerComponent(html) {
    this.$html = html;
    this.$picker;
};

CalculationDesignerComponent.prototype.init = function () {
    var component = this;

    component.initToolbar();
    component.initEditor();  
    component.initVariablePicker(); 
};

CalculationDesignerComponent.prototype.initToolbar = function () {
    var component = this,
        $toolbarItems = component.$html.find('.js-calculation-toolbar .label');

    $toolbarItems.draggable({
        connectToSortable: ".js-calculation-editor",
        containment: "document",
        helper: "clone",
        opacity: 0.7,
        placeholder: "calc-sorting",
        revert: "invalid",
        start: function(e, ui) {
            component.hidePlaceholder();
        }
    });
};

CalculationDesignerComponent.prototype.initEditor = function() {
    var component = this,
        $editor = component.$html.find('.js-calculation-editor');

    $editor.sortable({
        items: '.js-calc',
        opacity: .5,
        placeholder: "calc-sorting",
        tolerance: "pointer",
        stop: function(e, ui) {
            if ($.trim(ui.item.html()) == 'number') {
                ui.item.html('');
                setTimeout(function() {
                    ui.item[0].focus();
                }, 100);
                ui.item.width('');
            }
            if ($.trim(ui.item.html()) == '[variable]') {
                this.$picker.show();
            }
            else {
                ui.item.html($.trim(ui.item.html()));
            }

            ui.item.on('keydown', function(e) {
                var code = e.keyCode || e.which,
                    cursorPos = component.getCursorPos(ui.item[0]),
                    contents = $.trim($(this).html()),
                    contents = contents.replace(/&nbsp/g, ""),
                    contents = contents.replace(/;/g, ""); 

                if ((code == 37 || code == 8) && cursorPos == 0 && $(this).prev()[0]) {
                    $(this).prev()[0].focus();
                    component.setCursorPos($(this).prev()[0], false);
                }
                else if (code == 39 && cursorPos == $(this).html().length && $(this).next()[0]) {
                    $(this).next()[0].focus();
                    component.setCursorPos($(this).next()[0], true);
                }
            }); 

            ui.item.attr('contenteditable', true);

            $('.js-spacer').remove();
            $('.js-calculation-editor').children().before(component.buildSpacer());
            $('.js-calculation-editor').children().last().after(component.buildSpacer());
        },
        start: function(e, ui) {
            ui.placeholder.width(ui.item.width());
        }
    });

    $('.js-calculation-editor').children().each(function() {
        if ($(this).hasClass('js-spacer')) {
            component.setSpacerListeners(this);
        }
        else {
            component.setSymbolListeners(this);
        }
    });

    if ($editor.children().length == 0) {
        var spacer = component.buildSpacer();
        $(spacer).attr('data-text', 'Start typing or drag in a block');
        $editor.append(spacer);      
    }
};

CalculationDesignerComponent.prototype.initVariablePicker = function() {
    this.$picker = VariablePicker.load(function(selection) {
        console.log(selection);
    });
}

CalculationDesignerComponent.prototype.hidePlaceholder = function() {
    var component = this,
        $placeholder = component.$html.find('.js-calc-placeholder');

    $placeholder.addClass('hide');
}

CalculationDesignerComponent.prototype.buildSpacer = function () {
    var component = this,
        label = document.createElement('span');

    label.className = 'label calculation-label potential-label js-spacer';
    label.setAttribute('contenteditable', true);
    component.setSpacerListeners(label);

    return label;
}

CalculationDesignerComponent.prototype.setSpacerListeners = function(label) {
    var component = this;

    $(label).on('keydown', function(e) {
        var code = e.keyCode || e.which,
            cursorPos = component.getCursorPos(label),
            contents = $.trim($(this).html()),
            contents = contents.replace(/&nbsp/g, ""),
            contents = contents.replace(/;/g, "");

        if ((code == 37 || code == 8) && cursorPos == 0 && $(this).prev()[0]) {
            $(this).prev()[0].focus();
            component.setCursorPos($(this).prev()[0], false);
        }
        else if (code == 39) {
            if (contents != '') {
                component.tokenize('', contents, this);
                $(this).html('');  
            } 
            else if (cursorPos == $(this).html().length && $(this).next()[0]) {
                $(this).next()[0].focus();
                component.setCursorPos($(this).next()[0], true);
            }
        }
    });    

    $(label).on('keyup', function(e) {
        var code = e.keyCode || e.which,
            contents = $.trim($(this).html().substring(0, $(this).html().length - 1)),
            contents = contents.replace(/&nbsp/g, ""),
            contents = contents.replace(/;/g, ""),
            terminator = '';

        switch (code) {
            case 43:
            case 187:
            case 107:
            case 61:
                terminator = '+';
                break;
            case 56:
            case 106:
            case 88:
                terminator = 'x';
                break; 
            case 109:
            case 189:
            case 173:
                terminator = '-';
                break;
            case 111:
            case 191:
                terminator = '/';
                break;
            case 13:
            case 32:
                if (contents != '') {
                    component.tokenize('', contents, this);
                    $(this).html('');  
                }
                break;
            case 48:
                if (e.shiftKey) {
                    terminator = ')';
                }
                break;
            case 57:
                if (e.shiftKey) {
                    terminator = '(';
                }
                break;                
        }

        if ($.trim($(this).html()) == '[') {
            component.$picker.show();
        }
        else {
            if (terminator != '') {
                component.tokenize(terminator, contents, this);
                $(this).html('');        
            }
        }
    }); 
}

CalculationDesignerComponent.prototype.setSymbolListeners = function(label) {
    var component = this;

    $(label).on('keydown', function(e) {
        var code = e.keyCode || e.which,
            cursorPos = component.getCursorPos(label);

        if (code == 37 && cursorPos == 0 && $(this).prev()[0]) {
            $(this).prev()[0].focus();
        }
        else if (code == 39 && cursorPos == $(this).html().length && $(this).next()[0]) {
            $(this).next()[0].focus();
        }
    });

    $(label).on('keyup', function(e) {
        var code = e.keyCode || e.which;

        switch (code) { 
            case 8:
            case 46:
                if ($(this).html() == '') {
                    $(this).prev()[0].focus();
                    $(this).next().remove();
                    $(this).remove();
                }
                break;
        }
    });
}

CalculationDesignerComponent.prototype.tokenize = function (terminator, content, span) {
    var component = this,
        spacerBefore = this.buildSpacer(),
        spacerAfter = this.buildSpacer(),
        operatorLabel = document.createElement('span'),
        label = document.createElement('span');

    if (content.length > 0) {
        label.innerHTML = content;
        label.className = 'label calculation-label calculation-label--num js-calc js-calc-num';
        label.setAttribute('contenteditable', true);
        component.setSymbolListeners(label);

        $(span).before(spacerBefore);
        $(span).before(label);
    }

    if (terminator != '') {
        operatorLabel.className = 'label calculation-label js-calc js-calc-operatorjs-calc-fade-actions';
        if (terminator == ')' || terminator == '(') {
            operatorLabel.className += ' calculation-label--paren'; 
        }
        else {
            operatorLabel.className += ' calculation-label--operator'; 
        }
        operatorLabel.innerHTML = terminator;    
        operatorLabel.setAttribute('contenteditable', true);
        component.setSymbolListeners(operatorLabel);

        $(span).before(spacerAfter);
        $(span).before(operatorLabel);
    }
}

CalculationDesignerComponent.prototype.setCursorPos = function (span, start) {
    var component = this;

    window.setTimeout(function() {
        var sel, range;
        if (window.getSelection && document.createRange) {
            range = document.createRange();
            if (span.childNodes[0]) {
                range.selectNodeContents(span.childNodes[0]);
                range.collapse(start);

                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } 
        else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(span);
            range.collapse(start);
            range.select();
        }
    }, 1);
}

CalculationDesignerComponent.prototype.getCursorPos = function (span) {
    var caretPos = 0, containerEl = null, sel, range;
    if (window.getSelection) {
        sel = window.getSelection(); 

        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            caretPos = range.endOffset;
        }
    } 
    else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();

        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            span.insertBefore(tempEl, span.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}

module.exports = CalculationDesignerComponent;
