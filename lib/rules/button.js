/**
 * @fileoverview Requires test attributes on buttons.
 * @author David Calhoun
 */
const {
    getProp,
    getPropValue,
    elementType
} = require('jsx-ast-utils');

const {
    errors,
    defaultRuleSchema,
    defaultTestAttribute
} = require('../constants');

const { getError } = require('../utils');

module.exports = {
    meta: {
        docs: {
            description: 'Requires test attributes on buttons.',
            category: 'Possible Errors',
            recommended: true,
            url: 'https://github.com/davidcalhoun/eslint-plugin-test-selectors/tree/master/docs/rules/button.md'
        },
        fixable: null,
        schema: defaultRuleSchema
    },

    create: function(context) {
        const options = context.options[1] || {};
        const testAttribute = options.testAttribute || defaultTestAttribute;

        return {
            JSXOpeningElement: (node) => {
                const nodeType = elementType(node);

                // Ignore non-button elements.
                if (!nodeType.toLowerCase().includes('button')) return;
            
                const testVal = getPropValue(getProp(node.attributes, testAttribute));

                if (typeof testVal === 'string') {
                    return;
                }

                context.report({
                    node,
                    message: getError(errors.button.message, testAttribute)
                });
            }
        };
    }
};
