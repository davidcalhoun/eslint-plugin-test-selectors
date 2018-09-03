/**
 * @fileoverview Requires test attribute data-test-id on input elements.
 */
const rule = require('../../../lib/rules/input');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const { defaultTestAttribute, errors } = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { input } = errors;

const inputError = getError(input.message, defaultTestAttribute);

const ruleTester = new RuleTester();
ruleTester.run('input', rule, {
    valid: [
        { code: `<input data-test-id={ bar }>Foo</input>` },
        { code: `<input data-test-id='foo'>Foo</input>` },
        { code: `<input data-test-id='foo' />` }
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<input data-test-id={ false } />', errors: [inputError] },
        { code: '<input data-test-id={ null } />', errors: [inputError] },
        { code: '<input data-test-id>Foo</input>', errors: [inputError] },
        { code: '<input>Foo</input>', errors: [inputError] },
        { code: '<input />', errors: [inputError] }
    ].map(parserOptionsMapper)
});
