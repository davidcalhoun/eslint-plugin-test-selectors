/**
 * @fileoverview Makes sure test attributes (e.g. data-test-id) are added to interactive DOM elements.
 * @author David Calhoun
 */
"use strict";

const requireIndex = require("requireindex");

module.exports = {
    rules: requireIndex(`${ __dirname }/rules`),
    configs: {
        recommended: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            rules: {
                'test-selectors/anchor': 'warn',
                'test-selectors/button': 'warn',
                'test-selectors/input': 'warn',
                'test-selectors/onChange': 'warn',
                'test-selectors/onClick': 'warn',
                'test-selectors/onKeyDown': 'warn',
                'test-selectors/onKeyUp': 'warn'
            }
        },
        recommendedWithErrors: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            rules: {
                'test-selectors/anchor': 'error',
                'test-selectors/button': 'error',
                'test-selectors/input': 'error',
                'test-selectors/onChange': 'error',
                'test-selectors/onClick': 'error',
                'test-selectors/onKeyDown': 'error',
                'test-selectors/onKeyUp': 'error'
            }
        }
    }
};
