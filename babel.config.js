module.exports = {
  presets: ["module:@react-native/babel-preset"],
  env: {
    production: {
      plugins: ["transform-remove-console"], //removing consoles.log from app during release (production) versions
    },
  },
  plugins: [
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        root: ["./"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@Constant": "./src/Constant",
          "@Components": "./src/Components",
          "@Hooks": "./src/Hooks",
          "@Navigation": "./src/Navigation",
          "@Redux": "./src/Redux",
          "@Screens": "./src/Screens",
          "@Services": "./src/Services",
          "@typings": "./src/typings",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
