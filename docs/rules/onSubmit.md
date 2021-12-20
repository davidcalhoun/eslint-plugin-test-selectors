# Requires the `data-test-id` attribute on elements with the `onSubmit` attribute.

## Rule Details

Examples of **incorrect** code for this rule:

```js
<Foo onSubmit={ this.handleSubmit } />
```

Examples of **correct** code for this rule:

```js
<Foo onSubmit={ this.handleSubmit } data-test-id="name-selector" />
```

