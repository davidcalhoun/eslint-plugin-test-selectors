/**
 * @fileoverview Requires test attribute data-test-id on elements with the onKeyDown property.
 * @author David Calhoun
 */
const {
    getProp,
    getPropValue
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
            description: 'Requires test attribute data-test-id on elements with the onKeyDown property.',
            category: 'Possible Errors',
            recommended: true,
            url: 'https://github.com/davidcalhoun/eslint-plugin-test-selectors/tree/master/docs/rules/onKeyDown.md'
        },
        fixable: null,
        schema: defaultRuleSchema
    },

    create: function(context) {
        const options = context.options[1] || {};
        const testAttribute = options.testAttribute || defaultTestAttribute;

        return {
            JSXOpeningElement: (node) => {
                const onKeyDown = getPropValue(getProp(node.attributes, 'onKeyDown'));

                if (typeof onKeyDown !== 'string') {
                    return;
                }

                const testVal = getPropValue(getProp(node.attributes, testAttribute));

                if (typeof testVal === 'string') {
                    return;
                }

                context.report({
                    node,
                    message: getError(errors.onKeyDown.message, testAttribute)
                });
            }
        };
    }
};
