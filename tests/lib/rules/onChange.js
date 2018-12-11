/**
 * @fileoverview Requires test attribute data-test-id on elements with onChange handlers.
 */
const rule = require('../../../lib/rules/onChange');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { onChange } = errors;

const onChangeError = getError(onChange.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('onChange', rule, {
    valid: [
        { code: `<div onChange={ this.handleClick } data-test-id={ bar }>Foo</div>` },
        { code: `<div onChange={ this.handleClick } data-test-id="bar">Foo</div>` },
        { code: `<div onChange={ this.handleClick } data-test-id="bar" />` },
        { code: `<div onChange={ () => {} } data-test-id={ bar }>Foo</div>` },
        { code: `<div onChange={ () => {} } data-test-id="bar">Foo</div>` },
        { code: `<div onChange={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onChange={ () => {} } data-test-id={ bar }>Foo</Bar>` },
        { code: `<Bar onChange={ () => {} } data-test-id="bar">Foo</Bar>` },
        { code: `<Bar onChange={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onChange={ () => {} } disabled />` },
        { code: `<Bar onChange={ () => {} } readonly />` }
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<div onChange={ this.handleClick } />', errors: [onChangeError] },
        { code: '<div onChange={ this.handleClick }>foo</div>', errors: [onChangeError] },
        { code: '<Bar onChange={ this.handleClick } />', errors: [onChangeError] },
        { code: '<Bar onChange={ this.handleClick }>foo</Bar>', errors: [onChangeError] },
        { code: '<Bar onChange={ () => handleChange() }>foo</Bar>', errors: [onChangeError] },
        { code: '<Bar onChange={ () => handleChange() } disabled={ foo }>foo</Bar>', errors: [onChangeError] },
        { code: '<Bar onChange={ () => handleChange() } readonly={ foo }>foo</Bar>', errors: [onChangeError] }
    ].map(parserOptionsMapper)
});
