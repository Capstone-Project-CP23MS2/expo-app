module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel", // Required for expo-router
      "react-native-reanimated/plugin", // Required for react-native-reanimated
      // [
      //   // Required for react-native-dotenv
      //   "module:react-native-dotenv",
      //   {
      //     // envName: "APP_ENV", // Name of the environment variable
      //     moduleName: "@env", // Module name to use in import statements
      //     path: ".env", // Path to .env file
      //     // blocklist: null, // Specify which variables to ignore
      //     // allowlist: null, // Specify which variables to include
      //     // safe: false, // Set to true to load .env.example instead of .env
      //     // allowUndefined: true, // Allow undefined variables to be returned as an empty string
      //   },
      // ],
    ],
  };
};
