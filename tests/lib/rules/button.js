/**
 * @fileoverview Requires test attribute data-test-id on button elements.
 */
const rule = require('../../../lib/rules/button');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { button } = errors;

const buttonError = getError(button.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('button', rule, {
    valid: [
        { code: `<button data-test-id={ bar }>Foo</button>` },
        { code: `<button data-test-id='foo'>Foo</button>` },
        { code: `<button data-test-id='foo' />` },
        { code: `<Button data-test-id='foo'>Foo</Button>` },
        { code: `<Button data-test-id='foo' />` },
        { code: `<ButtonContainer data-test-id='foo'>Foo</ButtonContainer>` },
        { code: `<ButtonContainer data-test-id='foo' />` },
        { code: `<DownloadButton data-test-id='foo' />` },
        { code: `<button disabled />` },
        { code: `<button readonly />` },
        { code: `<Button>Foo</Button>`, options: ["warn", {htmlOnly: true}] }
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<button data-test-id={ false } />', errors: [buttonError] },
        { code: '<button data-test-id={ null } />', errors: [buttonError] },
        { code: '<button data-test-id>Foo</button>', errors: [buttonError] },
        { code: '<button>Foo</button>', errors: [buttonError] },
        { code: '<button />', errors: [buttonError] },
        { code: '<Button>Foo</Button>', errors: [buttonError] },
        { code: '<Button />', errors: [buttonError] },
        { code: '<ButtonContainer>Foo</ButtonContainer>', errors: [buttonError] },
        { code: '<ButtonContainer />', errors: [buttonError] },
        { code: '<DownloadButton />', errors: [buttonError] },
        { code: '<button disabled={ foo } />', errors: [buttonError] },
        { code: '<button readonly={ foo } />', errors: [buttonError] }
    ].map(parserOptionsMapper)
});
