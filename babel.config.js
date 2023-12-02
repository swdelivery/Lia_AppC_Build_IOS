module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
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
