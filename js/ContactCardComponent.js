'use strict';

var $ = require('jquery');

function ContactCardComponent(html) {
    this.$html = html;
}

/* Length of User name Detection */
ContactCardComponent.prototype.init = function() {

    var component = this;

    component.$navMain = this.$html.find('.nav-main');
    component.$whosonlineCloseLink = component.$navMain.find('[data-nav-action=whosonline-close]');
    component.$contactCard = this.$html.find('.contact-card')
    component.$contactCardUserName = this.$contactCard.find('.user-name');
    component.$contactCardJobTitle = this.$contactCard.find('.job-title');
    component.$contactCardAvatarCaption = this.$contactCard.find('.avatar__caption');

    component.$contactCardUserName.each(function() {
        if ($(this).html().length > 24) {
            $(this).addClass('long-text');
        }
    });

    component.$contactCardJobTitle.each(function() {
        if ($(this).html().length > 24) {
            $(this).addClass('long-text');
        }
    });

    /*
    1. Name, Surname both long
    2. One Name, Multiple Surnames
    3. Multiple Names, Multiple Surnames
    */

};

module.exports = ContactCardComponent;
