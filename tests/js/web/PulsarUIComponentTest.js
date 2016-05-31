'use strict'

var $ = require('jquery'),
    PulsarUIComponent = require('../../../js/PulsarUIComponent');

describe('Pulsar UI Component', function() {

    beforeEach(function() {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$code = $('\
            <a href="#foo" disabled class="is-disabled" aria-disabled="true">\
            <table class="table qa-table"></table>\
            <table class="table--datagrid qa-datagrid"></table>\
            <table class="table datatable qa-datatable"></table>\
            <div class="table-container"><table class="table qa-table-dupe"></table></div>\
').appendTo(this.$html);

        this.$isDisabled = this.$html.find('a[disabled]');
        this.$basicTable = this.$html.find('.qa-table');
        this.$datagridTable = this.$html.find('.qa-datagrid');
        this.$datatableTable = this.$html.find('.qa-datatable');
        this.$tableDupe = this.$html.find('.qa-table-dupe');

        this.pulsarUIComponent = new PulsarUIComponent(this.$html);

    });

    describe('disabled links', function() {

        beforeEach(function() {
            this.pulsarUIComponent.init();
        });

        it('should preventDefault', function() {
            var clickEvent = $.Event('click');
            this.$isDisabled.trigger(clickEvent);
            expect(clickEvent.isDefaultPrevented()).to.be.true;
        });

    });

    describe('init tables', function() {

        beforeEach(function() {
            this.pulsarUIComponent.init();
        });

        it('should wrap basic tables with the container', function() {
            expect(this.$basicTable.parent().hasClass('table-container')).to.be.true;
        });

        it('should wrap datagrid tables with the container', function() {
            expect(this.$datagridTable.parent().hasClass('table-container')).to.be.true;
        });

        it('should NOT wrap datatable tables with the container', function() {
            expect(this.$datatableTable.parent().hasClass('table-container')).to.be.false;
        });

        it('should NOT wrap tables which already have the container', function() {
            expect(this.$tableDupe.parent().parent().hasClass('table-container')).to.be.false;
        });
    });

});

