const defaultParserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  }
};

module.exports = function({
  code,
  errors,
  options = [],
  parserOptions = {},
}) {
  return {
    code,
    errors,
    options,
    parserOptions: {
      ...defaultParserOptions,
      ...parserOptions,
    }
  };
}
