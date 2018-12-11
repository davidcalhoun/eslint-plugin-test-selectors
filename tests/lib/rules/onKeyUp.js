/**
 * @fileoverview Requires test attribute data-test-id on elements with onKeyUp handlers.
 */
const rule = require('../../../lib/rules/onKeyUp');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { onKeyUp } = errors;

const onKeyUpError = getError(onKeyUp.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('onKeyUp', rule, {
    valid: [
        { code: `<div onKeyUp={ this.handleKeyUp } data-test-id={ bar }>Foo</div>` },
        { code: `<div onKeyUp={ this.handleKeyUp } data-test-id="bar">Foo</div>` },
        { code: `<div onKeyUp={ this.handleKeyUp } data-test-id="bar" />` },
        { code: `<div onKeyUp={ () => {} } data-test-id={ bar }>Foo</div>` },
        { code: `<div onKeyUp={ () => {} } data-test-id="bar">Foo</div>` },
        { code: `<div onKeyUp={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onKeyUp={ () => {} } data-test-id={ bar }>Foo</Bar>` },
        { code: `<Bar onKeyUp={ () => {} } data-test-id="bar">Foo</Bar>` },
        { code: `<Bar onKeyUp={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onKeyUp={ () => {} } disabled />` },
        { code: `<Bar onKeyUp={ () => {} } readonly />` }
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<div onKeyUp={ this.handleKeyUp } />', errors: [onKeyUpError] },
        { code: '<div onKeyUp={ this.handleKeyUp }>foo</div>', errors: [onKeyUpError] },
        { code: '<Bar onKeyUp={ this.handleKeyUp } />', errors: [onKeyUpError] },
        { code: '<Bar onKeyUp={ this.handleKeyUp }>foo</Bar>', errors: [onKeyUpError] },
        { code: '<Bar onKeyUp={ () => handleKeyUp() }>foo</Bar>', errors: [onKeyUpError] },
        { code: '<Bar onKeyUp={ () => handleKeyUp() } disabled={ bar }>foo</Bar>', errors: [onKeyUpError] },
        { code: '<Bar onKeyUp={ () => handleKeyUp() } readonly={ bar }>foo</Bar>', errors: [onKeyUpError] }
    ].map(parserOptionsMapper)
});
