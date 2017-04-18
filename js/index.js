/**
 * Pulsar
 *
 * Core UI components that should always be present.
 *
 * Jadu Ltd.
 */

// Fixes issue with dependencies that expect both $ and jQuery to be set
window.jQuery = window.$ = require('jquery');

// Global UI components
var $ = require('jquery'),
    history = require('history.js/scripts/bundled/html5/jquery.history'),
    svgeezy = require('svgeezy/svgeezy.min'),
    ButtonComponent = require('./ButtonComponent'),
    HelpTextComponent = require('./HelpTextComponent'),
    FilterBarComponent = require('./FilterBarComponent'),
    FlashMessageComponent = require('./FlashMessageComponent'),
    MasterSwitchComponent = require('./MasterSwitchComponent'),
    ModulePermissionsComponent = require('./ModulePermissionsComponent'),
    NavMainComponent = require('./NavMainComponent'),
    PulsarFormComponent = require('./PulsarFormComponent'),
    PulsarUIComponent = require('./PulsarUIComponent'),
    SignInComponent = require('./area/signin/signin');

require('./libs/dropdown');
require('./libs/modal');
require('./libs/tab');
require('./libs/popover');
require('./libs/tooltip');
require('./polyfills/matchMedia');
require('./polyfills/matchMedia.addListener');
require('bootstrapx-clickover/js/bootstrapx-clickover');
require('jquery-ui/jquery-ui.min');
require('jquery.countdown/dist/jquery.countdown.min');
require('pikaday/plugins/pikaday.jquery');
require('select2');
require('tinyicon/tinycon.min');
require('datatables.net')(window, $);
require('datatables.net-buttons')(window, $);
require('datatables.net-responsive')(window, $);
require('datatables.net-select')(window, $);
require('jstree');

module.exports = {
    ButtonComponent: ButtonComponent,
    HelpTextComponent: HelpTextComponent,
    FilterBarComponent: FilterBarComponent,
    FlashMessageComponent: FlashMessageComponent,
    MasterSwitchComponent: MasterSwitchComponent,
    ModulePermissionsComponent: ModulePermissionsComponent,
    NavMainComponent: NavMainComponent,
    PulsarFormComponent: PulsarFormComponent,
    PulsarUIComponent: PulsarUIComponent,
    SignInComponent: SignInComponent,
    history: history,
    svgeezy: svgeezy
};
