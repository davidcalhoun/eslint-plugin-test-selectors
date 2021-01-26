const defaultParserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  }
};

module.exports = function({
  code,
  errors,
  output,
  options = [],
  parserOptions = {},
}) {
  const defaultOptions = {
    code,
    errors,
    options,
    parserOptions: {
      ...defaultParserOptions,
      ...parserOptions,
    }
  }

  if (output) {
    defaultOptions.output = output; 
  }
  
  return defaultOptions;
}
