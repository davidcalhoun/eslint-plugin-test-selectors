# Changelog

- `2.0.0` - new `onSubmit` rule (thank you @@jzatt), upgrade to ESLint 8 and Mocha 9, fix moderate security advisory for `chalk/ansi-regex`
- `1.3.0` - Add auto-fix capability to `onClick` (thank you @bkonuwa and @pixelbandito). ([#8](https://github.com/davidcalhoun/eslint-plugin-test-selectors/pull/8))
- `1.1.0`
  - elements with `disabled` and `readonly` attributes are now ignored by default. See [Custom Rules Options](#custom-rule-options) to customize this behavior. (fixes [#3][i3])
  - `plugin:test-selectors/recommended` now emits warnings by default instead of errors. For the old stricter behavior which emits errors, folks can use `plugin:test-selectors/recommendedWithErrors` (fixes [#4][i4])
  - Refactoring and cleanup. Readme improvements.
- `1.0.1` - fix bug with inline functions (fixes [#1][i1])
- `1.0.0` - initial release
