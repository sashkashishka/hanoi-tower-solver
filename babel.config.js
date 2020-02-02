module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: '10.8.0',
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      'emotion',
      'react-hot-loader/babel',
    ],
  };
};
