const isNode = caller => Boolean(caller && caller.target === 'node');
const isBabelNode = caller => caller.name === '@babel/node' || caller.name === '@babel/register';
const isWeb = caller => Boolean(caller && caller.target === 'web');
const isJest = caller => Boolean(caller && caller.name === 'babel-jest');

module.exports = api => {
  const web = api.caller(isWeb);
  const jest = api.caller(isJest);
  const node = api.caller(isNode) || api.caller(isBabelNode);

  return {
    sourceType: 'unambiguous',
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'usage' : false,
          corejs: web ? { version: '3.6.5', proposals: true } : false,
          targets: web ? '>2%' : { node: true },
          modules: node || jest ? 'commonjs' : false,
          loose: true,
        },
      ],
    ],
    plugins: [
      '@loadable/babel-plugin',
      '@babel/plugin-transform-typescript',
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-styled-components',
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-react-inline-elements',
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      'date-fns',
      web ? ['babel-plugin-transform-imports'] : null,
    ].filter(Boolean),
  };
};
