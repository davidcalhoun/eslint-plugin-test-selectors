/**
 * @fileoverview Requires test attribute data-test-id on anchor elements.
 */
const rule = require('../../../lib/rules/anchor');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { anchor } = errors;

const anchorError = getError(anchor.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('anchor', rule, {
    valid: [
        { code: `<a data-test-id={ bar }>Foo</a>` },
        { code: `<a data-test-id='foo'>Foo</a>` },
        { code: `<a data-test-id='foo' />` },
        { code: `<Foo href="bar" data-test-id='bar' />` },
        { code: `<Foo href="bar" data-test-id='bar'>Bar</Foo>` },
        { code: `<Foo href="bar" data-test-id={ bar } />` },
        { code: `<Foo href="bar" data-test-id={ bar }>Bar</Foo>` },
        { code: `<Foo href="bar" disabled>Bar</Foo>` },
        { code: `<Foo href="bar" readonly>Bar</Foo>` },
        { code: `<link href="example.com" />` },
        { code: `<area href="example.com" />` },
        { code: `<base href="example.com" />` }
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<a data-test-id={ false } />', errors: [anchorError] },
        { code: '<a data-test-id={ null } />', errors: [anchorError] },
        { code: '<a data-test-id>Foo</a>', errors: [anchorError] },
        { code: '<a>Foo</a>', errors: [anchorError] },
        { code: '<a />', errors: [anchorError] },
        { code: '<Foo href="bar" />', errors: [anchorError] },
        { code: '<Foo href="bar" disabled={ bar } />', errors: [anchorError] },
        { code: '<Foo href="bar" readonly={ bar } />', errors: [anchorError] },
        { code: '<Link href="example.com" />', errors: [anchorError] },
    ].map(parserOptionsMapper)
});
