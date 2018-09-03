/**
 * @fileoverview Requires test attribute data-test-id on anchor elements.
 */
const rule = require('../../../lib/rules/anchor');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const { defaultTestAttribute, errors } = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { anchor } = errors;

const anchorError = getError(anchor.message, defaultTestAttribute);

const ruleTester = new RuleTester();
ruleTester.run('anchor', rule, {
    valid: [
        { code: `<a data-test-id={ bar }>Foo</a>` },
        { code: `<a data-test-id='foo'>Foo</a>` },
        { code: `<a data-test-id='foo' />` },
        { code: `<Foo href="bar" data-test-id='bar' />` },
        { code: `<Foo href="bar" data-test-id='bar'>Bar</Foo>` },
        { code: `<Foo href="bar" data-test-id={ bar } />` },
        { code: `<Foo href="bar" data-test-id={ bar }>Bar</Foo>` }
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<a data-test-id={ false } />', errors: [anchorError] },
        { code: '<a data-test-id={ null } />', errors: [anchorError] },
        { code: '<a data-test-id>Foo</a>', errors: [anchorError] },
        { code: '<a>Foo</a>', errors: [anchorError] },
        { code: '<a />', errors: [anchorError] },
        { code: '<Foo href="bar" />', errors: [anchorError] }
    ].map(parserOptionsMapper)
});
