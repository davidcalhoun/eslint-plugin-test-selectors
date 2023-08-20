/**
 * @fileoverview Requires test attribute data-test-id on elements with onSubmit handlers.
 */
const rule = require('../../../lib/rules/onSubmit');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { onSubmit } = errors;

const onSubmitError = getError(onSubmit.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('onSubmit', rule, {
    valid: [
        { code: `<form onSubmit={ this.handleSubmit } data-test-id={ bar }>Foo</form>` },
        { code: `<form onSubmit={ this.handleSubmit } data-test-id="bar">Foo</form>` },
        { code: `<form onSubmit={ this.handleSubmit } data-test-id="bar" />` },
        { code: `<form onSubmit={ () => {} } data-test-id={ bar }>Foo</form>` },
        { code: `<form onSubmit={ () => {} } data-test-id="bar">Foo</form>` },
        { code: `<form onSubmit={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onSubmit={ () => {} } data-test-id={ bar }>Foo</Bar>` },
        { code: `<Bar onSubmit={ () => {} } data-test-id="bar">Foo</Bar>` },
        { code: `<Bar onSubmit={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onSubmit={ () => {} } disabled />` },
        { code: `<Bar onSubmit={ () => {} } readonly />` },
        { code: `<form onSubmit={ this.handleSubmit } testId={ bar }>Foo</form>`, options: ["always", {"testAttribute": "testId"}] },
        { code: `<form onSubmit={ this.handleSubmit } data-testid={ bar }>Foo</form>`, options: ["always", {"testAttribute": ["testId", "data-testid"]}] }
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<form onSubmit={ this.handleSubmit } />', errors: [onSubmitError] },
        { code: '<form onSubmit={ this.handleSubmit }>foo</form>', errors: [onSubmitError] },
        { code: '<Bar onSubmit={ this.handleSubmit } />', errors: [onSubmitError] },
        { code: '<Bar onSubmit={ this.handleSubmit }>foo</Bar>', errors: [onSubmitError] },
        { code: '<Bar onSubmit={ () => handleSubmit() }>foo</Bar>', errors: [onSubmitError] },
        { code: '<Bar onSubmit={ () => handleSubmit() } disabled={ foo }>foo</Bar>', errors: [onSubmitError] },
        { code: '<Bar onSubmit={ () => handleSubmit() } readonly={ foo }>foo</Bar>', errors: [onSubmitError] },
        { code: `<form onSubmit={ this.handleSubmit } data-test-id={ bar }>Foo</form>`, options: ["always", {"testAttribute": ["testId", "data-testid"]}], errors: [getError(onSubmit.message, ["testId", "data-testid"])] }
    ].map(parserOptionsMapper)
});
