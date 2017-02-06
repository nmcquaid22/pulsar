'use strict';

var $ = require('jquery');

function ContactCardComponent(html) {
    this.$html = html;
}

/* Length of User's Name Detection */
ContactCardComponent.prototype.init = function() {

    var component = this;

    component.$navMain = this.$html.find('.nav-main');
    component.$whosonlineCloseLink = component.$navMain.find('[data-nav-action=whosonline-close]');
    component.$contactCard = this.$html.find('.contact-card')
    component.$contactCardUserName = this.$contactCard.find('.user-name');
    component.$contactCardJobTitle = this.$contactCard.find('.job-title');

    component.$contactCardUserName.each(function() {
        if ($(this).html().length > 24) {
            $(this).addClass('long-text');
        }
        if ($(this).html().length > 56) {
            var $trimmedText = $(this).html().slice(0, 56).concat('...');
            $(this).html($trimmedText);
        }
    });

    component.$contactCardJobTitle.each(function() {
        if ($(this).html().length > 24) {
            $(this).addClass('long-text');
        }
        if ($(this).html().length > 29) {
            var $trimmedText = $(this).html().slice(0, 29).concat('...');
            $(this).html($trimmedText);
        }
    });
};

module.exports = ContactCardComponent;
