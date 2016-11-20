
function makeParser(operators) {
    return operators.reduce((prev, [name, fn]) => {
        return infixBinary(name, fn, prev)
    }, undefined);
}

function infixBinary(operator, logic, next = pattern => ['match', match, pattern]) {
    return (str) => {
        const components = str.split(new RegExp(`\\b${operator}\\b`, 'ig'))
            .map(s => s.trim())

        if (components.length > 1)
            return [operator, logic, components.map(next)]

        return next(components[0])
    }
}

function evaluate(content, expression) {
    const [name, operator, children] = expression;
    return operator(children, content, evaluate.bind(null, content));
}

const andNot = ([firstChild, ...children], _, eval) => 
    eval(firstChild) && !children.find(eval);

const and = (children, _, eval) => 
    children.every(eval);

const or = (children, _, eval) => 
    children.some(eval);

const match = (pattern, input) => 
    input.toLowerCase().indexOf(pattern.toLowerCase()) > -1;

// Precedence: highest to lowest
const _parse = makeParser([
    ['and', and],
    ['and not', andNot],
    ['or', or],
]);

module.exports = function parse(expression) {
    const ast = _parse(expression);
    return str => evaluate(str, ast);
}
