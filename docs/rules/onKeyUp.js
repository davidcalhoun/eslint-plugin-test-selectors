# Requires the `data-test-id` attribute on elements with the `onKeyUp` attribute.

## Rule Details

Examples of **incorrect** code for this rule:

```js
<Foo onKeyUp={ this.handleKeyUp } />
```

Examples of **correct** code for this rule:

```js
<Foo onKeyUp={ this.handleKeyUp } data-test-id="name-selector" />
```

