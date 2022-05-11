// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = api => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
			['@babel/plugin-proposal-optional-chaining'],
			['@babel/plugin-proposal-nullish-coalescing-operator'],
			['@babel/plugin-proposal-decorators', { legacy: true }],
			['@babel/plugin-proposal-class-properties'],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  };
};
