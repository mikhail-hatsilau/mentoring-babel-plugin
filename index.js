const isCorrectProperty = (property) =>
    property.isIdentifier() || property.isStringLiteral();

const getPropertyName = (propertyNode) =>
    propertyNode.name || propertyNode.value;

const isObjectProcessEnv = (path) =>
    path.get('object').isIdentifier({ name: 'process' }) &&
    path.get('property').isIdentifier({ name: 'env' });

const getNode = (types, value) =>
    value === undefined ? types.identifier('undefined') : types.stringLiteral(value);

module.exports = ({ types: t }) => (
     {
        visitor: {
            MemberExpression(path) {
                const expressionObject = path.get('object');
                const property = path.get('property');
                if(!t.isAssignmentExpression(path.parent)) {
                    if (isObjectProcessEnv(expressionObject) && isCorrectProperty(property) ) {
                        const propertyName = getPropertyName(property.node);
                        const value = process.env[propertyName];
                        path.replaceWith(getNode(t, value));
                    }
                }
            }
        }
    }
);
