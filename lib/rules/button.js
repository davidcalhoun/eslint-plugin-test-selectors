/**
 * @fileoverview Requires test attributes on buttons.
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
            description: 'Requires test attributes on buttons.',
            category: 'Possible Errors',
            recommended: true,
            url: 'https://github.com/davidcalhoun/eslint-plugin-test-selectors/tree/master/docs/rules/button.md'
        },
        fixable: null,
        schema: {
            ...defaultRuleSchema,
            properties: {
                ...defaultRuleSchema.properties,
                htmlOnly: {
                    type: 'boolean'
                }
            }
        }
    },

    create: function(context) {
        const options = context.options[1] || {};
        const testAttribute = options.testAttribute || defaults.testAttribute;

        return {
            JSXOpeningElement: (node) => {
                const bypass = shouldBypass(node, options, [
                    {
                        test: ({ elementType }) => {
                            const elType = options.htmlOnly ? elementType : elementType.toLowerCase();

                            return !elType.includes('button');
                        }
                    }
                ]);

                if (bypass) return;

                context.report({
                    node,
                    message: getError(errors.button.message, testAttribute)
                });
            }
        };
    }
};
