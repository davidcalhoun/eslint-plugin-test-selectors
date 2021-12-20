# eslint-plugin-test-selectors

[![Build Status](https://travis-ci.org/davidcalhoun/eslint-plugin-test-selectors.svg?branch=master)](https://travis-ci.org/davidcalhoun/eslint-plugin-test-selectors)
[![Downloads][downloads-image]][npm-url]

Enforces that a `data-test-id` attribute is present on interactive DOM elements to help with UI testing.

- ❌ `<button>Download</button>`
- ✅ `<button data-test-id="download-button">Download</button>`

### Example of eslint-plugin-test-selectors running in Visual Studio Code:

![Example of eslint-plugin-test-selectors running in Visual Studio Code](https://github.com/davidcalhoun/eslint-plugin-test-selectors/blob/master/vscode-test-selectors-example.png)

## Changelog

- `2.0.0` - new `onSubmit` rule (thank you @@jzatt), upgrade to ESLint 8 and Mocha 9, fix moderate security advisory for `chalk/ansi-regex`
- `1.3.0` - Add auto-fix capability to `onClick` (thank you @bkonuwa and @pixelbandito). ([#8](https://github.com/davidcalhoun/eslint-plugin-test-selectors/pull/8))
- `1.1.0`
  - elements with `disabled` and `readonly` attributes are now ignored by default. See [Custom Rules Options](#custom-rule-options) to customize this behavior. (fixes [#3][i3])
  - `plugin:test-selectors/recommended` now emits warnings by default instead of errors. For the old stricter behavior which emits errors, folks can use `plugin:test-selectors/recommendedWithErrors` (fixes [#4][i4])
  - Refactoring and cleanup. Readme improvements.
- `1.0.1` - fix bug with inline functions (fixes [#1][i1])
- `1.0.0` - initial release

## Installation

You'll first need to install [ESLint](http://eslint.org), which requires [Node.js](https://nodejs.org) (note that `eslint-plugin-test-selectors` requires Node.js 10+):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-test-selectors`:

```
$ npm install eslint-plugin-test-selectors --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-test-selectors` globally.

## Usage

Add `test-selectors` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["test-selectors"]
}
```

If you want to use all the recommended default rules, you can simply add this line to the `extends` section of your `.eslintrc` configuration:

```json
{
  "extends": ["plugin:test-selectors/recommended"]
}
```

By default, this will run all [Supported Rules](#supported-rules) and emit eslint warnings. If you want to be more strict, you can emit eslint errors by instead using `plugin:test-selectors/recommendedWithErrors`.

Another option: you can also selectively enable and disable individual rules in the `rules` section of your `.eslintrc` configuration. For instance, if you only want to enable the `test-selectors/button` rule, skip the `extends` addition above and simply add the following to the `rules` section of your `.eslintrc` configuration:

```json
{
  "rules": {
    "test-selectors/button": ["warn", "always"]
  }
}
```

If you like most of the recommended rules by adding the `extends` option above, but find one in particular to be bothersome, you can simply disable it:

```json
{
  "rules": {
    "test-selectors/anchor": "off"
  }
}
```

Note: see [Supported Rules](#supported-rules) below for a full list.

## Custom rule options

All tests can be customized individually by passing an object with one or more of the following properties.

### testAttribute

The default test attribute expected is `data-test-id`, but you can override it with whatever you like. Here is how you would use `data-some-custom-attribute` instead:

```json
{
  "rules": {
    "test-selectors/onChange": [
      "warn",
      "always",
      { "testAttribute": "data-some-custom-attribute" }
    ]
  }
}
```

### ignoreDisabled

By default all elements with the `disabled` attribute are ignored, e.g. `<input disabled />`. If you don't want to ignore this attribute, set `ignoreDisabled` to `false`:

```json
{
  "rules": {
    "test-selectors/onChange": ["warn", "always", { "ignoreDisabled": false }]
  }
}
```

### ignoreReadonly

By default all elements with the `readonly` attribute are ignored, e.g. `<input readonly />`. If you don't want to ignore this attribute, set `ignoreReadonly` to `false`:

```json
{
  "rules": {
    "test-selectors/onChange": ["warn", "always", { "ignoreReadonly": false }]
  }
}
```

### htmlOnly

Only supported on `button` rule, this option will exempt React components called Button from the rule.

```json
{
  "rules": {
    "test-selectors/button": ["warn", "always", { "htmlOnly": true }]
  }
}
```

## Supported Rules

- `test-selectors/anchor`
- `test-selectors/button`
- `test-selectors/input`
- `test-selectors/onChange`
- `test-selectors/onClick`
- `test-selectors/onKeyDown`
- `test-selectors/onKeyUp`
- `test-selectors/onSubmit`

## Further Reading

If you don't want these test attributes added in production, you can use something like [babel-plugin-jsx-remove-data-test-id](https://github.com/coderas/babel-plugin-jsx-remove-data-test-id)

Why `data` attributes and not `id` or `class`? Check out some of the following:

- [Decoupling CSS Selectors From Your Tests](https://mixandgo.com/learn/decoupling-css-selectors-from-your-tests)
- [Test your DOM with Data Attributes](https://medium.com/@colecodes/test-your-dom-with-data-attributes-44fccc43ed4b)
- [Something Better than IDs for Identifying Elements in Selenium Tests](https://techblog.constantcontact.com/software-development/a-better-way-to-id-elements-in-selenium-tests/)

[downloads-image]: https://img.shields.io/npm/dm/eslint-plugin-test-selectors.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/eslint-plugin-test-selectors
[npm-image]: https://img.shields.io/npm/dm/eslint-plugin-test-selectors.svg?style=flat
[i1]: https://github.com/davidcalhoun/eslint-plugin-test-selectors/issues/1
[i2]: https://github.com/davidcalhoun/eslint-plugin-test-selectors/issues/2
[i3]: https://github.com/davidcalhoun/eslint-plugin-test-selectors/issues/3
[i4]: https://github.com/davidcalhoun/eslint-plugin-test-selectors/issues/4
