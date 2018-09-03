// Hacky use of the Function constructor here, not sure there's a better way, other than using regex.
// https://stackoverflow.com/a/37217166/214017
const fillTemplate = (str, vars) => new Function(`return \`${ str }\`;`).call(vars);

module.exports = {
    /* tagged template helper for error strings with custom attribute passed in */
    getError: (errorString, attribute) => fillTemplate(errorString, { attribute })
};
