var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  resolve: {
    modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
  },
  plugins: [
    new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      )
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['./babelRelayPlugin']
        }
      }
    ]
  },
  output: { filename: 'index.bundle.js', path: './' }
};
