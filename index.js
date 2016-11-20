const isPropertyNodeEnv = (path) =>
    path.get('property').isIdentifier({ name: 'NODE_ENV' });

const isObjectProcessEnv = (path) =>
    path.get('object').isIdentifier({ name: 'process' }) &&
    path.get('property').isIdentifier({ name: 'env' });

const getEnvValue = () =>
    process.env.NODE_ENV || 'development';

module.exports = ({ types: t }) => (
     {
        visitor: {
            MemberExpression(path) {
                const expressionObject = path.get('object');
                if (isPropertyNodeEnv(path) && isObjectProcessEnv(expressionObject)) {
                    path.replaceWith(t.stringLiteral(getEnvValue()));
                }
            }
        }
    }
);
