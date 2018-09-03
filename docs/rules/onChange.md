# Requires the `data-test-id` attribute on elements with the `onChange` attribute.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<Foo onChange={ this.handleNameChange } />
```

Examples of **correct** code for this rule:

```jsx
<Foo onChange={ this.handleNameChange } data-test-id="name-input" />
```

