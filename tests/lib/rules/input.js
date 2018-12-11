/**
 * @fileoverview Requires test attribute data-test-id on input elements.
 */
const rule = require('../../../lib/rules/input');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { input } = errors;

const inputError = getError(input.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('input', rule, {
    valid: [
        { code: `<input data-test-id={ bar }>Foo</input>` },
        { code: `<input data-test-id='foo'>Foo</input>` },
        { code: `<input data-test-id='foo' />` },
        { code: `<input disabled />` },
        { code: `<input readonly />` },
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<input data-test-id={ false } />', errors: [inputError] },
        { code: '<input data-test-id={ null } />', errors: [inputError] },
        { code: '<input data-test-id>Foo</input>', errors: [inputError] },
        { code: '<input>Foo</input>', errors: [inputError] },
        { code: '<input />', errors: [inputError] },
        { code: '<input disabled={ foo } />', errors: [inputError] },
        { code: '<input readonly={ foo } />', errors: [inputError] }
    ].map(parserOptionsMapper)
});
