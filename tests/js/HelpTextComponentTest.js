'use strict'

var $ = require('jquery'),
    HelpTextComponent = require('../../js/HelpTextComponent');

describe('HelpTextComponent', function() {

    beforeEach(function() {
        this.$window = $('<div></div>');
        this.window = this.$window[0];
        this.window.matchMedia = sinon.stub();
        this.$document = $('<div></div>').appendTo(this.$window);
        this.$html = $('<html></html>').appendTo(this.$document);
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$tabHelpContainer = $('<div class="tab-help-container"></div>').appendTo(this.$body);
        this.$tabHelp = $('<div class="tab-help"></div>').appendTo(this.$tabHelpContainer);
        this.$contentMain = $('<div class="content-main"></div>').appendTo(this.$body);
        this.$tabPane = $('<div class="tab__pane is-active"></div>').appendTo(this.$contentMain);
        this.$tabContainer = $('<div class="tab__container"></div>').appendTo(this.$tabPane)
        this.$tabContent = $('<div class="tab__content"></div>').appendTo(this.$tabContainer);
        this.$tabContentLink = $('<a href="#">link outside of sidebar</a>').appendTo(this.$tabContent);
        this.$helpButton = $('<a href="#" class="show-page-help js-show-page-help"></a>').appendTo(this.$tabContent);
        this.$tabSidebar = $('<div class="tab__sidebar">Some help text</div>').appendTo(this.$tabContainer);

        this.helpTextComponent = new HelpTextComponent(this.$html, this.window, this.$document[0]);
    });

    describe('When the page loads on mobile', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateTabHelp();
        });

        it('should add the visibility-hidden class to the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('visibility-hidden')).to.be.true;
        });

        it('should copy the active tabs sidebar contents to the tab-help container', function() {
            expect(this.$tabHelp.html()).to.equal('<a href="#" class="close-page-help js-close-page-help"><i class="icon-remove-sign"></i></a>Some help text');
        });

        it('should add the help-close button to the tab-help container', function() {
            expect(this.$tabHelp.find('.js-close-page-help').length).to.equal(1);
        });
    });

    describe('When the side help is closed and the help button is pressed', function() {

        beforeEach(function () {
            this.helpTextComponent.init();
            this.clickEvent = $.Event('click');
        });

        it('should prevent the default behaviour', function () {
            this.$helpButton.trigger(this.clickEvent);

            expect(this.clickEvent.isDefaultPrevented()).to.be.true;
        });

        it('should stop propagation of the click event', function () {
            this.$helpButton.trigger(this.clickEvent);

            expect(this.clickEvent.isPropagationStopped()).to.be.true;
        });

        it('should open the side menu', function () {
            this.$helpButton.trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.true;
        });

        it('should add the is-open class to the button ', function () {
            this.$helpButton.trigger(this.clickEvent);

            expect(this.$helpButton.hasClass('is-open')).to.be.true;
        });
    });

    describe('When the side help is open and the help button is pressed', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.clickEvent = $.Event('click');
            this.$html.addClass('open-help');
            this.$helpButton.addClass('is-open');
        });

        it('should close the side menu', function () {
            this.$helpButton.trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.false;
        });

        it('should remove the is-open class from the help button', function () {
            this.$helpButton.trigger(this.clickEvent);

            expect(this.$helpButton.hasClass('is-open')).to.be.false;
        });

        it('should add the visibility-hidden class to the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('visibility-hidden')).to.be.true;
        });
    });

    describe('When the close help button is pressed', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateTabHelp();
            this.clickEvent = $.Event('click');
        });

        it('should prevent the default behaviour', function () {
            this.$tabHelp.find('.js-close-page-help').trigger(this.clickEvent);

            expect(this.clickEvent.isDefaultPrevented()).to.be.true;
        })

        it('should close the side menu', function () {
            this.$html.addClass('open-help');

            this.$tabHelp.find('.js-close-page-help').trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.false;
        });

        it('should remove the is-open class from the help button', function () {
            this.$tabHelp.find('.js-close-page-help').trigger(this.clickEvent);

            expect(this.$helpButton.hasClass('is-open')).to.be.false;
        });

        it('should add the visibility-hidden class from the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('visibility-hidden')).to.be.true;
        });
    });

    describe('If the help sidebar content does not exist', function() {
        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.$tabSidebar.empty();
            this.helpTextComponent.init();
            this.helpTextComponent.updateTabHelp();
        });

        it('should remove the has-sidebar class from the tab container', function () {
            expect(this.$tabContainer.hasClass('has-sidebar')).to.be.false;
        });
    });

    describe('If the help sidebar does not exists', function() {
        beforeEach(function () {
            this.$tabSidebar.remove();
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateTabHelp();
        });

        it('should remove the has-sidebar class from the tab container', function () {
            expect(this.$tabContainer.hasClass('has-sidebar')).to.be.false;
        });
    });

    describe('When the help sidebar is open and outside of the sidebar is clicked', function() {

        beforeEach(function () {
            this.helpTextComponent.init();
            this.clickEvent = $.Event('click');
            this.$html.addClass('open-help');
            this.$helpButton.addClass('is-open');
        });

        it('should close the help side bar', function () {
            this.$tabContentLink.trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.false;
        });

        it('should remove the is-open class from the mobile help button', function () {
            this.$tabContentLink.trigger(this.clickEvent);

            expect(this.$helpButton.hasClass('is-open')).to.be.false;
        });

        it('should add the visibility-hidden class from the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('visibility-hidden')).to.be.true;
        });
    });
});
