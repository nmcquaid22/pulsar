/**
 * Test harness for running JS tests in the browser
 */

require('./index');

mocha.ui('bdd'); // Enable the describe- & it- style of testing

window.addEventListener('load', function () {
    mocha.run();
});
