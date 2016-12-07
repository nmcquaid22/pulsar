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
            component.saveInput(this);
        }
    });

    component.$html.on('click', '.js-calc-input-save', function(e) {
        component.saveInput($(this).closest('.js-calc').find('.js-calc-input'));
    });

    component.$html.on('click', '.js-calc-input-remove', function(e) {
        component.removeInput(this);
    });
};

CalculationDesignerComponent.prototype.initToolbar = function () {

    var component = this,
        $toolbarItems = component.$html.find('.js-calculation-toolbar .label');

    $toolbarItems.draggable({
        connectToSortable: ".js-calculation-editor",
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
        helper: "clone",
        items: '.js-calc',
        placeholder: "calc-sorting",
        receive: function(e, ui) {
            component.activatePart(ui);
        }
    });
};

CalculationDesignerComponent.prototype.activatePart = function(ui) {
console.log('activate part');
console.log(ui.item);

    var $helper = $(ui.helper),
        input = '',
        inputActions = 'is-editing',
        actionSave = '<button class="btn btn--naked calc-input-save js-calc-input-save"><i class="icon icon-ok-sign"></i></button>',
        actionRemove = '<button class="btn btn--naked calc-input-remove js-calc-input-remove"><i class="icon icon-trash"></i></button>';

    if ($helper.hasClass('js-calc-num')) {
        input = 'number: <input type="text" class="calc-input js-calc-input" />' + actionSave + actionRemove;
    }
    else if ($helper.hasClass('js-calc-var')) {
        input = '<select></select>' + actionSave + actionRemove;
    } else {
        input = $(ui.item).html().trim() + actionRemove,
        inputActions += ' js-calc-fade-actions';
    }

    $helper
        .html('<span class="js-calc-label">' + input + '</span>')
        .addClass(inputActions);

    if ($helper.hasClass('js-calc-fade-actions')) {
        $helper
            .find('.js-calc-input-remove')
            .delay(1000)
            .fadeOut(250, function() {
                $(this).css('position', 'absolute');
            });

        $helper.removeClass('is-editing');
    }

}

CalculationDesignerComponent.prototype.addToEditor = function(e) {
console.log('addToEditor');

    var component = this,
        $editor = component.$html.find('.js-calculation-editor'),
        $clone = $(component).clone(false);

        console.log($toolbar);
        console.log($editor);

    e.preventDefault();

    $clone.removeClass('ui-draggable ui-draggable-handle');

    $editor.append($clone);
}

CalculationDesignerComponent.prototype.hidePlaceholder = function() {
console.log('hidePlaceholder');

    var component = this,
        $placeholder = component.$html.find('.js-calc-placeholder');

    $placeholder.fadeOut(100);
}

CalculationDesignerComponent.prototype.saveInput = function (input) {
console.log('saveInput');
console.log(input);

    var $input = $(input),
        value = $input.val(),
        $calcLabel = $input.closest('.js-calc');

    $calcLabel
        .html('<span class="js-calc-value">' + value + '</span>')
        .removeClass('is-editing');
}

CalculationDesignerComponent.prototype.removeInput = function (input) {
console.log('removeInput');

    var $calcLabel = $(input).closest('.js-calc');

    $calcLabel.remove()
}

// clicking a label should add it to the calculation editor
        // $(".js-calculation-toolbar .js-calc").click(function (e) {
        //     e.preventDefault();
        //     console.log('clicky');
        //     var clone = $(this).clone(false);

        //     clone.removeClass('ui-draggable ui-draggable-handle');

        //     $(".js-calculation-designer").append(clone);
        //     $(".js-calculation-designer").sortable('refresh');
        // });

module.exports = CalculationDesignerComponent;
