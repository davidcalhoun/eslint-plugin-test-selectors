/**
 * @fileoverview Requires test attribute data-test-id on elements with onClick handlers.
 */
const rule = require('../../../lib/rules/onClick');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const { defaultTestAttribute, errors } = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { onClick } = errors;

const onClickError = getError(onClick.message, defaultTestAttribute);

const ruleTester = new RuleTester();
ruleTester.run('onClick', rule, {
    valid: [
        { code: `<div onClick={ this.handleClick } data-test-id={ bar }>Foo</div>` },
        { code: `<div onClick={ this.handleClick } data-test-id="bar">Foo</div>` },
        { code: `<div onClick={ this.handleClick } data-test-id="bar" />` },
        { code: `<div onClick={ () => {} } data-test-id={ bar }>Foo</div>` },
        { code: `<div onClick={ () => {} } data-test-id="bar">Foo</div>` },
        { code: `<div onClick={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onClick={ () => {} } data-test-id={ bar }>Foo</Bar>` },
        { code: `<Bar onClick={ () => {} } data-test-id="bar">Foo</Bar>` },
        { code: `<Bar onClick={ () => {} } data-test-id="bar" />` },
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<div onClick={ this.handleClick } />', errors: [onClickError] },
        { code: '<div onClick={ this.handleClick }>foo</div>', errors: [onClickError] },
        { code: '<Bar onClick={ this.handleClick } />', errors: [onClickError] },
        { code: '<Bar onClick={ this.handleClick }>foo</Bar>', errors: [onClickError] },
        { code: '<Bar onClick={ () => handleClick() }>foo</Bar>', errors: [onClickError] }
    ].map(parserOptionsMapper)
});
