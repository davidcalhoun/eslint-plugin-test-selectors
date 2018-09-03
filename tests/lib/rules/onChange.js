/**
 * @fileoverview Requires test attribute data-test-id on elements with onChange handlers.
 */
const rule = require('../../../lib/rules/onChange');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const { defaultTestAttribute, errors } = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { onChange } = errors;

const onChangeError = getError(onChange.message, defaultTestAttribute);

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
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<div onChange={ this.handleClick } />', errors: [onChangeError] },
        { code: '<div onChange={ this.handleClick }>foo</div>', errors: [onChangeError] },
        { code: '<Bar onChange={ this.handleClick } />', errors: [onChangeError] },
        { code: '<Bar onChange={ this.handleClick }>foo</Bar>', errors: [onChangeError] }
    ].map(parserOptionsMapper)
});
