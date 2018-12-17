var clndr = require('clndr');

class EventRecurrenceCalendarComponent {
    
    /**
     * EventRecurrenceCalendarComponent
     * @constructor
     * @param {jQuery} $html
     */
    constructor ($html) {
        this.$html = $html;
    }

    /**
     * Initialise
     */
    init () {
        if (typeof this.$html === 'undefined' || !this.$html.length) {
            throw new Error('$html must be passed to EventRecurrenceCalendarComponent');
        }

        console.log('init calendar');

    }
}