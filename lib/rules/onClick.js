/**
 * @fileoverview Requires test attribute data-test-id on elements with the onClick property.
 * @author David Calhoun
 */
const {
    errors,
    defaultRuleSchema,
    defaults
} = require('../constants');

const {
    getError,
    shouldBypass
} = require('../utils');

module.exports = {
    meta: {
        docs: {
            description: 'Requires test attribute data-test-id on elements with the onClick property.',
            category: 'Possible Errors',
            recommended: true,
            url: 'https://github.com/davidcalhoun/eslint-plugin-test-selectors/tree/master/docs/rules/onClick.md'
        },
        fixable: 'code',
        schema: defaultRuleSchema
    },

    create: function(context) {
        const options = context.options[1] || {};
        const testAttribute = options.testAttribute || defaults.testAttribute;

        return {
            JSXOpeningElement: (node) => {
                const bypass = shouldBypass(node, options, [
                    {
                        attribute: 'onClick',
                        test: ({ attributeValue }) => typeof attributeValue === 'undefined'
                    }
                ]);

                if (bypass) return;

                context.report({
                  node,
                  message: getError(errors.onClick.message, testAttribute),
                  fix: function fix(fixer) {
                    const { nanoid } = require('nanoid');
                    const suggestedId = nanoid();
                    const start = node.range[0] + node.name.name.length;
                    const end = start + 1;

                    return fixer.insertTextAfterRange(
                      [start, end],
                      ' ' + testAttribute + '="' + suggestedId + '"'
                    );
                  },
                });
            }
        };
    }
};
