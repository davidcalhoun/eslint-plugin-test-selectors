const {
    elementType,
    getProp,
    getPropValue,
} = require('jsx-ast-utils');

const {
    defaults
} = require('./constants');

// Hacky use of the Function constructor here, not sure there's a better way, other than using
// regex.
// https://stackoverflow.com/a/37217166/214017
const fillTemplate = (str, vars) => {
    return new Function(`return \`${ str }\`;`).call(vars);
};

/* Determines the value of an HTML Node prop/attribute. */
const getValue = (node, prop) => getPropValue(getProp(node.attributes, prop));

/* Determines if a node's attribute passes a filter test. */
const attributeTest = (node, { attribute, test }) => {
    const attributeValue = getValue(node, attribute);
    const type = elementType(node);
    return test({ attributeValue, elementType: type });
};

module.exports = {
    /* Tagged template helper for error strings with custom attribute passed in. */
    getError: (errorString, attribute) => fillTemplate(errorString, { attribute }),

    /* Determines if a particular eslint rule should not apply to a DOM not. */
    shouldBypass: (node, options, rawTests) => {
        const tests = [ ...rawTests ];

        // Ignore elements with a `disabled` attribute.
        const shouldIgnoreDisabled = (typeof options.ignoreDisabled === 'boolean' && options.ignoreDisabled) ||
            (typeof options.ignoreDisabled === 'undefined' && defaults.ignoreDisabled);
        if (shouldIgnoreDisabled) {
            tests.unshift({
                attribute: 'disabled',
                test: ({ attributeValue }) => typeof attributeValue === 'boolean' && attributeValue
            });
        }

        // Ignore elements with a `readonly` attribute.
        const shouldIgnoreReadonly = (typeof options.ignoreReadonly === 'boolean' && options.ignoreReadonly) ||
            (typeof options.ignoreReadonly === 'undefined' && defaults.ignoreReadonly);
        if (shouldIgnoreReadonly) {
            tests.unshift({
                attribute: 'readonly',
                test: ({ attributeValue }) => typeof attributeValue === 'boolean' && attributeValue
            });
        }

        // Generic helper method to check for the presence of the data attribute.  All prior tests
        // act as a sieve, so this should be added (pushed) to the very end.
        const testAttribute = options.testAttribute || defaults.testAttribute;
        tests.push({
            attribute: testAttribute,
            test: ({ attributeValue }) => {
                return typeof attributeValue !== 'undefined' &&
                    typeof attributeValue !== 'boolean' &&
                    attributeValue !== null;
            }
        });

        return tests.some(attributeTest.bind(null, node));
    }
};
