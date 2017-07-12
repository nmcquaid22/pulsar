/*global mocha, mochaPhantomJS, sinon:true, window */
'use strict';

/**
 * Test harness for running JS tests under Node or the browser
 */

var $ = require('jquery'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    sinonjQuery = require('sinon-jquery').default;

// Expose jQuery globals
window.$ = window.jQuery = $;

// Load Sinon-Chai
chai.use(sinonChai);

sinonjQuery.useWith(sinon, $);

mocha.timeout(2000);

// Expose tools in the global scope
window.chai = chai;
window.expect = chai.expect;
window.sinon = sinon;
