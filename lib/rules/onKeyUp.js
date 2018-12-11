/**
 * @fileoverview Requires test attribute data-test-id on elements with the onKeyUp property.
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
            description: 'Requires test attribute data-test-id on elements with the onKeyUp property.',
            category: 'Possible Errors',
            recommended: true,
            url: 'https://github.com/davidcalhoun/eslint-plugin-test-selectors/tree/master/docs/rules/onKeyUp.md'
        },
        fixable: null,
        schema: defaultRuleSchema
    },

    create: function(context) {
        const options = context.options[1] || {};
        const testAttribute = options.testAttribute || defaults.testAttribute;

        return {
            JSXOpeningElement: (node) => {
                const bypass = shouldBypass(node, options, [
                    {
                        attribute: 'onKeyUp',
                        test: ({ attributeValue }) => typeof attributeValue === 'undefined'
                    }
                ]);

                if (bypass) return;

                context.report({
                    node,
                    message: getError(errors.onKeyUp.message, testAttribute)
                });
            }
        };
    }
};
