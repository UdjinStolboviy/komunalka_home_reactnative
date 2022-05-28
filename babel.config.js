module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-syntax-decorators', { legacy: true }],
    ['babel-plugin-parameter-decorator'],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          app: './src',
        },
      },
    ],
  ],
};