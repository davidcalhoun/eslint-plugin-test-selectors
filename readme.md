# eslint-plugin-test-selectors
[![Build Status](https://travis-ci.org/davidcalhoun/eslint-plugin-test-selectors.svg?branch=master)](https://travis-ci.org/davidcalhoun/eslint-plugin-test-selectors)
[![Downloads][downloads-image]][https://www.npmjs.com/package/eslint-plugin-test-selectors]

Enforces that a `data-test-id` attribute is present on interactive DOM elements to help with UI testing.

* ❌ `<button>Download</button>`
* ✅ `<button data-test-id="download-button">Download</button>`

## Installation

You'll first need to install [ESLint](http://eslint.org):

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
    "plugins": [
        "test-selectors"
    ]
}
```


By default, all of these rules are enabled:


You can selectively disable individual rules in the `rules` section of your `.eslintrc` configuration:

```json
{
    "rules": {
        "test-selectors/anchor": ["error", "never"]
    }
}
```

## Custom attributes

If you don't want to use the default `data-test-id` attribute, you can selectively override it in each rule definition:

```json
{
    "rules": {
        "test-selectors/onChange": ["error", "always", { "testAttribute": "data-some-custom-attribute" }]
    }
}
```

## Supported Rules

* `test-selectors/anchor`
* `test-selectors/button`
* `test-selectors/input`
* `test-selectors/onChange`
* `test-selectors/onClick`
* `test-selectors/onKeyDown`
* `test-selectors/onKeyUp`

## Further Reading

If you don't want these test attributes added in production, you can use something like [babel-plugin-jsx-remove-data-test-id](https://github.com/coderas/babel-plugin-jsx-remove-data-test-id)

Why `data` attributes and not `id` or `class`?  Check out some of the following:

* [Decoupling CSS Selectors From Your Tests](https://mixandgo.com/learn/decoupling-css-selectors-from-your-tests)
* [Test your DOM with Data Attributes](https://medium.com/@colecodes/test-your-dom-with-data-attributes-44fccc43ed4b)
* [Something Better than IDs for Identifying Elements in Selenium Tests](https://techblog.constantcontact.com/software-development/a-better-way-to-id-elements-in-selenium-tests/)
