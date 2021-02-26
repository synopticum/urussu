module.exports = api => {
  api.cache.never();

  return {
    sourceType: 'unambiguous',
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: false,
          corejs: false,
          targets: { node: true },
          modules: 'commonjs',
          loose: true,
        },
      ],
    ],
    plugins: [
      '@loadable/babel-plugin',
      '@babel/plugin-transform-typescript',
      '@babel/plugin-syntax-dynamic-import',
    ].filter(Boolean),
  };
};
