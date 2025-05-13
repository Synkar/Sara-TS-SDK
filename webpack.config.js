const path = require("path");

module.exports = {
  entry: "./src/index.ts", // Altere para o arquivo de entrada do seu SDK
  output: {
    filename: "sara-sdk.bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "SaraSDK",
    libraryTarget: "var", // Exporta como variável global
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      buffer: require.resolve("buffer"), // Polyfill do Buffer
    },

    alias: {
      "form-data": false, // Substitui 'form-data' por nada
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions", "ie >= 11"], // Compatível com ES5
                  },
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
