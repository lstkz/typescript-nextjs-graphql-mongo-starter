const withTM = require('next-transpile-modules')(['api']);

module.exports = withTM({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql?$/,
      loader: 'webpack-graphql-loader',
    });

    return config;
  },
});
