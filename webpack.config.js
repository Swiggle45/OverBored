// NEW: add the webpack config.
module.exports = {
    entry: './src/App.jsx',
    output: {
      //path: 'static',
      filename: 'static/app.bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          }
        },]
    }
  };