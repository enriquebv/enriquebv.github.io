const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssPath = 'dist/css'

module.exports = {
  entry: {
    'blog': [path.resolve(__dirname, 'src/js/blog.js')],
    'styles': [path.resolve(__dirname, 'src/css/styles.scss')]
  },
  output: {
    filename: '[name].build.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `../../${cssPath}/[name].css`,
      chunkFilename: "[id].css"
    })
  ]
}