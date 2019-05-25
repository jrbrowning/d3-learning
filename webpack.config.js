const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: './index.js',
  watch: true,
  mode: 'development',
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      online: false,
      files: ['./src/*.html','./src/*.css'],
      server: { baseDir: ['src'] }
    })
  ]
}