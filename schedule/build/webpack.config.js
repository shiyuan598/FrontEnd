module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    publicPath: '/dist/',
    hot: true,
    compress: true,
    host: '172.23.119.121',
    port: 9009
  }
}