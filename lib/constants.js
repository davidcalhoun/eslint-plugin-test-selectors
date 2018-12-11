module.exports = {
    defaults: {
        testAttribute: 'data-test-id',
        ignoreDisabled: true,
        ignoreReadonly: true
    },
    defaultRuleSchema: [
        {
            "enum": ["always", "never"]
        },
        {
            "type": "object",
            "properties": {
                "testAttribute": {
                    "type": "string"
                },
                "ignoreDisabled": {
                    "type": "boolean"
                },
                "ignoreReadonly": {
                    "type": "boolean"
                }
            },
            "additionalProperties": false
        }
    ],
    errors: {
        anchor: {
            message: 'Anchor elements must have test attribute ${ this.attribute }.',
            type: 'JSXOpeningElement'
        },
        button: {
            message: 'Button elements must have a data-test-id attribute.',
            type: 'JSXOpeningElement'
        },
        input: {
            message: 'Input elements must have a data-test-id attribute.',
            type: 'JSXOpeningElement'
        },
        onChange: {
            message: 'Elements with an onChange handler must have a data-test-id attribute.',
            type: 'JSXOpeningElement'
        },
        onClick: {
            message: 'Elements with an onClick handler must have a data-test-id attribute.',
            type: 'JSXOpeningElement'
        },
        onKeyDown: {
            message: 'Elements with an onKeyDown handler must have a data-test-id attribute.',
            type: 'JSXOpeningElement'
        },
        onKeyUp: {
            message: 'Elements with an onKeyUp handler must have a data-test-id attribute.',
            type: 'JSXOpeningElement'
        }
    }
};
