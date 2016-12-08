var $ = require('jquery');

function CalculationDesignerComponent(html) {

    this.$html = html;

};

CalculationDesignerComponent.prototype.init = function () {

    var component = this;

    component.initToolbar();
    component.initEditor();

    component.$html.on('keyup', '.js-calc-input', function(e) {
        var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8, 13];

        if (!($.inArray(e.which, key_codes) >= 0)) {
            e.preventDefault();
        }

        if (e.keyCode == 13) {
            console.log('enter');
            component.savePart(this);
        }
    });

    component.$html.on('click', '.js-calculation-toolbar .js-calc', function(e) {
        component.addToEditor(e, this);
    });

    component.$html.on('click', '.js-calc-input-save', function(e) {
        component.savePart($(this).closest('.js-calc').find('.js-calc-input'));
    });

    component.$html.on('click', '.js-calc-input-remove', function(e) {
        component.removePart(this);
    });

    component.$html.on('click', '.js-calculation-editor .js-calc:not(.is-editing)', function(e) {
        component.toggleEditPart(e, this);
    });
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
        receive: function(e, ui) {
            component.activatePart(ui.helper);
        },
        start: function(e, ui) {
            ui.placeholder.width(ui.item.width());

        }
    });
};

CalculationDesignerComponent.prototype.activatePart = function(part) {
    console.log('activate part');
    console.log(part);

    var $part = $(part),
        currentValue = $part.find('.js-calc-value').html(),
        input = '',
        inputActions = 'is-editing',
        actionSave = '<button class="calc-input-save js-calc-input-save"><i class="icon icon-ok-sign"></i></button>',
        actionRemove = '<button class="calc-input-remove js-calc-input-remove"><i class="icon icon-trash"></i></button>',
        value = '';

    if (currentValue != undefined) {
        value = $part.find('.js-calc-value').html();
    }

    if ($part.hasClass('js-calc-num')) {
        input = '<input type="text" class="calc-input js-calc-input" value="' + value + '" />' + actionSave + actionRemove;
    }
    else if ($part.hasClass('js-calc-var')) {
        input = '<select></select>' + actionSave + actionRemove;
    } else {
        input = $part.html().trim() + actionRemove,
        inputActions += ' js-calc-fade-actions';
    }

    $part
        .html('<span class="js-calc-label">' + input + '</span>')
        .addClass(inputActions)
        .removeClass('ui-draggable ui-draggable-handle')
        .removeAttr('style')
        .uniqueId();

    $part.find('.js-calc-input').focus();

    if ($part.hasClass('js-calc-fade-actions')) {
         setTimeout(function () {
            $part.removeClass('is-editing');
        }, 1000);
    }
}

CalculationDesignerComponent.prototype.addToEditor = function(e, input) {
    console.log('addToEditor');

    e.preventDefault();

    var component = this,
        $editor = component.$html.find('.js-calculation-editor'),
        $clone = $(input).clone(false);

    component.hidePlaceholder();

    $editor
        .delay(100)
        .append($clone)
        .sortable('refresh');

    component.activatePart($clone);
}

CalculationDesignerComponent.prototype.hidePlaceholder = function() {
    console.log('hidePlaceholder');

    var component = this,
        $placeholder = component.$html.find('.js-calc-placeholder');

    $placeholder.addClass('hide');
}

CalculationDesignerComponent.prototype.savePart = function (input) {
    console.log('savePart');
    console.log(input);

    var $input = $(input),
        value = $input.val(),
        $calcLabel = $input.closest('.js-calc');

    $calcLabel
        .html('<span class="js-calc-value">' + value + '</span>')
        .removeClass('is-editing');
}

CalculationDesignerComponent.prototype.removePart = function (input) {
    console.log('removePart');

    var $calcLabel = $(input).closest('.js-calc');

    $calcLabel.remove();
}

CalculationDesignerComponent.prototype.toggleEditPart = function (e, part) {
    console.log('editPart');

    e.preventDefault();

    var component = this,
        $part = $(part);

    if (!$part.hasClass('is-editing')) {
        $part.addClass('is-editing');

        if ($part.hasClass('js-calc-num')) {
            component.activatePart($('#' + part.id));
        }
    }
    else {
        if (!$part.hasClass('js-calc-num')) {
            $part.removeClass('is-editing');
        }
    }
}

module.exports = CalculationDesignerComponent;
