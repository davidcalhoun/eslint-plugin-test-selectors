/**
 * @fileoverview Requires test attribute data-test-id on elements with onClick handlers.
 */
const rule = require('../../../lib/rules/onClick');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');
const nanoidMock = require('mock-require');

const { onClick } = errors;

const onClickError = getError(onClick.message, defaults.testAttribute);


nanoidMock('nanoid', {
  nanoid: function () {
    return 'AbYK0YPm2OWYiMaFPKLbp';
  },
});

const id = require('nanoid');
const suggestedId = id.nanoid();

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
        { code: `<Bar onClick={ () => {} } disabled />` },
        { code: `<Bar onClick={ () => {} } readonly />` }
    ].map(parserOptionsMapper),

    invalid: [
        {
            code: '<div onClick={ this.handleClick } />',
            errors: [onClickError],
            output: `<div data-test-id="${suggestedId}" onClick={ this.handleClick } />`,
        },
        {
            code: '<div onClick={ this.handleClick }>foo</div>',
            errors: [onClickError],
            output: `<div data-test-id="${suggestedId}" onClick={ this.handleClick }>foo</div>`,
        },
        {
            code: '<Bar onClick={ this.handleClick } />',
            errors: [onClickError],
            output: `<Bar data-test-id="${suggestedId}" onClick={ this.handleClick } />`,
        },
        {
            code: '<Bar onClick={ this.handleClick }>foo</Bar>',
            errors: [onClickError],
            output: `<Bar data-test-id="${suggestedId}" onClick={ this.handleClick }>foo</Bar>`,
        },
        {
            code: '<Bar onClick={ () => handleClick() }>foo</Bar>',
            errors: [onClickError],
            output: `<Bar data-test-id="${suggestedId}" onClick={ () => handleClick() }>foo</Bar>`,
        },
        {
            code: '<Bar onClick={ () => handleClick() } disabled={ foo }>foo</Bar>',
            errors: [onClickError],
            output: `<Bar data-test-id="${suggestedId}" onClick={ () => handleClick() } disabled={ foo }>foo</Bar>`,
        },
        {
            code: '<Bar onClick={ () => handleClick() } readonly={ foo }>foo</Bar>',
            errors: [onClickError],
            output: `<Bar data-test-id="${suggestedId}" onClick={ () => handleClick() } readonly={ foo }>foo</Bar>`,
        },
    ].map(parserOptionsMapper)
});
